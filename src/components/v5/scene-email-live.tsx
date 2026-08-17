import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Code2,
  Eye,
  Mail,
  MoreHorizontal,
  Plus,
  Save,
  Search,
  Send,
} from "lucide-react";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

const CAMPAIGNS = [
  { name: "August re-engagement", status: "Published", sent: "8,420", opened: "48.2%", clicked: "4.8%", updated: "16 Aug" },
  { name: "Welcome new leads", status: "Published", sent: "1,284", opened: "54.6%", clicked: "7.1%", updated: "14 Aug" },
  { name: "Quote follow-up", status: "Draft", sent: "—", opened: "—", clicked: "—", updated: "12 Aug" },
  { name: "Winter service reminder", status: "Published", sent: "3,106", opened: "45.9%", clicked: "3.9%", updated: "8 Aug" },
] as const;

function StatusBadge({ status }: { status: string }) {
  const published = status === "Published";
  return (
    <span className={published
      ? "inline-flex rounded-full bg-emerald-50 px-2 py-1 text-[6.5px] font-black text-emerald-700"
      : "inline-flex rounded-full bg-amber-50 px-2 py-1 text-[6.5px] font-black text-amber-700"
    }>
      {status}
    </span>
  );
}

function CampaignList({ finalPublished, reduced }: { finalPublished: boolean; reduced: boolean }) {
  const rows = finalPublished
    ? [
        { name: "Friday availability", status: "Published", sent: "Ready", opened: "—", clicked: "—", updated: "Just now" },
        ...CAMPAIGNS,
      ]
    : CAMPAIGNS;

  return (
    <div className="absolute inset-0 flex min-h-0 flex-col bg-white">
      <div className="flex h-[52px] shrink-0 items-center border-b border-slate-200 px-4">
        <div>
          <div className="text-[11px] font-black tracking-tight text-slate-900">Email Marketing</div>
          <div className="mt-0.5 text-[7px] font-semibold text-slate-400">Campaigns, drafts and performance</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden h-7 items-center gap-1.5 rounded-[9px] border border-slate-200 px-2.5 text-[7.5px] font-semibold text-slate-400 sm:flex">
            <Search className="h-3 w-3" /> Search campaigns
          </div>
          <motion.div
            className="inline-flex items-center gap-1.5 rounded-[9px] bg-zapla-ink px-3 py-2 text-[8.5px] font-black text-white"
            animate={{ boxShadow: finalPublished ? "0 0 0 0 rgba(37,99,255,0)" : "0 0 0 4px rgba(37,99,255,.10)" }}
          >
            <Plus className="h-3 w-3" /> New Email
          </motion.div>
        </div>
      </div>

      <div className="flex h-[42px] shrink-0 items-end gap-4 border-b border-slate-200 px-4">
        {["All", "Draft", "Published", "Archived"].map((tab, index) => (
          <span
            key={tab}
            className={index === 0
              ? "border-b-2 border-zapla-blue pb-2.5 text-[8px] font-black text-zapla-blue"
              : "pb-2.5 text-[8px] font-bold text-slate-400"
            }
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-4 pt-3">
        <div className="grid grid-cols-[minmax(0,1.7fr)_90px_70px_70px_70px_56px] items-center gap-2 border-b border-slate-100 px-2 pb-2 text-[6.5px] font-black uppercase tracking-[.12em] text-slate-400">
          <span>Campaign</span><span>Status</span><span>Sent</span><span>Opened</span><span>Clicked</span><span />
        </div>
        <div className="divide-y divide-slate-100">
          {rows.map((row, index) => {
            const fresh = finalPublished && index === 0;
            return (
              <motion.div
                key={row.name}
                initial={fresh && !reduced ? { opacity: 0, y: -8, scale: 0.985 } : false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: reduced ? 0 : 0.38, delay: fresh && !reduced ? 0.18 : 0 }}
                className={fresh
                  ? "grid grid-cols-[minmax(0,1.7fr)_90px_70px_70px_70px_56px] items-center gap-2 rounded-[10px] bg-blue-50/55 px-2 py-3 ring-1 ring-blue-100"
                  : "grid grid-cols-[minmax(0,1.7fr)_90px_70px_70px_70px_56px] items-center gap-2 px-2 py-3"
                }
              >
                <div className="min-w-0">
                  <div className="truncate text-[8.5px] font-black text-slate-800">{row.name}</div>
                  <div className="mt-0.5 text-[6.5px] font-semibold text-slate-400">Updated {row.updated}</div>
                </div>
                <StatusBadge status={row.status} />
                <span className="text-[7.5px] font-bold text-slate-500">{row.sent}</span>
                <span className="text-[7.5px] font-bold text-slate-500">{row.opened}</span>
                <span className="text-[7.5px] font-bold text-slate-500">{row.clicked}</span>
                <MoreHorizontal className="h-3.5 w-3.5 text-slate-300" />
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {finalPublished ? (
          <motion.div
            className="absolute bottom-3 right-3 flex items-center gap-2 rounded-[12px] border border-emerald-100 bg-white px-3 py-2 shadow-[0_18px_42px_-22px_rgba(15,23,42,.42)]"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.42 }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
            <div>
              <div className="text-[8.5px] font-black text-slate-800">Campaign published</div>
              <div className="text-[7px] font-semibold text-slate-400">Friday availability is live</div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function InputField({ label, value, ready, accent = false }: { label: string; value: string; ready: boolean; accent?: boolean }) {
  return (
    <div>
      <div className="mb-1.5 text-[6.5px] font-black uppercase tracking-[.12em] text-slate-400">{label}</div>
      <motion.div
        className={accent
          ? "flex h-9 items-center rounded-[9px] border border-blue-200 bg-blue-50/45 px-3 text-[8.5px] font-bold text-slate-800"
          : "flex h-9 items-center rounded-[9px] border border-slate-200 bg-white px-3 text-[8.5px] font-bold text-slate-800"
        }
        animate={{ boxShadow: accent && ready ? "0 0 0 3px rgba(37,99,255,.08)" : "0 0 0 0 rgba(37,99,255,0)" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={ready ? value : `${label}-empty`}
            initial={ready && !value ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: ready ? 1 : 0.35, y: 0 }}
            transition={{ duration: 0.22 }}
            className={ready ? "" : "font-semibold text-slate-300"}
          >
            {ready ? value : `Add ${label.toLowerCase()}`}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function EmailPreview({ contentReady, reduced }: { contentReady: boolean; reduced: boolean }) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-slate-100/70 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[7px] font-black text-slate-500"><Eye className="h-3 w-3" /> Preview</div>
        <span className="rounded-full bg-white px-2 py-1 text-[6px] font-black text-slate-400 shadow-sm">Desktop</span>
      </div>

      <div className="mx-auto min-h-0 w-full max-w-[340px] flex-1 overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-[0_18px_45px_-28px_rgba(15,23,42,.32)]">
        <div className="flex h-10 items-center border-b border-slate-100 px-4">
          <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-zapla-blue text-[8px] font-black text-white">N</span>
          <div className="ml-2">
            <div className="text-[7.5px] font-black text-slate-800">North & Pine</div>
            <div className="text-[6px] font-semibold text-slate-400">hello@northandpine.com.au</div>
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="text-[13px] font-black tracking-tight text-slate-900">Only 3 spots left this Friday</div>
          <div className="mt-3 h-px bg-slate-100" />

          <motion.div
            className="mt-4 text-[9px] font-semibold leading-[1.65] text-slate-600"
            initial={false}
            animate={{ opacity: contentReady ? 1 : 0.28 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
          >
            <div className="flex items-center gap-1.5">
              <span>Hi</span>
              <motion.span
                className="rounded-[5px] bg-blue-50 px-1.5 py-0.5 font-mono text-[7.5px] font-black text-blue-700 ring-1 ring-blue-100"
                animate={{ boxShadow: contentReady ? "0 0 0 3px rgba(37,99,255,.08)" : "0 0 0 0 rgba(37,99,255,0)" }}
              >
                {"{{contact.first_name}}"}
              </motion.span>
              <span>,</span>
            </div>
            <p className="mt-3">A few Friday appointments have just opened up. If you’ve been meaning to book in, now’s a good time.</p>
            <p className="mt-2">Choose a time that works for you and we’ll take care of the rest.</p>

            <motion.div
              className="mt-4 inline-flex rounded-[8px] bg-zapla-blue px-3.5 py-2 text-[7.5px] font-black text-white"
              initial={false}
              animate={{ opacity: contentReady ? 1 : 0.3, scale: contentReady ? 1 : 0.97 }}
              transition={{ duration: reduced ? 0 : 0.26, delay: contentReady && !reduced ? 0.18 : 0 }}
            >
              Book your spot
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function EditorWorkspace({ phase, reduced }: { phase: number; reduced: boolean }) {
  const fieldsReady = phase >= 2;
  const contentReady = phase >= 3;
  const saved = phase >= 4;
  const publishing = phase >= 5;

  return (
    <motion.div
      className="absolute inset-0 z-40 flex min-h-0 flex-col bg-white"
      initial={reduced ? false : { opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: reduced ? 0 : 0.34, ease: [0.2, 0.82, 0.24, 1] }}
    >
      <div className="flex h-[52px] shrink-0 items-center gap-2 border-b border-slate-200 px-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-slate-200 text-slate-400"><ArrowLeft className="h-3.5 w-3.5" /></span>
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-900">
            New Email
            <motion.span
              className={publishing
                ? "rounded-full bg-emerald-50 px-2 py-1 text-[6px] font-black text-emerald-700"
                : "rounded-full bg-amber-50 px-2 py-1 text-[6px] font-black text-amber-700"
              }
            >
              {publishing ? "Publishing" : saved ? "Draft saved" : "Draft"}
            </motion.span>
          </div>
          <div className="mt-0.5 text-[6.5px] font-semibold text-slate-400">Campaign editor</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <motion.span
            className="inline-flex items-center gap-1.5 rounded-[8px] border border-slate-200 px-3 py-2 text-[7.5px] font-black text-slate-600"
            animate={{ boxShadow: saved && !publishing ? "0 0 0 3px rgba(37,99,255,.08)" : "0 0 0 0 rgba(37,99,255,0)" }}
          >
            <Save className="h-3 w-3" /> Save Draft
          </motion.span>
          <motion.span
            className="inline-flex items-center gap-1.5 rounded-[8px] bg-zapla-ink px-3 py-2 text-[7.5px] font-black text-white"
            animate={{ boxShadow: publishing ? "0 0 0 5px rgba(16,185,129,.14)" : "0 0 0 0 rgba(16,185,129,0)" }}
          >
            <Send className="h-3 w-3" /> Publish
          </motion.span>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(260px,42%)_minmax(0,1fr)]">
        <div className="min-h-0 overflow-hidden border-r border-slate-200 bg-white p-4">
          <InputField label="Campaign name" value="Friday availability" ready={fieldsReady} />
          <div className="mt-3"><InputField label="Subject" value="Only 3 spots left this Friday" ready={fieldsReady} accent={fieldsReady} /></div>

          <div className="mt-3">
            <div className="mb-1.5 text-[6.5px] font-black uppercase tracking-[.12em] text-slate-400">Email type</div>
            <div className="inline-flex rounded-[9px] border border-slate-200 bg-slate-50 p-[2px]">
              <span className="rounded-[7px] bg-white px-3 py-1.5 text-[7px] font-black text-slate-700 shadow-sm">Manual</span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 text-[7px] font-bold text-slate-400"><Code2 className="h-3 w-3" /> HTML</span>
            </div>
          </div>

          <div className="mt-3">
            <div className="mb-1.5 text-[6.5px] font-black uppercase tracking-[.12em] text-slate-400">From</div>
            <div className="flex h-9 items-center justify-between rounded-[9px] border border-slate-200 px-3 text-[7.5px] font-bold text-slate-600">
              North & Pine <ChevronDown className="h-3 w-3 text-slate-300" />
            </div>
          </div>

          <motion.div
            className="mt-4 rounded-[11px] border border-blue-100 bg-blue-50/45 p-3"
            initial={false}
            animate={{ opacity: contentReady ? 1 : 0.4 }}
          >
            <div className="flex items-center gap-1.5 text-[7px] font-black text-blue-700"><Mail className="h-3 w-3" /> Personalisation</div>
            <div className="mt-1.5 text-[7px] font-semibold leading-relaxed text-slate-500">Merge fields automatically personalise each send using the contact record.</div>
          </motion.div>
        </div>

        <EmailPreview contentReady={contentReady} reduced={reduced} />
      </div>
    </motion.div>
  );
}

export function SceneEmailLive({ phase, reduced }: SceneProps) {
  const editorOpen = phase >= 1 && phase <= 5;
  const finalPublished = phase >= 6;

  const points: Record<number, CursorPoint> = {
    1: { left: "91%", top: "6%" },
    2: { left: "23%", top: "23%" },
    3: { left: "58%", top: "49%" },
    4: { left: "78%", top: "6%" },
    5: { left: "92%", top: "6%" },
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      <CampaignList finalPublished={finalPublished} reduced={reduced} />
      <AnimatePresence>{editorOpen ? <EditorWorkspace phase={phase} reduced={reduced} /> : null}</AnimatePresence>
      <ZaplaDemoCursor point={points[phase] ?? null} press={phase === 1 || phase === 4 || phase === 5} reduced={reduced} />
    </div>
  );
}
