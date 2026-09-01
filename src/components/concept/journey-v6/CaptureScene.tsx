import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check, Globe2, Mail, Phone } from "lucide-react";
import { SceneContacts } from "@/components/v5/scenes-a";
import { CONTACT_COLS, EASE, RevenueAvatar, SarahIdentity } from "./shared";

export function CaptureScene({ interactive = false }: { interactive?: boolean }) {
  const [slotOpen, setSlotOpen] = useState(interactive);
  const [handoff, setHandoff] = useState(interactive);
  const [settled, setSettled] = useState(interactive);

  useEffect(() => {
    if (interactive) {
      setSlotOpen(true);
      setHandoff(true);
      setSettled(true);
      return;
    }

    setSlotOpen(false);
    setHandoff(false);
    setSettled(false);

    const slotTimer = window.setTimeout(() => setSlotOpen(true), 1200);
    const handoffTimer = window.setTimeout(() => setHandoff(true), 1780);
    const settleTimer = window.setTimeout(() => setSettled(true), 2180);

    return () => {
      window.clearTimeout(slotTimer);
      window.clearTimeout(handoffTimer);
      window.clearTimeout(settleTimer);
    };
  }, [interactive]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F8FAFF]">
      <div className="absolute inset-0 saturate-[.82]">
        <SceneContacts phase={0} elapsedMs={0} reduced />
      </div>

      {slotOpen ? (
        <>
          <motion.div
            className="absolute inset-x-0 bottom-0 top-[74px] z-[8] bg-[#F8FAFF]"
            initial={interactive ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: interactive ? 0 : 0.2, ease: EASE }}
          />

          <motion.div
            className="pointer-events-none absolute inset-0 z-[9] saturate-[.82]"
            style={{ clipPath: "inset(74px 0 0 0)" }}
            initial={interactive ? false : { y: 0 }}
            animate={{ y: 58 }}
            transition={{ duration: interactive ? 0 : 0.5, ease: EASE }}
          >
            <SceneContacts phase={0} elapsedMs={0} reduced />
          </motion.div>

          <motion.div
            className="absolute left-4 right-4 top-[74px] z-10 h-[58px] rounded-[8px] border border-dashed border-blue-300 bg-blue-50/45"
            initial={interactive ? false : { opacity: 0, scaleY: 0.72 }}
            animate={{ opacity: handoff ? 0 : 1, scaleY: 1 }}
            transition={{ duration: interactive ? 0 : 0.22, ease: EASE }}
          />
        </>
      ) : null}

      <motion.div
        className="absolute left-4 right-4 top-[74px] z-30 h-[58px] overflow-hidden rounded-[8px] border border-slate-200 bg-white"
        initial={false}
        animate={{ opacity: handoff ? 1 : 0, y: handoff ? 0 : 4 }}
        transition={{ duration: interactive ? 0 : 0.2, ease: EASE }}
        style={{ pointerEvents: handoff ? "auto" : "none" }}
      >
        <div className="grid h-full w-full items-center gap-2 px-3 py-[9px]" style={{ gridTemplateColumns: CONTACT_COLS }}>
          <span className="flex h-[13px] w-[13px] rounded-[3px] border border-slate-300 bg-white" />
          <SarahIdentity detail="sarah.nguyen@email.com" />
          <span className="truncate text-[11px] tabular-nums text-slate-500">0412 481 229</span>
          <div className="flex min-w-0 flex-wrap gap-1">
            <span className="rounded-full bg-slate-100 px-2 py-[2px] text-[10px] font-bold text-slate-600">New enquiry</span>
            <span className="rounded-full bg-sky-50 px-2 py-[2px] text-[10px] font-bold text-sky-700">Website</span>
          </div>
          <span className="truncate text-[11px] font-semibold text-[#2563FF]">Just now</span>
          <span className="truncate text-[11px] text-slate-500">Website</span>
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-slate-100 px-2 py-[3px] text-[10px] font-bold text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2563FF]" /> New
          </span>
        </div>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-[26px] z-40 h-[232px] w-[324px] overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_24px_58px_-30px_rgba(15,23,42,.32)]"
        initial={false}
        animate={{
          x: "-50%",
          y: handoff ? 40 : 0,
          scale: handoff ? 0.94 : 1,
          opacity: handoff ? 0 : 1,
        }}
        transition={{ duration: interactive ? 0 : handoff ? 0.3 : 0.52, ease: EASE }}
        style={{ transformOrigin: "50% 100%", pointerEvents: handoff ? "none" : "auto" }}
      >
        <span className="absolute bottom-0 left-0 top-0 w-[5px] bg-[#2563FF]" />

        <div className="flex items-start gap-3 border-b border-slate-100 bg-[#FBFCFD] px-4 py-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-blue-50 text-blue-600 ring-1 ring-blue-100">
            <Globe2 className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-[13px] font-bold tracking-tight text-slate-900">New Website Enquiry</div>
              <span className="rounded-full bg-blue-50 px-2 py-[2px] text-[9px] font-bold text-blue-700">Website lead</span>
            </div>
            <div className="mt-1 text-[8.5px] font-semibold text-slate-400">Submitted just now</div>
          </div>
        </div>

        <div className="px-4 py-3.5">
          <div className="flex items-center gap-3">
            <RevenueAvatar size={46} />
            <div className="min-w-0 flex-1">
              <div className="text-[12.5px] font-bold tracking-tight text-slate-900">Sarah Nguyen</div>
              <div className="mt-1.5 flex items-center gap-1.5 text-[9.5px] font-medium text-slate-400">
                <Mail className="h-3 w-3" />
                <span className="truncate">sarah.nguyen@email.com</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-[9.5px] font-medium text-slate-400">
                <Phone className="h-3 w-3" />
                <span>0412 481 229</span>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-[11px] bg-slate-50 px-3 py-2.5 text-[10.5px] font-medium leading-[1.45] text-slate-600 ring-1 ring-slate-100">
            “Hi, I’m interested in getting a quote. Are you available Thursday afternoon?”
          </div>
        </div>
      </motion.div>

      {settled ? (
        <motion.div
          className="absolute bottom-4 right-4 z-50 flex items-center gap-2 rounded-[9px] border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-600 shadow-[0_12px_30px_-22px_rgba(15,23,42,.24)]"
          initial={interactive ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
          </span>
          Customer record created
        </motion.div>
      ) : null}
    </div>
  );
}
