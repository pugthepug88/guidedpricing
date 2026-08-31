import { useEffect, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE, RevenueAvatar } from "./shared";

type SalesCard = { id: string; name: string; value: string; source: string; touch: string; initials: string; sarah?: boolean };
type SalesColumn = { key: string; label: string; dot: string; cards: SalesCard[] };

const BASE_COLUMNS: Omit<SalesColumn, "cards">[] = [
  { key: "new", label: "New Enquiry", dot: "bg-blue-500" },
  { key: "followup", label: "Follow-up", dot: "bg-teal-500" },
  { key: "bookings", label: "Bookings", dot: "bg-amber-500" },
  { key: "negotiation", label: "Negotiation", dot: "bg-violet-500" },
  { key: "won", label: "Won", dot: "bg-emerald-500" },
];

const DATA: Record<string, SalesCard[]> = {
  new: [
    { id: "northside", name: "Northside Plumbing", value: "$2,400", source: "Google", touch: "34 min ago", initials: "NP" },
    { id: "willow", name: "Willow Pilates", value: "$1,800", source: "Instagram", touch: "1 hr ago", initials: "WP" },
  ],
  followup: [
    { id: "brightpath", name: "Bright Path Physio", value: "$3,600", source: "Referral", touch: "Today", initials: "BP" },
    { id: "cedar", name: "Cedar & Co Interiors", value: "$7,500", source: "Website", touch: "Yesterday", initials: "CI" },
  ],
  bookings: [{ id: "atlas", name: "Atlas Auto Care", value: "$5,200", source: "Phone", touch: "2 days ago", initials: "AA" }],
  negotiation: [{ id: "bloom", name: "Bloom Skin Studio", value: "$4,400", source: "Instagram", touch: "Today", initials: "BS" }],
  won: [{ id: "coastal", name: "Coastal Dental", value: "$6,800", source: "Referral", touch: "Yesterday", initials: "CD" }],
};

const SARAH: SalesCard = { id: "sarah", name: "Sarah Nguyen", value: "Quote request", source: "Website", touch: "Just now", initials: "SN", sarah: true };

function DealCard({ card }: { card: SalesCard }) {
  return (
    <motion.div layout layoutId={card.sarah ? "sarah-native-opportunity" : undefined} className={cn("rounded-xl border bg-white p-2.5 shadow-[0_1px_2px_rgba(15,23,42,.05)]", card.sarah ? "border-blue-200 shadow-[0_10px_26px_-20px_rgba(37,99,255,.45)]" : "border-slate-200/90")} transition={{ layout: { duration: 0.85, ease: EASE } }}>
      <div className="flex items-center gap-2">
        {card.sarah ? <RevenueAvatar size={25} /> : <span className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-full bg-slate-100 text-[8px] font-black text-slate-500">{card.initials}</span>}
        <div className="min-w-0 flex-1"><div className="truncate text-[11px] font-semibold leading-[1.2] text-slate-800">{card.name}</div>{card.sarah ? <div className="truncate text-[9px] font-medium text-slate-400">Website enquiry</div> : null}</div>
      </div>
      <div className="mt-1.5 flex items-center justify-between gap-1.5"><span className={cn("truncate font-bold tracking-tight text-slate-900", card.sarah ? "text-[10.5px]" : "text-[12px]")}>{card.value}</span><span className="truncate text-[8.5px] font-medium text-slate-400">{card.touch}</span></div>
      <div className="mt-1.5"><span className={cn("rounded-full px-1.5 py-[2px] text-[9px] font-semibold", card.source === "Website" ? "bg-sky-50 text-sky-700" : card.source === "Referral" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600")}>{card.source}</span></div>
    </motion.div>
  );
}

export function SalesScene({ interactive = false }: { interactive?: boolean }) {
  const [moved, setMoved] = useState(interactive);

  useEffect(() => {
    if (interactive) {
      setMoved(true);
      return;
    }
    setMoved(false);
    const timer = window.setTimeout(() => setMoved(true), 1650);
    return () => window.clearTimeout(timer);
  }, [interactive]);

  const columns: SalesColumn[] = BASE_COLUMNS.map((column) => {
    const cards = [...DATA[column.key]];
    if (!moved && column.key === "new") cards.unshift(SARAH);
    if (moved && column.key === "followup") cards.unshift(SARAH);
    return { ...column, cards };
  });

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-slate-50/70">
      <div className="flex items-center gap-3 border-b border-slate-200/80 bg-white px-3.5 py-2"><span className="text-[12px] font-bold tracking-tight text-slate-700">Sales Pipeline</span><div className="ml-auto flex items-center gap-2"><span className="text-[9px] font-medium uppercase tracking-[0.08em] text-slate-400">Open pipeline</span><span className="text-[13px] font-extrabold tracking-tight text-slate-900">$33,900</span></div></div>
      <LayoutGroup id="section4-native-sales">
        <div className="grid min-h-0 flex-1 grid-cols-5 gap-1.5 px-2.5 py-3">
          {columns.map((column) => (
            <div key={column.key} className="min-w-0 rounded-[12px] bg-slate-100/65 p-1.5">
              <div className="mb-2 flex items-center gap-1.5 px-1 py-1"><span className={cn("h-1.5 w-1.5 rounded-full", column.dot)} /><span className="truncate text-[9px] font-bold uppercase tracking-[.06em] text-slate-500">{column.label}</span><span className="ml-auto rounded-full bg-white px-1.5 py-0.5 text-[8px] font-black text-slate-400">{column.cards.length}</span></div>
              <div className="space-y-1.5">{column.cards.map((card) => <DealCard key={card.id} card={card} />)}</div>
            </div>
          ))}
        </div>
      </LayoutGroup>
      {moved ? (
        <motion.div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-[9px] border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-600 shadow-[0_12px_30px_-22px_rgba(15,23,42,.24)]" initial={interactive ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, ease: EASE }}>
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-2.5 w-2.5" strokeWidth={3} /></span>Stage updated · Follow-up
        </motion.div>
      ) : null}
    </div>
  );
}
