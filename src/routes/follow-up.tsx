import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  Mail,
  MessageSquare,
  RotateCcw,
  UserRound,
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

  const desktopEvents = [
    { x: "7%", y: "11%", time: "10:04", label: "New enquiry", copy: "Consultation next week?", tone: "#E97D62" },
    { x: "37%", y: "30%", time: "10:05", label: "Zapla follows up", copy: "Would Tuesday morning suit you?", tone: "#DDA34B", ai: true },
    { x: "62%", y: "56%", time: "10:12", label: "Customer replied", copy: "Tuesday morning works.", tone: "#C96C85" },
    { x: "75%", y: "78%", time: "10:13", label: "Consultation booked", copy: "Tuesday · 10:30am", tone: "#99A36D", booked: true },
  ];

  return (
    <div className="relative overflow-hidden rounded-[30px] bg-[#1E2B29] p-5 shadow-[0_30px_80px_rgba(47,41,34,.16)] sm:p-6 lg:min-h-[620px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_56%_44%,rgba(221,163,75,.14),transparent_27%),radial-gradient(circle_at_20%_80%,rgba(155,134,184,.10),transparent_30%)]" />

      <div className="relative z-10 flex items-end justify-between gap-4">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#DDA34B]">Momentum</div>
          <div className="mt-1 text-[13px] font-semibold text-white/82">From enquiry to booked</div>
        </div>
        <div className="text-right">
          <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/32">Elapsed</div>
          <div className="mt-1 text-[28px] font-medium tracking-[-0.05em] text-white/90" style={{ fontFamily: DISPLAY }}>9 min</div>
        </div>
      </div>

      <div className="relative mt-7 hidden h-[500px] lg:block">
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 760 500" fill="none" aria-hidden="true">
          <path
            d="M66 92 C190 92 220 166 300 185 C394 207 420 277 500 300 C588 326 606 390 702 408"
            stroke="rgba(255,255,255,.08)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <motion.path
            d="M66 92 C190 92 220 166 300 185 C394 207 420 277 500 300 C588 326 606 390 702 408"
            stroke="rgba(221,163,75,.68)"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: reduced ? 0 : 1.15, ease: EASE }}
          />
          {!reduced && (
            <motion.circle
              r="5"
              fill="#F0B75A"
              style={{ filter: "drop-shadow(0 0 8px rgba(240,183,90,.9))" }}
              initial={{ pathLength: 0 }}
            >
              <animateMotion dur="3.8s" repeatCount="indefinite" path="M66 92 C190 92 220 166 300 185 C394 207 420 277 500 300 C588 326 606 390 702 408" />
            </motion.circle>
          )}
        </svg>

        <div className="pointer-events-none absolute left-[40%] top-[37%] text-[92px] font-medium leading-none tracking-[-0.08em] text-white/[0.025]" style={{ fontFamily: DISPLAY }}>
          FOLLOW
        </div>

        {desktopEvents.map((event, index) => (
          <motion.div
            key={event.time}
            className="absolute w-[220px]"
            style={{ left: event.x, top: event.y }}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduced ? 0 : 0.42, delay: reduced ? 0 : 0.12 + index * 0.12, ease: EASE }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full border-2 border-[#1E2B29]" style={{ backgroundColor: event.tone, boxShadow: `0 0 0 5px ${event.tone}22` }} />
              <span className="text-[10px] font-semibold tracking-[0.12em]" style={{ color: event.tone }}>{event.time}</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              {event.ai && (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111214]">
                  <ZaplaPetal size={22} />
                </span>
              )}
              <div className="text-[15px] font-semibold text-white/90">{event.label}</div>
              {event.booked && (
                <span className="rounded-full bg-[#99A36D]/12 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#B8C28A]">Booked</span>
              )}
            </div>
            <div className="mt-2 max-w-[210px] text-[12px] leading-[1.5] text-white/48">{event.copy}</div>
          </motion.div>
        ))}
      </div>

      <div className="relative mt-7 space-y-0 lg:hidden">
        <div className="absolute bottom-4 left-[18px] top-4 w-px bg-white/10" />
        {desktopEvents.map((event, index) => (
          <motion.div
            key={event.time}
            className="relative grid grid-cols-[38px_1fr] gap-3 py-5"
            initial={reduced ? false : { opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : 0.38, delay: reduced ? 0 : index * 0.08, ease: EASE }}
          >
            <div className="relative z-10 mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#172320]">
              {event.ai ? <ZaplaPetal size={22} /> : <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: event.tone }} />}
            </div>
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: event.tone }}>{event.time}</div>
              <div className="mt-1 text-[15px] font-semibold text-white/90">{event.label}</div>
              <div className="mt-1 text-[12px] leading-[1.5] text-white/48">{event.copy}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}\n\nfunction LeakSection() {
  const moments = [
    {
      n: "01",
      title: "New enquiry",
      copy: "The first reply waits until someone remembers.",
      note: "Momentum lost before the conversation really starts.",
      tone: "#E97D62",
      width: "lg:w-[72%]",
      offset: "",
    },
    {
      n: "02",
      title: "Quote sent",
      copy: "Silence gets mistaken for a no.",
      note: "A live opportunity slowly becomes an old quote.",
      tone: "#DDA34B",
      width: "lg:w-[68%]",
      offset: "lg:ml-[22%]",
    },
    {
      n: "03",
      title: "Past customer",
      copy: "The next job never gets asked for.",
      note: "Trust already exists, but the next conversation never begins.",
      tone: "#99A36D",
      width: "lg:w-[76%]",
      offset: "lg:ml-[7%]",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute -right-24 top-14 text-[170px] font-medium tracking-[-0.08em] text-[#111318]/[0.018]" style={{ fontFamily: DISPLAY }}>QUIET</div>
      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="max-w-[920px]">
          <Eyebrow>The revenue leak</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[70px]" style={{ fontFamily: DISPLAY }}>
            Most leads don’t say no.
            <span className="block text-[#C96F55]">They just go quiet.</span>
          </h2>
          <p className="mt-6 max-w-[680px] text-[15px] leading-[1.72] text-[#666B67] sm:text-[17px]">
            Follow-up breaks when the next step lives in someone’s memory. The opportunity rarely disappears all at once. It loses momentum one forgotten action at a time.
          </p>
        </Reveal>

        <div className="mt-14 space-y-5 sm:space-y-6">
          {moments.map((item, index) => (
            <Reveal key={item.n} className={`${item.width} ${item.offset}`}>
              <div className="group relative overflow-hidden border-y border-[#D7CFC5] bg-white/35 px-5 py-7 sm:px-7 sm:py-8">
                <div className="absolute bottom-[-26px] right-3 text-[92px] font-medium leading-none tracking-[-0.08em] text-[#111318]/[0.035]" style={{ fontFamily: DISPLAY }}>{item.n}</div>
                <div className="grid gap-4 sm:grid-cols-[58px_190px_1fr] sm:items-center">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.tone }} />
                    <span className="text-[9px] font-bold tracking-[0.18em]" style={{ color: item.tone }}>{item.n}</span>
                  </div>
                  <div className="text-[24px] font-medium tracking-[-0.04em] text-[#111318]" style={{ fontFamily: DISPLAY }}>{item.title}</div>
                  <div>
                    <div className="text-[16px] font-medium leading-[1.5] text-[#333833]">{item.copy}</div>
                    <div className="mt-1.5 text-[12px] leading-[1.5] text-[#777C77]">{item.note}</div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: item.tone }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}\n\nfunction ThreadSection() {
  const reduced = !!useReducedMotion();
  const events = [
    { side: "left", time: "10:04am", title: "Enquiry arrives", copy: "Sarah asks about a consultation next week.", tone: "#E97D62", icon: <MessageSquare size={16} /> },
    { side: "right", time: "10:05am", title: "Zapla follows up", copy: "A relevant reply goes out while the enquiry is still warm.", tone: "#DDA34B", ai: true },
    { side: "left", time: "10:12am", title: "Customer replies", copy: "Tuesday morning works.", tone: "#C96C85", icon: <MessageSquare size={16} /> },
    { side: "right", time: "10:13am", title: "Next step is booked", copy: "The customer record and booking update together.", tone: "#99A36D", icon: <Calendar size={16} /> },
  ];

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[#111214] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-[42%] h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-[#9B86B8]/[0.055] blur-[150px]" />
      <div className="relative mx-auto max-w-[1180px]">
        <Reveal className="mx-auto max-w-[820px] text-center">
          <Eyebrow dark>One connected thread</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[58px]" style={{ fontFamily: DISPLAY }}>
            The conversation keeps moving without starting over.
          </h2>
          <p className="mx-auto mt-6 max-w-[620px] text-[15px] leading-[1.72] text-white/56 sm:text-[16px]">
            Every reply, booking and next step stays attached to the same customer story.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-[930px]">
          <motion.div
            className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-[#E97D62]/55 via-[#DDA34B]/45 to-[#99A36D]/55 sm:left-1/2 sm:-translate-x-1/2"
            initial={reduced ? false : { scaleY: 0, transformOrigin: "top" }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduced ? 0 : 1.1, ease: EASE }}
          />

          <div className="space-y-12 sm:space-y-16">
            {events.map((event, index) => {
              const right = event.side === "right";
              return (
                <motion.div
                  key={event.time}
                  className="relative grid grid-cols-[40px_1fr] gap-4 sm:grid-cols-[1fr_56px_1fr] sm:gap-7"
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : index * 0.08, ease: EASE }}
                >
                  <div className={`hidden sm:block ${right ? "" : "text-right"}`}>
                    {!right && (
                      <ThreadEventText time={event.time} title={event.title} copy={event.copy} tone={event.tone} ai={event.ai} icon={event.icon} align="right" />
                    )}
                  </div>

                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#171819] sm:mx-auto sm:h-12 sm:w-12">
                    {event.ai ? <ZaplaPetal size={28} /> : <span style={{ color: event.tone }}>{event.icon}</span>}
                  </div>

                  <div>
                    <div className="sm:hidden">
                      <ThreadEventText time={event.time} title={event.title} copy={event.copy} tone={event.tone} ai={event.ai} icon={event.icon} />
                    </div>
                    {right && (
                      <div className="hidden sm:block">
                        <ThreadEventText time={event.time} title={event.title} copy={event.copy} tone={event.tone} ai={event.ai} icon={event.icon} />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <Reveal className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/52">
              <span className="h-2 w-2 rounded-full bg-[#99A36D]" />
              Customer replied. Unnecessary follow-up stops here.
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ThreadEventText({
  time,
  title,
  copy,
  tone,
  align = "left",
}: {
  time: string;
  title: string;
  copy: string;
  tone: string;
  ai?: boolean;
  icon?: ReactNode;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "sm:ml-auto sm:max-w-[310px]" : "sm:max-w-[310px]"}>
      <div className="text-[9px] font-semibold uppercase tracking-[0.16em]" style={{ color: tone }}>{time}</div>
      <div className="mt-2 text-[22px] font-medium leading-[1.05] tracking-[-0.035em] text-white/92" style={{ fontFamily: DISPLAY }}>{title}</div>
      <div className="mt-2 text-[12px] leading-[1.55] text-white/46">{copy}</div>
    </div>
  );
}\n\nfunction ThreadRow({ icon, label, meta, copy, accent }: { icon: ReactNode; label: string; meta: string; copy: string; accent: string }) {
  return (
    <div className="grid grid-cols-[40px_1fr] gap-3 rounded-[16px] border border-white/[0.07] bg-white/[0.025] p-4 sm:grid-cols-[40px_150px_1fr] sm:items-center">
      <span className="flex h-9 w-9 items-center justify-center rounded-[10px]" style={{ backgroundColor: `${accent}18`, color: accent }}>{icon}</span>
      <div>
        <div className="text-[11px] font-semibold text-white/82">{label}</div>
        <div className="mt-1 text-[9px] text-white/32">{meta}</div>
      </div>
      <div className="col-start-2 text-[12px] leading-[1.55] text-white/58 sm:col-start-auto">{copy}</div>
    </div>
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
    <section className="relative overflow-hidden bg-[#E9E2EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full bg-[#C96C85]/10 blur-[100px]" />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <Reveal>
            <Eyebrow>Human control</Eyebrow>
            <h2 className="mt-4 text-[42px] font-medium leading-[0.98] tracking-[-0.052em] text-[#111318] sm:text-[58px]" style={{ fontFamily: DISPLAY }}>
              Automation handles repetition. People handle judgment.
            </h2>
            <p className="mt-6 max-w-[520px] text-[15px] leading-[1.72] text-[#5F625F] sm:text-[16px]">
              When a customer replies or the conversation needs nuance, the automation can stop and your team takes over with the full context intact.
            </p>
          </Reveal>

          <Reveal>
            <div className="relative min-h-[390px]">
              <svg className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block" viewBox="0 0 700 390" fill="none" aria-hidden="true">
                <path d="M120 205 C230 205 252 205 338 205 C430 205 454 205 574 205" stroke="rgba(30,43,41,.12)" strokeWidth="7" strokeLinecap="round" />
                <path d="M120 205 C230 205 252 205 338 205 C430 205 454 205 574 205" stroke="rgba(221,163,75,.8)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>

              <div className="absolute left-[4%] top-[34%]">
                <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#C96C85]">Customer reply</div>
                <div className="mt-2 max-w-[170px] text-[16px] font-semibold leading-[1.35] text-[#222522]">“Can I change the booking?”</div>
              </div>

              <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-full bg-[#111214] shadow-[0_18px_44px_rgba(30,22,34,.16)]">
                  <ZaplaPetal size={58} />
                </span>
                <div className="mt-4 rounded-full bg-[#111318]/[0.06] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#55595A]">Sequence pauses</div>
              </div>

              <div className="absolute right-[3%] top-[30%] text-center">
                <div className="flex -space-x-3">
                  <TeamAvatar size={58} cell={7} />
                  <TeamAvatar size={66} cell={0} />
                  <TeamAvatar size={58} cell={14} />
                </div>
                <div className="mt-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#1E2B29]/55">Your team</div>
                <div className="mt-1 text-[15px] font-semibold text-[#1E2B29]">Takes over with context</div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-6 border-t border-[#8F8298]/20 pt-8 sm:grid-cols-3">
          <SmallPrinciple title="Your rules" copy="You decide what triggers follow-up and when it stops." />
          <SmallPrinciple title="Your voice" copy="Messages are built around your business, not generic scripts." />
          <SmallPrinciple title="Your team" copy="Humans step in exactly where judgment matters." />
        </div>
      </div>
    </section>
  );
}\n\nfunction SmallPrinciple({ title, copy }: { title: string; copy: string }) {
  return (
    <div>
      <div className="text-[13px] font-semibold text-[#111318]">{title}</div>
      <div className="mt-2 text-[12px] leading-[1.55] text-[#6A706B]">{copy}</div>
    </div>
  );
}

function ConnectedCrm() {
  const nodes = [
    { className: "left-[4%] top-[12%]", label: "Messages", value: "Every reply stays attached", icon: <MessageSquare size={17} />, tone: "#E97D62" },
    { className: "right-[4%] top-[12%]", label: "Booking", value: "Tuesday · 10:30am", icon: <Calendar size={17} />, tone: "#DDA34B" },
    { className: "left-[7%] bottom-[12%]", label: "Notes", value: "Context stays with the record", icon: <FileText size={17} />, tone: "#9B86B8" },
    { className: "right-[7%] bottom-[12%]", label: "Next step", value: "Consultation booked", icon: <Clock3 size={17} />, tone: "#99A36D" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#E3E6D7] px-5 py-20 text-[#111318] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-[56%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#99A36D]/10 blur-[130px]" />
      <div className="relative mx-auto max-w-[1180px]">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <Eyebrow>Connected CRM</Eyebrow>
          <h2 className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[62px]" style={{ fontFamily: DISPLAY }}>
            One customer. One history.
          </h2>
          <p className="mx-auto mt-6 max-w-[610px] text-[15px] leading-[1.72] text-[#60665F] sm:text-[16px]">
            Follow-up works because the messages, booking, notes and next step stay connected to the same person instead of scattering across tools and inboxes.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="relative mx-auto min-h-[560px] max-w-[980px]">
            <svg className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block" viewBox="0 0 980 560" fill="none" aria-hidden="true">
              <path d="M490 280 C390 230 280 150 170 122" stroke="rgba(30,43,41,.16)" strokeWidth="1.4" />
              <path d="M490 280 C590 230 700 150 810 122" stroke="rgba(30,43,41,.16)" strokeWidth="1.4" />
              <path d="M490 280 C390 330 292 410 190 442" stroke="rgba(30,43,41,.16)" strokeWidth="1.4" />
              <path d="M490 280 C590 330 688 410 790 442" stroke="rgba(30,43,41,.16)" strokeWidth="1.4" />
            </svg>

            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="mx-auto flex h-[150px] w-[150px] items-center justify-center rounded-full border border-[#1E2B29]/10 bg-[#F7F4EE] shadow-[0_26px_70px_rgba(55,61,47,.14)]">
                <TeamAvatar size={112} cell={0} />
              </div>
              <div className="mt-5 text-[28px] font-medium tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>Sarah Mitchell</div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64695F]">Customer record</div>
            </div>

            {nodes.map((node) => (
              <div key={node.label} className={`absolute w-[220px] ${node.className}`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F4EE] shadow-[0_10px_28px_rgba(55,61,47,.10)]" style={{ color: node.tone }}>{node.icon}</span>
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#6A7068]">{node.label}</div>
                    <div className="mt-1 text-[14px] font-semibold leading-[1.35] text-[#242824]">{node.value}</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="grid gap-3 pt-[390px] sm:hidden">
              {nodes.map((node) => (
                <div key={`mobile-${node.label}`} className="flex items-center gap-3 border-t border-[#1E2B29]/10 py-4">
                  <span style={{ color: node.tone }}>{node.icon}</span>
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#6A7068]">{node.label}</div>
                    <div className="mt-1 text-[13px] font-semibold text-[#242824]">{node.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}\n\nfunction CrmLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-3">
      <span className="text-[11px] text-white/34">{label}</span>
      <span className="text-[11px] font-semibold text-white/76">{value}</span>
    </div>
  );
}

function Activity({ icon, title, meta }: { icon: ReactNode; title: string; meta: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[14px] bg-white/[0.035] p-3.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#DDA34B]/10 text-[#DDA34B]">{icon}</span>
      <div>
        <div className="text-[11px] font-semibold text-white/78">{title}</div>
        <div className="mt-1 text-[9px] text-white/28">{meta}</div>
      </div>
    </div>
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
