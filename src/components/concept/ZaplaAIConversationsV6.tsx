/* Zapla AI section (V1 redesign) for /concept/cinematic-follow-through-v6 only.
   One cinematic product scene: Sarah's conversation stays on screen the whole
   time while pieces of her history dock into the scene, condense into a context
   rail attached to the product, and the AI acts inside the same conversation. */
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Check, Clock, FileText, MessageSquareText, Mic, Phone, Send } from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.22, 1, 0.36, 1] as const;

const IVORY = "#F4EDE2";
const CORAL = "#CE7A5A";
const AMBER = "#D29A43";
const ROSE = "#C0776F";
const SAGE = "#97A07A";
const INK = "#241B12";
const FAINT = "#9A8D7A";

const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

/* ------------------------------------------------------------------ */
/* Loop phases                                                         */
/* ------------------------------------------------------------------ */
const PH = {
  IDLE: 0,
  F1: 1,
  F2: 2,
  F3: 3,
  F4: 4,
  DOCKED: 5,
  CONDENSE: 6,
  SUMMARY: 7,
  DECIDE: 8,
  SEND: 9,
  TYPING: 10,
  REPLY: 11,
  STATUS: 12,
  HOLD: 13,
  RESET: 14,
} as const;

const DUR = [1500, 600, 520, 520, 650, 950, 1250, 1150, 1550, 1500, 1150, 1450, 1350, 3600, 750];

function useStoryLoop(inView: boolean, reduced: boolean) {
  const [phase, setPhase] = useState<number>(reduced ? PH.HOLD : PH.IDLE);
  useEffect(() => {
    if (reduced) {
      setPhase(PH.HOLD);
      return;
    }
    if (!inView) return;
    const t = setTimeout(() => setPhase((p) => (p >= PH.RESET ? PH.IDLE : p + 1)), DUR[phase]);
    return () => clearTimeout(t);
  }, [phase, inView, reduced]);
  return phase;
}

/* ------------------------------------------------------------------ */
/* Scene data                                                          */
/* ------------------------------------------------------------------ */
type Fragment = {
  icon: typeof Phone;
  accent: string;
  eyebrow: string;
  title: string;
  meta: string;
  detail: string | null;
  pos: React.CSSProperties;
  rotate: number;
  enterX: number;
  dx: number;
  dy: number;
  w: number;
};

const FRAGMENTS: Fragment[] = [
  { icon: Phone, accent: CORAL, eyebrow: "Call · Tue 9:14 AM", title: "Phone call answered", meta: "AI Voice · 2m 14s", detail: "“We want to start in March if possible.”", pos: { left: 44, top: 24 }, rotate: -2.5, enterX: -90, dx: 660, dy: 220, w: 262 },
  { icon: MessageSquareText, accent: AMBER, eyebrow: "SMS · Tue", title: "SMS conversation", meta: "6 messages", detail: "“Does the quote include tiling?”", pos: { left: 78, top: 372 }, rotate: 2, enterX: -90, dx: 620, dy: -110, w: 248 },
  { icon: FileText, accent: ROSE, eyebrow: "Quote · Wed", title: "Quote sent · $18,000", meta: "Bathroom renovation · #1284", detail: "Opened twice · no reply", pos: { right: 40, top: 62 }, rotate: 1.8, enterX: 90, dx: -110, dy: 170, w: 268 },
  { icon: Clock, accent: SAGE, eyebrow: "Since Thursday", title: "4 days quiet", meta: "No reply · no follow-up scheduled", detail: null, pos: { right: 88, top: 438 }, rotate: -2, enterX: 90, dx: -70, dy: -190, w: 244 },
];

const CONTEXT_ROWS = [
  { icon: Phone, accent: CORAL, text: "Call answered · AI Voice" },
  { icon: MessageSquareText, accent: AMBER, text: "SMS thread · 6 messages" },
  { icon: FileText, accent: ROSE, text: "Quote sent · $18,000" },
  { icon: Clock, accent: SAGE, text: "Quiet · 4 days" },
];

const MOBILE_CHIPS = ["Call answered", "SMS · 6", "Quote $18,000", "4 days quiet"];

const ROLES = [
  { id: "employee", label: "AI Employee", desc: "Handles customer conversations and follow-up" },
  { id: "voice", label: "AI Voice", desc: "Answers calls and books appointments" },
  { id: "agent", label: "AI Agent", desc: "Uses context to take the next action" },
] as const;

const RAIL = ["Conversations", "Context", "Think", "Act"] as const;

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */
function SarahFace({ size = 24 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="block shrink-0 overflow-hidden rounded-full ring-1 ring-black/[0.06]"
      style={{
        width: size,
        height: size,
        backgroundColor: "#C89A5D",
        backgroundImage: `url(${PORTRAIT_SHEET})`,
        backgroundPosition: "0% 0%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
      }}
    />
  );
}

function StatusChip({ reengaged, reduced }: { reengaged: boolean; reduced: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{
        borderColor: reengaged ? "rgba(151,160,122,.6)" : "rgba(192,119,111,.35)",
        backgroundColor: reengaged ? "rgba(151,160,122,.16)" : "rgba(192,119,111,.07)",
      }}
      transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
      className="relative h-[26px] w-[124px] shrink-0 rounded-full border"
    >
      <motion.span
        initial={false}
        animate={{ opacity: reengaged ? 0 : 1 }}
        transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
        className="absolute inset-0 flex items-center justify-center gap-1.5 text-[9.5px] font-semibold"
        style={{ color: "#A2695F" }}
      >
        <span className="h-[5px] w-[5px] rounded-full" style={{ backgroundColor: ROSE }} />
        Quiet · 4 days
      </motion.span>
      <motion.span
        initial={false}
        animate={{ opacity: reengaged ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
        className="absolute inset-0 flex items-center justify-center gap-1.5 text-[9.5px] font-semibold"
        style={{ color: "#66744E" }}
      >
        <span className="h-[5px] w-[5px] rounded-full" style={{ backgroundColor: SAGE }} />
        Re-engaged
      </motion.span>
    </motion.div>
  );
}

function ActionBar({ phase, reduced, overlay }: { phase: number; reduced: boolean; overlay: boolean }) {
  const visible = phase >= PH.DECIDE && phase < PH.TYPING;
  const sending = phase >= PH.SEND && phase < PH.RESET;
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : reduced ? 0 : 14 }}
      transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
      className={`${overlay ? "absolute inset-x-4 bottom-2.5 z-20" : "absolute inset-0"} flex items-center gap-2.5 rounded-[12px] border border-[#E7DBC4] bg-[#FFFDF6] px-3 py-2 shadow-[0_18px_44px_rgba(50,36,20,.16)] sm:gap-3 sm:px-3.5 sm:py-2.5`}
    >
      <span className="hidden items-center gap-1.5 text-[7.5px] font-medium uppercase tracking-[0.14em] min-[430px]:flex" style={{ fontFamily: MONO, color: AMBER }}>
        <span className="h-[5px] w-[5px] rounded-full" style={{ backgroundColor: AMBER }} />
        Best next action
      </span>
      <span
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-semibold"
        style={{ backgroundColor: "rgba(210,154,67,.18)", color: INK, border: "1px solid rgba(210,154,67,.45)" }}
      >
        Follow up now
        <Check size={11} strokeWidth={2.8} color="#A0742B" />
      </span>
      <motion.span
        initial={false}
        animate={{ opacity: visible ? 0.3 : 0 }}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : visible ? 0.55 : 0, ease: EASE }}
        className="text-[11px] font-medium line-through decoration-[#241B12]/35"
        style={{ color: INK }}
      >
        Wait
      </motion.span>
      <span className="ml-auto text-[7.5px] font-medium uppercase tracking-[0.13em]" style={{ fontFamily: MONO, color: sending ? "#66744E" : FAINT }}>
        {sending ? "Sent" : "Ready"}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Conversation thread (the hero product surface)                      */
/* ------------------------------------------------------------------ */
function Thread({ phase, reduced, compact }: { phase: number; reduced: boolean; compact: boolean }) {
  const on = (from: number) => phase >= from && phase < PH.RESET;
  const sent = on(PH.SEND);
  const typing = phase === PH.TYPING;
  const replied = on(PH.REPLY);
  const bubble = compact ? "text-[12px]" : "text-[12.5px]";

  return (
    <div className={`relative flex-1 space-y-3 overflow-hidden px-4 pb-12 pt-4 sm:px-5 ${compact ? "" : ""}`}>
      <div className="text-center text-[8px] font-medium uppercase tracking-[0.18em]" style={{ fontFamily: MONO, color: "#B4A78F" }}>
        Tuesday
      </div>

      {/* history: enquiry */}
      <div className="flex items-end gap-2">
        <SarahFace size={20} />
        <div className={`max-w-[78%] rounded-[14px] rounded-bl-[4px] bg-[#F0E8D8] px-3 py-2 leading-[1.5] ${bubble}`} style={{ color: INK }}>
          Hi! I'd love a quote for our bathroom reno. We're hoping to start in March.
        </div>
      </div>

      {/* system event */}
      <div className="flex items-center gap-1.5 pl-7 text-[8px] font-medium uppercase tracking-[0.13em]" style={{ fontFamily: MONO, color: FAINT }}>
        <Phone size={9} color={CORAL} strokeWidth={2.4} />
        Call answered · AI Voice · 9:14 AM
      </div>

      {/* history: outgoing */}
      <div className="flex justify-end">
        <div className={`max-w-[78%] rounded-[14px] rounded-br-[4px] bg-[#2E251D] px-3 py-2 leading-[1.5] ${bubble}`} style={{ color: IVORY }}>
          Thanks Sarah, lovely chatting today. Your quote is on its way.
        </div>
      </div>

      {/* quote attachment */}
      <div className="flex justify-end">
        <div className="flex items-center gap-2.5 rounded-[12px] border border-[#E7DCC7] bg-[#FDFAF2] px-3 py-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px]" style={{ backgroundColor: "rgba(192,119,111,.14)" }}>
            <FileText size={12} color={ROSE} strokeWidth={2.2} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[11px] font-semibold" style={{ color: INK }}>
              Quote #1284 · Bathroom renovation
            </span>
            <span className="block text-[9px]" style={{ color: FAINT }}>
              Sent Wednesday
            </span>
          </span>
          <span className="ml-1 text-[12px] font-bold" style={{ color: INK }}>
            $18,000
          </span>
        </div>
      </div>

      {/* silence divider */}
      <div className="flex items-center gap-3 py-0.5">
        <span className="h-px flex-1 bg-[#E3D5BE]" />
        <span className="text-[8px] font-medium uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: "#B5766D" }}>
          4 days · no reply
        </span>
        <span className="h-px flex-1 bg-[#E3D5BE]" />
      </div>

      {/* AI follow-up lands in the same thread */}
      <motion.div
        initial={false}
        animate={{ opacity: sent ? 1 : 0, y: sent ? 0 : reduced ? 0 : 10 }}
        transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
        className="flex flex-col items-end"
      >
        <div
          className={`max-w-[80%] rounded-[14px] rounded-br-[4px] border px-3 py-2 leading-[1.5] ${bubble}`}
          style={{ backgroundColor: "rgba(210,154,67,.15)", borderColor: "rgba(210,154,67,.4)", color: INK }}
        >
          Hi Sarah, just checking in on your bathroom reno quote. Happy to answer any questions, or we can lock in a start date.
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-[7.5px] font-medium uppercase tracking-[0.13em]" style={{ fontFamily: MONO, color: FAINT }}>
          Zapla AI · Follow-up · 4:02 PM
          <Check size={9} color={AMBER} strokeWidth={2.8} />
        </div>
      </motion.div>

      {/* reply slot: typing resolves into Sarah's reply */}
      <div className={`relative ${compact ? "h-[72px]" : "h-[66px]"}`}>
        <motion.div
          initial={false}
          animate={{ opacity: typing ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
          className="absolute left-0 top-1 flex items-end gap-2"
        >
          <SarahFace size={20} />
          <span className="flex items-center gap-1 rounded-[14px] rounded-bl-[4px] bg-[#F0E8D8] px-3 py-2.5">
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                initial={false}
                animate={typing && !reduced ? { opacity: [0.25, 0.9, 0.25] } : { opacity: 0.4 }}
                transition={typing && !reduced ? { duration: 1, repeat: Infinity, delay: d * 0.18 } : { duration: 0 }}
                className="h-[5px] w-[5px] rounded-full bg-[#8A7E6E]"
              />
            ))}
          </span>
        </motion.div>
        <motion.div
          initial={false}
          animate={{ opacity: replied ? 1 : 0, y: replied ? 0 : reduced ? 0 : 8 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
          className="absolute left-0 top-0 flex items-end gap-2"
        >
          <SarahFace size={20} />
          <div className="min-w-0">
            <div className={`max-w-full rounded-[14px] rounded-bl-[4px] bg-[#F0E8D8] px-3 py-2 leading-[1.5] ${bubble}`} style={{ color: INK }}>
              Sorry for the quiet week! Yes please, can we book Thursday?
            </div>
            <div className="mt-1 text-[7.5px] font-medium uppercase tracking-[0.13em]" style={{ fontFamily: MONO, color: FAINT }}>
              Sarah · 4:09 PM
            </div>
          </div>
        </motion.div>
      </div>

      {/* in-product AI action bar (desktop overlays above the composer) */}
      {!compact && <ActionBar phase={phase} reduced={reduced} overlay />}
    </div>
  );
}

function SurfaceHeader({ phase, reduced }: { phase: number; reduced: boolean }) {
  const reengaged = phase >= PH.STATUS && phase < PH.RESET;
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#EADFCC] px-4 py-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-2.5">
        <SarahFace size={34} />
        <div className="min-w-0">
          <div className="truncate text-[13px] font-bold tracking-tight" style={{ color: INK }}>
            Sarah Nguyen
          </div>
          <div className="truncate text-[9.5px] font-medium" style={{ color: FAINT }}>
            Bathroom reno · Quote $18,000
          </div>
        </div>
      </div>
      <StatusChip reengaged={reengaged} reduced={reduced} />
    </div>
  );
}

function Composer() {
  return (
    <div className="flex items-center gap-2.5 border-t border-[#EADFCC] px-4 py-2.5 sm:px-5">
      <div className="flex h-9 flex-1 items-center rounded-full bg-[#F1EADB] px-4 text-[11px]" style={{ color: "#AFA28B" }}>
        Message Sarah…
      </div>
      <Mic size={14} color="#B4A78F" strokeWidth={2} />
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2E251D]">
        <Send size={12} color={IVORY} strokeWidth={2.2} />
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Context sidecar attached to the product (desktop)                   */
/* ------------------------------------------------------------------ */
function Sidecar({ phase, reduced }: { phase: number; reduced: boolean }) {
  const expanded = phase >= PH.CONDENSE && phase < PH.RESET;
  const summarised = phase >= PH.SUMMARY && phase < PH.RESET;
  return (
    <motion.div
      initial={false}
      animate={{ width: expanded ? 236 : 56 }}
      transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
      className="relative shrink-0 overflow-hidden border-l border-[#EADFCC] bg-[#F5EEDF]"
    >
      {/* collapsed: quiet icon rail */}
      <motion.div
        initial={false}
        animate={{ opacity: expanded ? 0 : 1 }}
        transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
        className="absolute inset-y-0 left-0 flex w-[56px] flex-col items-center gap-4 pt-5"
      >
        <span className="text-[7px] font-medium uppercase tracking-[0.1em]" style={{ fontFamily: MONO, color: "#B4A78F" }}>
          CTX
        </span>
        {CONTEXT_ROWS.map((row) => {
          const Icon = row.icon;
          return (
            <span key={row.text} className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-white/55">
              <Icon size={13} color="#C4B69C" strokeWidth={2} />
            </span>
          );
        })}
      </motion.div>

      {/* expanded: condensed context + understanding */}
      <motion.div
        initial={false}
        animate={{ opacity: expanded ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : expanded ? 0.2 : 0, ease: EASE }}
        className="absolute inset-y-0 left-0 w-[236px] px-4 pt-5"
      >
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-medium uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: FAINT }}>
            Context
          </span>
          <span className="text-[8px] font-medium uppercase tracking-[0.12em]" style={{ fontFamily: MONO, color: AMBER }}>
            4 signals
          </span>
        </div>
        <div className="mt-3 space-y-2">
          {CONTEXT_ROWS.map((row, index) => {
            const Icon = row.icon;
            return (
              <motion.div
                key={row.text}
                initial={false}
                animate={{ opacity: expanded ? 1 : 0, x: expanded ? 0 : reduced ? 0 : 10 }}
                transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : expanded ? 0.25 + index * 0.1 : 0, ease: EASE }}
                className="flex items-center gap-2.5 rounded-[10px] bg-white/60 px-2.5 py-2"
              >
                <Icon size={12} color={row.accent} strokeWidth={2.2} />
                <span className="truncate text-[10.5px] font-semibold" style={{ color: "#4A4032" }}>
                  {row.text}
                </span>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-4 border-t border-[#E4D8C1] pt-4">
          <span className="text-[8px] font-medium uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: FAINT }}>
            Understanding
          </span>
          <motion.p
            initial={false}
            animate={{ opacity: summarised ? 1 : 0, y: summarised ? 0 : reduced ? 0 : 8 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
            className="mt-2 text-[11px] leading-[1.55] font-medium"
            style={{ color: "#4A4032" }}
          >
            Warm lead, stalled after the quote. A friendly follow-up is due.
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Floating history fragments (desktop)                                */
/* ------------------------------------------------------------------ */
function FragmentCard({ frag, index, phase, reduced }: { frag: Fragment; index: number; phase: number; reduced: boolean }) {
  const Icon = frag.icon;
  const docked = phase >= PH.F1 + index && phase < PH.CONDENSE;
  const condensed = phase >= PH.CONDENSE && phase < PH.RESET;
  const target = condensed
    ? { x: frag.dx, y: frag.dy, scale: 0.4, opacity: 0, rotate: 0 }
    : docked
      ? { x: 0, y: 0, scale: 1, opacity: 1, rotate: frag.rotate }
      : { x: frag.enterX, y: 18, scale: 0.95, opacity: 0, rotate: frag.rotate * 1.8 };
  return (
    <motion.div
      initial={false}
      animate={target}
      transition={{ duration: reduced ? 0 : condensed ? 0.75 : 0.6, delay: reduced ? 0 : condensed ? index * 0.07 : 0, ease: EASE }}
      className="absolute z-20 rounded-[16px] border border-[#E7DCC7] bg-[#FDFAF2] px-4 py-3.5 shadow-[0_30px_70px_rgba(8,5,2,.5)]"
      style={{ ...frag.pos, width: frag.w }}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px]" style={{ backgroundColor: `${frag.accent}21` }}>
          <Icon size={14} color={frag.accent} strokeWidth={2.2} />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[7.5px] font-medium uppercase tracking-[0.14em]" style={{ fontFamily: MONO, color: FAINT }}>
            {frag.eyebrow}
          </span>
          <span className="mt-0.5 block truncate text-[13px] font-semibold" style={{ color: INK }}>
            {frag.title}
          </span>
        </span>
      </div>
      {frag.detail && (
        <div className="mt-2.5 rounded-[8px] bg-[#F1EADB] px-2.5 py-1.5 text-[10.5px] leading-[1.45]" style={{ color: "#5C5142" }}>
          {frag.detail}
        </div>
      )}
      <div className="mt-2 text-[9.5px]" style={{ color: FAINT }}>
        {frag.meta}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile: fragments fan + context strip                               */
/* ------------------------------------------------------------------ */
function MobileFragments({ phase, reduced }: { phase: number; reduced: boolean }) {
  const open = phase >= PH.F1 && phase < PH.CONDENSE;
  return (
    <motion.div
      initial={false}
      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0, marginBottom: open ? 12 : 0 }}
      transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
      className="overflow-hidden"
    >
      <div className="grid grid-cols-2 gap-2">
        {FRAGMENTS.map((frag, index) => {
          const Icon = frag.icon;
          const visible = phase >= PH.F1 + index && phase < PH.CONDENSE;
          return (
            <motion.div
              key={frag.title}
              initial={false}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : reduced ? 0 : 10 }}
              transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
              className="flex items-center gap-2 rounded-[12px] border border-[#E7DCC7] bg-[#FDFAF2] px-2.5 py-2.5"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px]" style={{ backgroundColor: `${frag.accent}21` }}>
                <Icon size={12} color={frag.accent} strokeWidth={2.2} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[6.5px] font-medium uppercase tracking-[0.12em]" style={{ fontFamily: MONO, color: FAINT }}>
                  {frag.eyebrow}
                </span>
                <span className="block truncate text-[10.5px] font-semibold" style={{ color: INK }}>
                  {frag.title}
                </span>
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function MobileContextStrip({ phase, reduced }: { phase: number; reduced: boolean }) {
  const condensed = phase >= PH.CONDENSE && phase < PH.RESET;
  const summarised = phase >= PH.SUMMARY && phase < PH.RESET;
  return (
    <div className="border-b border-[#EADFCC] bg-[#F5EEDF] px-4 py-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[7.5px] font-medium uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: FAINT }}>
          Context
        </span>
        <span className="text-[7.5px] font-medium uppercase tracking-[0.12em]" style={{ fontFamily: MONO, color: condensed ? AMBER : "#B4A78F" }}>
          {condensed ? "4 signals" : "Listening"}
        </span>
      </div>
      <div className="mt-1.5 flex min-h-[20px] flex-wrap gap-1.5">
        {MOBILE_CHIPS.map((chip, index) => (
          <motion.span
            key={chip}
            initial={false}
            animate={{ opacity: condensed ? 1 : 0, y: condensed ? 0 : reduced ? 0 : 5 }}
            transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : condensed ? index * 0.08 : 0, ease: EASE }}
            className="rounded-full bg-white/70 px-2 py-0.5 text-[8.5px] font-semibold"
            style={{ color: "#4A4032" }}
          >
            {chip}
          </motion.span>
        ))}
      </div>
      <motion.div
        initial={false}
        animate={{ height: summarised ? "auto" : 0, opacity: summarised ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
        className="overflow-hidden"
      >
        <p className="pt-1.5 text-[10px] font-medium leading-[1.5]" style={{ color: "#4A4032" }}>
          Warm lead, stalled after the quote. A friendly follow-up is due.
        </p>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export function ZaplaAIConversationsV6() {
  const reduced = !!useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { amount: 0.2 });
  const phase = useStoryLoop(inView, reduced);
  const [manualRole, setManualRole] = useState<string | null>(null);

  const railIndex = phase <= PH.IDLE ? 0 : phase <= PH.CONDENSE ? 1 : phase <= PH.DECIDE ? 2 : phase < PH.RESET ? 3 : 0;
  const autoRole = phase <= PH.DOCKED ? "voice" : phase <= PH.DECIDE ? "agent" : "employee";
  const activeRole = manualRole ?? autoRole;
  const activeDesc = ROLES.find((role) => role.id === activeRole)?.desc ?? "";

  return (
    <section className="relative overflow-hidden bg-[#221A14] px-5 py-24 text-[#F4EDE2] sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-[180px] h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(210,154,67,.09),rgba(206,122,90,.05)_45%,transparent_70%)] blur-2xl" />
      <div className="relative mx-auto max-w-[1440px]">
        {/* header */}
        <div className="grid gap-8 lg:grid-cols-[1fr_.6fr] lg:items-end lg:gap-20">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ fontFamily: MONO, color: AMBER }}>
              Zapla AI
            </div>
            <h2 className="mt-5 max-w-[760px] text-[40px] leading-[0.95] tracking-[-0.05em] sm:text-[54px] lg:text-[62px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
              Turn every conversation
              <span className="block text-[#8F8375]">into the next action.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.08, ease: EASE }}
            className="lg:pb-2"
          >
            <p className="max-w-[520px] text-[15px] leading-[1.7] text-[#F4EDE2]/55 sm:text-[16px]">
              Zapla answers calls and messages, understands what’s already happened, then follows up, books, updates your CRM and keeps opportunities moving.
            </p>
          </motion.div>
        </div>

        {/* story steps + role selector, docked to the scene */}
        <div className="mt-12 flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {RAIL.map((step, index) => (
              <span
                key={step}
                className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.18em] transition-colors duration-500"
                style={{ fontFamily: MONO, color: index === railIndex ? IVORY : "rgba(244,237,226,.28)" }}
              >
                <span className="h-[4px] w-[4px] rounded-full transition-colors duration-500" style={{ backgroundColor: index === railIndex ? AMBER : "rgba(244,237,226,.18)" }} />
                {step}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2 lg:items-end">
            <div className="flex flex-wrap items-center gap-1.5">
              {ROLES.map((role) => {
                const active = role.id === activeRole;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setManualRole((prev) => (prev === role.id ? null : role.id))}
                    className="rounded-full border px-3.5 py-1.5 text-[10.5px] font-semibold transition-colors duration-300"
                    style={{
                      borderColor: active ? "rgba(210,154,67,.55)" : "rgba(255,255,255,.12)",
                      color: active ? IVORY : "rgba(244,237,226,.45)",
                      backgroundColor: active ? "rgba(210,154,67,.08)" : "transparent",
                    }}
                  >
                    {role.label}
                  </button>
                );
              })}
            </div>
            <div className="flex h-[16px] items-center text-[10.5px] text-[#F4EDE2]/45 lg:justify-end">
              <motion.span key={activeRole} initial={reduced ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}>
                {activeDesc}
              </motion.span>
            </div>
          </div>
        </div>

        {/* stage */}
        <div ref={stageRef}>
          {/* desktop: fragments dock around one centred conversation surface */}
          <div className="relative mx-auto mt-8 hidden h-[672px] max-w-[1240px] xl:block">
            {FRAGMENTS.map((frag, index) => (
              <FragmentCard key={frag.title} frag={frag} index={index} phase={phase} reduced={reduced} />
            ))}
            <div className="absolute left-1/2 top-[34px] z-10 flex h-[604px] -translate-x-1/2 overflow-hidden rounded-[22px] border border-[#E7DCC7] bg-[#FBF7EE] shadow-[0_60px_140px_rgba(8,5,2,.55)]">
              <div className="flex w-[620px] flex-col">
                <SurfaceHeader phase={phase} reduced={reduced} />
                <Thread phase={phase} reduced={reduced} compact={false} />
                <Composer />
              </div>
              <Sidecar phase={phase} reduced={reduced} />
            </div>
          </div>

          {/* mobile / tablet: recomposed around the same conversation */}
          <div className="mx-auto mt-8 max-w-[560px] xl:hidden">
            <MobileFragments phase={phase} reduced={reduced} />
            <div className="overflow-hidden rounded-[18px] border border-[#E7DCC7] bg-[#FBF7EE] shadow-[0_40px_100px_rgba(8,5,2,.5)]">
              <SurfaceHeader phase={phase} reduced={reduced} />
              <MobileContextStrip phase={phase} reduced={reduced} />
              <Thread phase={phase} reduced={reduced} compact />
              <div className="relative mx-4 mb-2.5 h-[42px]">
                <ActionBar phase={phase} reduced={reduced} overlay={false} />
              </div>
              <Composer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
