/* Inbox scene: a real, populated Zapla unified inbox.
   All people, businesses and numbers are fictional. */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AtSign,
  Check,
  ChevronDown,
  Facebook,
  Inbox as InboxIcon,
  Instagram,
  Linkedin,
  Mail,
  MessageSquare,
  Music2,
  Phone,
  Plus,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FACE } from "./faces";
import {
  FacebookMark,
  InstagramMark,
  LinkedInMark,
  TikTokMark,
} from "./social-brands";
import { EASE_OUT, type SceneProps } from "./motion-kit";


/* ---------------------------------------------------------------- */
/* Zapla demo pointer (same visual language as Contacts/Opportunities) */
/* ---------------------------------------------------------------- */

const POINTER_PATH =
  "M4.4 3.3 C4.4 2.0 5.9 1.3 6.9 2.1 L18.9 11.7 C20.0 12.6 19.4 14.3 18.0 14.3 L12.7 14.3 C12.2 14.3 11.7 14.6 11.5 15.1 L9.3 20.4 C8.7 21.7 6.8 21.4 6.6 20.0 Z";

function DemoCursor({
  point,
  press,
  reduced,
}: {
  point: { x: number; y: number } | null;
  press?: boolean;
  reduced: boolean;
}) {
  if (reduced) return null;
  return (
    <AnimatePresence>
      {point ? (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-50"
          initial={{ opacity: 0, scale: 0.82, x: point.x, y: point.y }}
          animate={{ opacity: 1, scale: 1, x: point.x, y: point.y }}
          exit={{ opacity: 0, scale: 0.86 }}
          transition={{
            opacity: { duration: 0.22, ease: EASE_OUT },
            scale: { duration: 0.28, ease: EASE_OUT },
            x: { type: "spring", stiffness: 150, damping: 21, mass: 0.95 },
            y: { type: "spring", stiffness: 150, damping: 21, mass: 0.95 },
          }}
        >
          <span
            className="pointer-events-none absolute left-0 top-0 h-9 w-9 -translate-x-1/3 -translate-y-1/3 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(37,99,255,0.28), rgba(37,99,255,0) 68%)",
            }}
          />
          <AnimatePresence>
            {press ? (
              <motion.span
                className="pointer-events-none absolute left-0 top-0 rounded-full border-2"
                style={{ borderColor: "rgba(37,99,255,0.55)" }}
                initial={{ width: 8, height: 8, x: -4, y: -4, opacity: 0.9 }}
                animate={{ width: 42, height: 42, x: -21, y: -21, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              />
            ) : null}
          </AnimatePresence>
          <motion.svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            animate={{ scale: press ? 0.86 : 1, rotate: press ? -7 : 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            style={{
              originX: 0.2,
              originY: 0.1,
              filter:
                "drop-shadow(0 1px 1.5px rgba(15,23,42,0.45)) drop-shadow(0 6px 12px rgba(15,23,42,0.28))",
            }}
          >
            <defs>
              <linearGradient id="zaplaInboxPointerFill" x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0%" stopColor="#3b82ff" />
                <stop offset="55%" stopColor="#2563ff" />
                <stop offset="100%" stopColor="#7c5cf6" />
              </linearGradient>
            </defs>
            <path
              d={POINTER_PATH}
              fill="url(#zaplaInboxPointerFill)"
              stroke="#ffffff"
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M6.2 4.1 L15.2 11.3"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </motion.svg>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* ---------------------------------------------------------------- */
/* Channels                                                          */
/* ---------------------------------------------------------------- */

type Channel = "sms" | "email" | "instagram" | "facebook" | "linkedin" | "tiktok";

const CHANNEL_META: Record<
  Channel,
  {
    label: string;
    tile: string;
    chip: string;
    Icon: typeof MessageSquare;
    Mark?: (p: { size?: number; className?: string }) => React.ReactElement;
  }
> = {
  sms: {
    label: "SMS",
    tile: "bg-emerald-500",
    chip: "bg-emerald-50 text-emerald-700",
    Icon: MessageSquare,
  },
  email: {
    label: "Email",
    tile: "bg-violet-500",
    chip: "bg-violet-50 text-violet-700",
    Icon: Mail,
  },
  instagram: {
    label: "Instagram",
    tile: "bg-gradient-to-br from-fuchsia-500 to-orange-400",
    chip: "bg-pink-50 text-pink-700",
    Icon: Instagram,
    Mark: InstagramMark,
  },
  facebook: {
    label: "Facebook",
    tile: "bg-blue-600",
    chip: "bg-blue-50 text-blue-700",
    Icon: Facebook,
    Mark: FacebookMark,
  },
  linkedin: {
    label: "LinkedIn",
    tile: "bg-[#0A66C2]",
    chip: "bg-sky-50 text-sky-700",
    Icon: Linkedin,
    Mark: LinkedInMark,
  },
  tiktok: {
    label: "TikTok",
    tile: "bg-slate-900",
    chip: "bg-slate-100 text-slate-700",
    Icon: Music2,
    Mark: TikTokMark,
  },
};

function ChannelTile({ channel, size = 16 }: { channel: Channel; size?: number }) {
  const { tile, Icon, Mark } = CHANNEL_META[channel];
  if (Mark) {
    return (
      <span className="inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
        <Mark size={size} className="rounded-[5px]" />
      </span>
    );
  }
  return (
    <span
      className={cn("flex shrink-0 items-center justify-center rounded-[5px] text-white", tile)}
      style={{ width: size, height: size }}
    >
      <Icon style={{ width: size * 0.62, height: size * 0.62 }} />
    </span>
  );
}


function ChannelChip({ channel }: { channel: Channel }) {
  const { chip, label, Icon } = CHANNEL_META[channel];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-1.5 py-[2px] text-[9.5px] font-semibold leading-none",
        chip,
      )}
    >
      <Icon className="h-[9px] w-[9px]" />
      {label}
    </span>
  );
}

/* ---------------------------------------------------------------- */
/* Conversation list data                                            */
/* ---------------------------------------------------------------- */

type Convo = {
  id: string;
  name: string;
  face: string;
  channel: Channel;
  preview: string;
  time: string;
  unread?: boolean;
};

const CONVOS: Convo[] = [
  {
    id: "daniel",
    name: "Daniel Ross",
    face: FACE.daniel,
    channel: "email",
    preview: "Sending through the updated scope now.",
    time: "9m",
    unread: true,
  },
  {
    id: "sophie",
    name: "Sophie Bell",
    face: FACE.sophie,
    channel: "instagram",
    preview: "Thanks for the quote, one question.",
    time: "14m",
    unread: true,
  },
  {
    id: "priya",
    name: "Priya Nair",
    face: FACE.priya,
    channel: "sms",
    preview: "Perfect, see you then.",
    time: "42m",
  },
  {
    id: "tom",
    name: "Tom Whyte",
    face: FACE.tom,
    channel: "facebook",
    preview: "Do you service the northern suburbs?",
    time: "1h",
    unread: true,
  },
  {
    id: "marcus",
    name: "Marcus Lee",
    face: FACE.alex,
    channel: "linkedin",
    preview: "Saw your post on LinkedIn. Can we talk next week?",
    time: "2h",
    unread: true,
  },
  {
    id: "emily",
    name: "Emily Tran",
    face: FACE.nina,
    channel: "tiktok",
    preview: "Found you through TikTok. Do you service the Inner West?",
    time: "3h",
  },

  {
    id: "leo",
    name: "Leo Marsh",
    face: FACE.leo,
    channel: "sms",
    preview: "Can we push Friday back an hour?",
    time: "5h",
  },
];

/* ---------------------------------------------------------------- */
/* Left rail                                                         */
/* ---------------------------------------------------------------- */

function NavItem({
  label,
  count,
  active,
  Icon,
}: {
  label: string;
  count?: number;
  active?: boolean;
  Icon: typeof InboxIcon;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg px-2 py-[6px]",
        active ? "bg-blue-50 text-blue-700" : "text-slate-500",
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate text-[11px] font-semibold">{label}</span>
      {count != null ? (
        <span
          className={cn(
            "ml-auto rounded-full px-1.5 py-[1px] text-[9.5px] font-bold",
            active ? "bg-white/80 text-blue-700" : "bg-slate-100 text-slate-500",
          )}
        >
          {count}
        </span>
      ) : null}
    </div>
  );
}

function LeftNav() {
  return (
    <div className="hidden w-[124px] shrink-0 flex-col border-r border-slate-200/80 bg-white/85 px-2 py-2.5 sm:flex lg:w-[142px]">
      <div className="px-1 pb-1.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-slate-400">
        Inbox
      </div>
      <NavItem label="Inbox" count={12} active Icon={InboxIcon} />
      <NavItem label="Unread" count={3} Icon={Mail} />
      <NavItem label="Assigned to me" count={4} Icon={UserCheck} />
      <div className="mt-3 px-1 pb-1 text-[9.5px] font-bold uppercase tracking-[0.1em] text-slate-400">
        Channels
      </div>
      <div className="space-y-[2px]">
        {(
          [
            ["sms", 4],
            ["email", 3],
            ["instagram", 2],
            ["facebook", 1],
            ["linkedin", 1],
            ["tiktok", 1],
          ] as Array<[Channel, number]>
        ).map(([c, n]) => (
          <div key={c} className="flex items-center gap-2 rounded-lg px-2 py-[3.5px]">
            <ChannelTile channel={c} size={14} />
            <span className="truncate text-[10.5px] font-medium text-slate-500">
              {CHANNEL_META[c].label}
            </span>
            <span className="ml-auto text-[9.5px] font-bold text-slate-400">{n}</span>
          </div>
        ))}

      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Payoff card                                                       */
/* ---------------------------------------------------------------- */

function OneConversationPayoff({ show, reduced }: { show: boolean; reduced: boolean }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-[30%] z-50 w-[66%] min-w-[300px] max-w-[540px]"
          initial={reduced ? false : { opacity: 0, x: "-50%", y: 14, scale: 0.91 }}
          animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
          exit={{ opacity: 0, x: "-50%", scale: 0.96 }}
          transition={
            reduced ? { duration: 0 } : { type: "spring", stiffness: 205, damping: 22, mass: 0.86 }
          }
        >
          <div
            className="rounded-[20px] p-[2px] shadow-[0_42px_82px_-30px_rgba(15,23,42,0.5)]"
            style={{
              background:
                "linear-gradient(118deg, #2563ff 0%, #22d3ee 42%, #7c5cf6 78%, #2563ff 100%)",
            }}
          >
            <div className="flex items-center gap-4 rounded-[18px] bg-white px-5 py-4">
              <img
                src={FACE.sophie}
                alt=""
                aria-hidden
                className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-white outline outline-1 outline-slate-200"
              />
              <div className="min-w-0">
                <div className="truncate text-[22px] font-extrabold leading-tight tracking-tight text-slate-900">
                  Sophie Bell
                </div>
                <div className="mt-1 flex items-center gap-1.5">
                  <ChannelTile channel="instagram" size={18} />
                  <ChannelTile channel="sms" size={18} />
                  <span className="ml-0.5 text-[12px] font-semibold text-slate-500">
                    Instagram + SMS
                  </span>
                </div>
              </div>
              <motion.div
                className="ml-auto shrink-0 rounded-2xl bg-zapla-blue px-4 py-3 text-center text-[15px] font-extrabold uppercase leading-[1.1] tracking-tight text-white shadow-[0_16px_30px_-12px_rgba(37,99,255,0.85)]"
                initial={reduced ? false : { scale: 0.82, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 320, damping: 16, delay: 0.14 }
                }
              >
                One
                <br />
                conversation
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* ---------------------------------------------------------------- */
/* Scene                                                             */
/* ---------------------------------------------------------------- */

type Bubble = {
  id: string;
  from: "them" | "us";
  channel: Channel;
  text: string;
  time: string;
};

const BASE_THREAD: Bubble[] = [
  {
    id: "b1",
    from: "them",
    channel: "instagram",
    text: "Hi! Saw your work on Instagram, do you do full interior repaints?",
    time: "Mon 4:12pm",
  },
  {
    id: "b2",
    from: "us",
    channel: "instagram",
    text: "We do, Sophie. Happy to send a quote through once I know the room count.",
    time: "Mon 4:20pm",
  },
  {
    id: "b3",
    from: "them",
    channel: "instagram",
    text: "Three bedrooms and a hallway. Thanks for the quote, one question.",
    time: "14m ago",
  },
];

const DANIEL_THREAD: Bubble[] = [
  {
    id: "d1",
    from: "them",
    channel: "email",
    text: "Morning, are you free to review the scope before Friday?",
    time: "Yesterday 8:40am",
  },
  {
    id: "d2",
    from: "us",
    channel: "email",
    text: "Sure Daniel, send it across and I will mark up the changes.",
    time: "Yesterday 9:05am",
  },
  {
    id: "d3",
    from: "them",
    channel: "email",
    text: "Sending through the updated scope now.",
    time: "9m ago",
  },
];

export function SceneInbox({ phase, reduced }: SceneProps) {
  /* timeline
     0 populated inbox hold · 1 cursor selects Sophie
     2 Instagram enquiry arrives · 3 SMS follow-up in the same thread
     4 ONE CONVERSATION payoff · 5 thread returns
     6 add tags · 7 assign owner · 8 final hold */
  const sophieSelected = phase >= 1;
  const igArrived = phase >= 2;
  const smsArrived = phase >= 3;
  const payoff = phase === 4;
  const tagPicker = phase === 6;
  const vipTag = phase >= 6;
  const upsellTag = phase >= 6;
  const ownerMenu = phase === 7;
  const assigned = phase >= 7;

  const selectedId = sophieSelected ? "sophie" : "daniel";

  const rootRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const tagBtnRef = useRef<HTMLDivElement | null>(null);
  const ownerBtnRef = useRef<HTMLDivElement | null>(null);

  const target: "row" | "tag" | "owner" | null =
    phase === 1 ? "row" : phase === 6 ? "tag" : phase === 7 ? "owner" : null;
  const press = phase === 1 || phase === 6 || phase === 7;

  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (reduced || !target) {
      setPoint(null);
      return;
    }
    const measure = () => {
      const root = rootRef.current;
      const el =
        target === "row"
          ? rowRef.current
          : target === "tag"
            ? tagBtnRef.current
            : ownerBtnRef.current;
      if (!root || !el) return;
      const r = root.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      setPoint({
        x: b.left - r.left + b.width * (target === "row" ? 0.42 : 0.55),
        y: b.top - r.top + b.height * 0.55,
      });
    };
    const id = requestAnimationFrame(measure);
    const t = window.setTimeout(measure, 260);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [target, reduced, phase]);

  const thread: Bubble[] = sophieSelected
    ? [
        ...BASE_THREAD,
        ...(igArrived
          ? [
              {
                id: "ig-new",
                from: "them" as const,
                channel: "instagram" as const,
                text: "Hey, do you have any availability Thursday afternoon?",
                time: "Just now",
              },
            ]
          : []),
        ...(smsArrived
          ? [
              {
                id: "sms-new",
                from: "them" as const,
                channel: "sms" as const,
                text: "Actually SMS might be easier. Could I do around 3pm?",
                time: "Just now",
              },
            ]
          : []),
      ]
    : DANIEL_THREAD;

  return (
    <div ref={rootRef} className="absolute inset-0 flex flex-col overflow-hidden bg-slate-50/70">
      {/* native inbox bar */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 bg-white/85 px-3.5 py-2">
        <span className="text-[12px] font-bold tracking-tight text-slate-700">Unified Inbox</span>
        <span className="rounded-full bg-slate-100 px-2 py-[2px] text-[9.5px] font-bold text-slate-500">
          6 channels
        </span>
        <span className="ml-auto text-[10px] font-medium text-slate-400">
          {igArrived ? "3 unread" : "3 unread"}
        </span>
      </div>

      <div className="flex min-h-0 flex-1">
        <LeftNav />

        {/* conversation list */}
        <div className="zapla-scroll-hide min-w-[150px] flex-[0_0_25%] overflow-hidden border-r border-slate-200/80 bg-white/90 px-1.5 py-2 xl:flex-[0_0_29%]">
          {CONVOS.map((c) => {
            const on = c.id === selectedId;
            const isSophie = c.id === "sophie";
            const preview =
              isSophie && smsArrived
                ? "Could I do around 3pm?"
                : isSophie && igArrived
                  ? "Any availability Thursday?"
                  : c.preview;
            const time = isSophie && igArrived ? "Just now" : c.time;
            const unread = isSophie ? !sophieSelected : c.unread;
            return (
              <motion.div
                key={c.id}
                ref={isSophie ? rowRef : undefined}
                animate={{
                  backgroundColor: on ? "rgba(239,246,255,0.95)" : "rgba(255,255,255,0)",
                  boxShadow: on
                    ? "inset 2px 0 0 0 rgba(37,99,255,0.9)"
                    : "inset 0 0 0 0 rgba(0,0,0,0)",
                }}
                transition={{ duration: reduced ? 0 : 0.32, ease: EASE_OUT }}
                className="flex items-start gap-2 rounded-lg px-1.5 py-[7px]"
              >
                <div className="relative shrink-0">
                  <img
                    src={c.face}
                    alt=""
                    aria-hidden
                    className="h-7 w-7 rounded-full object-cover ring-2 ring-white outline outline-1 outline-slate-200"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5">
                    <ChannelTile channel={c.channel} size={12} />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "truncate text-[11px] leading-tight",
                        on ? "font-bold text-slate-900" : "font-semibold text-slate-700",
                      )}
                    >
                      {c.name}
                    </span>
                    <span className="ml-auto shrink-0 text-[9px] font-medium text-slate-400">
                      {time}
                    </span>
                    {unread ? (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-zapla-blue" />
                    ) : null}
                  </div>
                  <div className="truncate text-[10px] leading-tight text-slate-400">{preview}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* thread + context */}
        <div className="flex min-w-0 flex-1 flex-col bg-white">
          <div className="flex items-center gap-2.5 border-b border-slate-200/80 px-3 py-2">
            <img
              src={sophieSelected ? FACE.sophie : FACE.daniel}
              alt=""
              aria-hidden
              className="h-7 w-7 rounded-full object-cover ring-2 ring-white outline outline-1 outline-slate-200"
            />
            <div className="min-w-0">
              <div className="truncate text-[12px] font-bold tracking-tight text-slate-800">
                {sophieSelected ? "Sophie Bell" : "Daniel Ross"}
              </div>
              <div className="flex items-center gap-1.5 text-[9.5px] font-medium text-slate-400">
                {sophieSelected ? (
                  <>
                    <ChannelChip channel="instagram" />
                    {smsArrived ? <ChannelChip channel="sms" /> : null}
                  </>
                ) : (
                  <ChannelChip channel="email" />
                )}
              </div>
            </div>
            <div className="ml-auto shrink-0 text-right">
              <div className="text-[9px] font-medium uppercase tracking-[0.08em] text-slate-400">
                Owner
              </div>
              <div className="text-[10.5px] font-bold text-slate-600">
                {assigned ? "Andrew" : "Unassigned"}
              </div>
            </div>
          </div>

          <div className="flex min-h-0 flex-1">
            {/* thread */}
            <div className="zapla-scroll-hide flex min-w-0 flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-3">
              <AnimatePresence initial={false}>
                {thread.map((b) => (
                  <motion.div
                    key={b.id}
                    layout
                    initial={reduced ? false : { opacity: 0, y: 14, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      layout: { duration: reduced ? 0 : 0.5, ease: EASE_OUT },
                      default: { duration: reduced ? 0 : 0.46, ease: EASE_OUT },
                    }}
                    className={cn(
                      "flex max-w-[88%] items-end gap-1.5",
                      b.from === "us" ? "ml-auto flex-row-reverse" : "",
                    )}
                  >
                    <ChannelTile channel={b.channel} size={14} />
                    <div>
                      <div
                        className={cn(
                          "rounded-2xl px-3 py-2 text-[11px] font-medium leading-snug",
                          b.from === "us"
                            ? "rounded-br-sm bg-zapla-blue text-white"
                            : "rounded-bl-sm bg-slate-100 text-slate-700",
                        )}
                      >
                        {b.text}
                      </div>
                      <div
                        className={cn(
                          "mt-[3px] text-[8.5px] font-medium text-slate-400",
                          b.from === "us" ? "text-right" : "",
                        )}
                      >
                        {CHANNEL_META[b.channel].label} · {b.time}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* customer context */}
            <div className="hidden w-[136px] shrink-0 border-l border-slate-200/80 bg-slate-50/60 px-2.5 py-2.5 lg:block xl:w-[156px]">
              <div className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Customer
              </div>
              <div className="mt-1.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[9.5px] font-medium text-slate-500">
                  <Phone className="h-3 w-3 shrink-0 text-slate-400" />
                  <span className="truncate">
                    {sophieSelected ? "0417 825 540" : "0423 691 284"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[9.5px] font-medium text-slate-500">
                  <AtSign className="h-3 w-3 shrink-0 text-slate-400" />
                  <span className="truncate">
                    {sophieSelected ? "sophie.bell@…" : "daniel.ross@…"}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                  Tags
                </span>
                <div
                  ref={tagBtnRef}
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-[5px] border transition-colors duration-300",
                    tagPicker
                      ? "border-zapla-blue bg-zapla-blue text-white"
                      : "border-slate-300 bg-white text-slate-400",
                  )}
                >
                  <Plus className="h-2.5 w-2.5" strokeWidth={3} />
                </div>
              </div>
              <div className="relative mt-1.5 flex flex-wrap gap-1">
                <AnimatePresence initial={false}>
                  {vipTag ? (
                    <motion.span
                      key="vip"
                      initial={reduced ? false : { opacity: 0, scale: 0.82 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={
                        reduced ? { duration: 0 } : { type: "spring", stiffness: 330, damping: 18 }
                      }
                      className="rounded-full bg-blue-50 px-1.5 py-[2px] text-[9px] font-bold text-blue-700 outline outline-1 outline-blue-200"
                    >
                      VIP
                    </motion.span>
                  ) : null}
                  {upsellTag ? (
                    <motion.span
                      key="upsell"
                      initial={reduced ? false : { opacity: 0, scale: 0.82 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 330, damping: 18, delay: 0.28 }
                      }
                      className="rounded-full bg-cyan-50 px-1.5 py-[2px] text-[9px] font-bold text-cyan-700 outline outline-1 outline-cyan-200"
                    >
                      Upsell opportunity
                    </motion.span>
                  ) : null}
                </AnimatePresence>

                {/* native tag picker */}
                <AnimatePresence>
                  {tagPicker ? (
                    <motion.div
                      initial={reduced ? false : { opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.97 }}
                      transition={{ duration: reduced ? 0 : 0.28, ease: EASE_OUT }}
                      className="absolute -top-1 right-0 z-40 w-[124px] rounded-lg border border-slate-200 bg-white p-1 shadow-[0_18px_34px_-16px_rgba(15,23,42,0.4)]"
                    >
                      {["VIP", "Upsell opportunity", "Repeat customer"].map((t, i) => (
                        <div
                          key={t}
                          className={cn(
                            "flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[9.5px] font-semibold",
                            i < 2 ? "bg-blue-50 text-blue-700" : "text-slate-500",
                          )}
                        >
                          {i < 2 ? (
                            <Check className="h-2.5 w-2.5 text-blue-600" strokeWidth={3.5} />
                          ) : (
                            <span className="h-2.5 w-2.5 rounded-[3px] border border-slate-300" />
                          )}
                          <span className="truncate">{t}</span>
                        </div>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <div className="mt-3 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Assigned
              </div>
              <div className="relative mt-1.5">
                <div
                  ref={ownerBtnRef}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg border bg-white px-1.5 py-1 transition-colors duration-300",
                    ownerMenu ? "border-zapla-blue" : "border-slate-200",
                  )}
                >
                  {assigned ? (
                    <img
                      src={FACE.alex}
                      alt=""
                      aria-hidden
                      className="h-4 w-4 rounded-full object-cover"
                    />
                  ) : (
                    <span className="h-4 w-4 rounded-full bg-slate-100" />
                  )}
                  <span className="truncate text-[9.5px] font-semibold text-slate-600">
                    {assigned ? "Andrew" : "Unassigned"}
                  </span>
                  <ChevronDown className="ml-auto h-2.5 w-2.5 shrink-0 text-slate-400" />
                </div>

                <AnimatePresence>
                  {ownerMenu ? (
                    <motion.div
                      initial={reduced ? false : { opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.97 }}
                      transition={{ duration: reduced ? 0 : 0.28, ease: EASE_OUT }}
                      className="absolute left-0 right-0 top-[calc(100%+4px)] z-40 rounded-lg border border-slate-200 bg-white p-1 shadow-[0_18px_34px_-16px_rgba(15,23,42,0.4)]"
                    >
                      {[
                        { name: "Andrew", face: FACE.alex, on: true },
                        { name: "Jordan", face: FACE.jordan, on: false },
                        { name: "Nina", face: FACE.nina, on: false },
                      ].map((o) => (
                        <div
                          key={o.name}
                          className={cn(
                            "flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[9.5px] font-semibold",
                            o.on ? "bg-blue-50 text-blue-700" : "text-slate-500",
                          )}
                        >
                          <img
                            src={o.face}
                            alt=""
                            aria-hidden
                            className="h-4 w-4 rounded-full object-cover"
                          />
                          <span className="truncate">{o.name}</span>
                          {o.on ? (
                            <Check
                              className="ml-auto h-2.5 w-2.5 text-blue-600"
                              strokeWidth={3.5}
                            />
                          ) : null}
                        </div>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <AnimatePresence>
                  {phase >= 8 ? (
                    <motion.div
                      initial={reduced ? false : { opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.3, ease: EASE_OUT }}
                      className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-[2px] text-[9px] font-bold text-emerald-700"
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                      Assigned
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <div className="mt-3 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Last activity
              </div>
              <div className="mt-1 text-[9.5px] font-medium text-slate-500">
                {smsArrived
                  ? "SMS · Just now"
                  : sophieSelected
                    ? "Instagram · 14m ago"
                    : "Email · 9m ago"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <OneConversationPayoff show={payoff} reduced={reduced} />
      <DemoCursor point={point} press={press} reduced={reduced} />
    </div>
  );
}
