import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CalendarCheck, Inbox as InboxIcon, Mail, MessageSquare, Plus, Send, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { FACE } from "@/components/v5/faces";
import { FacebookMark, InstagramMark, LinkedInMark, TikTokMark } from "@/components/v5/social-brands";
import { EASE, RevenueAvatar, SarahIdentity } from "./shared";

type Channel = "sms" | "email" | "instagram" | "facebook" | "linkedin" | "tiktok";
type Row = { name: string; preview: string; time: string; face?: string; channel: Channel; active?: boolean };

const ROWS: Row[] = [
  { name: "Sarah Nguyen", preview: "Interested in getting a quote…", time: "Just now", channel: "sms", active: true },
  { name: "Daniel Ross", preview: "Sending through the updated scope now.", time: "9m", face: FACE.daniel, channel: "email" },
  { name: "Sophie Bell", preview: "Thanks for the quote, one question.", time: "14m", face: FACE.sophie, channel: "instagram" },
  { name: "Priya Nair", preview: "Perfect, see you then.", time: "42m", face: FACE.priya, channel: "sms" },
  { name: "Tom Whyte", preview: "Do you service the northern suburbs?", time: "1h", face: FACE.tom, channel: "facebook" },
];

function ChannelTile({ channel, size = 15 }: { channel: Channel; size?: number }) {
  if (channel === "instagram") return <InstagramMark size={size} className="rounded-[5px]" />;
  if (channel === "facebook") return <FacebookMark size={size} className="rounded-[5px]" />;
  if (channel === "linkedin") return <LinkedInMark size={size} className="rounded-[5px]" />;
  if (channel === "tiktok") return <TikTokMark size={size} className="rounded-[5px]" />;
  const Icon = channel === "email" ? Mail : MessageSquare;
  return (
    <span className={cn("flex shrink-0 items-center justify-center rounded-[5px] text-white", channel === "email" ? "bg-violet-500" : "bg-emerald-500")} style={{ width: size, height: size }}>
      <Icon style={{ width: size * 0.62, height: size * 0.62 }} />
    </span>
  );
}

function AvatarWithChannel({ row }: { row: Row }) {
  return (
    <div className="relative shrink-0">
      {row.active ? <RevenueAvatar size={28} /> : <img src={row.face} alt="" aria-hidden className="h-7 w-7 rounded-full object-cover ring-1 ring-slate-100" />}
      <span className="absolute -bottom-0.5 -right-0.5 rounded-[4px] bg-white p-[1px] shadow-sm ring-1 ring-white"><ChannelTile channel={row.channel} size={12} /></span>
    </div>
  );
}

function NavItem({ label, count, active, Icon }: { label: string; count?: number; active?: boolean; Icon: typeof InboxIcon }) {
  return (
    <div className={cn("flex items-center gap-2 rounded-lg px-2 py-[6px]", active ? "bg-blue-50 text-blue-700" : "text-slate-500")}>
      <Icon className="h-3.5 w-3.5 shrink-0" /><span className="truncate text-[11px] font-semibold">{label}</span>
      {count != null ? <span className={cn("ml-auto rounded-full px-1.5 py-[1px] text-[9.5px] font-bold", active ? "bg-white/80 text-blue-700" : "bg-slate-100 text-slate-500")}>{count}</span> : null}
    </div>
  );
}

function IncomingMessage({ children, time }: { children: string; time: string }) {
  return (
    <div className="max-w-[76%]">
      <div className="rounded-2xl rounded-bl-sm bg-slate-100 px-3.5 py-1.5 text-[10.5px] font-medium leading-[1.35] text-slate-600">{children}</div>
      <div className="mt-0.5 flex items-center gap-1 text-[7.5px] font-semibold text-slate-400"><ChannelTile channel="sms" size={9} /><span>{time}</span></div>
    </div>
  );
}

function OutgoingMessage({ children, time, label }: { children: string; time: string; label?: string }) {
  return (
    <div className="ml-auto max-w-[76%]">
      <div className="rounded-2xl rounded-br-sm bg-[#2563FF] px-3.5 py-1.5 text-[10.5px] font-medium leading-[1.35] text-white">{children}</div>
      <div className="mt-0.5 flex items-center justify-end gap-1.5 text-[7.5px] font-semibold text-slate-400">
        {label ? <span className="rounded bg-blue-50 px-1.5 py-[2px] text-[7px] font-black tracking-[.04em] text-[#2563FF]">{label}</span> : null}
        <span>{time}</span>
      </div>
    </div>
  );
}

function BookingConfirmation() {
  return (
    <div className="ml-auto w-[76%] overflow-hidden rounded-[13px] border border-blue-200 bg-white shadow-[0_10px_26px_-20px_rgba(37,99,255,.45)]">
      <div className="flex items-center gap-2 border-b border-blue-100 bg-blue-50/70 px-3 py-1.5">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] bg-[#2563FF] text-white">
          <CalendarCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
        <div className="min-w-0">
          <div className="text-[7px] font-black uppercase tracking-[.11em] text-[#2563FF]">Automatic booking confirmation</div>
          <div className="text-[10.5px] font-black text-slate-800">Booking confirmed ✓</div>
        </div>
      </div>
      <div className="px-3 py-2">
        <div className="text-[10.5px] font-black text-slate-800">Thursday, 3 September · 2:30 PM</div>
        <div className="mt-0.5 text-[8.5px] font-semibold text-slate-500">Consultation with James</div>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <span className="rounded-md bg-slate-100 px-2 py-1 text-[7px] font-bold text-slate-500">Add to calendar</span>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-[7px] font-bold text-slate-500">Reschedule</span>
          <span className="ml-auto text-[7px] font-bold text-emerald-600">Reminder scheduled</span>
        </div>
      </div>
    </div>
  );
}

export function InboxScene({ interactive = false, complete = false }: { interactive?: boolean; complete?: boolean }) {
  const [replyVisible, setReplyVisible] = useState(interactive);
  const [followupVisible, setFollowupVisible] = useState(interactive);
  const [customerReplyVisible, setCustomerReplyVisible] = useState(interactive);
  const [ackVisible, setAckVisible] = useState(interactive || complete);
  const [bookingConfirmationVisible, setBookingConfirmationVisible] = useState(interactive || complete);

  useEffect(() => {
    if (interactive || complete) {
      setReplyVisible(true);
      setFollowupVisible(true);
      setCustomerReplyVisible(true);
      setAckVisible(true);
      setBookingConfirmationVisible(true);
      return;
    }

    setReplyVisible(false);
    setFollowupVisible(false);
    setCustomerReplyVisible(false);
    setAckVisible(false);
    setBookingConfirmationVisible(false);

    const timers = [
      window.setTimeout(() => setReplyVisible(true), 520),
      window.setTimeout(() => setFollowupVisible(true), 1250),
      window.setTimeout(() => setCustomerReplyVisible(true), 1950),
      window.setTimeout(() => setAckVisible(true), 2600),
      window.setTimeout(() => setBookingConfirmationVisible(true), 3250),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [interactive, complete]);

  const rows = ROWS.map((row) => {
    if (!row.active) return row;
    if (bookingConfirmationVisible) return { ...row, preview: "Booking confirmed · Thu 2:30 PM", time: "Just now" };
    if (ackVisible) return { ...row, preview: "I’ve booked you in for Thursday at 2:30 PM.", time: "Just now" };
    if (customerReplyVisible) return { ...row, preview: "Thursday 2:30 works perfectly. Thanks!", time: "Just now" };
    if (followupVisible) return { ...row, preview: "Just following up in case you missed this…", time: "Just now" };
    return row;
  });

  return (
    <div className="absolute inset-0 flex overflow-hidden bg-[#F8FAFC]">
      <div className="hidden w-[124px] shrink-0 flex-col border-r border-slate-200/80 bg-white/85 px-2 py-2.5 sm:flex lg:w-[142px]">
        <div className="px-1 pb-1.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-slate-400">Inbox</div>
        <NavItem label="Inbox" count={12} active Icon={InboxIcon} /><NavItem label="Unread" count={3} Icon={Mail} /><NavItem label="Assigned to me" count={4} Icon={UserCheck} />
        <div className="mt-3 px-1 pb-1 text-[9.5px] font-bold uppercase tracking-[0.1em] text-slate-400">Channels</div>
        <div className="space-y-[2px]">
          {([["sms",4],["email",3],["instagram",2],["facebook",1],["linkedin",1],["tiktok",1]] as Array<[Channel, number]>).map(([channel,count]) => (
            <div key={channel} className="flex items-center gap-2 rounded-lg px-2 py-[3.5px]"><ChannelTile channel={channel} size={14} /><span className="truncate text-[10.5px] font-medium capitalize text-slate-500">{channel}</span><span className="ml-auto text-[9.5px] font-bold text-slate-400">{count}</span></div>
          ))}
        </div>
      </div>

      <div className="w-[36%] min-w-[190px] border-r border-slate-200 bg-white sm:w-[32%]">
        <div className="flex h-[46px] items-center border-b border-slate-200 px-3"><div className="text-[11px] font-black text-slate-800">All conversations</div><span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500">12</span></div>
        <div className="p-2">
          {rows.map((row) => (
            <div key={row.name} className={cn("mb-1 flex items-start gap-2 rounded-[10px] px-2 py-2", row.active ? "bg-blue-50/70 shadow-[inset_2px_0_0_0_rgba(37,99,255,.9)]" : "bg-white")}>
              <AvatarWithChannel row={row} />
              <div className="min-w-0 flex-1"><div className="flex items-center gap-2"><span className="truncate text-[10.5px] font-bold text-slate-800">{row.name}</span><span className="ml-auto text-[8.5px] font-semibold text-slate-400">{row.time}</span></div><div className="mt-0.5 truncate text-[9.5px] text-slate-500">{row.preview}</div></div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative min-w-0 flex-1 bg-white">
        <div className="flex h-[58px] items-center gap-2.5 border-b border-slate-200 px-4">
          <div className="relative"><SarahIdentity detail="Website + SMS" size={32} /><span className="absolute -bottom-0.5 left-[21px] rounded-[4px] bg-white p-[1px] shadow-sm ring-1 ring-white"><ChannelTile channel="sms" size={12} /></span></div>
          <div className="ml-auto text-right"><div className="text-[7.5px] font-black uppercase tracking-[.1em] text-slate-400">Owner</div><div className="text-[10.5px] font-bold text-slate-600">James</div></div>
        </div>

        <div className="absolute inset-x-0 bottom-[72px] top-[58px] overflow-hidden px-5 py-2">
          <div className="mx-auto flex h-full max-w-[590px] flex-col justify-start gap-[5px] pt-0.5 lg:pt-1">
            <IncomingMessage time="10:42 AM">Hi, I’m interested in getting a quote. Are you available Thursday afternoon?</IncomingMessage>

            <motion.div initial={interactive || complete ? false : { opacity: 0, y: 7, scale: 0.985 }} animate={{ opacity: replyVisible ? 1 : 0, y: replyVisible ? 0 : 7, scale: replyVisible ? 1 : 0.985 }} transition={{ duration: 0.36, ease: EASE }}>
              <OutgoingMessage time="10:42 AM" label="AUTOMATIC REPLY">Hi Sarah, thanks for reaching out. Happy to help. What time works best for you?</OutgoingMessage>
            </motion.div>

            <motion.div initial={false} animate={{ opacity: followupVisible ? 1 : 0, y: followupVisible ? 0 : 7, scale: followupVisible ? 1 : 0.985 }} transition={{ duration: 0.36, ease: EASE }}>
              <OutgoingMessage time="11:12 AM" label="AUTOMATIC FOLLOW-UP">Just following up in case you missed this. I can hold Thursday afternoon for you.</OutgoingMessage>
            </motion.div>

            <motion.div initial={false} animate={{ opacity: customerReplyVisible ? 1 : 0, y: customerReplyVisible ? 0 : 7, scale: customerReplyVisible ? 1 : 0.985 }} transition={{ duration: 0.36, ease: EASE }}>
              <IncomingMessage time="11:16 AM">Thursday 2:30 works perfectly. Thanks!</IncomingMessage>
            </motion.div>

            <motion.div initial={false} animate={{ opacity: ackVisible ? 1 : 0, y: ackVisible ? 0 : 7, scale: ackVisible ? 1 : 0.985 }} transition={{ duration: 0.36, ease: EASE }}>
              <OutgoingMessage time="11:17 AM">Perfect, Sarah. I’ve booked you in for Thursday at 2:30 PM.</OutgoingMessage>
            </motion.div>

            <motion.div initial={false} animate={{ opacity: bookingConfirmationVisible ? 1 : 0, y: bookingConfirmationVisible ? 0 : 7, scale: bookingConfirmationVisible ? 1 : 0.985 }} transition={{ duration: 0.4, ease: EASE }}>
              <BookingConfirmation />
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-3 left-4 right-4 rounded-[17px] border border-slate-200 bg-white/96 p-1.5 shadow-[0_16px_34px_-20px_rgba(15,23,42,.38)]">
          <div className="flex h-[42px] items-center gap-2 rounded-[13px] bg-slate-50 px-2"><span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400"><Plus className="h-3.5 w-3.5" /></span><span className="min-w-0 flex-1 text-[10px] font-semibold text-slate-400">Type a message…</span><span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#2563FF] text-white shadow-[0_8px_18px_-8px_rgba(37,99,255,.7)]"><Send className="h-3.5 w-3.5" /></span></div>
        </div>
      </div>
    </div>
  );
}
