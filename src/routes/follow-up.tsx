import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  FileText,
  Globe2,
  MessageCircle,
  MessageSquare,
  Phone,
  RotateCcw,
} from "lucide-react";

export const Route = createFileRoute("/follow-up")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Follow-Up Automation for Service Businesses | Zapla" },
      {
        name: "description",
        content:
          "Zapla keeps new enquiries, quotes, bookings and past customers moving with connected follow-up across the channels you use.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: FollowUpPage,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const PETAL_COLORS = ["#E97D62", "#C96C85", "#DDA34B", "#99A36D", "#9B86B8", "#D58C75"] as const;
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

const FAQS = [
  {
    q: "Can Zapla follow up by SMS and email?",
    a: "Yes. Follow-up can run across the channels you choose, with the conversation kept against the customer record so your team can see what has happened.",
  },
  {
    q: "What happens when a customer replies?",
    a: "You decide what should happen next. A reply can pause an automated sequence, move the opportunity forward, or bring the conversation back to your team.",
  },
  {
    q: "Is follow-up only for new leads?",
    a: "No. You can use it for new enquiries, quotes, bookings, reminders and reactivation of past customers, depending on the workflow you set.",
  },
  {
    q: "Does my team still control the messages?",
    a: "Yes. You choose the timing, wording, channels, handoff points and rules. Automation should remove repetitive chasing, not remove human judgment.",
  },
] as const;

function FollowUpPage() {
  return (
    <main className="min-h-screen bg-[#FCFCFA] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <Hero />
      <LeakSection />
      <ThreadSection />
      <UseCases />
      <HumanControl />
      <ConnectedCrm />
      <Faq />
      <FinalCta />
    </main>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = !!useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduced ? 0 : 0.48, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={"text-[10px] font-semibold uppercase tracking-[0.2em] " + (dark ? "text-[#DDA34B]" : "text-[#C96F55]")}>
      {children}
    </div>
  );
}

function ZaplaPetal({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" aria-hidden="true" className="block overflow-visible">
      {PETAL_COLORS.map((color, index) => (
        <g key={color} transform={`rotate(${index * 60} 80 80)`}>
          <path
            d="M80 14 C95 14 104 25 102 42 C100 58 92 70 80 82 C68 70 60 58 58 42 C56 25 65 14 80 14 Z"
            fill={color}
            stroke={color}
            strokeWidth="1.4"
          />
        </g>
      ))}
      <circle cx="80" cy="80" r="14" fill="#111214" stroke="rgba(255,255,255,.08)" />
    </svg>
  );
}

function TeamAvatar({ size = 42, cell = 0 }: { size?: number; cell?: number }) {
  const column = cell % 6;
  const row = Math.floor(cell / 6);
  return (
    <span
      className="block shrink-0 overflow-hidden rounded-full border-2 border-white/15 shadow-[0_8px_24px_rgba(0,0,0,.22)]"
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${PORTRAIT_SHEET})`,
        backgroundPosition: `${(column / 5) * 100}% ${(row / 3) * 100}%`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
      }}
      aria-hidden="true"
    />
  );
}

function Hero() {
  const proof = [
    ["Fast first response", "#E97D62"],
    ["Rules you control", "#DDA34B"],
    ["Human handoff when needed", "#99A36D"],
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#FCFCFA] px-5 pb-20 pt-[116px] sm:px-10 sm:pb-24 sm:pt-[126px] lg:px-16 lg:pb-28 lg:pt-[138px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(201,108,133,.055),transparent_24%),radial-gradient(circle_at_88%_18%,rgba(153,163,109,.06),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#111318]/8" />

      <div className="relative mx-auto max-w-[1420px]">
        <Reveal className="mx-auto max-w-[980px] text-center">
          <Eyebrow>Follow-up automation</Eyebrow>
          <h1 className="mt-4 text-[52px] font-medium leading-[0.91] tracking-[-0.062em] sm:text-[72px] lg:text-[88px]" style={{ fontFamily: DISPLAY }}>
            The lead came in.
            <span className="block text-[#C96F55]">Zapla keeps it moving.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[790px] text-[16px] leading-[1.72] text-[#626762] sm:text-[18px]">
            Zapla follows up across the channels you use, keeps every conversation tied to the customer record, and keeps the next step moving while your team gets on with the work.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={BOOK_URL} className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px">
              Book a Call <ArrowRight size={15} />
            </a>
            <a href="#how-it-works" className="inline-flex h-[50px] items-center rounded-[10px] border border-[#D7D9D4] bg-white px-6 text-[13px] font-semibold text-[#111318]">
              See how it works
            </a>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] font-semibold text-[#555B56] sm:text-[12px]">
            {proof.map(([item, tone]) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tone }} />
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-14 sm:mt-16">
          <FollowUpScene />
        </Reveal>
      </div>
    </section>
  );
}

function FollowUpScene() {
  const reduced = !!useReducedMotion();

  const channels = ["Web chat", "SMS", "Email", "WhatsApp", "Voice", "Social"];

  return (
    <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[34px] border border-[#1E2B29]/[0.08] bg-[#EEF0E9] shadow-[0_28px_80px_rgba(48,52,43,.09)]">
      <div className="relative px-5 pb-5 pt-5 sm:px-7 sm:pb-7 sm:pt-6 lg:px-8 lg:pb-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {channels.map((channel, index) => (
            <span
              key={channel}
              className="rounded-full border border-[#1E2B29]/[0.08] bg-white/70 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#5C625C]"
              style={{ color: index === 3 ? "#9C5269" : index === 4 ? "#6B5A8B" : undefined }}
            >
              {channel}
            </span>
          ))}
        </div>

        <div className="relative mt-5 min-h-[760px] overflow-hidden rounded-[28px] sm:min-h-[720px] lg:min-h-[650px]">
          <div className="absolute inset-x-0 bottom-0 top-[18%] rounded-[28px] bg-[linear-gradient(135deg,#E97D62_0%,#DDA34B_53%,#C96C85_100%)]" />
          <div className="pointer-events-none absolute inset-x-[8%] bottom-[4%] h-[38%] rounded-full bg-white/18 blur-[70px]" />

          <div className="relative z-10 grid gap-3 p-4 sm:p-5 lg:hidden">
            <ChannelMoment icon={<Globe2 size={15} />} eyebrow="Web chat" title="New enquiry" copy="Can I book a consultation next week?" tone="#E97D62" />
            <CustomerRecord />
            <ChannelMoment icon={<MessageCircle size={15} />} eyebrow="WhatsApp" title="Follow-up sent" copy="Would Tuesday morning suit you?" tone="#DDA34B" ai />
            <ChannelMoment icon={<Calendar size={15} />} eyebrow="Booking" title="Tuesday · 10:30am" copy="Consultation booked" tone="#99A36D" />
          </div>

          <div className="relative hidden h-[650px] lg:block">
            <motion.div
              className="absolute left-[3%] top-[15%] w-[22%]"
              initial={reduced ? false : { opacity: 0, x: -18, y: 8 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduced ? 0 : 0.46, ease: EASE }}
            >
              <ChannelMoment icon={<Globe2 size={15} />} eyebrow="Web chat" title="New enquiry" copy="Can I book a consultation next week?" tone="#E97D62" />
            </motion.div>

            <motion.div
              className="absolute bottom-[12%] left-[5%] w-[20%]"
              initial={reduced ? false : { opacity: 0, x: -16, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduced ? 0 : 0.46, delay: reduced ? 0 : 0.12, ease: EASE }}
            >
              <ChannelMoment icon={<Phone size={15} />} eyebrow="Voice AI" title="Call captured" copy="Customer wants Tuesday morning." tone="#9B86B8" />
            </motion.div>

            <motion.div
              className="absolute left-1/2 top-[9%] w-[48%] -translate-x-1/2"
              initial={reduced ? false : { opacity: 0, y: 16, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: reduced ? 0 : 0.52, delay: reduced ? 0 : 0.06, ease: EASE }}
            >
              <CustomerRecord />
            </motion.div>

            <motion.div
              className="absolute right-[3%] top-[17%] w-[23%]"
              initial={reduced ? false : { opacity: 0, x: 18, y: 8 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduced ? 0 : 0.46, delay: reduced ? 0 : 0.16, ease: EASE }}
            >
              <ChannelMoment icon={<MessageCircle size={15} />} eyebrow="WhatsApp" title="Follow-up sent" copy="Would Tuesday morning suit you?" tone="#DDA34B" ai />
            </motion.div>

            <motion.div
              className="absolute bottom-[12%] right-[5%] w-[21%]"
              initial={reduced ? false : { opacity: 0, x: 16, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduced ? 0 : 0.46, delay: reduced ? 0 : 0.24, ease: EASE }}
            >
              <ChannelMoment icon={<Calendar size={15} />} eyebrow="Booking" title="Tuesday · 10:30am" copy="Consultation booked" tone="#99A36D" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerRecord() {
  return (
    <div className="overflow-hidden rounded-[26px] border border-black/[0.07] bg-[#FCFCFA] shadow-[0_24px_58px_rgba(49,45,38,.16)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.07] px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <TeamAvatar size={48} cell={0} />
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8A8E89]">Customer record</div>
            <div className="mt-1 text-[18px] font-semibold tracking-[-0.025em] text-[#111318]">Sarah Mitchell</div>
          </div>
        </div>
        <span className="rounded-full bg-[#99A36D]/14 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.12em] text-[#697342]">Follow-up active</span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A8E89]">Latest conversation</div>
        <div className="mt-4 rounded-[18px] bg-[#F1F2ED] px-4 py-4">
          <div className="text-[11px] font-semibold text-[#727872]">Customer · 10:12am</div>
          <div className="mt-2 text-[22px] font-medium leading-[1.12] tracking-[-0.035em] text-[#202420]" style={{ fontFamily: DISPLAY }}>
            Tuesday morning works.
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <RecordFact label="Next step" value="Consultation" tone="#E97D62" />
          <RecordFact label="Booked" value="Tue · 10:30am" tone="#DDA34B" />
          <RecordFact label="Owner" value="Front desk" tone="#99A36D" />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-black/[0.07] bg-white/70 px-5 py-4 sm:px-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111214]">
          <ZaplaPetal size={24} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#C96F55]">Zapla</div>
          <div className="mt-1 text-[12px] font-semibold text-[#444944]">Conversation, context and next step stay together.</div>
        </div>
      </div>
    </div>
  );
}

function RecordFact({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="border-t-2 pt-3" style={{ borderColor: tone }}>
      <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#8A8E89]">{label}</div>
      <div className="mt-1.5 text-[11px] font-semibold text-[#333833]">{value}</div>
    </div>
  );
}

function ChannelMoment({
  icon,
  eyebrow,
  title,
  copy,
  tone,
  ai = false,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  copy: string;
  tone: string;
  ai?: boolean;
}) {
  return (
    <div className="rounded-[20px] border border-black/[0.07] bg-white/94 p-4 shadow-[0_16px_38px_rgba(45,41,35,.13)] backdrop-blur-sm">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-[9px]" style={{ backgroundColor: `${tone}18`, color: tone }}>
          {ai ? <ZaplaPetal size={21} /> : icon}
        </span>
        <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#747A74]">{eyebrow}</div>
      </div>
      <div className="mt-4 text-[19px] font-medium leading-[1.04] tracking-[-0.035em] text-[#171A17]" style={{ fontFamily: DISPLAY }}>{title}</div>
      <div className="mt-2 text-[11px] leading-[1.5] text-[#6B706B]">{copy}</div>
    </div>
  );
}

function LeakSection() {
  return (
    <section className="bg-[#F8F9F7] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>The revenue leak</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[70px]" style={{ fontFamily: DISPLAY }}>
            Most leads don’t say no.
            <span className="block text-[#C96F55]">They just go quiet.</span>
          </h2>
          <p className="mt-6 max-w-[650px] text-[15px] leading-[1.72] text-[#666B67] sm:text-[17px]">
            Follow-up usually does not fail in one dramatic moment. It fades while the next action sits in someone’s head.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="relative min-h-[360px] overflow-hidden rounded-[30px] bg-[#E97D62] p-7 text-[#FFF9F5] sm:p-9">
              <div className="absolute right-5 top-1 text-[132px] font-medium leading-none tracking-[-0.08em] text-white/[0.08]" style={{ fontFamily: DISPLAY }}>01</div>
              <div className="relative">
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/58">New enquiry</div>
                <div className="mt-14 text-[64px] font-medium leading-[0.86] tracking-[-0.07em] sm:text-[78px]" style={{ fontFamily: DISPLAY }}>WAITING.</div>
                <p className="mt-8 max-w-[430px] text-[15px] leading-[1.65] text-white/72">
                  The first reply waits until someone remembers. Momentum is lost before the conversation really starts.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5">
            <div className="relative min-h-[360px] overflow-hidden rounded-[30px] bg-[#F0D59D] p-7 text-[#1C211D] sm:p-9">
              <div className="absolute right-5 top-1 text-[116px] font-medium leading-none tracking-[-0.08em] text-[#111318]/[0.05]" style={{ fontFamily: DISPLAY }}>02</div>
              <div className="relative">
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9B6722]">Quote sent</div>
                <div className="mt-14 text-[58px] font-medium leading-[0.86] tracking-[-0.07em] sm:text-[70px]" style={{ fontFamily: DISPLAY }}>STALE.</div>
                <p className="mt-8 max-w-[350px] text-[14px] leading-[1.65] text-[#5A543F]">
                  Silence gets mistaken for a no. A live opportunity quietly becomes an old quote.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-12">
            <div className="grid min-h-[250px] overflow-hidden rounded-[30px] bg-[#B6C18D] text-[#182019] sm:grid-cols-[0.8fr_1.2fr]">
              <div className="relative flex items-end p-7 sm:p-9">
                <div className="absolute right-3 top-[-12px] text-[120px] font-medium leading-none tracking-[-0.08em] text-[#111318]/[0.045]" style={{ fontFamily: DISPLAY }}>03</div>
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#5A6536]">Past customer</div>
                  <div className="mt-6 text-[54px] font-medium leading-[0.88] tracking-[-0.07em] sm:text-[68px]" style={{ fontFamily: DISPLAY }}>FORGOTTEN.</div>
                </div>
              </div>
              <div className="flex items-center border-t border-[#182019]/10 p-7 sm:border-l sm:border-t-0 sm:p-10">
                <p className="max-w-[520px] text-[17px] leading-[1.68] text-[#46503E]">
                  The relationship already exists. Nobody asks for the next job, so the next conversation never begins.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ThreadSection() {
  const reduced = !!useReducedMotion();
  const events = [
    { time: "10:04", title: "Enquiry arrives", copy: "Sarah asks about a consultation next week.", tone: "#E97D62", icon: <MessageSquare size={18} /> },
    { time: "10:05", title: "Zapla follows up", copy: "A relevant reply goes out while the enquiry is still warm.", tone: "#DDA34B", ai: true },
    { time: "10:12", title: "Customer replies", copy: "Tuesday morning works.", tone: "#C96C85", icon: <MessageSquare size={18} /> },
    { time: "10:13", title: "Booked", copy: "The customer record and booking move forward together.", tone: "#99A36D", icon: <Calendar size={18} /> },
  ];

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[#111214] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute left-[-8%] top-[22%] text-[190px] font-medium leading-none tracking-[-0.08em] text-white/[0.018]" style={{ fontFamily: DISPLAY }}>SARAH</div>
      <div className="relative mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-16">
        <Reveal>
          <Eyebrow dark>One connected thread</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[58px] lg:text-[62px]" style={{ fontFamily: DISPLAY }}>
            Same customer. Same story.
          </h2>
          <p className="mt-6 max-w-[480px] text-[15px] leading-[1.72] text-white/52 sm:text-[16px]">
            Every reply, booking and next step stays attached to the person instead of being rebuilt from memory.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <TeamAvatar size={72} cell={0} />
            <div>
              <div className="text-[22px] font-medium tracking-[-0.04em] text-white/92" style={{ fontFamily: DISPLAY }}>Sarah Mitchell</div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">Website enquiry · Today</div>
            </div>
          </div>
        </Reveal>

        <div className="border-y border-white/[0.09]">
          {events.map((event, index) => (
            <motion.div
              key={event.time}
              className={`grid gap-4 py-6 sm:grid-cols-[76px_56px_1fr] sm:items-center sm:py-7 ${index < events.length - 1 ? "border-b border-white/[0.08]" : ""}`}
              initial={reduced ? false : { opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: reduced ? 0 : 0.42, delay: reduced ? 0 : index * 0.07, ease: EASE }}
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: event.tone }}>{event.time}</div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.035]">
                {event.ai ? <ZaplaPetal size={28} /> : <span style={{ color: event.tone }}>{event.icon}</span>}
              </div>
              <div>
                <div className="text-[25px] font-medium leading-[1.02] tracking-[-0.04em] text-white/92" style={{ fontFamily: DISPLAY }}>{event.title}</div>
                <div className="mt-2 text-[12px] leading-[1.55] text-white/42">{event.copy}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal className="lg:col-start-2">
          <div className="flex flex-col justify-between gap-3 border-t border-white/[0.08] pt-5 text-[12px] text-white/42 sm:flex-row sm:items-center">
            <span>Reply received. The chase stops.</span>
            <span className="font-semibold text-[#B8C28A]">The next step keeps moving.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="bg-[#F7F8F5] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-[820px]">
          <Eyebrow>Where follow-up matters</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[58px]" style={{ fontFamily: DISPLAY }}>
            Four places good opportunities quietly go cold.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <UseCaseCard
              eyebrow="New leads"
              title="Reply while the enquiry is still warm."
              copy="A new enquiry can get an immediate response, the right questions and a clear next step instead of sitting untouched until someone gets back to it."
              icon={<MessageSquare size={19} />}
              className="min-h-[330px] bg-[#1E2B29] text-[#F7F4EE]"
              dark
            />
          </Reveal>
          <Reveal className="lg:col-span-5">
            <UseCaseCard
              eyebrow="Quotes"
              title="Silence is not the same as no."
              copy="Keep a quote moving with timed follow-up instead of leaving the whole opportunity dependent on someone remembering to chase it."
              icon={<FileText size={19} />}
              className="min-h-[330px] bg-white"
            />
          </Reveal>
          <Reveal className="lg:col-span-5">
            <UseCaseCard
              eyebrow="Bookings"
              title="Reduce the gap between booked and arrived."
              copy="Use reminders and confirmations to keep the next appointment visible without turning your staff into a reminder service."
              icon={<Calendar size={19} />}
              className="min-h-[280px] bg-white"
            />
          </Reveal>
          <Reveal className="lg:col-span-7">
            <UseCaseCard
              eyebrow="Reactivation"
              title="Past customers are not dead leads."
              copy="Bring the right customers back into a conversation when there is a genuine reason to reconnect instead of buying attention from strangers every time."
              icon={<RotateCcw size={19} />}
              className="min-h-[280px] bg-[#C96F55] text-[#FFF8F3]"
              dark
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function UseCaseCard({ eyebrow, title, copy, icon, className, dark = false }: { eyebrow: string; title: string; copy: string; icon: ReactNode; className: string; dark?: boolean }) {
  return (
    <div className={`relative flex h-full flex-col justify-between overflow-hidden rounded-[26px] p-7 sm:p-9 ${className}`}>
      <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full border border-current opacity-[0.06]" />
      <div>
        <span className={`flex h-11 w-11 items-center justify-center rounded-[12px] ${dark ? "bg-white/10" : "bg-[#1E2B29] text-[#F7F4EE]"}`}>{icon}</span>
        <div className={`mt-7 text-[10px] font-semibold uppercase tracking-[0.18em] ${dark ? "text-white/56" : "text-[#C96F55]"}`}>{eyebrow}</div>
        <h3 className="mt-3 max-w-[560px] text-[32px] font-medium leading-[1.02] tracking-[-0.045em] sm:text-[38px]" style={{ fontFamily: DISPLAY }}>{title}</h3>
      </div>
      <p className={`mt-8 max-w-[560px] text-[14px] leading-[1.68] ${dark ? "text-white/68" : "text-[#666B67]"}`}>{copy}</p>
    </div>
  );
}

function HumanControl() {
  return (
    <section className="relative overflow-hidden bg-[#EAE4F0] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute right-[-6%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[#C96C85]/8 blur-[110px]" />
      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>Human control</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.98] tracking-[-0.052em] text-[#111318] sm:text-[58px] lg:text-[64px]" style={{ fontFamily: DISPLAY }}>
            Automation handles repetition. People handle judgment.
          </h2>
          <p className="mt-6 max-w-[620px] text-[15px] leading-[1.72] text-[#626662] sm:text-[16px]">
            When the conversation needs nuance, Zapla stops chasing and gives the full context back to your team.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
          <Reveal>
            <div className="relative">
              <div className="text-[58px] font-medium leading-[0.94] tracking-[-0.06em] text-[#2A2630] sm:text-[72px] lg:text-[82px]" style={{ fontFamily: DISPLAY }}>
                “Can I change the booking?”
              </div>
              <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#2B2630] px-4 py-3 text-[#F7F4EE]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111214]">
                  <ZaplaPetal size={25} />
                </span>
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#C96C85]">Zapla</div>
                  <div className="mt-0.5 text-[12px] font-semibold text-white/84">Automation pauses here.</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="lg:border-l lg:border-[#8F8298]/18 lg:pl-10">
              <div className="flex -space-x-4">
                <TeamAvatar size={70} cell={7} />
                <TeamAvatar size={84} cell={0} />
                <TeamAvatar size={70} cell={14} />
              </div>
              <div className="mt-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1E2B29]/45">Your team</div>
              <div className="mt-2 max-w-[420px] text-[40px] font-medium leading-[0.98] tracking-[-0.05em] text-[#1E2B29] sm:text-[48px]" style={{ fontFamily: DISPLAY }}>
                Takes it from here with the whole story.
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Messages", "Booking", "Customer notes"].map((item, index) => (
                  <span
                    key={item}
                    className="rounded-full px-3 py-2 text-[10px] font-semibold"
                    style={{
                      backgroundColor: index === 0 ? "rgba(201,108,133,.12)" : index === 1 ? "rgba(221,163,75,.14)" : "rgba(153,163,109,.14)",
                      color: index === 0 ? "#9C5269" : index === 1 ? "#8B6427" : "#5F6B3A",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 border-t border-[#8F8298]/18 pt-8 sm:grid-cols-3">
          <SmallPrinciple title="Your rules" copy="You decide what triggers follow-up and when it stops." />
          <SmallPrinciple title="Your voice" copy="Messages are built around your business, not generic scripts." />
          <SmallPrinciple title="Your team" copy="Humans step in exactly where judgment matters." />
        </div>
      </div>
    </section>
  );
}

function SmallPrinciple({ title, copy }: { title: string; copy: string }) {
  return (
    <div>
      <div className="text-[13px] font-semibold text-[#111318]">{title}</div>
      <div className="mt-2 text-[12px] leading-[1.55] text-[#6A706B]">{copy}</div>
    </div>
  );
}

function ConnectedCrm() {
  const facts = [
    { label: "Messages", value: "Every reply attached", tone: "#E97D62" },
    { label: "Booking", value: "Tuesday · 10:30am", tone: "#DDA34B" },
    { label: "Notes", value: "Context saved", tone: "#9B86B8" },
    { label: "Next step", value: "Consultation booked", tone: "#99A36D" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#DDE4CF] px-5 py-20 text-[#111318] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute -left-24 bottom-[-28%] h-[460px] w-[460px] rounded-full bg-white/35 blur-[110px]" />
      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="max-w-[840px]">
          <Eyebrow>Connected CRM</Eyebrow>
          <h2 className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[62px]" style={{ fontFamily: DISPLAY }}>
            One customer. One history.
          </h2>
          <p className="mt-6 max-w-[620px] text-[15px] leading-[1.72] text-[#596153] sm:text-[16px]">
            Messages, bookings, notes and the next step stay with the same customer record instead of scattering across tools and inboxes.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-[34px] border border-[#1E2B29]/10 bg-[#FCFCFA] shadow-[0_28px_72px_rgba(62,70,49,.10)]">
            <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
              <div className="relative border-b border-[#1E2B29]/10 p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6B7168]">Customer record</div>
                <div className="mt-10 flex h-[142px] w-[142px] items-center justify-center rounded-full bg-[#F3F4EF]">
                  <TeamAvatar size={110} cell={0} />
                </div>
                <div className="mt-8 text-[48px] font-medium leading-[0.92] tracking-[-0.055em]" style={{ fontFamily: DISPLAY }}>Sarah Mitchell</div>
                <div className="mt-3 text-[13px] text-[#6B7168]">Website enquiry · Today</div>
                <div className="mt-10 inline-flex rounded-full bg-[#1E2B29] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#F7F4EE]">
                  One source of truth
                </div>
              </div>

              <div>
                <div className="border-b border-[#1E2B29]/10 px-7 py-7 sm:px-9">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B7168]">Everything that matters, already here.</div>
                </div>
                <div className="grid sm:grid-cols-2">
                  {facts.map((fact, index) => (
                    <div
                      key={fact.label}
                      className={`relative min-h-[185px] p-7 sm:p-8 ${index % 2 === 0 ? "sm:border-r sm:border-[#1E2B29]/10" : ""} ${index < 2 ? "border-b border-[#1E2B29]/10" : ""}`}
                    >
                      <div className="absolute left-7 top-0 h-[4px] w-16 sm:left-8" style={{ backgroundColor: fact.tone }} />
                      <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6B7168]">{fact.label}</div>
                      <div className="mt-10 max-w-[280px] text-[29px] font-medium leading-[1.03] tracking-[-0.04em] text-[#202420]" style={{ fontFamily: DISPLAY }}>{fact.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[980px]">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.98] tracking-[-0.05em] sm:text-[56px]" style={{ fontFamily: DISPLAY }}>
            The practical stuff.
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-[#D7CFC5] border-y border-[#D7CFC5]">
          {FAQS.map((item, index) => {
            const active = open === index;
            return (
              <button key={item.q} type="button" className="w-full py-6 text-left" onClick={() => setOpen(active ? null : index)}>
                <div className="flex items-center justify-between gap-5">
                  <span className="text-[16px] font-semibold text-[#111318] sm:text-[18px]">{item.q}</span>
                  <ChevronDown size={18} className={`shrink-0 transition-transform ${active ? "rotate-180" : ""}`} />
                </div>
                {active && <p className="mt-4 max-w-[760px] pr-8 text-[14px] leading-[1.7] text-[#666B67]">{item.a}</p>}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-[#1E2B29] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <Reveal className="mx-auto max-w-[1050px] text-center">
        <Eyebrow dark>Keep the next step moving</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-[900px] text-[46px] font-medium leading-[0.94] tracking-[-0.055em] sm:text-[64px] lg:text-[74px]" style={{ fontFamily: DISPLAY }}>
          Stop relying on memory to make the next move.
        </h2>
        <p className="mx-auto mt-6 max-w-[620px] text-[15px] leading-[1.7] text-white/62 sm:text-[17px]">
          Zapla keeps the conversation, follow-up and next step connected so good opportunities do not quietly disappear.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={BOOK_URL} className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#F7F4EE] px-6 text-[13px] font-semibold text-[#1E2B29]">
            Book a Call <ArrowRight size={15} />
          </a>
          <a href={PRICING_URL} className="inline-flex h-[50px] items-center rounded-[10px] border border-white/20 px-6 text-[13px] font-semibold text-[#F7F4EE]">
            View pricing
          </a>
        </div>
      </Reveal>
    </section>
  );
}
