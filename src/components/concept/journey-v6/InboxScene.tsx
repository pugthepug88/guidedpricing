import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MessageSquare, Plus, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE, RevenueAvatar, SarahIdentity } from "./shared";

const INBOX_ROWS = [
  { name: "Sarah Nguyen", preview: "Interested in getting a quote…", time: "Just now", active: true },
  { name: "Daniel Ross", preview: "Sending through the updated scope now.", time: "9m" },
  { name: "Sophie Bell", preview: "Thanks for the quote, one question.", time: "14m" },
  { name: "Priya Nair", preview: "Perfect, see you then.", time: "42m" },
];

export function InboxScene({ interactive = false }: { interactive?: boolean }) {
  const [replyVisible, setReplyVisible] = useState(interactive);

  useEffect(() => {
    if (interactive) {
      setReplyVisible(true);
      return;
    }
    setReplyVisible(false);
    const timer = window.setTimeout(() => setReplyVisible(true), 760);
    return () => window.clearTimeout(timer);
  }, [interactive]);

  return (
    <div className="absolute inset-0 flex overflow-hidden bg-[#F8FAFC]">
      <div className="hidden w-[124px] shrink-0 border-r border-slate-200/80 bg-white px-2 py-3 sm:block lg:w-[142px]">
        <div className="px-1 pb-2 text-[9px] font-black uppercase tracking-[.12em] text-slate-400">Inbox</div>
        {["Inbox", "Unread", "Assigned to me"].map((label, index) => (
          <div key={label} className={cn("mb-1 flex items-center gap-2 rounded-lg px-2 py-[7px] text-[10.5px] font-semibold", index === 0 ? "bg-blue-50 text-blue-700" : "text-slate-500")}>
            <MessageSquare className="h-3.5 w-3.5" /><span>{label}</span>
            {index === 0 ? <span className="ml-auto rounded-full bg-white px-1.5 py-0.5 text-[9px] font-black">12</span> : null}
          </div>
        ))}
        <div className="mt-4 px-1 pb-2 text-[9px] font-black uppercase tracking-[.12em] text-slate-400">Channels</div>
        {["SMS", "Email", "Instagram", "Facebook"].map((label, index) => (
          <div key={label} className="flex items-center gap-2 px-2 py-1.5 text-[10px] font-medium text-slate-500">
            <span className={cn("h-2.5 w-2.5 rounded-full", index === 0 ? "bg-emerald-500" : index === 1 ? "bg-violet-500" : index === 2 ? "bg-pink-500" : "bg-blue-600")} />{label}
          </div>
        ))}
      </div>

      <div className="w-[36%] min-w-[190px] border-r border-slate-200 bg-white sm:w-[32%]">
        <div className="flex h-[46px] items-center border-b border-slate-200 px-3">
          <div className="text-[11px] font-black text-slate-800">All conversations</div>
          <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500">12</span>
        </div>
        <div className="p-2">
          {INBOX_ROWS.map((row, index) => (
            <div key={row.name} className={cn("mb-1 flex items-start gap-2 rounded-[10px] px-2 py-2", row.active ? "bg-slate-50 shadow-[inset_2px_0_0_0_rgba(37,99,255,.9)]" : "bg-white")}>
              {index === 0 ? <RevenueAvatar size={28} /> : <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[9px] font-black text-slate-500">{row.name.split(" ").map((part) => part[0]).join("")}</span>}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2"><span className="truncate text-[10.5px] font-bold text-slate-800">{row.name}</span><span className="ml-auto text-[8.5px] font-semibold text-slate-400">{row.time}</span></div>
                <div className="mt-0.5 truncate text-[9.5px] text-slate-500">{row.preview}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative min-w-0 flex-1 bg-white">
        <div className="flex h-[58px] items-center gap-2.5 border-b border-slate-200 px-4">
          <SarahIdentity detail="Website + SMS" size={32} />
          <div className="ml-auto text-right"><div className="text-[7.5px] font-black uppercase tracking-[.1em] text-slate-400">Owner</div><div className="text-[10.5px] font-bold text-slate-600">James</div></div>
        </div>

        <div className="absolute inset-x-0 bottom-[72px] top-[58px] overflow-hidden px-5 py-5">
          <div className="mx-auto flex h-full max-w-[590px] flex-col justify-start gap-3 pt-3 lg:pt-7">
            <div className="max-w-[76%]">
              <div className="rounded-2xl rounded-bl-sm bg-slate-100 px-3.5 py-2.5 text-[11.5px] font-medium leading-[1.5] text-slate-600">Hi, I’m interested in getting a quote. Are you available Thursday afternoon?</div>
              <div className="mt-1 text-[8.5px] font-semibold text-slate-400">10:42 AM · Website</div>
            </div>
            <motion.div
              className="ml-auto max-w-[76%]"
              initial={interactive ? false : { opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: replyVisible ? 1 : 0, y: replyVisible ? 0 : 10, scale: replyVisible ? 1 : 0.98 }}
              transition={{ duration: 0.48, ease: EASE }}
            >
              <div className="rounded-2xl rounded-br-sm bg-[#2563FF] px-3.5 py-2.5 text-[11.5px] font-medium leading-[1.5] text-white">Hi Sarah, thanks for reaching out. Happy to help. What time works best for you?</div>
              <div className="mt-1 flex items-center justify-end gap-1.5 text-[8.5px] font-semibold text-slate-400"><span className="rounded bg-blue-50 px-1.5 py-[2px] text-[8px] font-black tracking-[.04em] text-[#2563FF]">AUTOMATIC REPLY</span><span>10:42 AM</span></div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-3 left-4 right-4 rounded-[16px] border border-slate-200 bg-white p-1.5 shadow-[0_16px_34px_-20px_rgba(15,23,42,.24)]">
          <div className="flex h-[46px] items-center gap-2 rounded-[12px] bg-slate-50 px-2.5"><span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400"><Plus className="h-3.5 w-3.5" /></span><span className="min-w-0 flex-1 text-[10.5px] font-semibold text-slate-400">Type a message…</span><span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#2563FF] text-white"><Send className="h-3.5 w-3.5" /></span></div>
        </div>
      </div>
    </div>
  );
}
