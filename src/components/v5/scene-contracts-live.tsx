import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Check, FileSignature, Send } from "lucide-react";
import { FACE } from "./faces";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

type Stage = "Draft" | "Sent" | "Signing" | "Complete";

type Signer = {
  name: string;
  role: string;
  face: string;
};

const SIGNERS: Signer[] = [
  { name: "Maya Chen", role: "Project lead", face: FACE.maya },
  { name: "Daniel Wu", role: "Approver", face: FACE.daniel },
  { name: "Tom Bennett", role: "Client", face: FACE.tom },
];

function beatFor(elapsedMs: number, reduced: boolean) {
  if (reduced) return 6;
  if (elapsedMs < 600) return 0;
  if (elapsedMs < 1200) return 1;
  if (elapsedMs < 1900) return 2;
  if (elapsedMs < 2850) return 3;
  if (elapsedMs < 3800) return 4;
  if (elapsedMs < 4900) return 5;
  return 6;
}

function stageForBeat(beat: number): Stage {
  if (beat < 2) return "Draft";
  if (beat === 2) return "Sent";
  if (beat < 6) return "Signing";
  return "Complete";
}

function signedCountForBeat(beat: number) {
  if (beat < 3) return 0;
  if (beat === 3) return 1;
  if (beat === 4) return 2;
  return 3;
}

function StageBar({ beat }: { beat: number }) {
  const stage = stageForBeat(beat);
  const stages: Stage[] = ["Draft", "Sent", "Signing", "Complete"];
  const activeIndex = stages.indexOf(stage);

  return (
    <div className="flex items-center gap-2.5">
      {stages.map((item, index) => {
        const done = index < activeIndex || stage === "Complete";
        const active = index === activeIndex;

        return (
          <div key={item} className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <motion.span
                className={
                  done || active
                    ? "flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white"
                    : "flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-300"
                }
                animate={{ scale: active ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.35 }}
              >
                {done ? <Check className="h-3 w-3" strokeWidth={3} /> : <span className="text-[5.5px] font-black">{index + 1}</span>}
              </motion.span>
              <span className={done || active ? "text-[6.4px] font-black text-slate-700" : "text-[6.4px] font-bold text-slate-300"}>
                {item}
              </span>
            </div>
            {index < stages.length - 1 ? (
              <motion.span
                className="h-px w-7 origin-left bg-slate-200"
                animate={{ backgroundColor: index < activeIndex ? "#60a5fa" : "#e2e8f0" }}
                transition={{ duration: 0.35 }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function SignerSequence({ beat }: { beat: number }) {
  const signedCount = signedCountForBeat(beat);
  const activeSigner = beat >= 3 && beat <= 5 ? beat - 3 : -1;

  return (
    <div className="flex items-center gap-1.5">
      <span className="mr-1 text-[5.8px] font-black uppercase tracking-[.1em] text-slate-400">Signing order</span>
      {SIGNERS.map((signer, index) => {
        const signed = index < signedCount;
        const active = index === activeSigner;

        return (
          <div key={signer.name} className="flex items-center">
            <motion.div
              className={
                signed
                  ? "relative flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 py-1 pl-1 pr-2"
                  : active
                    ? "relative flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 py-1 pl-1 pr-2"
                    : "relative flex items-center gap-1.5 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-2"
              }
              animate={{ scale: active ? [1, 1.045, 1] : 1 }}
              transition={{ duration: 0.48 }}
            >
              <div className="relative">
                <img src={signer.face} alt="" className="h-6 w-6 rounded-full object-cover ring-1 ring-white" />
                {signed ? (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.55 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white"
                  >
                    <Check className="h-2 w-2" strokeWidth={3} />
                  </motion.span>
                ) : null}
              </div>
              <div className="max-w-[58px]">
                <div className="truncate text-[5.9px] font-black text-slate-700">{signer.name.split(" ")[0]}</div>
                <div className="truncate text-[4.9px] font-semibold text-slate-400">{signed ? "Signed" : active ? "Signing…" : "Waiting"}</div>
              </div>
            </motion.div>
            {index < SIGNERS.length - 1 ? (
              <motion.div
                className="mx-1 h-px w-4 origin-left bg-slate-200"
                animate={{ backgroundColor: index < signedCount ? "#34d399" : "#e2e8f0" }}
                transition={{ duration: 0.3 }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function SignatureStroke({ signerIndex, beat }: { signerIndex: number; beat: number }) {
  const activeBeat = signerIndex + 3;
  const draw = beat >= activeBeat;

  const paths = [
    "M8 30 C24 7, 36 35, 52 19 C67 5, 78 34, 98 20 C112 10, 130 29, 151 13",
    "M8 30 C22 13, 35 29, 49 17 C64 4, 74 35, 94 19 C111 5, 126 31, 151 14",
    "M8 29 C27 4, 39 35, 57 17 C71 6, 82 31, 101 19 C118 7, 133 28, 152 11",
  ];

  return (
    <svg viewBox="0 0 160 40" className="h-8 w-full">
      <motion.path
        d={paths[signerIndex]}
        fill="none"
        stroke="#0f172a"
        strokeWidth="2.4"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: draw ? 1 : 0, opacity: draw ? 1 : 0 }}
        transition={{ duration: draw ? 0.82 : 0, ease: [0.35, 0, 0.2, 1] }}
      />
    </svg>
  );
}

function SignatureBox({ signer, index, beat }: { signer: Signer; index: number; beat: number }) {
  const signedCount = signedCountForBeat(beat);
  const signed = index < signedCount;
  const active = beat >= 3 && beat <= 5 && index === beat - 3;

  return (
    <motion.div
      className={
        signed
          ? "relative overflow-hidden rounded-[12px] border border-emerald-200 bg-emerald-50/45 px-3 py-2.5"
          : active
            ? "relative overflow-hidden rounded-[12px] border border-blue-200 bg-blue-50/35 px-3 py-2.5"
            : "relative overflow-hidden rounded-[12px] border border-dashed border-slate-300 bg-white px-3 py-2.5"
      }
      animate={{ y: active ? -2 : 0, boxShadow: active ? "0 12px 28px -22px rgba(37,99,235,.55)" : "0 0 0 rgba(0,0,0,0)" }}
      transition={{ duration: 0.28 }}
    >
      <div className="flex items-center gap-1.5">
        <img src={signer.face} alt="" className="h-5 w-5 rounded-full object-cover" />
        <div>
          <div className="text-[5.8px] font-black text-slate-700">{signer.name}</div>
          <div className="text-[4.8px] font-semibold text-slate-400">{signer.role}</div>
        </div>
      </div>

      <div className="relative mt-1.5 h-9">
        <div className="absolute inset-x-0 bottom-1.5 h-px bg-slate-200" />
        <SignatureStroke signerIndex={index} beat={beat} />
      </div>

      <div className={signed ? "flex items-center gap-1 text-[5px] font-black text-emerald-700" : active ? "text-[5px] font-black text-blue-600" : "text-[5px] font-semibold text-slate-300"}>
        {signed ? <><Check className="h-2.5 w-2.5" strokeWidth={3} /> Signed</> : active ? "Signing now…" : "Awaiting signature"}
      </div>
    </motion.div>
  );
}

function ContractDocument({ beat }: { beat: number }) {
  const complete = beat >= 6;

  return (
    <motion.div
      className="h-full w-full overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_24px_54px_-38px_rgba(15,23,42,.38)]"
      animate={{ borderColor: complete ? "#a7f3d0" : "#e2e8f0" }}
      transition={{ duration: 0.38 }}
    >
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
        <div>
          <div className="text-[6.5px] font-black uppercase tracking-[.14em] text-blue-600">Service Agreement</div>
          <div className="mt-1 text-[14px] font-black tracking-tight text-slate-900">Bennett Landscapes</div>
          <div className="mt-1 text-[5.9px] font-semibold text-slate-400">Landscape design & installation · Agreement #ZA-2048</div>
        </div>
        <motion.div
          key={complete ? "complete" : "open"}
          initial={{ opacity: 0, y: 4, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className={
            complete
              ? "inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[6.5px] font-black text-emerald-700"
              : "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[6.5px] font-black text-slate-500"
          }
        >
          {complete ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
          {complete ? "Complete" : "Awaiting signatures"}
        </motion.div>
      </div>

      <div className="px-5 py-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            ["Client", "Bennett Landscapes"],
            ["Project value", "$8,400"],
            ["Valid until", "28 Aug 2026"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[10px] border border-slate-100 bg-slate-50/70 px-2.5 py-2">
              <div className="text-[4.9px] font-black uppercase tracking-[.09em] text-slate-400">{label}</div>
              <div className="mt-1 text-[6.5px] font-black text-slate-700">{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-3.5">
          <div className="text-[6.4px] font-black text-slate-800">Scope of works</div>
          <div className="mt-1.5 space-y-1.5">
            <div className="h-1.5 w-[96%] rounded-full bg-slate-100" />
            <div className="h-1.5 w-[88%] rounded-full bg-slate-100" />
            <div className="h-1.5 w-[72%] rounded-full bg-slate-100" />
          </div>
        </div>

        <div className="mt-3.5 overflow-hidden rounded-[11px] border border-slate-200">
          <div className="grid grid-cols-[1fr_80px] border-b border-slate-100 px-3 py-2 text-[5.7px] font-bold text-slate-500">
            <span>Landscape design & planning</span><span className="text-right">$2,400</span>
          </div>
          <div className="grid grid-cols-[1fr_80px] border-b border-slate-100 px-3 py-2 text-[5.7px] font-bold text-slate-500">
            <span>Installation & project delivery</span><span className="text-right">$6,000</span>
          </div>
          <div className="grid grid-cols-[1fr_80px] bg-slate-50 px-3 py-2 text-[6.4px] font-black text-slate-800">
            <span>Total</span><span className="text-right">$8,400</span>
          </div>
        </div>

        <div className="mt-3.5">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-[6.4px] font-black text-slate-800">Required signatures</div>
            <div className={complete ? "text-[5.5px] font-black text-emerald-600" : "text-[5.5px] font-bold text-slate-400"}>
              {signedCountForBeat(beat)}/3 signed
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {SIGNERS.map((signer, index) => (
              <SignatureBox key={signer.name} signer={signer} index={index} beat={beat} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
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

  const stage = stageForBeat(beat);
  const sent = beat >= 2;
  const complete = beat >= 6;

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-[#f7f8fb]">
      <div className="absolute inset-x-0 top-0 z-20 flex h-[58px] items-center border-b border-slate-200 bg-white px-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-blue-50 text-blue-600"><FileSignature className="h-4 w-4" /></span>
          <div>
            <div className="text-[9.5px] font-black text-slate-900">Bennett Landscapes</div>
            <div className="mt-0.5 text-[5.8px] font-semibold text-slate-400">Service Agreement · $8,400</div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <motion.span
            key={stage}
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={
              complete
                ? "inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[6.4px] font-black text-emerald-700"
                : "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[6.4px] font-black text-slate-600"
            }
          >
            {complete ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
            {complete ? "Completed" : stage}
          </motion.span>

          <motion.button
            ref={sendRef}
            type="button"
            className={
              sent
                ? "flex items-center gap-1.5 rounded-[10px] border border-slate-200 bg-white px-3.5 py-2 text-[6.8px] font-black text-slate-400"
                : "flex items-center gap-1.5 rounded-[10px] bg-blue-600 px-3.5 py-2 text-[6.8px] font-black text-white shadow-[0_10px_22px_-12px_rgba(37,99,235,.75)]"
            }
            animate={{ scale: beat === 1 ? 0.965 : 1 }}
            transition={{ duration: 0.16 }}
          >
            {sent ? <Check className="h-3.5 w-3.5" /> : <Send className="h-3.5 w-3.5" />}
            {sent ? "Sent" : "Send for signature"}
          </motion.button>
        </div>
      </div>

      <div className="absolute inset-x-0 top-[58px] z-10 flex h-[48px] items-center justify-between border-b border-slate-200 bg-white/95 px-4">
        <StageBar beat={beat} />
        <SignerSequence beat={beat} />
      </div>

      <div className="absolute inset-x-[5%] bottom-[4%] top-[122px]">
        <ContractDocument beat={beat} />
      </div>

      <ZaplaDemoCursor point={point} press={beat === 1} reduced={reduced} />
    </div>
  );
}
