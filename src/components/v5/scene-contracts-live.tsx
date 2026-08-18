import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Eye, FileSignature, Send } from "lucide-react";
import { FACE } from "./faces";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

type ContractStatus = "Draft" | "Sent" | "Signed";

function beatFor(elapsedMs: number, reduced: boolean) {
  if (reduced) return 6;
  if (elapsedMs < 650) return 0;
  if (elapsedMs < 1250) return 1;
  if (elapsedMs < 2100) return 2;
  if (elapsedMs < 2950) return 3;
  if (elapsedMs < 3800) return 4;
  if (elapsedMs < 5050) return 5;
  return 6;
}

function statusForBeat(beat: number): ContractStatus {
  if (beat < 2) return "Draft";
  if (beat < 6) return "Sent";
  return "Signed";
}

function StatusPill({ status }: { status: ContractStatus }) {
  const cls =
    status === "Signed"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : status === "Sent"
        ? "border-blue-200 bg-blue-50 text-blue-700"
        : "border-slate-200 bg-slate-50 text-slate-500";

  return (
    <motion.span
      key={status}
      initial={{ opacity: 0, y: 4, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[7px] font-black ${cls}`}
    >
      {status === "Signed" ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
      {status === "Sent" ? <Send className="h-3 w-3" /> : null}
      {status}
    </motion.span>
  );
}

function Signature({ draw, signed }: { draw: boolean; signed: boolean }) {
  return (
    <div
      className={
        signed
          ? "relative overflow-hidden rounded-[14px] border border-emerald-200 bg-emerald-50/55 px-4 py-3.5"
          : "relative overflow-hidden rounded-[14px] border border-dashed border-slate-300 bg-white px-4 py-3.5"
      }
    >
      <div className="text-[6.2px] font-black uppercase tracking-[.12em] text-slate-400">Client signature</div>

      <div className="relative mt-2 h-[48px]">
        <div className="absolute inset-x-0 bottom-2 h-px bg-slate-200" />
        <svg viewBox="0 0 260 58" className="absolute inset-0 h-full w-full">
          <motion.path
            d="M10 42 C34 8, 52 50, 76 24 C96 4, 110 49, 136 27 C157 9, 178 45, 205 23 C220 13, 237 27, 250 14"
            fill="none"
            stroke="#0f172a"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: draw ? 1 : 0, opacity: draw ? 1 : 0 }}
            transition={{ duration: draw ? 1.05 : 0, ease: [0.35, 0, 0.2, 1] }}
          />
        </svg>
      </div>

      <AnimatePresence>
        {signed ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.12 }}
            className="mt-1 flex items-center gap-1.5 text-[6.4px] font-black text-emerald-700"
          >
            <Check className="h-3 w-3" strokeWidth={3} /> Signed by Tom Bennett
          </motion.div>
        ) : (
          <div className="mt-1 text-[6px] font-semibold text-slate-300">Awaiting signature</div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContractDocument({ beat }: { beat: number }) {
  const status = statusForBeat(beat);
  const zoomToSignature = beat === 4 || beat === 5;
  const drawSignature = beat >= 5;
  const signed = beat >= 6;

  return (
    <motion.div
      className="absolute left-1/2 top-[52%] h-[82%] w-[76%] max-w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_28px_72px_-42px_rgba(15,23,42,.42)]"
      style={{ transformOrigin: "50% 78%" }}
      animate={{
        scale: zoomToSignature ? 1.32 : 1,
        y: zoomToSignature ? -86 : 0,
        boxShadow: zoomToSignature
          ? "0 42px 84px -38px rgba(15,23,42,.48)"
          : "0 28px 72px -42px rgba(15,23,42,.42)",
      }}
      transition={{ duration: 0.72, ease: [0.18, 0.78, 0.2, 1] }}
    >
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
        <div>
          <div className="text-[7px] font-black uppercase tracking-[.15em] text-blue-600">Service Agreement</div>
          <div className="mt-1.5 text-[17px] font-black tracking-tight text-slate-900">Bennett Landscapes</div>
          <div className="mt-1 text-[6.8px] font-semibold text-slate-400">Landscape design & installation · Agreement #ZA-2048</div>
        </div>
        <StatusPill status={status} />
      </div>

      <div className="px-6 py-5">
        <div className="grid grid-cols-3 gap-2.5">
          {[
            ["Client", "Tom Bennett"],
            ["Project value", "$8,400"],
            ["Valid until", "28 Aug 2026"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[11px] border border-slate-100 bg-slate-50/70 px-3 py-2.5">
              <div className="text-[5.4px] font-black uppercase tracking-[.1em] text-slate-400">{label}</div>
              <div className="mt-1 text-[7.3px] font-black text-slate-700">{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <div className="text-[7px] font-black text-slate-800">Scope of works</div>
          <div className="mt-2 space-y-1.5">
            <div className="h-1.5 w-[96%] rounded-full bg-slate-100" />
            <div className="h-1.5 w-[88%] rounded-full bg-slate-100" />
            <div className="h-1.5 w-[72%] rounded-full bg-slate-100" />
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-[12px] border border-slate-200">
          <div className="grid grid-cols-[1fr_90px] border-b border-slate-100 px-3.5 py-2.5 text-[6.2px] font-bold text-slate-500">
            <span>Landscape design & planning</span><span className="text-right">$2,400</span>
          </div>
          <div className="grid grid-cols-[1fr_90px] border-b border-slate-100 px-3.5 py-2.5 text-[6.2px] font-bold text-slate-500">
            <span>Installation & project delivery</span><span className="text-right">$6,000</span>
          </div>
          <div className="grid grid-cols-[1fr_90px] bg-slate-50 px-3.5 py-2.5 text-[7px] font-black text-slate-800">
            <span>Total</span><span className="text-right">$8,400</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-[0.7fr_1.3fr] gap-3">
          <div className="rounded-[12px] border border-slate-200 bg-slate-50/60 px-3.5 py-3">
            <div className="text-[5.6px] font-black uppercase tracking-[.1em] text-slate-400">Prepared by</div>
            <div className="mt-1.5 text-[7px] font-black text-slate-700">Zapla Demo Business</div>
          </div>
          <Signature draw={drawSignature} signed={signed} />
        </div>
      </div>
    </motion.div>
  );
}

function ViewedMoment({ beat, reduced }: { beat: number; reduced: boolean }) {
  const show = beat === 3;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="absolute right-[8%] top-[16%] z-30 flex items-center gap-2.5 rounded-[14px] border border-slate-200 bg-white px-3.5 py-2.5 shadow-[0_18px_40px_-26px_rgba(15,23,42,.42)]"
          initial={reduced ? false : { opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 10, scale: 0.98 }}
          transition={{ duration: reduced ? 0 : 0.34, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <img src={FACE.tom} alt="" className="h-8 w-8 rounded-full object-cover ring-1 ring-slate-100" />
          <div>
            <div className="flex items-center gap-1.5 text-[8px] font-black text-slate-800"><Eye className="h-3 w-3 text-violet-500" /> Tom viewed</div>
            <div className="mt-0.5 text-[6px] font-semibold text-slate-400">Bennett Landscapes · just now</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function FinalConfirmation({ beat, reduced }: { beat: number; reduced: boolean }) {
  const show = beat >= 6;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="absolute bottom-[5%] left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5 rounded-[14px] border border-emerald-200 bg-white px-4 py-3 shadow-[0_22px_52px_-30px_rgba(16,185,129,.42)]"
          initial={reduced ? false : { opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduced ? 0 : 0.36, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white"><Check className="h-4 w-4" strokeWidth={3} /></span>
          <div>
            <div className="text-[8.5px] font-black text-slate-900">Agreement signed</div>
            <div className="mt-0.5 text-[6.4px] font-semibold text-slate-400">Signed copy saved automatically</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function SceneContractsLive({ elapsedMs, reduced }: SceneProps) {
  const beat = beatFor(elapsedMs, reduced);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const sendRef = useRef<HTMLButtonElement | null>(null);
  const [point, setPoint] = useState<CursorPoint>(null);

  useEffect(() => {
    if (reduced || beat !== 1) {
      setPoint(null);
      return;
    }

    const measure = () => {
      const root = rootRef.current;
      const button = sendRef.current;
      if (!root || !button) return;
      const r = root.getBoundingClientRect();
      const b = button.getBoundingClientRect();
      setPoint({ x: b.left - r.left + b.width * 0.52, y: b.top - r.top + b.height * 0.55 });
    };

    const raf = requestAnimationFrame(() => requestAnimationFrame(measure));
    const timeout = window.setTimeout(measure, 80);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.removeEventListener("resize", measure);
    };
  }, [beat, reduced]);

  const status = statusForBeat(beat);
  const sent = beat >= 2;

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-[#f7f8fb]">
      <div className="absolute inset-x-0 top-0 z-20 flex h-[54px] items-center border-b border-slate-200 bg-white px-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-blue-50 text-blue-600"><FileSignature className="h-4 w-4" /></span>
          <div>
            <div className="text-[10px] font-black text-slate-900">Bennett Landscapes</div>
            <div className="mt-0.5 text-[6px] font-semibold text-slate-400">Service Agreement · $8,400</div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <StatusPill status={status} />
          <motion.button
            ref={sendRef}
            type="button"
            className={
              sent
                ? "flex items-center gap-1.5 rounded-[10px] border border-slate-200 bg-white px-3.5 py-2 text-[7px] font-black text-slate-400"
                : "flex items-center gap-1.5 rounded-[10px] bg-blue-600 px-3.5 py-2 text-[7px] font-black text-white shadow-[0_10px_22px_-12px_rgba(37,99,235,.75)]"
            }
            animate={{ scale: beat === 1 ? 0.965 : 1 }}
            transition={{ duration: 0.16 }}
          >
            {sent ? <Check className="h-3.5 w-3.5" /> : <Send className="h-3.5 w-3.5" />}
            {sent ? "Sent" : "Send for signature"}
          </motion.button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-[54px]">
        <ContractDocument beat={beat} />
      </div>

      <ViewedMoment beat={beat} reduced={reduced} />
      <FinalConfirmation beat={beat} reduced={reduced} />
      <ZaplaDemoCursor point={point} press={beat === 1} reduced={reduced} />
    </div>
  );
}
