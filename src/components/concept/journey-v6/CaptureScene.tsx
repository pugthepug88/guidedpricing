import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check, Globe2, Mail, Phone } from "lucide-react";
import { SceneContacts } from "@/components/v5/scenes-a";
import { CONTACT_COLS, EASE, RevenueAvatar, SarahIdentity } from "./shared";

export function CaptureScene({ interactive = false }: { interactive?: boolean }) {
  const [slotOpen, setSlotOpen] = useState(interactive);
  const [landed, setLanded] = useState(interactive);
  const [settled, setSettled] = useState(interactive);

  useEffect(() => {
    if (interactive) {
      setSlotOpen(true);
      setLanded(true);
      setSettled(true);
      return;
    }

    setSlotOpen(false);
    setLanded(false);
    setSettled(false);

    const slotTimer = window.setTimeout(() => setSlotOpen(true), 1250);
    const landTimer = window.setTimeout(() => setLanded(true), 1750);
    const settleTimer = window.setTimeout(() => setSettled(true), 2550);

    return () => {
      window.clearTimeout(slotTimer);
      window.clearTimeout(landTimer);
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
            transition={{ duration: interactive ? 0 : 0.22, ease: EASE }}
          />
          <motion.div
            className="pointer-events-none absolute inset-0 z-[9] saturate-[.82]"
            style={{ clipPath: "inset(74px 0 0 0)" }}
            initial={interactive ? false : { y: 0 }}
            animate={{ y: 58 }}
            transition={{ duration: interactive ? 0 : 0.58, ease: EASE }}
          >
            <SceneContacts phase={0} elapsedMs={0} reduced />
          </motion.div>
          <motion.div
            className="absolute left-4 right-4 top-[74px] z-10 h-[58px] rounded-[8px] border border-dashed border-blue-300 bg-blue-50/45"
            initial={interactive ? false : { opacity: 0, scaleY: 0.65 }}
            animate={{ opacity: landed ? 0 : 1, scaleY: 1 }}
            transition={{ duration: interactive ? 0 : 0.32, ease: EASE }}
          />
        </>
      ) : null}

      <motion.div
        className="absolute z-40 overflow-hidden border border-slate-200 bg-white"
        initial={false}
        animate={{
          left: landed ? 16 : "50%",
          top: landed ? 74 : 26,
          width: landed ? "calc(100% - 32px)" : 324,
          height: landed ? 58 : 232,
          x: landed ? 0 : "-50%",
          borderRadius: landed ? 8 : 14,
          boxShadow: landed
            ? "0 8px 22px -20px rgba(15,23,42,.22)"
            : "0 24px 58px -30px rgba(15,23,42,.32)",
        }}
        transition={{ duration: interactive ? 0 : 0.78, ease: EASE }}
      >
        <motion.span
          className="absolute bottom-0 left-0 top-0 w-[5px] bg-[#2563FF]"
          animate={{ opacity: settled ? 0 : 1 }}
          transition={{ duration: interactive ? 0 : 0.22, ease: EASE }}
        />

        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: settled ? 0 : 1 }}
          transition={{ duration: interactive ? 0 : 0.2, ease: EASE }}
          style={{ pointerEvents: settled ? "none" : "auto" }}
        >
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

        <motion.div
          className="absolute inset-0 flex items-center"
          initial={false}
          animate={{ opacity: settled ? 1 : 0 }}
          transition={{ duration: interactive ? 0 : 0.24, ease: EASE }}
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
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-slate-100 px-2 py-[3px] text-[10px] font-bold text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2563FF]" /> New
            </span>
          </div>
        </motion.div>
      </motion.div>

      {settled ? (
        <motion.div
          className="absolute bottom-4 right-4 z-50 flex items-center gap-2 rounded-[9px] border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-600 shadow-[0_12px_30px_-22px_rgba(15,23,42,.24)]"
          initial={interactive ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
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
