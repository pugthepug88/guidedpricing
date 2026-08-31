import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clock3,
  Filter,
  FormInput,
  Globe2,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Send,
  Target,
  UserPlus,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/v5/kit";
import { SceneContacts, type SceneProps } from "@/components/v5/scenes-a";
import { SceneSalesLive } from "@/components/v5/scene-sales-live";
import { SceneInboxLive } from "@/components/v5/scene-inbox-live";
import { SceneAutomationsLive } from "@/components/v5/scene-automations-live";
import { SceneContentLive } from "@/components/v5/scene-content-live";
import { SceneEmailPolished } from "@/components/v5/scene-email-polished";
import { SceneCalendarLive } from "@/components/v5/scene-calendar-live";
import { SceneContractsLive } from "@/components/v5/scene-contracts-live";
import { useSceneClock } from "@/components/v5/use-scene-clock";
import { FACE } from "@/components/v5/faces";

const DISPLAY = '\"Inter Tight\", \"Outfit\", \"Manrope\", system-ui, sans-serif';
const MONO = '\"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.22, 1, 0.36, 1] as const;

const JOURNEY_DURATIONS = [1200, 1450, 1600, 1450, 1700, 1250, 1550, 1700, 2500];

type SceneDef = {
  key: string;
  label: string;
  title: string;
  subtitle: string;
  phases: number[];
  render: (p: SceneProps) => ReactNode;
};

const EXPLORE_SCENES: SceneDef[] = [
  {
    key: "contacts",
    label: "Contacts",
    title: "Contacts",
    subtitle: "Every customer record in one place",
    phases: [1400, 520, 780, 900, 780, 420, 420, 420, 420, 760, 660, 1750, 640, 3500, 400, 340, 340, 340, 2600],
    render: (p) => <SceneContacts {...p} />,
  },
  {
    key: "opportunities",
    label: "Sales",
    title: "Sales",
    subtitle: "Every enquiry visible, every next step clear",
    phases: [1300, 700, 420, 1000, 1000, 500, 320, 800, 600, 350, 900, 1450, 1800],
    render: (p) => <SceneSalesLive {...p} />,
  },
  {
    key: "inbox",
    label: "Unified Inbox",
    title: "Unified Inbox",
    subtitle: "Every channel, one conversation",
    phases: [1200, 650, 900, 1000, 1250, 550, 1200, 950, 1800],
    render: (p) => <SceneInboxLive {...p} />,
  },
  {
    key: "automations",
    label: "Automations",
    title: "Automations",
    subtitle: "Follow-up happens without anyone remembering",
    phases: [1200, 900, 900, 1100, 900, 900, 1000, 1400, 900, 900, 1800],
    render: (p) => <SceneAutomationsLive {...p} />,
  },
  {
    key: "content",
    label: "Content Planner",
    title: "Content Planner",
    subtitle: "Stay visible across the channels customers already use",
    phases: [700, 500, 2000, 1700, 900, 1800, 2700],
    render: (p) => <SceneContentLive {...p} />,
  },
  {
    key: "email",
    label: "Email Marketing",
    title: "Email Marketing",
    subtitle: "Keep the conversation moving beyond the first message",
    phases: [650, 900, 1150, 1250, 900, 900, 900, 650, 950, 1700, 1400],
    render: (p) => <SceneEmailPolished {...p} />,
  },
  {
    key: "calendar",
    label: "Calendar",
    title: "Calendar",
    subtitle: "A selected time becomes a real appointment",
    phases: [700, 720, 900, 900, 1700, 2100],
    render: (p) => <SceneCalendarLive {...p} />,
  },
  {
    key: "contracts",
    label: "Contracts",
    title: "Contracts",
    subtitle: "Send, sign and close the loop",
    phases: [520, 600, 700, 700, 800, 800, 1100, 1800],
    render: (p) => <SceneContractsLive {...p} />,
  },
];

type JourneyMeta = {
  key: "contacts" | "inbox" | "automations" | "opportunities" | "calendar";
  title: string;
  subtitle: string;
};

const JOURNEY_META: JourneyMeta[] = [
  { key: "contacts", title: "Contacts", subtitle: "A new website enquiry arrives" },
  { key: "contacts", title: "Contacts", subtitle: "The lead becomes a customer record" },
  { key: "inbox", title: "Unified Inbox", subtitle: "The conversation starts immediately" },
  { key: "automations", title: "Automations", subtitle: "No reply? The next step is already waiting" },
  { key: "inbox", title: "Unified Inbox", subtitle: "The whole conversation stays together" },
  { key: "opportunities", title: "Sales", subtitle: "The enquiry enters the pipeline" },
  { key: "opportunities", title: "Sales", subtitle: "The opportunity moves forward" },
  { key: "calendar", title: "Calendar", subtitle: "The next step becomes a real booking" },
  { key: "calendar", title: "Calendar", subtitle: "One customer. Every next step connected." },
];

const CONTACT_ROWS = [
  ["Maya Chen", "0412 483 721", "VIP", "7 months ago", "Referral", FACE.maya],
  ["Daniel Ross", "0423 691 284", "Client", "34 min ago", "Website", FACE.daniel],
  ["Priya Nair", "0431 572 116", "Repeat", "42 min ago", "Instagram", FACE.priya],
  ["Tom Whyte", "0408 334 906", "Client", "1 hr ago", "Google Ads", FACE.tom],
  ["Sophie Bell", "0417 825 540", "Client", "3 days ago", "Website", FACE.sophie],
  ["Leo Marsh", "0428 614 218", "Client", "Yesterday", "Referral", FACE.leo],
] as const;

const STATIC_DEALS = {
  new: [
    ["Northside Plumbing", "$2,400", FACE.sam],
    ["Willow Pilates", "$1,800", FACE.sophie],
  ],
  qualified: [
    ["Bright Path Physio", "$3,600", FACE.alex],
    ["Cedar & Co Interiors", "$7,500", FACE.nina],
  ],
  proposal: [["Atlas Auto Care", "$5,200", FACE.daniel]],
  negotiation: [["Bloom Skin Studio", "$4,400", FACE.jordan]],
  won: [["Coastal Dental", "$6,800", FACE.leo]],
} as const;

function SarahIdentity({
  detail,
  compact = false,
  inverse = false,
  className,
}: {
  detail: string;
  compact?: boolean;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      layoutId="zapla-v6-sarah-identity"
      transition={{ type: "spring", stiffness: 260, damping: 27, mass: 0.9 }}
      className={cn("flex min-w-0 items-center gap-2", className)}
    >
      <img
        src={FACE.nina}
        alt=""
        aria-hidden
        className={cn(
          "shrink-0 rounded-full object-cover ring-1",
          inverse ? "ring-white/30" : "ring-slate-200",
          compact ? "h-6 w-6" : "h-8 w-8",
        )}
      />
      <div className="min-w-0">
        <div
          className={cn(
            "truncate font-semibold leading-tight",
            inverse ? "text-white" : "text-slate-800",
            compact ? "text-[10.5px]" : "text-[12px]",
          )}
        >
          Sarah Nguyen
        </div>
        <div
          className={cn(
            "truncate leading-tight",
            inverse ? "text-white/65" : "text-slate-400",
            compact ? "text-[8.5px]" : "text-[10px]",
          )}
        >
          {detail}
        </div>
      </div>
    </motion.div>
  );
}

function WebsiteEnquiryCard({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: -14, x: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.96 }}
      transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
      className="absolute right-[4%] top-[12%] z-30 w-[286px] max-w-[88%] overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_22px_48px_-24px_rgba(15,23,42,0.42)]"
    >
      <div className="flex items-center gap-2 border-b border-slate-100 px-3.5 py-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-blue-50 text-zapla-blue">
          <Globe2 className="h-3.5 w-3.5" />
        </span>
        <div>
          <div className="text-[10.5px] font-bold text-slate-800">New website enquiry</div>
          <div className="text-[8.5px] text-slate-400" style={{ fontFamily: MONO }}>
            10:42 AM · just now
          </div>
        </div>
        <span className="ml-auto h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.12)]" />
      </div>
      <div className="space-y-2.5 px-3.5 py-3">
        <SarahIdentity detail="Website lead" />
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-[8px] border border-slate-200 bg-slate-50 px-2.5 py-2">
            <div className="text-[7.5px] font-bold uppercase tracking-[0.1em] text-slate-400">Phone</div>
            <div className="mt-0.5 text-[10px] font-semibold text-slate-700">0412 620 184</div>
          </div>
          <div className="rounded-[8px] border border-slate-200 bg-slate-50 px-2.5 py-2">
            <div className="text-[7.5px] font-bold uppercase tracking-[0.1em] text-slate-400">Source</div>
            <div className="mt-0.5 text-[10px] font-semibold text-slate-700">Quote form</div>
          </div>
        </div>
        <div className="rounded-[8px] bg-slate-50 px-2.5 py-2 text-[10px] leading-[1.45] text-slate-600">
          “Hi, I’m looking for a quote. Could someone call me this week?”
        </div>
      </div>
    </motion.div>
  );
}

function ContactRow({
  name,
  phone,
  tag,
  last,
  source,
  face,
}: {
  name: string;
  phone: string;
  tag: string;
  last: string;
  source: string;
  face: string;
}) {
  return (
    <div
      className="grid items-center gap-2 px-3 py-[8px]"
      style={{ gridTemplateColumns: "26px minmax(0,1.8fr) 126px 110px 100px 88px 90px" }}
    >
      <span className="h-[13px] w-[13px] rounded-[3px] border border-slate-300 bg-white" />
      <div className="flex min-w-0 items-center gap-2">
        <img src={face} alt="" className="h-6 w-6 shrink-0 rounded-full object-cover ring-1 ring-slate-100" />
        <div className="min-w-0">
          <div className="truncate text-[11.5px] font-semibold text-slate-800">{name}</div>
          <div className="truncate text-[9.5px] text-slate-400">{name.toLowerCase().replace(" ", ".")}@example.com.au</div>
        </div>
      </div>
      <span className="truncate text-[10.5px] text-slate-500">{phone}</span>
      <span className="w-fit rounded-full bg-slate-100 px-2 py-[2px] text-[9.5px] font-semibold text-slate-600">{tag}</span>
      <span className="truncate text-[10.5px] text-slate-400">{last}</span>
      <span className="truncate text-[10.5px] text-slate-400">{source}</span>
      <span className="w-fit rounded-full bg-slate-50 px-2 py-[2px] text-[9.5px] font-semibold text-slate-500">Active</span>
    </div>
  );
}

function ContactsJourney({ phase, reduced }: { phase: number; reduced: boolean }) {
  const captured = phase >= 1;
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F8FAFF]">
      <div className="absolute inset-0 flex flex-col px-4 pb-3 pt-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-[12.5px] font-bold tracking-tight text-slate-800">All contacts</span>
          <motion.span
            key={captured ? "9" : "8"}
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-full bg-slate-100 px-2 py-[2px] text-[10px] font-semibold text-slate-500"
          >
            {captured ? "9 contacts" : "8 contacts"}
          </motion.span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-[4px] text-[10.5px] font-medium text-slate-400">
              <Filter className="h-[10px] w-[10px]" /> Filter
            </span>
            <span className="rounded-md border border-slate-200 bg-white px-2 py-[4px] text-[10.5px] font-medium text-slate-400">Sort</span>
          </div>
        </div>
        <div className="min-h-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="hidden min-w-[760px] sm:block">
            <div
              className="grid items-center gap-2 border-b border-slate-200 bg-slate-50/80 px-3 py-[7px] text-[9.5px] font-semibold uppercase tracking-wide text-slate-400"
              style={{ gridTemplateColumns: "26px minmax(0,1.8fr) 126px 110px 100px 88px 90px" }}
            >
              <span />
              <span>Contact</span>
              <span>Phone</span>
              <span>Tags</span>
              <span>Last activity</span>
              <span>Source</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-slate-100">
              <AnimatePresence initial={false}>
                {captured ? (
                  <motion.div
                    key="sarah-contact-row"
                    initial={reduced ? false : { height: 0, opacity: 0, y: -12 }}
                    animate={{ height: 54, opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
                    className="overflow-hidden bg-blue-50/70"
                  >
                    <div
                      className="grid h-[54px] items-center gap-2 px-3"
                      style={{ gridTemplateColumns: "26px minmax(0,1.8fr) 126px 110px 100px 88px 90px" }}
                    >
                      <span className="flex h-[13px] w-[13px] items-center justify-center rounded-[3px] border border-zapla-blue bg-zapla-blue text-white">
                        <Check className="h-[9px] w-[9px]" strokeWidth={3.5} />
                      </span>
                      <SarahIdentity detail="sarah.nguyen@example.com.au" compact />
                      <span className="truncate text-[10.5px] text-slate-600">0412 620 184</span>
                      <span className="w-fit rounded-full bg-blue-100 px-2 py-[2px] text-[9.5px] font-semibold text-blue-700">New enquiry</span>
                      <span className="font-semibold text-[10.5px] text-blue-700">Just now</span>
                      <span className="text-[10.5px] text-slate-500">Website</span>
                      <span className="w-fit rounded-full bg-emerald-50 px-2 py-[2px] text-[9.5px] font-semibold text-emerald-700">Active</span>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              {CONTACT_ROWS.map(([name, phone, tag, last, source, face]) => (
                <ContactRow key={name} name={name} phone={phone} tag={tag} last={last} source={source} face={face} />
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100 sm:hidden">
            {captured ? (
              <div className="bg-blue-50/70 px-3 py-3">
                <SarahIdentity detail="Website · just now" />
              </div>
            ) : null}
            {CONTACT_ROWS.slice(0, 5).map(([name, , tag, last, , face]) => (
              <div key={name} className="flex items-center gap-2.5 px-3 py-2.5">
                <img src={face} alt="" className="h-7 w-7 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[11.5px] font-semibold text-slate-800">{name}</div>
                  <div className="text-[9.5px] text-slate-400">{last}</div>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-[2px] text-[9px] font-semibold text-slate-500">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence initial={false}>{phase === 0 ? <WebsiteEnquiryCard reduced={reduced} /> : null}</AnimatePresence>
      {captured ? (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.4, duration: reduced ? 0 : 0.4 }}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-3 py-2 shadow-[0_12px_28px_-18px_rgba(15,23,42,.34)]"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <UserPlus className="h-3 w-3" />
          </span>
          <div>
            <div className="text-[10.5px] font-semibold text-slate-800">Contact created automatically</div>
            <div className="text-[8.5px] text-slate-400">Source, phone and enquiry attached</div>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}

function InboxJourney({ afterFollowUp, reduced }: { afterFollowUp: boolean; reduced: boolean }) {
  const convos = [
    ["Sarah Nguyen", afterFollowUp ? "Yep, Thursday afternoon works." : "Hi, I’m looking for a quote…", "now", FACE.nina],
    ["Daniel Ross", "Sending through the updated scope now.", "9m", FACE.daniel],
    ["Sophie Bell", "Thanks for the quote, one question.", "14m", FACE.sophie],
    ["Priya Nair", "Perfect, see you then.", "42m", FACE.priya],
    ["Tom Whyte", "Do you service the northern suburbs?", "1h", FACE.tom],
  ] as const;

  return (
    <div className="absolute inset-0 flex overflow-hidden bg-[#F8FAFF]">
      <div className="hidden w-[124px] shrink-0 flex-col border-r border-slate-200/80 bg-white/85 px-2 py-2.5 sm:flex lg:w-[142px]">
        <div className="px-1 pb-1.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-slate-400">Inbox</div>
        {["Inbox", "Unread", "Assigned to me"].map((label, index) => (
          <div key={label} className={cn("flex items-center gap-2 rounded-lg px-2 py-[6px]", index === 0 ? "bg-blue-50 text-blue-700" : "text-slate-500")}>
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="text-[10.5px] font-semibold">{label}</span>
            <span className="ml-auto rounded-full bg-slate-100 px-1.5 py-[1px] text-[9px] font-bold text-slate-500">{index === 0 ? 13 : index === 1 ? 4 : 3}</span>
          </div>
        ))}
        <div className="mt-3 px-1 pb-1 text-[9.5px] font-bold uppercase tracking-[0.1em] text-slate-400">Channels</div>
        {["SMS", "Email", "Instagram", "Facebook"].map((label) => (
          <div key={label} className="flex items-center gap-2 rounded-lg px-2 py-[4px] text-[10px] font-medium text-slate-500">
            <span className="h-2 w-2 rounded-full bg-slate-300" /> {label}
          </div>
        ))}
      </div>

      <div className="w-[34%] min-w-[150px] max-w-[260px] shrink-0 border-r border-slate-200 bg-white">
        <div className="flex h-10 items-center border-b border-slate-100 px-3 text-[11px] font-bold text-slate-700">All conversations</div>
        <div className="divide-y divide-slate-100">
          {convos.map(([name, preview, time, face], index) => (
            <div key={name} className={cn("flex items-center gap-2.5 px-3 py-2.5", index === 0 ? "bg-blue-50/75" : "bg-white")}>
              <img src={face} alt="" className="h-7 w-7 shrink-0 rounded-full object-cover ring-1 ring-slate-100" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-[10.5px] font-semibold text-slate-800">{name}</span>
                  {index === 0 ? <span className="h-1.5 w-1.5 rounded-full bg-zapla-blue" /> : null}
                </div>
                <div className="truncate text-[9.5px] text-slate-400">{preview}</div>
              </div>
              <span className="text-[8.5px] text-slate-400">{time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col bg-white">
        <div className="flex h-[52px] shrink-0 items-center gap-2.5 border-b border-slate-200 px-3.5">
          <SarahIdentity detail="Website enquiry · SMS" />
          <span className="ml-auto rounded-full bg-emerald-50 px-2 py-[3px] text-[9px] font-semibold text-emerald-700">Open</span>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden bg-[#FBFCFF] px-3.5 py-3.5">
          <div className="mx-auto flex h-full max-w-[560px] flex-col justify-end gap-2.5">
            <div className="self-start rounded-[10px] border border-slate-200 bg-white px-3 py-2 text-[10.5px] leading-[1.45] text-slate-600 shadow-[0_8px_20px_-18px_rgba(15,23,42,.35)]">
              <div className="mb-1 flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-slate-400">
                <FormInput className="h-2.5 w-2.5" /> Website enquiry
              </div>
              “Hi, I’m looking for a quote. Could someone call me this week?”
            </div>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="self-end max-w-[78%] rounded-[12px] rounded-br-[4px] bg-zapla-blue px-3 py-2 text-[10.5px] leading-[1.45] text-white"
            >
              Hi Sarah, thanks for reaching out. Happy to help. Would Thursday afternoon work for a quick call?
              <div className="mt-1 text-right text-[7.5px] text-white/60">10:43 AM · SMS sent</div>
            </motion.div>

            {afterFollowUp ? (
              <>
                <div className="my-0.5 flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-300">
                  <span className="h-px flex-1 bg-slate-200" /> 2 days later <span className="h-px flex-1 bg-slate-200" />
                </div>
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.42, ease: EASE }}
                  className="self-end max-w-[80%] rounded-[12px] rounded-br-[4px] bg-slate-900 px-3 py-2 text-[10.5px] leading-[1.45] text-white"
                >
                  Just following up on your quote request, Sarah. I can hold Thursday at 2:30 PM if that suits.
                  <div className="mt-1 flex justify-end gap-1.5 text-[7.5px] text-white/60">
                    <span className="rounded bg-white/10 px-1 py-[1px]">AUTOMATED</span> 8:30 AM
                  </div>
                </motion.div>
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.38, duration: reduced ? 0 : 0.42, ease: EASE }}
                  className="self-start max-w-[72%] rounded-[12px] rounded-bl-[4px] bg-slate-100 px-3 py-2 text-[10.5px] leading-[1.45] text-slate-700"
                >
                  Yep, Thursday afternoon works.
                  <div className="mt-1 text-[7.5px] text-slate-400">8:41 AM · SMS</div>
                </motion.div>
              </>
            ) : null}
          </div>
        </div>
        <div className="m-2.5 flex h-11 items-center gap-2 rounded-[13px] border border-slate-200 bg-slate-50 px-2.5">
          <span className="min-w-0 flex-1 text-[9.5px] font-medium text-slate-400">Type a message…</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-zapla-blue text-white"><Send className="h-3.5 w-3.5" /></span>
        </div>
      </div>
    </div>
  );
}

function AutomationNode({
  icon,
  kind,
  title,
  detail,
  active,
  done,
}: {
  icon: ReactNode;
  kind: string;
  title: string;
  detail: string;
  active?: boolean;
  done?: boolean;
}) {
  return (
    <motion.div
      animate={{
        scale: active ? 1.018 : 1,
        boxShadow: active
          ? "0 0 0 2px rgba(37,99,255,0.62), 0 18px 30px -22px rgba(37,99,255,0.58)"
          : "0 0 0 1px rgba(226,232,240,0.95), 0 8px 18px -16px rgba(15,23,42,0.34)",
      }}
      transition={{ duration: 0.35, ease: EASE }}
      className="relative w-[220px] max-w-[84vw] rounded-[14px] bg-white px-3 py-2.5"
    >
      <div className="flex items-start gap-2.5">
        <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px]", done ? "bg-emerald-50 text-emerald-600" : active ? "bg-blue-50 text-zapla-blue" : "bg-slate-100 text-slate-400")}>{icon}</span>
        <div className="min-w-0 flex-1">
          <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-slate-400">{kind}</div>
          <div className="mt-0.5 text-[11.5px] font-bold tracking-tight text-slate-900">{title}</div>
          <div className="mt-0.5 text-[9px] leading-[1.4] text-slate-400">{detail}</div>
        </div>
      </div>
      {done ? <span className="absolute -right-1.5 -top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-emerald-500 text-white"><Check className="h-[11px] w-[11px]" strokeWidth={3.5} /></span> : null}
    </motion.div>
  );
}

function AutomationsJourney({ reduced }: { reduced: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-slate-50/70">
      <div className="flex items-center gap-2 border-b border-slate-200/80 bg-white/85 px-3.5 py-2">
        <span className="hidden text-[10px] font-medium text-slate-400 sm:inline">Automations / Workflows /</span>
        <span className="truncate text-[12px] font-bold tracking-tight text-slate-800">New lead follow-up</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-[2px] text-[9.5px] font-bold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="rounded-md bg-zapla-ink px-2 py-[3px] text-[9.5px] font-semibold text-white">Published</span>
          <MoreHorizontal className="h-3.5 w-3.5 text-slate-300" />
        </div>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "radial-gradient(rgba(148,163,184,0.38) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
        <svg className="absolute left-1/2 top-1/2 h-[330px] w-[520px] max-w-[90%] -translate-x-1/2 -translate-y-1/2" viewBox="0 0 520 330" fill="none" aria-hidden>
          <path d="M260 72 V116" stroke="rgba(148,163,184,.55)" strokeWidth="2" />
          <path d="M260 185 V228" stroke="rgba(148,163,184,.55)" strokeWidth="2" />
          <motion.path d="M260 72 V116" stroke="#2563ff" strokeWidth="2.5" initial={reduced ? { pathLength: 1 } : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduced ? 0 : 0.5, ease: EASE }} />
          <motion.path d="M260 185 V228" stroke="#22d3ee" strokeWidth="2.5" initial={reduced ? { pathLength: 1 } : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: reduced ? 0 : 0.45, duration: reduced ? 0 : 0.5, ease: EASE }} />
        </svg>
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
          <div className="mb-1 rounded-[12px] border border-blue-100 bg-white px-3 py-2 shadow-[0_10px_24px_-18px_rgba(15,23,42,.34)]">
            <SarahIdentity detail="No reply · 2 days" compact />
          </div>
          <AutomationNode icon={<Clock3 className="h-3.5 w-3.5" />} kind="Condition" title="No reply after 2 days" detail="Continue only if the customer has not replied" done />
          <AutomationNode icon={<MessageSquare className="h-3.5 w-3.5" />} kind="Action" title="Send follow-up SMS" detail="Use the same conversation and customer record" active />
          <AutomationNode icon={<Target className="h-3.5 w-3.5" />} kind="Next step" title="Wait for response" detail="Route the reply back into the Unified Inbox" />
        </div>
      </div>
    </div>
  );
}

function DealCard({ name, value, face }: { name: string; value: string; face: string }) {
  return (
    <div className="rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
      <div className="flex items-center gap-2">
        <img src={face} alt="" className="h-6 w-6 rounded-full object-cover ring-2 ring-white" />
        <div className="min-w-0 flex-1 truncate text-[10.5px] font-semibold text-slate-800">{name}</div>
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <span className="text-[11.5px] font-bold text-slate-900">{value}</span>
        <span className="text-[8.5px] text-slate-400">Today</span>
      </div>
    </div>
  );
}

function SarahDealCard({ qualified }: { qualified: boolean }) {
  return (
    <motion.div
      layoutId="zapla-v6-sarah-deal"
      transition={{ type: "spring", stiffness: 230, damping: 24, mass: 0.9 }}
      className={cn("rounded-xl border bg-white p-2.5", qualified ? "border-teal-300 shadow-[0_0_0_3px_rgba(20,184,166,0.10)]" : "border-zapla-blue/45 shadow-[0_0_0_3px_rgba(37,99,255,0.09)]")}
    >
      <SarahIdentity detail={qualified ? "Qualified · Website" : "New enquiry · Website"} compact />
      <div className="mt-1.5 flex items-center justify-between">
        <span className="text-[11.5px] font-bold text-slate-900">Quote request</span>
        <span className={cn("rounded-full px-1.5 py-[2px] text-[8.5px] font-semibold", qualified ? "bg-teal-50 text-teal-700" : "bg-blue-50 text-blue-700")}>{qualified ? "Qualified" : "New"}</span>
      </div>
    </motion.div>
  );
}

function SalesJourney({ qualified, reduced }: { qualified: boolean; reduced: boolean }) {
  const stages = [
    ["new", "New Enquiry", "bg-blue-500"],
    ["qualified", "Qualified", "bg-teal-500"],
    ["proposal", "Proposal Sent", "bg-amber-500"],
    ["negotiation", "Negotiation", "bg-violet-500"],
    ["won", "Won", "bg-emerald-500"],
  ] as const;

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-slate-50/70">
      <div className="flex items-center gap-3 border-b border-slate-200/80 bg-white/85 px-3.5 py-2">
        <span className="text-[12px] font-bold tracking-tight text-slate-700">Sales Pipeline</span>
        <div className="ml-auto flex items-center gap-2">
          {qualified ? <motion.span initial={reduced ? false : { opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="rounded-full bg-teal-50 px-2 py-[2px] text-[9.5px] font-bold text-teal-700">Stage updated</motion.span> : null}
          <span className="text-[9px] font-medium uppercase tracking-[0.08em] text-slate-400">Open pipeline</span>
          <span className="text-[12px] font-extrabold text-slate-900">$49,600</span>
        </div>
      </div>
      <div className="zapla-scroll-hide min-h-0 flex-1 overflow-x-auto overflow-y-hidden">
        <LayoutGroup id="zapla-v6-sales-board">
          <div className="flex h-full min-w-[560px] gap-1.5 px-2.5 py-3">
            {stages.map(([key, label, dot]) => {
              const active = key === (qualified ? "qualified" : "new");
              const staticDeals = STATIC_DEALS[key];
              return (
                <motion.div
                  key={key}
                  animate={{
                    boxShadow: active ? "0 0 0 2px rgba(34,211,238,0.42)" : "0 0 0 1px rgba(226,232,240,0.9)",
                    backgroundColor: active ? "rgba(240,249,255,0.82)" : "rgba(255,255,255,0.72)",
                  }}
                  className="flex min-w-[104px] flex-1 flex-col rounded-2xl px-1.5 pb-2 pt-2.5"
                >
                  <div className="mb-2 flex items-center gap-1.5 px-0.5">
                    <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
                    <span className="truncate text-[9.5px] font-bold uppercase tracking-[0.08em] text-slate-500">{label}</span>
                    <span className="ml-auto rounded-full bg-slate-100 px-1.5 py-[1px] text-[8.5px] font-bold text-slate-500">{staticDeals.length + (active ? 1 : 0)}</span>
                  </div>
                  <div className={cn("h-[2px] rounded-full opacity-70", dot)} />
                  <div className="mt-2 space-y-2">
                    {active ? <SarahDealCard qualified={qualified} /> : null}
                    {staticDeals.map(([name, value, face]) => <DealCard key={name} name={name} value={value} face={face} />)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}

const CALENDAR_CELLS = Array.from({ length: 35 }, (_, i) => i + 1);

function CalendarJourney({ final, reduced }: { final: boolean; reduced: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-white">
      <div className="flex h-[58px] items-center gap-2 border-b border-slate-200 bg-white px-4">
        <div className="mr-2">
          <div className="text-[13px] font-black tracking-tight text-slate-900">August 2026</div>
          <div className="mt-0.5 text-[6.5px] font-semibold text-slate-400">Calendar</div>
        </div>
        <span className="rounded-[9px] border border-slate-200 bg-white px-3 py-1.5 text-[7px] font-black text-slate-600">Today</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center rounded-[10px] border border-slate-200 bg-slate-50 p-0.5 sm:flex">
            {["Day", "Week", "Month"].map((view) => <span key={view} className={view === "Month" ? "rounded-[8px] bg-white px-3 py-1.5 text-[7.5px] font-black text-slate-800 shadow-[0_5px_12px_-10px_rgba(15,23,42,.55)]" : "px-3 py-1.5 text-[7.5px] font-bold text-slate-400"}>{view}</span>)}
          </div>
          <span className="flex items-center gap-1.5 rounded-[10px] bg-[#2563eb] px-3.5 py-2 text-[7.5px] font-black text-white"><CalendarCheck className="h-3 w-3" /> New</span>
        </div>
      </div>
      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/70 text-center text-[7px] font-black uppercase tracking-[.08em] text-slate-400">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <div key={d} className="border-r border-slate-200 py-1.5 last:border-r-0">{d}</div>)}
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-7 grid-rows-5">
        {CALENDAR_CELLS.map((day, index) => {
          const bookingCell = day === 20;
          const existing = day === 6 || day === 11 || day === 17 || day === 27;
          return (
            <div key={day} className="relative min-h-0 overflow-hidden border-b border-r border-slate-100 bg-white px-1.5 py-1.5">
              <span className={cn("text-[7px] font-black", day === 18 ? "inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white" : "text-slate-500")}>{day}</span>
              {existing ? <div className="mt-1 rounded-[8px] border border-slate-200 border-l-[3px] border-l-violet-500 bg-white px-1.5 py-1 shadow-[0_8px_20px_-16px_rgba(15,23,42,.5)]"><div className="truncate text-[6.5px] font-black text-slate-700">Consultation</div><div className="text-[5.5px] font-semibold text-slate-400">{index % 2 ? "11:00" : "2:00"}</div></div> : null}
              {bookingCell ? (
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 8, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
                  className="mt-1 rounded-[9px] border border-slate-200 border-l-[3px] border-l-blue-500 bg-white px-1.5 py-1.5 shadow-[0_10px_22px_-16px_rgba(15,23,42,.45)]"
                >
                  <SarahIdentity detail="2:30 · Quote call" compact />
                </motion.div>
              ) : null}
            </div>
          );
        })}
      </div>
      <AnimatePresence>
        {final ? (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
            className="absolute bottom-4 right-4 z-30 flex max-w-[310px] items-center gap-2.5 rounded-[12px] border border-slate-200 bg-white/96 px-3 py-2.5 shadow-[0_16px_36px_-18px_rgba(15,23,42,.35)] backdrop-blur"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
            <div>
              <div className="text-[10.5px] font-semibold text-slate-900">Appointment confirmed</div>
              <div className="text-[8.5px] text-slate-400">Sarah Nguyen · Thu 2:30 PM · confirmation sent</div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function JourneyStage({ phase, reduced }: { phase: number; reduced: boolean }) {
  const sceneKey = phase <= 1 ? "contacts" : phase === 2 ? "inbox-before" : phase === 3 ? "automations" : phase === 4 ? "inbox-after" : phase <= 6 ? "sales" : "calendar";

  return (
    <LayoutGroup id="zapla-v6-customer-journey">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={sceneKey}
          className="absolute inset-0"
          initial={reduced ? false : { opacity: 0, x: 18, scale: 0.992 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -14, scale: 0.994 }}
          transition={{ duration: reduced ? 0 : 0.48, ease: EASE }}
        >
          {phase <= 1 ? <ContactsJourney phase={phase} reduced={reduced} /> : null}
          {phase === 2 ? <InboxJourney afterFollowUp={false} reduced={reduced} /> : null}
          {phase === 3 ? <AutomationsJourney reduced={reduced} /> : null}
          {phase === 4 ? <InboxJourney afterFollowUp reduced={reduced} /> : null}
          {phase === 5 || phase === 6 ? <SalesJourney qualified={phase >= 6} reduced={reduced} /> : null}
          {phase >= 7 ? <CalendarJourney final={phase >= 8} reduced={reduced} /> : null}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
}

function ExploreScene({ scene, paused, reduced, runKey }: { scene: SceneDef; paused: boolean; reduced: boolean; runKey: number }) {
  const { phase, elapsedMs } = useSceneClock({
    durations: scene.phases,
    paused,
    reduced,
    restartKey: `${scene.key}-${runKey}`,
  });

  return (
    <AppShell activeKey={scene.key} title={scene.title} subtitle={scene.subtitle}>
      <div key={`${scene.key}-${runKey}`} className="absolute inset-0">
        {scene.render({ phase, elapsedMs, reduced })}
      </div>
    </AppShell>
  );
}

export function ZaplaCustomerJourneyShowcaseV6() {
  const reduced = !!useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.28, once: false });
  const [hoverPaused, setHoverPaused] = useState(false);
  const [storyComplete, setStoryComplete] = useState(false);
  const [storyRunKey, setStoryRunKey] = useState(0);
  const [exploreIndex, setExploreIndex] = useState<number | null>(null);
  const [exploreRunKey, setExploreRunKey] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const storyPaused = hoverPaused || !inView || storyComplete || exploreIndex !== null;
  const { phase } = useSceneClock({
    durations: JOURNEY_DURATIONS,
    paused: storyPaused,
    reduced,
    restartKey: storyRunKey,
    onComplete: () => setStoryComplete(true),
  });
  const storyPhase = reduced ? JOURNEY_META.length - 1 : phase;
  const journeyMeta = JOURNEY_META[storyPhase] ?? JOURNEY_META[JOURNEY_META.length - 1];

  const activeIndex = exploreIndex ?? EXPLORE_SCENES.findIndex((scene) => scene.key === journeyMeta.key);
  const activeExploreScene = exploreIndex == null ? null : EXPLORE_SCENES[exploreIndex];

  const selectScene = useCallback((index: number) => {
    setStoryComplete(true);
    setExploreIndex(index);
    setExploreRunKey((k) => k + 1);
  }, []);

  const replayStory = useCallback(() => {
    setExploreIndex(null);
    setStoryComplete(false);
    setStoryRunKey((k) => k + 1);
  }, []);

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (index + 1) % EXPLORE_SCENES.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + EXPLORE_SCENES.length) % EXPLORE_SCENES.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = EXPLORE_SCENES.length - 1;
    if (next < 0) return;
    e.preventDefault();
    selectScene(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section ref={sectionRef} id="zapla-product-v6" className="relative overflow-hidden bg-[#F7F8FA] px-5 py-20 sm:px-8 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
      <div className="relative mx-auto max-w-[1360px]">
        <div className="max-w-[920px]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.19em] text-cyan-600">The platform behind the follow-through</div>
          <h2 className="mt-4 text-[38px] leading-[1.01] tracking-[-0.045em] text-[#111318] sm:text-[58px] lg:text-[68px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
            One platform. Every customer step connected.
          </h2>
          <p className="mt-5 max-w-[760px] text-[16px] leading-[1.65] text-slate-500 sm:text-[17px]">
            Watch one enquiry become a contact, a conversation, an opportunity and a booked next step — without the customer falling between disconnected tools.
          </p>
        </div>

        <div className="mt-10 lg:mt-14">
          <div
            onMouseEnter={() => setHoverPaused(true)}
            onMouseLeave={() => setHoverPaused(false)}
            onFocus={() => setHoverPaused(true)}
            onBlur={() => setHoverPaused(false)}
            className="rounded-[20px] border border-slate-200/90 bg-white p-1.5 shadow-[0_42px_100px_-45px_rgba(15,23,42,0.36)]"
          >
            <div className="h-[470px] sm:h-[560px] lg:h-[640px]">
              {activeExploreScene ? (
                <ExploreScene scene={activeExploreScene} paused={hoverPaused || !inView} reduced={reduced} runKey={exploreRunKey} />
              ) : (
                <AppShell activeKey={journeyMeta.key} title={journeyMeta.title} subtitle={journeyMeta.subtitle}>
                  <JourneyStage phase={storyPhase} reduced={reduced} />
                </AppShell>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3">
            <div role="tablist" aria-label="Zapla platform modules" className="zapla-scroll-hide flex min-w-0 flex-1 gap-2 overflow-x-auto pb-2">
              {EXPLORE_SCENES.map((scene, index) => {
                const active = index === activeIndex;
                return (
                  <button
                    key={scene.key}
                    ref={(el) => { tabRefs.current[index] = el; }}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => selectScene(index)}
                    onKeyDown={(e) => onTabKeyDown(e, index)}
                    className={cn(
                      "shrink-0 rounded-full border px-4 py-2 text-[12px] font-semibold transition-colors",
                      active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800",
                    )}
                  >
                    {scene.label}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={replayStory}
              className="hidden shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[11px] font-semibold text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-800 sm:inline-flex"
            >
              <Workflow className="h-3.5 w-3.5" /> Replay journey
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[720px] text-[14px] leading-[1.6] text-slate-500">
            One customer record follows the conversation, automation, pipeline and booking. After the journey, use the tabs to explore the rest of the platform.
          </p>
          <a href="https://zapla.io/booking" className="inline-flex h-[48px] w-fit shrink-0 items-center gap-2 rounded-[10px] bg-[#111318] px-5 text-[14px] font-semibold text-white">
            Book a Call <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
