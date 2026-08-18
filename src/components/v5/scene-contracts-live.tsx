import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BriefcaseBusiness,
  Check,
  Clock3,
  Download,
  Eye,
  FileSignature,
  MoreHorizontal,
  PenLine,
  Send,
  ShieldCheck,
} from "lucide-react";
import { FACE } from "./faces";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

type ContractStatus = "Draft" | "Sent" | "Viewed" | "Signed";

type ContractRow = {
  company: string;
  document: string;
  amount: string;
  status: ContractStatus;
};

const OTHER_CONTRACTS: ContractRow[] = [
  { company: "Eastside Pools", document: "Project proposal", amount: "$12,600", status: "Viewed" },
  { company: "Greenline Gardens", document: "Maintenance agreement", amount: "$3,200", status: "Signed" },
  { company: "Harbour Plumbing", document: "Service agreement", amount: "$5,450", status: "Sent" },
  { company: "North Shore Build", document: "Variation agreement", amount: "$7,900", status: "Draft" },
];

const STATUS_STYLES: Record<ContractStatus, string> = {
  Draft: "border-slate-200 bg-slate-50 text-slate-500",
  Sent: "border-blue-200 bg-blue-50 text-blue-700",
  Viewed: "border-violet-200 bg-violet-50 text-violet-700",
  Signed: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

function beatFor(elapsedMs: number, reduced: boolean) {
  if (reduced) return 7;
  if (elapsedMs < 520) return 0;
  if (elapsedMs < 1120) return 1;
  if (elapsedMs < 1820) return 2;
  if (elapsedMs < 2520) return 3;
  if (elapsedMs < 3320) return 4;
  if (elapsedMs < 4120) return 5;
  if (elapsedMs < 5220) return 6;
  return 7;
}

function statusForBeat(beat: number): ContractStatus {
  if (beat < 2) return "Draft";
  if (beat === 2) return "Sent";
  if (beat < 7) return "Viewed";
  return "Signed";
}

function StatusPill({ status }: { status: ContractStatus }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[6.2px] font-black ${STATUS_STYLES[status]}`}>
      {status === "Sent" ? <Send className="h-2.5 w-2.5" /> : null}
      {status === "Viewed" ? <Eye className="h-2.5 w-2.5" /> : null}
      {status === "Signed" ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : null}
      {status}
    </span>
  );
}

function ContractList({ beat }: { beat: number }) {
  const status = statusForBeat(beat);

  return (
    <div className="h-full w-[31%] shrink-0 border-r border-slate-200 bg-white">
      <div className="flex h-[52px] items-center justify-between border-b border-slate-200 px-3.5">
        <div>
          <div className="text-[10px] font-black text-slate-900">Documents</div>
          <div className="mt-0.5 text-[6px] font-semibold text-slate-400">Agreements & proposals</div>
        </div>
        <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-blue-600 text-white shadow-[0_8px_16px_-10px_rgba(37,99,235,.8)]">
          <FileSignature className="h-3.5 w-3.5" />
        </span>
      </div>

      <div className="flex gap-1.5 border-b border-slate-100 px-3 py-2">
        {["All", "Draft", "Sent", "Signed"].map((item) => (
          <span
            key={item}
            className={
              item === "All"
                ? "rounded-full bg-slate-900 px-2 py-1 text-[5.8px] font-black text-white"
                : "rounded-full bg-slate-50 px-2 py-1 text-[5.8px] font-bold text-slate-400"
            }
          >
            {item}
          </span>
        ))}
      </div>

      <div className="space-y-1.5 p-2.5">
        <motion.div
          className="rounded-[13px] border border-blue-200 bg-blue-50/50 p-2.5 shadow-[0_10px_24px_-20px_rgba(37,99,235,.35)]"
          animate={{ scale: beat === 0 ? 1 : 1.01 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-start gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-white text-blue-600 shadow-sm">
              <FileSignature className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[7.8px] font-black text-slate-900">Bennett Landscapes</div>
              <div className="mt-0.5 truncate text-[6.1px] font-semibold text-slate-400">Service Agreement · $8,400</div>
              <div className="mt-1.5"><StatusPill status={status} /></div>
            </div>
          </div>
        </motion.div>

        {OTHER_CONTRACTS.map((row) => (
          <div key={row.company} className="rounded-[12px] border border-slate-200 bg-white p-2.5">
            <div className="flex items-start gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-slate-50 text-slate-400">
                <FileSignature className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[7px] font-black text-slate-700">{row.company}</div>
                <div className="mt-0.5 truncate text-[5.6px] font-semibold text-slate-400">{row.document} · {row.amount}</div>
                <div className="mt-1.5"><StatusPill status={row.status} /></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressSteps({ status }: { status: ContractStatus }) {
  const steps: ContractStatus[] = ["Draft", "Sent", "Viewed", "Signed"];
  const active = steps.indexOf(status);

  return (
    <div className="flex items-center gap-1.5">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-1.5">
          <div className="flex items-center gap-1">
            <motion.span
              className={
                index <= active
                  ? "flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white"
                  : "flex h-4 w-4 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-300"
              }
              animate={{ scale: index === active ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.35 }}
            >
              {index < active || status === "Signed" ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : <span className="text-[5px] font-black">{index + 1}</span>}
            </motion.span>
            <span className={index <= active ? "text-[5.9px] font-black text-slate-700" : "text-[5.9px] font-bold text-slate-300"}>{step}</span>
          </div>
          {index < steps.length - 1 ? <span className={index < active ? "h-px w-5 bg-blue-400" : "h-px w-5 bg-slate-200"} /> : null}
        </div>
      ))}
    </div>
  );
}

function DocumentPage({ beat }: { beat: number }) {
  const status = statusForBeat(beat);
  const signed = beat >= 7;

  return (
    <div className="mx-auto h-[calc(100%-18px)] w-[84%] max-w-[510px] overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_20px_50px_-34px_rgba(15,23,42,.4)]">
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[7px] font-black uppercase tracking-[.14em] text-blue-600">Service Agreement</div>
            <div className="mt-1 text-[15px] font-black tracking-tight text-slate-900">Bennett Landscapes</div>
            <div className="mt-1 text-[6.5px] font-semibold text-slate-400">Landscape design & installation · Agreement #ZA-2048</div>
          </div>
          <StatusPill status={status} />
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            ["Client", "Tom Bennett"],
            ["Project value", "$8,400"],
            ["Valid until", "28 Aug 2026"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[10px] border border-slate-100 bg-slate-50/70 px-2.5 py-2">
              <div className="text-[5.2px] font-black uppercase tracking-[.09em] text-slate-400">{label}</div>
              <div className="mt-1 text-[7px] font-black text-slate-700">{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="text-[7px] font-black text-slate-800">Scope of works</div>
          <div className="mt-2 space-y-1.5">
            <div className="h-1.5 w-[96%] rounded-full bg-slate-100" />
            <div className="h-1.5 w-[89%] rounded-full bg-slate-100" />
            <div className="h-1.5 w-[74%] rounded-full bg-slate-100" />
          </div>
        </div>

        <div className="mt-4 rounded-[11px] border border-slate-200">
          <div className="grid grid-cols-[1fr_88px] border-b border-slate-100 px-3 py-2 text-[6px] font-bold text-slate-500">
            <span>Landscape design & planning</span><span className="text-right">$2,400</span>
          </div>
          <div className="grid grid-cols-[1fr_88px] border-b border-slate-100 px-3 py-2 text-[6px] font-bold text-slate-500">
            <span>Installation & project delivery</span><span className="text-right">$6,000</span>
          </div>
          <div className="grid grid-cols-[1fr_88px] bg-slate-50 px-3 py-2 text-[7px] font-black text-slate-800">
            <span>Total</span><span className="text-right">$8,400</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-[11px] border border-slate-200 bg-slate-50/60 px-3 py-2.5">
            <div className="text-[5.5px] font-black uppercase tracking-[.1em] text-slate-400">Prepared by</div>
            <div className="mt-1 text-[7px] font-black text-slate-700">Zapla Demo Business</div>
          </div>
          <div className={signed ? "relative overflow-hidden rounded-[11px] border border-emerald-200 bg-emerald-50/45 px-3 py-2.5" : "relative overflow-hidden rounded-[11px] border border-dashed border-slate-300 bg-white px-3 py-2.5"}>
            <div className="text-[5.5px] font-black uppercase tracking-[.1em] text-slate-400">Client signature</div>
            {signed ? (
              <>
                <svg viewBox="0 0 180 42" className="mt-1 h-7 w-full">
                  <path d="M8 30 C30 3, 40 34, 58 18 C72 5, 82 35, 102 20 C122 7, 142 29, 170 12" fill="none" stroke="#0f172a" strokeWidth="2.7" strokeLinecap="round" />
                </svg>
                <div className="mt-0.5 flex items-center gap-1 text-[5.4px] font-bold text-emerald-700"><Check className="h-2.5 w-2.5" strokeWidth={3} /> Signed by Tom Bennett</div>
              </>
            ) : (
              <div className="mt-2 text-[6px] font-semibold text-slate-300">Awaiting signature</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Workspace({
  beat,
  setSendButton,
}: {
  beat: number;
  setSendButton: (node: HTMLButtonElement | null) => void;
}) {
  const status = statusForBeat(beat);
  const canSend = beat < 2;

  return (
    <div className="absolute inset-0 flex bg-[#f7f8fb]">
      <ContractList beat={beat} />

      <div className="min-w-0 flex-1">
        <div className="flex h-[52px] items-center gap-3 border-b border-slate-200 bg-white px-4">
          <div className="min-w-0">
            <div className="truncate text-[10px] font-black text-slate-900">Service Agreement</div>
            <div className="mt-0.5 truncate text-[6px] font-semibold text-slate-400">Bennett Landscapes · $8,400</div>
          </div>

          <div className="ml-2 hidden xl:block"><ProgressSteps status={status} /></div>

          <div className="ml-auto flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[9px] border border-slate-200 bg-white text-slate-400"><Download className="h-3.5 w-3.5" /></span>
            <span className="flex h-7 w-7 items-center justify-center rounded-[9px] border border-slate-200 bg-white text-slate-400"><MoreHorizontal className="h-3.5 w-3.5" /></span>
            <motion.button
              ref={setSendButton}
              type="button"
              className={
                canSend
                  ? "flex items-center gap-1.5 rounded-[10px] bg-blue-600 px-3.5 py-2 text-[7px] font-black text-white shadow-[0_10px_20px_-12px_rgba(37,99,235,.75)]"
                  : "flex items-center gap-1.5 rounded-[10px] border border-slate-200 bg-white px-3.5 py-2 text-[7px] font-black text-slate-500"
              }
              animate={{ scale: beat === 1 ? 0.965 : 1 }}
              transition={{ duration: 0.16 }}
            >
              {status === "Signed" ? <><Check className="h-3 w-3" strokeWidth={3} /> Signed</> : canSend ? <><Send className="h-3 w-3" /> Send for signature</> : <><Clock3 className="h-3 w-3" /> {status}</>}
            </motion.button>
          </div>
        </div>

        <div className="relative h-[calc(100%-52px)] overflow-hidden p-2.5">
          <DocumentPage beat={beat} />

          <AnimatePresence>
            {beat === 2 ? (
              <motion.div
                initial={{ opacity: 0, y: 10, x: 10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute right-3 top-3 flex items-center gap-2 rounded-[12px] border border-blue-200 bg-white px-3 py-2.5 shadow-[0_16px_36px_-22px_rgba(15,23,42,.4)]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-blue-50 text-blue-600"><Send className="h-3.5 w-3.5" /></span>
                <div><div className="text-[7px] font-black text-slate-800">Sent for signature</div><div className="mt-0.5 text-[5.6px] font-semibold text-slate-400">Tom Bennett · just now</div></div>
              </motion.div>
            ) : null}

            {beat === 3 ? (
              <motion.div
                initial={{ opacity: 0, y: 10, x: 10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute right-3 top-3 flex items-center gap-2 rounded-[12px] border border-violet-200 bg-white px-3 py-2.5 shadow-[0_16px_36px_-22px_rgba(15,23,42,.4)]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-violet-50 text-violet-600"><Eye className="h-3.5 w-3.5" /></span>
                <div><div className="text-[7px] font-black text-slate-800">Viewed by Tom Bennett</div><div className="mt-0.5 text-[5.6px] font-semibold text-slate-400">Secure signing link opened</div></div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function SignerView({
  beat,
  reduced,
  setSignButton,
}: {
  beat: number;
  reduced: boolean;
  setSignButton: (node: HTMLButtonElement | null) => void;
}) {
  const show = beat >= 4 && beat <= 6;
  const signing = beat >= 6;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="absolute inset-0 z-40 flex items-center justify-center bg-slate-900/12 px-7 backdrop-blur-[2px]"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.3 }}
        >
          <motion.div
            className="w-full max-w-[520px] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_34px_90px_-32px_rgba(15,23,42,.5)]"
            initial={reduced ? false : { opacity: 0, y: 24, scale: 0.965 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.42, ease: [0.18, 0.78, 0.2, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5">
              <img src={FACE.tom} alt="" className="h-9 w-9 rounded-full object-cover ring-1 ring-slate-100" />
              <div>
                <div className="text-[9px] font-black text-slate-900">Tom Bennett</div>
                <div className="mt-0.5 flex items-center gap-1 text-[6px] font-semibold text-slate-400"><ShieldCheck className="h-2.5 w-2.5 text-emerald-500" /> Secure signing</div>
              </div>
              <div className="ml-auto"><StatusPill status={signing ? "Signed" : "Viewed"} /></div>
            </div>

            <div className="grid grid-cols-[1fr_180px] gap-0">
              <div className="border-r border-slate-100 p-4">
                <div className="text-[5.8px] font-black uppercase tracking-[.12em] text-blue-600">Service Agreement</div>
                <div className="mt-1 text-[12px] font-black text-slate-900">Bennett Landscapes</div>
                <div className="mt-1 text-[6px] font-semibold text-slate-400">$8,400 · Landscape design & installation</div>
                <div className="mt-4 space-y-1.5">
                  <div className="h-1.5 w-[95%] rounded-full bg-slate-100" />
                  <div className="h-1.5 w-[87%] rounded-full bg-slate-100" />
                  <div className="h-1.5 w-[78%] rounded-full bg-slate-100" />
                  <div className="h-1.5 w-[91%] rounded-full bg-slate-100" />
                  <div className="h-1.5 w-[64%] rounded-full bg-slate-100" />
                </div>
                <div className="mt-4 rounded-[10px] border border-slate-200 bg-slate-50 px-3 py-2 text-[6px] font-bold text-slate-500">Total agreement value <span className="float-right font-black text-slate-800">$8,400</span></div>
              </div>

              <div className="bg-slate-50/70 p-4">
                <div className="text-[7px] font-black text-slate-800">Your signature</div>
                <div className="mt-1 text-[5.7px] font-semibold leading-relaxed text-slate-400">Review the agreement, then sign below to accept.</div>

                <div className={signing ? "relative mt-4 h-[78px] overflow-hidden rounded-[12px] border border-emerald-200 bg-white" : "relative mt-4 h-[78px] overflow-hidden rounded-[12px] border border-dashed border-slate-300 bg-white"}>
                  <div className="absolute left-2 top-2 text-[5px] font-bold uppercase tracking-[.08em] text-slate-300">Sign here</div>
                  <svg viewBox="0 0 180 54" className="absolute inset-x-2 bottom-2 h-[50px] w-[calc(100%-16px)]">
                    <motion.path
                      d="M8 36 C30 6, 42 42, 61 20 C75 5, 89 43, 108 22 C126 7, 143 35, 172 14"
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      initial={reduced || beat > 6 ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 1 }}
                      animate={{ pathLength: signing ? 1 : 0 }}
                      transition={{ duration: reduced ? 0 : 0.9, ease: [0.4, 0, 0.3, 1] }}
                    />
                  </svg>
                </div>

                <motion.button
                  ref={setSignButton}
                  type="button"
                  className={
                    signing
                      ? "mt-3 flex w-full items-center justify-center gap-1.5 rounded-[11px] bg-emerald-500 px-3 py-2.5 text-[7px] font-black text-white"
                      : "mt-3 flex w-full items-center justify-center gap-1.5 rounded-[11px] bg-blue-600 px-3 py-2.5 text-[7px] font-black text-white shadow-[0_10px_22px_-12px_rgba(37,99,235,.75)]"
                  }
                  animate={{ scale: beat === 5 ? 0.965 : 1 }}
                  transition={{ duration: 0.16 }}
                >
                  {signing ? <><Check className="h-3 w-3" strokeWidth={3} /> Signed</> : <><PenLine className="h-3 w-3" /> Sign agreement</>}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function FinalUpdates({ beat, reduced }: { beat: number; reduced: boolean }) {
  if (beat < 7) return null;

  return (
    <div className="absolute bottom-3 right-3 z-30 w-[230px] space-y-2">
      <motion.div
        initial={reduced ? false : { opacity: 0, x: 24, y: 8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.35 }}
        className="flex items-center gap-2.5 rounded-[13px] border border-emerald-200 bg-white px-3 py-2.5 shadow-[0_16px_36px_-22px_rgba(15,23,42,.42)]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-emerald-50 text-emerald-600"><FileSignature className="h-4 w-4" /></span>
        <div><div className="text-[7.4px] font-black text-slate-800">Agreement signed</div><div className="mt-0.5 text-[5.8px] font-semibold text-slate-400">Signed copy saved automatically</div></div>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, x: 24, y: 8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.16 }}
        className="flex items-center gap-2.5 rounded-[13px] border border-blue-200 bg-white px-3 py-2.5 shadow-[0_16px_36px_-22px_rgba(15,23,42,.42)]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-blue-50 text-blue-600"><BriefcaseBusiness className="h-4 w-4" /></span>
        <div><div className="text-[7.4px] font-black text-slate-800">Opportunity updated → Won</div><div className="mt-0.5 text-[5.8px] font-semibold text-slate-400">Bennett Landscapes · $8,400</div></div>
      </motion.div>
    </div>
  );
}

export function SceneContractsLive({ elapsedMs, reduced }: SceneProps) {
  const beat = beatFor(elapsedMs, reduced);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const sendButtonRef = useRef<HTMLButtonElement | null>(null);
  const signButtonRef = useRef<HTMLButtonElement | null>(null);
  const [point, setPoint] = useState<CursorPoint>(null);

  const target: "send" | "sign" | null = beat === 1 ? "send" : beat === 5 ? "sign" : null;

  useEffect(() => {
    if (reduced || !target) {
      setPoint(null);
      return;
    }

    const measure = () => {
      const root = rootRef.current;
      const el = target === "send" ? sendButtonRef.current : signButtonRef.current;
      if (!root || !el) return;
      const r = root.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      setPoint({ x: b.left - r.left + b.width * 0.52, y: b.top - r.top + b.height * 0.55 });
    };

    const raf = requestAnimationFrame(() => requestAnimationFrame(measure));
    const timeout = window.setTimeout(measure, 90);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.removeEventListener("resize", measure);
    };
  }, [target, beat, reduced]);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-[#f7f8fb]">
      <motion.div
        className="absolute inset-0"
        animate={{ filter: beat >= 4 && beat <= 6 ? "blur(2px)" : "blur(0px)", opacity: beat >= 4 && beat <= 6 ? 0.62 : 1, scale: beat >= 4 && beat <= 6 ? 0.995 : 1 }}
        transition={{ duration: reduced ? 0 : 0.3 }}
      >
        <Workspace beat={beat} setSendButton={(node) => { sendButtonRef.current = node; }} />
      </motion.div>

      <SignerView beat={beat} reduced={reduced} setSignButton={(node) => { signButtonRef.current = node; }} />
      <FinalUpdates beat={beat} reduced={reduced} />
      <ZaplaDemoCursor point={point} press={beat === 1 || beat === 5} reduced={reduced} />
    </div>
  );
}
