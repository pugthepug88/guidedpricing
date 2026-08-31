import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check, Globe2 } from "lucide-react";
import { SceneContacts } from "@/components/v5/scenes-a";
import { CONTACT_COLS, EASE, MONO, SarahIdentity } from "./shared";

export function CaptureScene({ interactive = false }: { interactive?: boolean }) {
  const [inserted, setInserted] = useState(interactive);

  useEffect(() => {
    if (interactive) {
      setInserted(true);
      return;
    }
    setInserted(false);
    const timer = window.setTimeout(() => setInserted(true), 2050);
    return () => window.clearTimeout(timer);
  }, [interactive]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 saturate-[.82]">
        <SceneContacts phase={0} elapsedMs={0} reduced />
      </div>

      <motion.div
        className="absolute z-40 overflow-hidden border border-slate-200 bg-white"
        initial={false}
        animate={{
          left: inserted ? 16 : "50%",
          top: inserted ? 74 : 38,
          width: inserted ? "calc(100% - 32px)" : 344,
          height: inserted ? 58 : 178,
          x: inserted ? 0 : "-50%",
          borderRadius: inserted ? 0 : 17,
          boxShadow: inserted ? "0 8px 22px -20px rgba(15,23,42,.22)" : "0 24px 58px -30px rgba(15,23,42,.34)",
        }}
        transition={{ duration: interactive ? 0 : 0.78, ease: EASE }}
      >
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: inserted ? 0 : 1 }}
          transition={{ duration: interactive ? 0 : 0.2, ease: EASE }}
          style={{ pointerEvents: inserted ? "none" : "auto" }}
        >
          <div className="flex items-center gap-2 border-b border-slate-100 bg-[#FBFCFD] px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-blue-50 text-blue-600 ring-1 ring-blue-100"><Globe2 className="h-4 w-4" /></span>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-700">New website enquiry</div>
              <div className="mt-0.5 text-[8.5px] font-semibold text-slate-400">Submitted just now</div>
            </div>
            <span className="ml-auto h-2 w-2 rounded-full bg-[#2563FF]" />
          </div>
          <div className="p-4">
            <SarahIdentity detail="Website lead" />
            <div className="mt-3 rounded-[11px] bg-slate-50 px-3 py-2.5 text-[11px] font-medium leading-[1.5] text-slate-600 ring-1 ring-slate-100">
              “Hi, I’m interested in getting a quote. Are you available Thursday afternoon?”
            </div>
            <div className="mt-3 flex items-center justify-between text-[9px] font-semibold text-slate-400" style={{ fontFamily: MONO }}>
              <span>0412 481 229</span><span>sarah.nguyen@email.com</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center"
          initial={false}
          animate={{ opacity: inserted ? 1 : 0 }}
          transition={{ duration: interactive ? 0 : 0.24, delay: inserted && !interactive ? 0.42 : 0, ease: EASE }}
        >
          <div className="grid w-full items-center gap-2 px-3 py-[9px]" style={{ gridTemplateColumns: CONTACT_COLS }}>
            <span className="flex h-[13px] w-[13px] rounded-[3px] border border-slate-300 bg-white" />
            <SarahIdentity detail="sarah.nguyen@email.com" />
            <span className="truncate text-[11px] tabular-nums text-slate-500">0412 481 229</span>
            <div className="flex min-w-0 flex-wrap gap-1">
              <span className="rounded-full bg-slate-100 px-2 py-[2px] text-[10px] font-bold text-slate-600">New enquiry</span>
              <span className="rounded-full bg-sky-50 px-2 py-[2px] text-[10px] font-bold text-sky-700">Website</span>
            </div>
            <span className="truncate text-[11px] font-semibold text-[#2563FF]">Just now</span>
            <span className="truncate text-[11px] text-slate-500">Website</span>
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-slate-100 px-2 py-[3px] text-[10px] font-bold text-slate-600"><span className="h-1.5 w-1.5 rounded-full bg-[#2563FF]" /> New</span>
          </div>
        </motion.div>
      </motion.div>

      {inserted ? (
        <motion.div
          className="absolute bottom-4 right-4 z-50 flex items-center gap-2 rounded-[9px] border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-600 shadow-[0_12px_30px_-22px_rgba(15,23,42,.24)]"
          initial={interactive ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: interactive ? 0 : 0.38, ease: EASE }}
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-2.5 w-2.5" strokeWidth={3} /></span>
          Customer record created
        </motion.div>
      ) : null}
    </div>
  );
}
