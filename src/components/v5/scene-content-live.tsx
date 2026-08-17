import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, Check, MoreHorizontal, Send, Sparkles } from "lucide-react";
import { SceneContent as ContentPlannerScene } from "./scene-content";
import { type SceneProps } from "./motion-kit";
import {
  FacebookMark,
  InstagramMark,
  LinkedInMark,
  PinterestMark,
  ThreadsMark,
  TikTokMark,
} from "./social-brands";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";
import photoA from "@/assets/customer-02-northside.jpg";
import photoB from "@/assets/customer-04-bloom.jpg";
import photoC from "@/assets/customer-05-peak.jpg";

const CHANNELS = [
  { key: "instagram", label: "Instagram", Mark: InstagramMark },
  { key: "facebook", label: "Facebook", Mark: FacebookMark },
  { key: "tiktok", label: "TikTok", Mark: TikTokMark },
  { key: "linkedin", label: "LinkedIn", Mark: LinkedInMark },
  { key: "pinterest", label: "Pinterest", Mark: PinterestMark },
  { key: "threads", label: "Threads", Mark: ThreadsMark },
] as const;

function AssetPreload() {
  return (
    <div aria-hidden className="pointer-events-none absolute left-0 top-0 z-[-1] h-px w-px overflow-hidden opacity-0">
      <img src={photoA} alt="" loading="eager" decoding="async" />
      <img src={photoB} alt="" loading="eager" decoding="async" />
      <img src={photoC} alt="" loading="eager" decoding="async" />
    </div>
  );
}

function ViewModeControl() {
  return (
    <div className="absolute left-[150px] top-[4px] z-[96] hidden h-[38px] w-[270px] items-center bg-white pl-4 sm:flex">
      <div className="flex rounded-[9px] border border-slate-200 bg-slate-50 p-[2px]">
        <span className="rounded-[7px] bg-white px-2.5 py-1 text-[8px] font-black text-slate-700 shadow-sm">Calendar</span>
        <span className="rounded-[7px] px-2.5 py-1 text-[8px] font-bold text-slate-400">List</span>
      </div>
    </div>
  );
}

function ComposerPanel({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase === 2 ? (
        <motion.div
          className="absolute inset-x-0 bottom-0 top-[48px] z-[70] overflow-hidden"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.28 }}
        >
          <div className="absolute inset-0 bg-white/58 backdrop-blur-[1.5px]" />
          <motion.div
            className="absolute inset-y-0 right-0 flex w-[min(430px,88%)] flex-col border-l border-slate-200 bg-white shadow-[-28px_0_70px_-42px_rgba(15,23,42,.5)]"
            initial={reduced ? false : { opacity: 0, x: 34 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 22 }}
            transition={{ duration: reduced ? 0 : 0.38, ease: [0.2, 0.82, 0.24, 1] }}
          >
            <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
              <div>
                <div className="text-[12px] font-black tracking-tight text-slate-900">New Social Post</div>
                <div className="mt-0.5 text-[7.5px] font-semibold text-slate-400">Create once, publish everywhere</div>
              </div>
              <span className="ml-auto flex h-7 w-7 items-center justify-center text-slate-300">
                <MoreHorizontal className="h-4 w-4" />
              </span>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden px-4 py-3.5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[7.5px] font-black uppercase tracking-[.13em] text-slate-400">Post to</div>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    {CHANNELS.map(({ key, Mark }, index) => (
                      <motion.span
                        key={key}
                        className="inline-flex items-center justify-center"
                        initial={reduced ? false : { opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: reduced ? 0 : 0.08 + index * 0.055, duration: 0.2 }}
                      >
                        <Mark size={20} />
                      </motion.span>
                    ))}
                    <span className="ml-1 text-[8px] font-black text-slate-500">6 channels</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[7px] font-bold text-slate-400">
                  <span className="relative h-4 w-7 rounded-full bg-slate-200">
                    <span className="absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-white shadow-sm" />
                  </span>
                  Customize
                </div>
              </div>

              <div className="mt-4">
                <div className="text-[7.5px] font-black uppercase tracking-[.13em] text-slate-400">Headline / hook</div>
                <motion.div
                  className="mt-1.5 rounded-[11px] border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-[10.5px] font-black text-slate-800"
                  initial={reduced ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.22, duration: 0.25 }}
                >
                  Only 3 spots left this Friday
                </motion.div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[7.5px] font-black uppercase tracking-[.13em] text-slate-400">Post content</div>
                  <span className="rounded-full bg-violet-50 px-2 py-1 text-[6.5px] font-black text-violet-600">AI written</span>
                </div>
                <motion.div
                  className="mt-1.5 min-h-[94px] rounded-[12px] border border-slate-200 bg-white px-3 py-2.5 text-[9.5px] font-semibold leading-[1.55] text-slate-600"
                  initial={reduced ? false : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.36, duration: 0.28 }}
                >
                  A few Friday appointments just opened up. Book your spot before they’re gone.
                  <div className="mt-2 text-[8.5px] font-bold text-blue-600">Book now →</div>
                </motion.div>
                <div className="mt-1.5 flex items-center gap-1.5 text-[7px] font-bold text-slate-300">
                  <span className="rounded-[6px] border border-slate-100 px-1.5 py-1">AI</span>
                  <span className="rounded-[6px] border border-slate-100 px-1.5 py-1">B</span>
                  <span className="rounded-[6px] border border-slate-100 px-1.5 py-1">#</span>
                  <span className="rounded-[6px] border border-slate-100 px-1.5 py-1">Link</span>
                  <span className="ml-auto">2200 chars</span>
                </div>
              </div>

              <motion.div
                className="mt-4 flex items-center gap-2 rounded-[13px] border border-violet-100 bg-violet-50/55 p-2.5"
                initial={reduced ? false : { opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduced ? 0 : 0.5, duration: 0.28 }}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-violet-600 text-white">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[8.5px] font-black text-slate-800">Generate creative concepts</div>
                  <div className="mt-0.5 text-[7px] font-semibold text-slate-400">Create 3 visual options from this post</div>
                </div>
                <span className="rounded-full bg-white px-2 py-1 text-[6.5px] font-black text-violet-600 shadow-sm">NEXT</span>
              </motion.div>
            </div>

            <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50/45 px-4 py-2.5">
              <span className="inline-flex items-center gap-1 text-[7px] font-bold text-emerald-600">
                <Check className="h-3 w-3" strokeWidth={3} /> Draft ready
              </span>
              <span className="ml-auto text-[7px] font-semibold text-slate-400">Ready for creative</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Artwork({ variant, selected = false }: { variant: 0 | 1 | 2; selected?: boolean }) {
  if (variant === 1) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-[#fff7ef]">
        <div className="absolute right-0 top-0 h-full w-[54%] overflow-hidden rounded-l-[44px]">
          <img src={photoA} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute left-3.5 top-3.5 text-[6.5px] font-black uppercase tracking-[.15em] text-fuchsia-600">NORTH & PINE</div>
        <div className="absolute bottom-3.5 left-3.5 w-[46%]">
          <div className="text-[19px] font-black leading-[.88] tracking-[-.055em] text-slate-900">MAKE<br />TIME<br />FOR YOU</div>
          <div className="mt-2.5 inline-flex rounded-full bg-fuchsia-600 px-2 py-1 text-[6px] font-black uppercase text-white">3 left Friday</div>
        </div>
      </div>
    );
  }

  if (variant === 2) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-[#12372f]">
        <img src={photoC} alt="" className="absolute inset-x-0 top-0 h-[57%] w-full object-cover opacity-90" />
        <div className="absolute inset-x-0 top-[38%] h-[30%] bg-gradient-to-b from-transparent to-[#12372f]" />
        <div className="absolute left-3.5 top-3.5 rounded-full bg-white/90 px-2 py-1 text-[6px] font-black uppercase tracking-[.12em] text-emerald-900">LAST CALL</div>
        <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
          <div className="text-[21px] font-black leading-[.88] tracking-[-.055em]">BOOK<br />BEFORE 5</div>
          <div className="mt-2 text-[7px] font-semibold text-white/65">Three appointments remaining.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-slate-950">
      <img src={photoB} alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_42%]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-700/85 via-indigo-500/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-white/10" />
      <div className="absolute left-3.5 top-3.5 rounded-full border border-white/25 bg-black/15 px-2 py-1 text-[6.5px] font-black uppercase tracking-[.14em] text-white backdrop-blur-md">North & Pine</div>
      {selected ? (
        <motion.span
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg"
          initial={{ opacity: 0, scale: 0.65 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <Check className="h-4 w-4" strokeWidth={3} />
        </motion.span>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
        <div className="text-[7px] font-black uppercase tracking-[.18em] text-white/65">FRIDAY FEELS</div>
        <div className="mt-1 text-[23px] font-black leading-[.86] tracking-[-.065em]">3 SPOTS<br />LEFT</div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-white px-2 py-1 text-[6.5px] font-black uppercase tracking-[.08em] text-slate-950">Book now</span>
          <span className="text-[6px] font-bold text-white/65">Fri 21 Aug</span>
        </div>
      </div>
    </div>
  );
}

function CreativeFrame({ variant, selected = false }: { variant: 0 | 1 | 2; selected?: boolean }) {
  return (
    <div className={`h-[220px] w-[176px] rounded-[20px] bg-white p-[3px] shadow-[0_26px_58px_-30px_rgba(15,23,42,.52)] ${selected ? "ring-4 ring-blue-500/15" : ""}`}>
      <Artwork variant={variant} selected={selected} />
    </div>
  );
}

function MiniImagePost({
  left,
  top,
  src,
  title,
  time,
  marks = 2,
}: {
  left: string;
  top: string;
  src: string;
  title: string;
  time: string;
  marks?: number;
}) {
  return (
    <div
      className="absolute z-[65] w-[10.2%] min-w-[62px] max-w-[80px] overflow-hidden rounded-[7px] border border-slate-200 bg-white shadow-[0_8px_18px_-15px_rgba(15,23,42,.45)]"
      style={{ left, top }}
    >
      <div className="h-[19px] overflow-hidden bg-slate-100">
        <img src={src} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="px-1.5 py-1">
        <div className="flex items-center justify-between gap-1">
          <span className="text-[6px] font-black text-slate-400">{time}</span>
          <span className="flex items-center">
            {CHANNELS.slice(0, marks).map(({ key, Mark }, index) => (
              <span key={key} className={index > 0 ? "-ml-[2px]" : ""}><Mark size={8} /></span>
            ))}
          </span>
        </div>
        <div className="mt-0.5 truncate text-[6.5px] font-black text-slate-700">{title}</div>
      </div>
    </div>
  );
}

function CalendarPolishOverlay({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[48px] z-[64] overflow-hidden">
      <MiniImagePost left="15.6%" top="15.2%" src={photoA} title="Behind the scenes" time="12:00" marks={2} />
      <MiniImagePost left="15.6%" top="45.5%" src={photoC} title="Staff spotlight" time="9:00" marks={3} />
      <MiniImagePost left="72.8%" top="75.1%" src={photoA} title="Weekend story" time="12:00" marks={2} />

      <div className="absolute left-[58.05%] top-[6.2%] h-[29.2%] w-[12.45%] overflow-hidden rounded-[9px] border border-blue-200 bg-[#f7fbff] p-1.5">
        <div className="flex items-center gap-1">
          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-zapla-ink px-1 text-[7.5px] font-black text-white">21</span>
          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500" />
        </div>

        {phase === 6 ? (
          <motion.div
            className="absolute inset-x-1.5 top-[28px] h-[54px] rounded-[7px] border border-dashed border-blue-300 bg-blue-50/60"
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: [0, 1, 0.72], scale: [0.96, 1, 1] }}
            transition={{ duration: reduced ? 0 : 0.68, times: [0, 0.35, 1] }}
          >
            <span className="absolute left-1.5 top-1 text-[6px] font-black text-blue-600">9:00</span>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}

function PublishingPanel({ phase, reduced }: { phase: number; reduced: boolean }) {
  const visible = phase === 5;
  return (
    <motion.div
      className="absolute left-[55%] top-[43%] z-[76] w-[min(320px,39%)] -translate-y-1/2"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 10 }}
      transition={{ duration: reduced ? 0 : 0.32, delay: visible && !reduced ? 0.18 : 0 }}
    >
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <div className="text-[11px] font-black tracking-tight text-slate-900">Publishing to 6 channels</div>
      </div>
      <div className="mt-1 text-[7.5px] font-semibold text-slate-400">Same post, formatted for every channel</div>
      <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2.5">
        {CHANNELS.map(({ key, label, Mark }, index) => (
          <motion.div
            key={key}
            className="flex min-w-0 items-center gap-2 rounded-[9px] bg-slate-50/80 px-2 py-1.5"
            initial={reduced ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 5 }}
            transition={{ duration: reduced ? 0 : 0.2, delay: visible && !reduced ? 0.28 + index * 0.06 : 0 }}
          >
            <Mark size={18} />
            <span className="min-w-0 flex-1 truncate text-[7px] font-black text-slate-700">{label}</span>
            <Check className="h-3 w-3 shrink-0 text-emerald-500" strokeWidth={3} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ScheduleDock({ phase, reduced }: { phase: number; reduced: boolean }) {
  const visible = phase === 5;
  return (
    <motion.div
      className="absolute bottom-[9%] left-[55%] z-[78] flex items-center gap-2"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 7 }}
      transition={{ duration: reduced ? 0 : 0.3, delay: visible && !reduced ? 0.72 : 0 }}
    >
      <div className="flex items-center gap-2 rounded-[11px] bg-slate-50 px-2.5 py-2">
        <CalendarDays className="h-3.5 w-3.5 text-blue-600" />
        <div>
          <div className="text-[8px] font-black text-slate-800">Fri 21 Aug</div>
          <div className="text-[7px] font-semibold text-slate-400">9:00 AM · Sydney</div>
        </div>
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-[11px] bg-zapla-ink px-3.5 py-2.5 text-[9px] font-black text-white shadow-sm">
        <Send className="h-3 w-3" /> Schedule post
      </span>
    </motion.div>
  );
}

function FinalScheduledTile({ phase, reduced }: { phase: number; reduced: boolean }) {
  if (phase !== 6) return null;
  return (
    <motion.div
      className="absolute left-[59.3%] top-[17.2%] z-[91] w-[9.7%] min-w-[62px] max-w-[76px]"
      initial={reduced ? false : { opacity: 0, scale: 0.9, y: 3 }}
      animate={reduced ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: [0.9, 1.035, 1], y: [3, -1, 0] }}
      transition={{ duration: reduced ? 0 : 0.44, delay: reduced ? 0 : 1.08, times: [0, 0.58, 1], ease: [0.2, 0.82, 0.24, 1] }}
    >
      <motion.span
        className="pointer-events-none absolute -inset-[3px] rounded-[10px]"
        style={{
          background: "conic-gradient(from 0deg, transparent 0deg, transparent 274deg, rgba(37,99,255,.16) 300deg, rgba(37,99,255,.95) 330deg, rgba(16,185,129,.95) 350deg, transparent 360deg)",
        }}
        initial={reduced ? false : { opacity: 0, rotate: 0 }}
        animate={reduced ? { opacity: 0 } : { opacity: [0, 1, 1, 0], rotate: [0, 0, 360, 360] }}
        transition={{ duration: 1.08, delay: 1.18, times: [0, 0.08, 0.82, 1], ease: "linear" }}
      />

      <div className="relative z-10 overflow-hidden rounded-[7px] border border-blue-300 bg-white shadow-[0_10px_24px_-16px_rgba(37,99,255,.7)]">
        <div className="h-[22px] overflow-hidden">
          <img src={photoB} alt="" className="h-full w-full object-cover object-[50%_42%]" />
        </div>
        <div className="px-1 py-1">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[5.5px] font-black text-blue-700">9:00</span>
            <motion.span
              className="rounded-full bg-emerald-50 px-1 py-[1px] text-[5px] font-black text-emerald-700"
              initial={reduced ? false : { opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: reduced ? 0 : 1.42, duration: reduced ? 0 : 0.22 }}
            >
              SCHEDULED
            </motion.span>
          </div>
          <div className="truncate text-[6px] font-black text-slate-800">3 spots left Friday</div>
          <div className="mt-0.5 flex items-center gap-[1px]">
            {CHANNELS.slice(0, 3).map(({ key, Mark }) => <span key={key}><Mark size={7} /></span>)}
            <span className="ml-0.5 text-[5px] font-black text-slate-400">+3</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SuccessToast({ phase, reduced }: { phase: number; reduced: boolean }) {
  if (phase !== 6) return null;
  return (
    <motion.div
      className="absolute bottom-3 right-3 z-[92] flex items-center gap-2 rounded-[12px] border border-emerald-100 bg-white px-3 py-2 shadow-[0_18px_45px_-24px_rgba(15,23,42,.46)]"
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 1.58 }}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-4 w-4" strokeWidth={3} /></span>
      <div>
        <div className="text-[8.5px] font-black text-slate-800">Scheduled across 6 channels</div>
        <div className="text-[7px] font-semibold text-slate-400">Friday 21 Aug · 9:00 AM</div>
      </div>
    </motion.div>
  );
}

function CreativeStory({ phase, reduced }: { phase: number; reduced: boolean }) {
  if (phase < 3 || phase > 6) return null;

  const concepts = phase === 3;
  const selected = phase === 4;
  const publishing = phase === 5;
  const flying = phase === 6;

  const centreMotion = flying
    ? {
        left: ["34%", "43%", "54.5%", "63.95%"],
        top: ["44%", "37%", "29%", "22.2%"],
        scale: [1.03, 0.82, 0.56, 0.3],
        rotate: [0, -1.5, -3, -1],
        opacity: [1, 1, 1, 0],
      }
    : publishing
      ? { left: "34%", top: "44%", scale: 1.03, rotate: 0, opacity: 1 }
      : selected
        ? { left: "50%", top: "46%", scale: 1.08, rotate: 0, opacity: 1 }
        : { left: "50%", top: "47%", scale: 1, rotate: 0, opacity: 1 };

  return (
    <motion.div className="pointer-events-none absolute inset-x-0 bottom-0 top-[48px] z-[70] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-white"
        initial={false}
        animate={{ opacity: flying ? 0 : 0.91 }}
        transition={{ duration: reduced ? 0 : flying ? 0.42 : 0.24 }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(255,255,255,1),rgba(255,255,255,.88)_42%,rgba(255,255,255,.32)_76%,transparent_100%)]"
        initial={false}
        animate={{ opacity: flying ? 0 : 1 }}
        transition={{ duration: reduced ? 0 : flying ? 0.42 : 0.24 }}
      />

      {concepts ? (
        <motion.div
          className="absolute left-1/2 top-[11%] z-[74] -translate-x-1/2 rounded-full bg-violet-50 px-3 py-1.5 text-[8px] font-black text-violet-700"
          initial={reduced ? false : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.2, duration: 0.24 }}
        >
          <span className="inline-flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> 3 concepts ready</span>
        </motion.div>
      ) : null}

      <motion.div
        className="absolute left-1/2 top-[47%] z-[72] -translate-x-1/2 -translate-y-1/2"
        initial={reduced ? false : { opacity: 0, x: -120, scale: 0.82, rotate: -3 }}
        animate={{ opacity: concepts ? 1 : 0, x: concepts ? -188 : -235, scale: concepts ? 0.94 : 0.82, rotate: -7 }}
        transition={{ type: "spring", stiffness: 220, damping: 25, delay: concepts && !reduced ? 0.08 : 0 }}
      >
        <CreativeFrame variant={1} />
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-[47%] z-[72] -translate-x-1/2 -translate-y-1/2"
        initial={reduced ? false : { opacity: 0, x: 120, scale: 0.82, rotate: 3 }}
        animate={{ opacity: concepts ? 1 : 0, x: concepts ? 188 : 235, scale: concepts ? 0.94 : 0.82, rotate: 7 }}
        transition={{ type: "spring", stiffness: 220, damping: 25, delay: concepts && !reduced ? 0.14 : 0 }}
      >
        <CreativeFrame variant={2} />
      </motion.div>

      <motion.div
        className="absolute z-[75] -translate-x-1/2 -translate-y-1/2"
        initial={reduced ? false : { opacity: 0, left: "50%", top: "50%", scale: 0.84 }}
        animate={centreMotion}
        transition={
          flying
            ? { duration: reduced ? 0 : 1.28, times: [0, 0.34, 0.72, 1], ease: [0.18, 0.78, 0.2, 1] }
            : { type: "spring", stiffness: 205, damping: 25, delay: concepts && !reduced ? 0.18 : 0 }
        }
      >
        <CreativeFrame variant={0} selected={phase >= 4} />
      </motion.div>

      <PublishingPanel phase={phase} reduced={reduced} />
      <ScheduleDock phase={phase} reduced={reduced} />
      <FinalScheduledTile phase={phase} reduced={reduced} />
      <SuccessToast phase={phase} reduced={reduced} />
    </motion.div>
  );
}

export function SceneContentLive(props: SceneProps) {
  const { phase, reduced } = props;
  const basePhase = 0;

  const points: Record<number, CursorPoint> = {
    1: { left: "92%", top: "5%" },
    4: { left: "50%", top: "46%" },
    5: { left: "73%", top: "86%" },
  };

  const point = points[phase] ?? null;
  const press = phase === 1 || phase === 4 || phase === 5;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AssetPreload />
      <ContentPlannerScene {...props} phase={basePhase} />
      <CalendarPolishOverlay phase={phase} reduced={reduced} />
      <ViewModeControl />
      <ComposerPanel phase={phase} reduced={reduced} />
      <CreativeStory phase={phase} reduced={reduced} />
      <ZaplaDemoCursor point={point} press={press} reduced={reduced} />
    </div>
  );
}
