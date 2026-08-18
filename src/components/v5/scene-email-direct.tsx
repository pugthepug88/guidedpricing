import { AnimatePresence, motion } from "motion/react";
import { Mail, Plus, Users } from "lucide-react";
import { FACE } from "./faces";
import { type SceneProps } from "./motion-kit";
import { SceneEmailLive } from "./scene-email-live";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

const AUDIENCES = [
  ["Clients gone quiet", "312 contacts"],
  ["VIP Clients", "124 contacts"],
  ["Open Quotes", "86 contacts"],
] as const;

const TEMPLATES = [
  { eyebrow: "EMAIL 1", headline: "We’d love to\nsee you again", face: FACE.maya, tone: "peach" as const },
  { eyebrow: "EMAIL 2", headline: "Here’s a reason\nto come back", face: FACE.priya, tone: "green" as const },
  { eyebrow: "EMAIL 3", headline: "Last chance —\ndon’t miss out", face: FACE.sophie, tone: "blue" as const },
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

const EMAIL_PHASE_DURATIONS = [650, 900, 1150, 1250, 900, 900, 900, 650, 950, 1700, 1400] as const;
const PHASE_STARTS = EMAIL_PHASE_DURATIONS.map((_, index) =>
  EMAIL_PHASE_DURATIONS.slice(0, index).reduce((sum, duration) => sum + duration, 0),
);

function AudienceChip() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-[7px] font-black text-blue-700">
      <Users className="h-3 w-3" /> Clients gone quiet
    </span>
  );
}

function OpeningComposer({ phase, reduced }: { phase: number; reduced: boolean }) {
  const menuOpen = phase >= 1;
  const selected = phase >= 2;

  return (
    <AnimatePresence>
      {phase <= 2 ? (
        <motion.div
          className="absolute bottom-[15%] right-[5%] top-[15%] z-[70] w-[35%] overflow-visible rounded-[22px] border border-slate-200 bg-white shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)]"
          initial={reduced ? false : { opacity: 0, x: 24, scale: 0.985 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: reduced ? 0 : 0.32, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <div className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-3.5">
            <span
              className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[10px] text-white shadow-[0_10px_20px_-10px_rgba(37,99,235,.9)]"
              style={{ background: "linear-gradient(145deg,#60a5fa 0%,#2563eb 52%,#06b6d4 100%)" }}
            >
              <span className="absolute inset-x-1 top-0 h-[45%] rounded-full bg-white/20 blur-[7px]" />
              <Mail className="relative z-10 h-4 w-4" />
            </span>
            <div className="text-[11.5px] font-black text-slate-900">New email</div>
          </div>

          <div className="px-4 py-3">
            <div className="relative flex min-h-[46px] items-center border-b border-slate-100">
              <div className="w-[48px] text-[7px] font-black uppercase tracking-[.12em] text-slate-400">To</div>
              <div className="flex-1">
                {selected ? <AudienceChip /> : <span className="text-[8px] font-semibold text-slate-300">Choose a group</span>}
              </div>

              <motion.span
                animate={phase === 1 && !reduced ? { scale: [1, 0.86, 1] } : undefined}
                transition={{ duration: 0.24 }}
                className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-[0_9px_20px_-8px_rgba(37,99,235,.9)]"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/22 to-transparent" />
                <Plus className="relative z-10 h-3.5 w-3.5" strokeWidth={3} />
              </motion.span>

              <AnimatePresence>
                {menuOpen && !selected ? (
                  <motion.div
                    className="absolute left-[46px] right-0 top-[43px] z-40 overflow-hidden rounded-[13px] border border-slate-200 bg-white p-1.5 shadow-[0_20px_44px_-24px_rgba(15,23,42,.48)]"
                    initial={reduced ? false : { opacity: 0, y: -5, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.985 }}
                    transition={{ duration: reduced ? 0 : 0.25, ease: [0.2, 0.82, 0.24, 1] }}
                  >
                    {AUDIENCES.map(([name, count], index) => (
                      <div
                        key={name}
                        className={
                          index === 0
                            ? "flex items-center gap-2 rounded-[10px] bg-blue-50 px-2.5 py-2"
                            : "flex items-center gap-2 rounded-[10px] px-2.5 py-2"
                        }
                      >
                        <span
                          className={
                            index === 0
                              ? "flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white"
                              : "flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400"
                          }
                        >
                          <Users className="h-3 w-3" />
                        </span>
                        <div className="flex-1">
                          <div className="text-[7.5px] font-black text-slate-800">{name}</div>
                          <div className="text-[6px] font-semibold text-slate-400">{count}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="flex min-h-[46px] items-center border-b border-slate-100">
              <div className="w-[48px] text-[7px] font-black uppercase tracking-[.12em] text-slate-400">Subject</div>
              <div className="truncate text-[8.8px] font-black text-slate-800">We’d love to see you again</div>
            </div>

            <div className="pt-4 text-[8.7px] font-semibold leading-[1.65] text-slate-600">
              Hi {"{{first_name}}"}, it’s been a little while. We’d love to welcome you back.
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function TemplateArtwork({ index }: { index: number }) {
  const template = TEMPLATES[index];
  const gradients = {
    peach: "linear-gradient(155deg,#fff1eb 0%,#ffb69f 48%,#d85f4c 100%)",
    green: "linear-gradient(155deg,#e9f8ef 0%,#95d6af 46%,#176343 100%)",
    blue: "linear-gradient(155deg,#eef5ff 0%,#9ec5ff 46%,#315ed0 100%)",
  } as const;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[18px]" style={{ background: gradients[template.tone] }}>
      <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-white/30 blur-[1px]" />
      <img src={template.face} alt="" className="absolute bottom-0 right-[-8px] h-[72%] w-[58%] rounded-tl-[48px] object-cover object-top" />
      <div className="absolute left-3.5 top-3.5 rounded-full bg-white/82 px-2 py-1 text-[6px] font-black uppercase tracking-[.16em] text-slate-700">
        {template.eyebrow}
      </div>
      <div className="absolute bottom-4 left-3.5 w-[55%] whitespace-pre-line text-[20px] font-black leading-[.9] tracking-[-.05em] text-slate-900">
        {template.headline}
      </div>
    </div>
  );
}

function CarouselThumb({ index }: { index: number }) {
  if (index < 3) {
    return (
      <div className="h-[158px] w-[118px] overflow-hidden rounded-[18px] border-[3px] border-white bg-white shadow-[0_24px_46px_-24px_rgba(15,23,42,.52)]">
        <TemplateArtwork index={index} />
      </div>
    );
  }

  const card = CAROUSEL_CARDS[index];
  return (
    <div
      className="relative h-[158px] w-[118px] overflow-hidden rounded-[18px] border-[3px] border-white shadow-[0_24px_46px_-24px_rgba(15,23,42,.52)]"
      style={{ background: `linear-gradient(155deg,${card.from},${card.to})` }}
    >
      <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-white/30" />
      <img src={card.face} alt="" className="absolute bottom-0 right-[-8px] h-[76%] w-[72%] rounded-tl-[42px] object-cover object-top" />
      <div className="absolute left-2.5 top-2.5 rounded-full bg-white/82 px-1.5 py-1 text-[5px] font-black tracking-[.12em] text-slate-700">
        {card.label}
      </div>
    </div>
  );
}

function CarouselRing({ phase, reduced }: { phase: number; reduced: boolean }) {
  const selectedCount = Math.max(0, Math.min(3, phase - 3));
  const step = 360 / CAROUSEL_CARDS.length;
  const targetRotation = phase <= 3 ? 360 : 360 + Math.min(phase - 3, 2) * step;

  return (
    <motion.div
      className="absolute left-1/2 top-[54%] h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2"
      style={{ perspective: 900 }}
      initial={reduced ? false : { opacity: 0, scale: 0.95 }}
      animate={{
        opacity: phase === 6 ? [1, 1, 0] : 1,
        scale: phase === 6 ? [1, 0.98, 0.9] : 1,
      }}
      transition={
        phase === 6 && !reduced
          ? { duration: 0.82, times: [0, 0.72, 1], ease: [0.2, 0.8, 0.2, 1] }
          : { duration: reduced ? 0 : 0.2 }
      }
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        initial={reduced ? false : { rotateY: 0 }}
        animate={phase === 3 && !reduced ? { rotateY: [0, 285, 345, 360] } : { rotateY: targetRotation }}
        transition={
          phase === 3 && !reduced
            ? { duration: 1.08, times: [0, 0.56, 0.84, 1], ease: [0.16, 0.84, 0.25, 1] }
            : {
                delay: phase >= 4 && phase <= 5 && !reduced ? 0.56 : 0,
                duration: reduced ? 0 : 0.28,
                ease: [0.2, 0.82, 0.24, 1],
              }
        }
      >
        {CAROUSEL_CARDS.map((_, index) => {
          const angle = -step * index;
          const alreadyPlaced = index < selectedCount && index < 3;
          return (
            <motion.div
              key={index}
              className="absolute left-1/2 top-1/2 -ml-[59px] -mt-[79px]"
              style={{ transform: `rotateY(${angle}deg) translateZ(180px)` }}
              animate={{ opacity: alreadyPlaced ? 0 : index < 3 ? 1 : 0.7 }}
              transition={{ duration: reduced ? 0 : 0.12 }}
            >
              <CarouselThumb index={index} />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

function PeelCard({ index, reduced }: { index: number; reduced: boolean }) {
  const targetTop = [39.8, 58.7, 77.2][index];
  const midTop = index === 0 ? 35.5 : index === 1 ? 50.5 : 64.5;

  return (
    <motion.div
      key={index}
      className="absolute z-[92]"
      style={{ transform: "translate(-50%, -50%)" }}
      initial={reduced ? false : { left: "75.6%", top: "44%", opacity: 1 }}
      animate={
        reduced
          ? { left: "18.8%", top: `${targetTop}%`, opacity: 0 }
          : {
              left: ["75.6%", "66%", "38%", "18.8%"],
              top: ["44%", "41%", `${midTop}%`, `${targetTop}%`],
              opacity: [1, 1, 1, 0],
            }
      }
      transition={{ duration: reduced ? 0 : 0.72, times: [0, 0.18, 0.84, 1], ease: [0.18, 0.78, 0.2, 1] }}
    >
      <motion.div
        className="h-[158px] w-[118px] overflow-hidden rounded-[18px] border-[3px] border-white bg-white shadow-[0_24px_46px_-24px_rgba(15,23,42,.52)]"
        initial={reduced ? false : { scale: 1, rotate: 0 }}
        animate={reduced ? { scale: 0.43 } : { scale: [1, 0.95, 0.63, 0.43], rotate: [0, -2, 1, 0] }}
        transition={{ duration: reduced ? 0 : 0.72, times: [0, 0.18, 0.84, 1], ease: [0.18, 0.78, 0.2, 1] }}
      >
        <TemplateArtwork index={index} />
      </motion.div>
    </motion.div>
  );
}

function DirectCarouselOverlay({ phase, reduced }: { phase: number; reduced: boolean }) {
  const peelIndex = phase >= 4 && phase <= 6 ? phase - 4 : null;

  return (
    <AnimatePresence>
      {phase >= 3 && phase <= 6 ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[85]"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.18 }}
        >
          <div className="absolute right-[1%] top-[14%] h-[58%] w-[49%] bg-[#f7f8fb]">
            <div className="text-center">
              <div className="text-[11.5px] font-black text-slate-900">Select templates</div>
              <div className="mt-0.5 text-[7px] font-semibold text-slate-400">
                {phase === 3 ? "Pick 3 emails for this sequence" : "Adding selected emails to the sequence"}
              </div>
            </div>
            <div className="relative mt-3.5 h-[206px]">
              <CarouselRing phase={phase} reduced={reduced} />
            </div>
          </div>

          {peelIndex != null ? <PeelCard index={peelIndex} reduced={reduced} /> : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function SceneEmailDirect(props: SceneProps) {
  const { phase, elapsedMs, reduced } = props;
  const localElapsed = elapsedMs - (PHASE_STARTS[phase] ?? 0);
  const isPeelPhase = phase >= 4 && phase <= 6;
  const revealBaseAt = 660;
  const basePhase = isPeelPhase && localElapsed < revealBaseAt ? phase - 1 : phase;
  const suppressBaseMotion = phase <= 6;

  const openingPoints: Record<number, CursorPoint> = {
    0: { left: "84%", top: "31%" },
    1: { left: "91%", top: "31%" },
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <SceneEmailLive
        {...props}
        phase={basePhase}
        reduced={suppressBaseMotion ? true : reduced}
      />
      <OpeningComposer phase={phase} reduced={reduced} />
      <DirectCarouselOverlay phase={phase} reduced={reduced} />
      <ZaplaDemoCursor point={openingPoints[phase] ?? null} press={phase === 1} reduced={reduced} />
    </div>
  );
}
