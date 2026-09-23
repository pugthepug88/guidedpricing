import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  Clock3,
  FileText,
  MessageSquare,
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
          "Zapla keeps new enquiries, quotes, bookings and past customers moving with connected follow-up across SMS, email and your CRM.",
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
    <main className="min-h-screen bg-[#F7F4EE] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
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
  return (
    <section className="relative overflow-hidden bg-[#F2E9DE] px-5 pb-20 pt-[116px] sm:px-10 sm:pb-24 sm:pt-[126px] lg:px-16 lg:pb-28 lg:pt-[138px]">
      <div className="pointer-events-none absolute right-[-8%] top-[12%] h-[520px] w-[520px] rounded-full bg-[#DDA34B]/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-[-25%] left-[32%] h-[420px] w-[420px] rounded-full bg-[#C96C85]/8 blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1420px] items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <Reveal className="max-w-[650px]">
          <Eyebrow>Follow-up automation</Eyebrow>
          <h1 className="mt-4 text-[50px] font-medium leading-[0.92] tracking-[-0.06em] sm:text-[68px] lg:text-[82px]" style={{ fontFamily: DISPLAY }}>
            The lead came in.
            <span className="block text-[#C96F55]">Zapla keeps it moving.</span>
          </h1>
          <p className="mt-6 max-w-[600px] text-[16px] leading-[1.7] text-[#626762] sm:text-[18px]">
            Zapla follows up across SMS and email, keeps every conversation tied to the customer record, and keeps opportunities moving while your team gets on with the work.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={BOOK_URL} className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px">
              Book a Call <ArrowRight size={15} />
            </a>
            <a href="#how-it-works" className="inline-flex h-[50px] items-center rounded-[10px] border border-[#C9BFB2] bg-white/55 px-6 text-[13px] font-semibold text-[#111318]">
              See how it works
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-[#656A65] sm:text-[12px]">
            {["New enquiries", "Quotes", "Bookings", "Reactivation"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C96F55]" />
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <FollowUpScene />
        </Reveal>
      </div>
    </section>
  );
}

function FollowUpScene() {
  const reduced = !!useReducedMotion();

  const beats = [
    { time: "10:04", title: "New enquiry", copy: "Consultation next week?", bg: "#1E2B29", fg: "#F7F4EE", width: "w-[74%]", offset: "ml-0" },
    { time: "10:05", title: "Zapla follows up", copy: "Would Tuesday morning suit you?", bg: "#DDA34B", fg: "#111318", width: "w-[86%]", offset: "ml-[8%]", ai: true },
    { time: "10:12", title: "Customer replies", copy: "Tuesday morning works.", bg: "#C96C85", fg: "#FFF8F3", width: "w-[68%]", offset: "ml-[22%]" },
    { time: "10:13", title: "Booked", copy: "Tuesday · 10:30am", bg: "#99A36D", fg: "#111318", width: "w-[88%]", offset: "ml-[3%]" },
  ];

  return (
    <div className="relative min-h-[560px] overflow-hidden lg:min-h-[620px]">
      <div className="pointer-events-none absolute right-0 top-[-34px] text-right">
        <div className="text-[132px] font-medium leading-[0.82] tracking-[-0.09em] text-[#111318]/[0.035] sm:text-[168px]" style={{ fontFamily: DISPLAY }}>9</div>
        <div className="mt-1 text-[18px] font-semibold uppercase tracking-[0.28em] text-[#111318]/20">minutes</div>
      </div>

      <div className="relative z-10 pt-16 sm:pt-20 lg:pt-24">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-[#CFC6BB] pb-4">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#C96F55]">One enquiry</div>
            <div className="mt-1 text-[16px] font-semibold text-[#242824]">Four moments. No chasing.</div>
          </div>
          <div className="text-right text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A7D78]">10:04 → 10:13</div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {beats.map((beat, index) => (
            <motion.div
              key={beat.time}
              className={`${beat.width} ${beat.offset}`}
              initial={reduced ? false : { opacity: 0, x: index % 2 === 0 ? -26 : 26 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.65 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : index * 0.08, ease: EASE }}
            >
              <div className="grid min-h-[92px] grid-cols-[64px_1fr] items-center gap-3 px-4 py-4 sm:min-h-[108px] sm:grid-cols-[78px_1fr] sm:px-5" style={{ backgroundColor: beat.bg, color: beat.fg }}>
                <div className="text-[12px] font-bold tracking-[0.12em] opacity-70">{beat.time}</div>
                <div className="flex items-center gap-3">
                  {beat.ai && (
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#111214]">
                      <ZaplaPetal size={24} />
                    </span>
                  )}
                  <div>
                    <div className="text-[20px] font-medium leading-none tracking-[-0.035em] sm:text-[24px]" style={{ fontFamily: DISPLAY }}>{beat.title}</div>
                    <div className="mt-2 text-[11px] leading-[1.45] opacity-65 sm:text-[12px]">{beat.copy}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeakSection() {
  const losses = [
    {
      n: "01",
      state: "WAITING.",
      title: "New enquiry",
      copy: "The first reply waits until someone remembers.",
      tone: "#E97D62",
    },
    {
      n: "02",
      state: "STALE.",
      title: "Quote sent",
      copy: "Silence gets mistaken for a no.",
      tone: "#DDA34B",
    },
    {
      n: "03",
      state: "FORGOTTEN.",
      title: "Past customer",
      copy: "The next job never gets asked for.",
      tone: "#99A36D",
    },
  ];

  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
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

        <div className="mt-14 grid border-y border-[#D8D0C7] lg:grid-cols-3">
          {losses.map((item, index) => (
            <Reveal key={item.n}>
              <div className={`relative min-h-[360px] overflow-hidden py-8 lg:px-8 lg:py-10 ${index < 2 ? "border-b border-[#D8D0C7] lg:border-b-0 lg:border-r" : ""}`}>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold tracking-[0.18em]" style={{ color: item.tone }}>{item.n}</span>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.tone }} />
                </div>
                <div className="mt-12 text-[48px] font-medium leading-[0.9] tracking-[-0.07em] text-[#111318] sm:text-[58px] lg:text-[62px]" style={{ fontFamily: DISPLAY }}>
                  {item.state}
                </div>
                <div className="mt-12 text-[21px] font-medium tracking-[-0.035em] text-[#111318]" style={{ fontFamily: DISPLAY }}>{item.title}</div>
                <p className="mt-3 max-w-[300px] text-[14px] leading-[1.65] text-[#6E736E]">{item.copy}</p>
                <div className="absolute bottom-0 left-0 h-[3px] w-1/3" style={{ backgroundColor: item.tone }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ThreadSection() {
  const reduced = !!useReducedMotion();
  const events = [
    { no: "01", time: "10:04", title: "Enquiry arrives", copy: "Sarah asks about a consultation next week.", tone: "#E97D62", icon: <MessageSquare size={18} /> },
    { no: "02", time: "10:05", title: "Zapla follows up", copy: "A relevant reply goes out while the enquiry is still warm.", tone: "#DDA34B", ai: true },
    { no: "03", time: "10:12", title: "Customer replies", copy: "Tuesday morning works.", tone: "#C96C85", icon: <MessageSquare size={18} /> },
    { no: "04", time: "10:13", title: "Next step booked", copy: "The customer record and booking move forward together.", tone: "#99A36D", icon: <Calendar size={18} /> },
  ];

  return (
    <section id="how-it-works" className="bg-[#111214] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-[880px]">
          <Eyebrow dark>One connected thread</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[58px] lg:text-[66px]" style={{ fontFamily: DISPLAY }}>
            The conversation keeps moving without starting over.
          </h2>
          <p className="mt-6 max-w-[610px] text-[15px] leading-[1.72] text-white/54 sm:text-[16px]">
            Every reply, booking and next step stays attached to the same customer story.
          </p>
        </Reveal>

        <div className="mt-14 grid border-y border-white/[0.09] sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event, index) => (
            <motion.div
              key={event.no}
              className={`relative min-h-[330px] overflow-hidden p-6 sm:p-7 ${index < 3 ? "border-b border-white/[0.08] lg:border-b-0 lg:border-r" : ""} ${index === 1 ? "bg-white/[0.025]" : ""}`}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : index * 0.08, ease: EASE }}
            >
              <div className="absolute right-4 top-1 text-[92px] font-medium leading-none tracking-[-0.08em] text-white/[0.028]" style={{ fontFamily: DISPLAY }}>{event.no}</div>
              <div className="relative">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: event.tone }}>{event.time}</div>
                <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.035]">
                  {event.ai ? <ZaplaPetal size={30} /> : <span style={{ color: event.tone }}>{event.icon}</span>}
                </div>
                <h3 className="mt-8 text-[28px] font-medium leading-[1.02] tracking-[-0.04em] text-white/92" style={{ fontFamily: DISPLAY }}>{event.title}</h3>
                <p className="mt-4 max-w-[230px] text-[13px] leading-[1.6] text-white/44">{event.copy}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-[3px] w-full origin-left" style={{ backgroundColor: event.tone, opacity: index === 1 ? 0.9 : 0.45 }} />
            </motion.div>
          ))}
        </div>

        <Reveal className="mt-8">
          <div className="flex flex-col justify-between gap-3 border-t border-white/[0.08] pt-6 text-[12px] text-white/44 sm:flex-row sm:items-center">
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
    <section className="bg-[#EFE3D4] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
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
              className="min-h-[330px] bg-[#F7F4EE]"
            />
          </Reveal>
          <Reveal className="lg:col-span-5">
            <UseCaseCard
              eyebrow="Bookings"
              title="Reduce the gap between booked and arrived."
              copy="Use reminders and confirmations to keep the next appointment visible without turning your staff into a reminder service."
              icon={<Calendar size={19} />}
              className="min-h-[280px] bg-[#F7F4EE]"
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
    <section className="bg-[#E9E2EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-[880px]">
          <Eyebrow>Human control</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.98] tracking-[-0.052em] text-[#111318] sm:text-[58px] lg:text-[64px]" style={{ fontFamily: DISPLAY }}>
            Automation handles repetition. People handle judgment.
          </h2>
          <p className="mt-6 max-w-[620px] text-[15px] leading-[1.72] text-[#626662] sm:text-[16px]">
            When the conversation needs nuance, Zapla stops chasing and hands the full context back to your team.
          </p>
        </Reveal>

        <div className="relative mt-12 grid overflow-hidden rounded-[30px] shadow-[0_24px_70px_rgba(76,64,85,.10)] lg:grid-cols-2">
          <Reveal>
            <div className="relative min-h-[420px] bg-[#2B2630] p-7 text-[#F7F4EE] sm:p-10">
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#C96C85]">Automation</div>
              <div className="mt-12 max-w-[400px] text-[34px] font-medium leading-[1.02] tracking-[-0.045em] sm:text-[42px]" style={{ fontFamily: DISPLAY }}>
                “Can I change the booking?”
              </div>
              <div className="mt-10 flex items-center gap-4">
                <span className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#111214]">
                  <ZaplaPetal size={48} />
                </span>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/36">Zapla</div>
                  <div className="mt-1 text-[16px] font-semibold text-white/84">Sequence pauses here.</div>
                </div>
              </div>
              <div className="absolute bottom-7 left-7 text-[10px] uppercase tracking-[0.16em] text-white/26 sm:left-10">No more automated chase</div>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative min-h-[420px] bg-[#F7F4EE] p-7 text-[#111318] sm:p-10">
              <div className="pointer-events-none absolute -right-3 top-2 text-[90px] font-medium leading-none tracking-[-0.08em] text-[#111318]/[0.035]" style={{ fontFamily: DISPLAY }}>HUMAN</div>
              <div className="relative">
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#1E2B29]/45">Your team</div>
                <div className="mt-9 flex -space-x-4">
                  <TeamAvatar size={74} cell={7} />
                  <TeamAvatar size={86} cell={0} />
                  <TeamAvatar size={74} cell={14} />
                </div>
                <h3 className="mt-8 max-w-[390px] text-[34px] font-medium leading-[1.02] tracking-[-0.045em] sm:text-[42px]" style={{ fontFamily: DISPLAY }}>
                  Picks up with the whole story.
                </h3>
                <p className="mt-5 max-w-[430px] text-[14px] leading-[1.65] text-[#656A65]">
                  Messages, timing and customer context are already there. Your team steps in without asking the customer to start again.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#8F8298]/20 bg-[#E9E2EE] text-[#8F8298] shadow-[0_8px_24px_rgba(76,64,85,.12)] lg:flex">
            <ArrowRight size={18} />
          </div>
        </div>

        <div className="mt-8 grid gap-6 border-t border-[#8F8298]/20 pt-8 sm:grid-cols-3">
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
    <section className="bg-[#E3E6D7] px-5 py-20 text-[#111318] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-[820px]">
          <Eyebrow>Connected CRM</Eyebrow>
          <h2 className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[62px]" style={{ fontFamily: DISPLAY }}>
            One customer. One history.
          </h2>
          <p className="mt-6 max-w-[620px] text-[15px] leading-[1.72] text-[#60665F] sm:text-[16px]">
            Messages, bookings, notes and the next step stay with the same customer record instead of scattering across tools and inboxes.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid border-y border-[#1E2B29]/14 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="flex min-h-[420px] flex-col justify-between border-b border-[#1E2B29]/14 py-8 lg:border-b-0 lg:border-r lg:pr-10">
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6B7168]">Customer record</div>
              <div>
                <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-[#F7F4EE] shadow-[0_24px_60px_rgba(55,61,47,.10)]">
                  <TeamAvatar size={116} cell={0} />
                </div>
                <div className="mt-7 text-[44px] font-medium leading-[0.95] tracking-[-0.055em]" style={{ fontFamily: DISPLAY }}>Sarah Mitchell</div>
                <div className="mt-3 text-[13px] text-[#6B7168]">Website enquiry · Today</div>
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#1E2B29]/45">One source of truth</div>
            </div>

            <div className="grid sm:grid-cols-2">
              {facts.map((fact, index) => (
                <div key={fact.label} className={`relative min-h-[210px] p-7 sm:p-8 ${index % 2 === 0 ? "sm:border-r sm:border-[#1E2B29]/12" : ""} ${index < 2 ? "border-b border-[#1E2B29]/12" : ""}`}>
                  <div className="absolute left-0 top-0 h-1 w-14" style={{ backgroundColor: fact.tone }} />
                  <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6B7168]">{fact.label}</div>
                  <div className="mt-10 max-w-[260px] text-[28px] font-medium leading-[1.03] tracking-[-0.04em] text-[#202420]" style={{ fontFamily: DISPLAY }}>{fact.value}</div>
                </div>
              ))}
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
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
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
