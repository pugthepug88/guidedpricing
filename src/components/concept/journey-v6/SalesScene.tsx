import { useEffect, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { FACE } from "@/components/v5/faces";
import { EASE, RevenueAvatar } from "./shared";

type SalesCard = { id: string; name: string; value: string; source: string; touch: string; face?: string; sarah?: boolean };
type SalesColumn = { key: string; label: string; dot: string; bar: string; cards: SalesCard[] };

const META = [
  { key: "new", label: "New Enquiry", dot: "bg-blue-500", bar: "bg-blue-500/70" },
  { key: "followup", label: "Follow-up", dot: "bg-teal-500", bar: "bg-teal-500/70" },
  { key: "bookings", label: "Bookings", dot: "bg-amber-500", bar: "bg-amber-500/70" },
  { key: "negotiation", label: "Negotiation", dot: "bg-violet-500", bar: "bg-violet-500/70" },
  { key: "won", label: "Won", dot: "bg-emerald-500", bar: "bg-emerald-500/70" },
] as const;

const DATA: Record<string, SalesCard[]> = {
  new: [
    { id: "northside", name: "Northside Plumbing", value: "$2,400", source: "Google", touch: "34 min ago", face: FACE.sam },
    { id: "willow", name: "Willow Pilates", value: "$1,800", source: "Instagram", touch: "1 hr ago", face: FACE.sophie },
  ],
  followup: [
    { id: "brightpath", name: "Bright Path Physio", value: "$3,600", source: "Referral", touch: "Today", face: FACE.alex },
    { id: "cedar", name: "Cedar & Co Interiors", value: "$7,500", source: "Website", touch: "Yesterday", face: FACE.nina },
  ],
  bookings: [
    { id: "atlas", name: "Atlas Auto Care", value: "$5,200", source: "Phone", touch: "2 days ago", face: FACE.daniel },
    { id: "eastside", name: "Eastside Property Group", value: "$9,800", source: "Email", touch: "Proposal viewed 2h ago", face: FACE.priya },
  ],
  negotiation: [
    { id: "bloom", name: "Bloom Skin Studio", value: "$4,400", source: "Instagram", touch: "Today", face: FACE.jordan },
    { id: "summit", name: "Summit Advisory", value: "$12,500", source: "Referral", touch: "Follow up today", face: FACE.tom },
  ],
  won: [{ id: "coastal", name: "Coastal Dental", value: "$6,800", source: "Referral", touch: "Yesterday", face: FACE.leo }],
};

const SARAH: SalesCard = { id: "sarah", name: "Sarah Nguyen", value: "Quote request", source: "Website", touch: "Just now", sarah: true };

function SourceChip({ source }: { source: string }) {
  const tone = source === "SMS reply" ? "bg-blue-50 text-blue-700"
    : source === "Referral" ? "bg-emerald-50 text-emerald-700"
    : source === "Instagram" ? "bg-pink-50 text-pink-700"
    : source === "Website" ? "bg-sky-50 text-sky-700"
    : source === "Email" ? "bg-violet-50 text-violet-700"
    : "bg-slate-100 text-slate-600";
  return <span className={cn("rounded-full px-1.5 py-[2px] text-[9.5px] font-semibold leading-none whitespace-nowrap", tone)}>{source}</span>;
}

function DealCard({ card }: { card: SalesCard }) {
  return (
    <motion.div layout layoutId={card.sarah ? "sarah-native-opportunity" : `section4-${card.id}`} className={cn("relative rounded-xl border bg-white p-2.5 transition-shadow duration-300", card.sarah ? "border-zapla-blue/60 shadow-[0_0_0_3px_rgba(37,99,255,0.10),0_1px_2px_rgba(15,23,42,.05)]" : "border-slate-200/90 shadow-[0_1px_2px_rgba(15,23,42,.05)]")} transition={{ layout: { duration: 0.9, ease: EASE } }}>
      <div className="flex items-center gap-2">
        {card.sarah ? <RevenueAvatar size={24} /> : <img src={card.face} alt="" aria-hidden className="h-6 w-6 shrink-0 rounded-full object-cover ring-2 ring-white" />}
        <div className="min-w-0 flex-1"><div className="text-[11.5px] font-semibold leading-[1.2] text-slate-800">{card.name}</div>{card.sarah ? <div className="truncate text-[10px] font-medium text-slate-400">Website enquiry</div> : null}</div>
      </div>
      <div className="mt-1.5 flex items-center justify-between gap-1.5"><span className="text-[12.5px] font-bold tracking-tight text-slate-900">{card.value}</span><span className="truncate text-[9.5px] font-medium text-slate-400">{card.touch}</span></div>
      <div className="mt-1.5"><SourceChip source={card.source} /></div>
    </motion.div>
  );
}

export function SalesScene({ interactive = false }: { interactive?: boolean }) {
  const [moved, setMoved] = useState(interactive);
  useEffect(() => {
    if (interactive) { setMoved(true); return; }
    setMoved(false);
    const timer = window.setTimeout(() => setMoved(true), 1650);
    return () => window.clearTimeout(timer);
  }, [interactive]);

  const columns: SalesColumn[] = META.map((meta) => {
    const cards = [...DATA[meta.key]];
    if (!moved && meta.key === "new") cards.unshift(SARAH);
    if (moved && meta.key === "followup") cards.unshift(SARAH);
    return { ...meta, cards };
  });

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-slate-50/70">
      <div className="flex items-center gap-3 border-b border-slate-200/80 bg-white/85 px-3.5 py-2"><span className="text-[12px] font-bold tracking-tight text-slate-700">Sales Pipeline</span><div className="ml-auto flex items-center gap-2"><span className="text-[10px] font-medium uppercase tracking-[0.08em] text-slate-400">Open pipeline</span><span className="text-[13px] font-extrabold tracking-tight text-slate-900">$47,200</span></div></div>
      <div className="zapla-scroll-hide min-h-0 flex-1 overflow-x-auto overflow-y-hidden">
        <LayoutGroup id="section4-native-sales">
          <div className="flex h-full min-w-[560px] gap-1.5 px-2.5 py-3">
            {columns.map((column) => (
              <motion.div key={column.key} className="relative flex min-w-[104px] flex-1 flex-col rounded-2xl bg-white/70 px-1.5 pb-2 pt-2.5 shadow-[0_0_0_1px_rgba(226,232,240,.9)]">
                <div className="mb-2 flex items-center gap-1.5 px-0.5"><span className={cn("h-1.5 w-1.5 rounded-full", column.dot)} /><span className="truncate text-[10.5px] font-bold uppercase tracking-[0.08em] text-slate-500">{column.label}</span><span className="ml-auto rounded-full bg-slate-100 px-1.5 py-[1px] text-[9.5px] font-bold text-slate-500">{column.cards.length}</span></div>
                <div className={cn("h-[2px] rounded-full", column.bar)} />
                <div className="relative mt-2 space-y-2">{column.cards.map((card) => <DealCard key={card.id} card={card} />)}</div>
              </motion.div>
            ))}
          </div>
        </LayoutGroup>
      </div>
      {moved ? <motion.div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-lg border border-zapla-blue/30 bg-white px-2.5 py-1.5 shadow-[0_14px_28px_-14px_rgba(15,23,42,.35)]" initial={interactive ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white"><Check className="h-2.5 w-2.5" strokeWidth={3.5} /></span><span className="text-[10px] font-medium text-slate-500">Stage updated</span><span className="text-[11px] font-extrabold tracking-tight text-teal-700">Follow-up</span></motion.div> : null}
    </div>
  );
}
