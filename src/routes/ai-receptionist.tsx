import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  MessageSquare,
  Phone,
  PhoneForwarded,
  UserRound,
} from "lucide-react";

export const Route = createFileRoute("/ai-receptionist")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "AI Receptionist for Service Businesses | Zapla" },
      {
        name: "description",
        content:
          "Zapla answers incoming calls, handles routine enquiries, books or routes the next step, and keeps follow-up connected.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [
      { rel: "preconnect", href: "https://cdn.openart.ai" },
    ],
  }),
  component: AIReceptionistPage,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const HERO_IMAGE =
  "https://cdn.openart.ai/openart-uploads/production/attachment-transfers/befc6b19b694f24013c9255a9b9d14f5044236b772a28709c682c6cc47c7b696.png";
const PETAL_COLORS = ["#E97D62", "#C96C85", "#DDA34B", "#99A36D", "#9B86B8", "#D58C75"] as const;
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

const FAQS = [
  {
    q: "Can I keep my existing business number?",
    a: "Usually, yes. We can use call forwarding from your existing number or set up a new business number, depending on the call flow you want.",
  },
  {
    q: "Can it book appointments?",
    a: "Yes. If the booking flow and calendar are connected, the receptionist can move a suitable caller into the booking step you have set.",
  },
  {
    q: "Can it transfer calls to my team?",
    a: "Yes. You decide which calls stay with the AI and which should route or transfer to a person.",
  },
  {
    q: "What happens if it does not know the answer?",
    a: "It does not need to invent one. You can set the fallback to collect the right details, take a clean message or hand the call to your team.",
  },
  {
    q: "How much does it cost?",
    a: "AI Receptionist is A$199 per month plus GST as an add-on to an active Zapla plan. It includes 200 Voice AI minutes. Setup starts from A$997 plus GST, and additional Voice AI usage is A$0.90 plus GST per minute.",
  },
] as const;

function AIReceptionistPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <Hero />
      <WhatItHandles />
      <FollowThrough />
      <SetupAndPricing />
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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={"text-[10px] font-semibold uppercase tracking-[0.2em] " + (light ? "text-[#DDA34B]" : "text-[#C96F55]")}>
      {children}
    </p>
  );
}

function Hero() {
  return (
    <section className="bg-[#F6F0E8] px-5 pb-16 pt-[108px] sm:px-10 sm:pb-20 sm:pt-[120px] lg:px-16 lg:pb-24 lg:pt-[132px]">
      <div className="mx-auto grid max-w-[1420px] items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Reveal className="max-w-[620px]">
          <Eyebrow>AI Receptionist</Eyebrow>
          <h1
            className="mt-4 text-[48px] font-medium leading-[0.93] tracking-[-0.06em] sm:text-[64px] lg:text-[78px]"
            style={{ fontFamily: DISPLAY }}
          >
            Your phone rings.
            <span className="block">Zapla picks up.</span>
            <span className="block text-[#C96F55]">You keep working.</span>
          </h1>
          <p className="mt-6 max-w-[570px] text-[16px] leading-[1.68] text-[#626762] sm:text-[18px]">
            Zapla handles routine calls, captures what matters, books or routes the next step, and keeps follow-up moving while your team stays focused.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BOOK_URL}
              className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-transform duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C96F55] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F0E8]"
            >
              Book a Call <ArrowRight size={15} />
            </a>
            <a
              href={PRICING_URL}
              className="inline-flex h-[50px] items-center rounded-[10px] border border-[#CBC2B7] bg-[#FBFAF7] px-6 text-[13px] font-semibold text-[#111318] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C96F55] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F0E8]"
            >
              View pricing
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-[#5F645F] sm:text-[12px]">
            {["Answer calls", "Book or route", "Keep follow-up moving"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#99A36D]/20 text-[#69735D]">
                  <Check size={11} strokeWidth={2.5} />
                </span>
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <HumanHeroCard />
        </Reveal>
      </div>
    </section>
  );
}

function ZaplaPetalSpeaker({ size = 26, reduced = false }: { size?: number; reduced?: boolean }) {
  return (
    <span className="relative flex shrink-0 items-center justify-center" style={{ width: size + 8, height: size + 8 }} aria-label="Zapla">
      <motion.span
        className="absolute inset-0 rounded-full border border-[#D58C75]/25"
        animate={reduced ? undefined : { scale: [0.72, 1.35], opacity: [0.28, 0] }}
        transition={reduced ? undefined : { duration: 1.45, repeat: Infinity, ease: "easeOut" }}
        aria-hidden="true"
      />
      <motion.span
        className="relative block"
        animate={reduced ? undefined : { scale: [1, 1.055, 0.985, 1] }}
        transition={reduced ? undefined : { duration: 1.45, repeat: Infinity, ease: "easeInOut" }}
      >
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
      </motion.span>
    </span>
  );
}

function TeamAvatar({ size, cell, className = "" }: { size: number; cell: number; className?: string }) {
  const column = cell % 6;
  const row = Math.floor(cell / 6);

  return (
    <span
      className={`block shrink-0 overflow-hidden rounded-full border-2 border-[#1E2B29] shadow-[0_8px_24px_rgba(0,0,0,.24)] ${className}`}
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

function HumanHeroCard() {
  const reduced = !!useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[#111214] shadow-[0_28px_78px_rgba(57,45,32,.16)]">
      <div className="relative min-h-[470px] sm:min-h-[560px] lg:min-h-[620px]">
        <img
          src={HERO_IMAGE}
          alt="Physiotherapist treating a patient while an incoming call waits nearby"
          width={1448}
          height={1086}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-black/[0.04] to-transparent" />

        <div className="absolute bottom-5 left-4 right-4 sm:bottom-14 sm:left-5 sm:right-auto sm:w-[390px] lg:bottom-[64px] lg:left-6 lg:w-[400px]">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.18, ease: EASE }}
            className="w-full rounded-[20px] border border-white/65 bg-[#F7F4EE]/70 p-3.5 shadow-[0_16px_38px_rgba(22,25,24,.15)] backdrop-blur-2xl sm:p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1E2B29]/95 text-[#F7F4EE] shadow-sm">
                  <Phone size={12} strokeWidth={2} />
                </span>
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#6E6962]">Live call</div>
                  <div className="mt-0.5 text-[10px] font-medium text-[#777168]">New customer enquiry</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-semibold text-[#66705A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#99A36D]" />
                00:42
              </div>
            </div>

            <div className="mt-3 space-y-2.5">
              <div className="max-w-[82%]">
                <div className="mb-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#817A72]">Caller</div>
                <div className="rounded-[14px] rounded-tl-[5px] border border-white/55 bg-white/55 px-3 py-2 text-[12px] font-medium leading-[1.42] text-[#343834] shadow-[0_4px_14px_rgba(22,25,24,.05)]">
                  Do you have anything Tuesday morning?
                </div>
              </div>

              <div className="ml-auto flex max-w-[92%] items-end justify-end gap-2">
                <div className="rounded-[14px] rounded-br-[5px] bg-[#1E2B29]/95 px-3 py-2 text-[12px] font-medium leading-[1.42] text-[#F7F4EE] shadow-[0_6px_16px_rgba(22,25,24,.12)]">
                  Yes, 10:30 is available. Want me to book it?
                </div>
                <ZaplaPetalSpeaker size={26} reduced={reduced} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function WhatItHandles() {
  const reduced = !!useReducedMotion();

  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[860px]">
          <Eyebrow>Keep the routine moving</Eyebrow>
          <h2 className="mt-4 text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[64px]" style={{ fontFamily: DISPLAY }}>
            The routine gets handled. The calls that need you still reach you.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <div className="h-full rounded-[24px] bg-[#F1EADF] p-6 sm:p-8 lg:p-10">
              <div className="grid gap-7 sm:grid-cols-2">
                <HandleItem icon={<MessageSquare size={18} />} title="Routine questions" copy="Hours, services, availability and common questions." />
                <HandleItem icon={<Calendar size={18} />} title="Bookings" copy="Move suitable callers straight into your booking flow." />
                <HandleItem icon={<UserRound size={18} />} title="Caller details" copy="Capture who called, how to reach them and why." />
                <HandleItem icon={<PhoneForwarded size={18} />} title="Routing" copy="Send the call to the right person when AI should step aside." />
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-[24px] bg-[#1E2B29] p-6 text-[#F7F4EE] sm:p-8 lg:p-10">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#DDA34B]">Human handoff</div>
                <h3 className="mt-4 max-w-[470px] text-[34px] font-medium leading-[1.01] tracking-[-0.047em] sm:text-[39px]" style={{ fontFamily: DISPLAY }}>
                  When the call needs a person, it moves to your team.
                </h3>
              </div>

              <div className="my-10 flex items-center gap-4 sm:gap-5">
                <motion.div
                  className="min-w-0 flex-1 rounded-[18px] border border-white/10 bg-white/[0.04] p-4"
                  initial={reduced ? false : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: reduced ? 0 : 0.42, ease: EASE }}
                >
                  <div className="flex items-center gap-3">
                    <ZaplaPetalSpeaker size={28} reduced />
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/62">Zapla</div>
                      <div className="mt-1 text-[12px] font-semibold text-white/90">Caller needs your team</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="shrink-0 text-[#DDA34B]"
                  initial={reduced ? false : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: reduced ? 0 : 0.36, delay: reduced ? 0 : 0.16, ease: EASE }}
                >
                  <ArrowRight size={18} />
                </motion.div>

                <motion.div
                  className="shrink-0 text-center"
                  initial={reduced ? false : { opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.3, ease: EASE }}
                >
                  <div className="flex min-w-[112px] items-end justify-center -space-x-4">
                    <TeamAvatar size={48} cell={7} className="z-0 opacity-80" />
                    <motion.span
                      className="relative z-20 block"
                      initial={reduced ? false : { opacity: 0, scale: 0.86, y: 4 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.7 }}
                      transition={{ duration: reduced ? 0 : 0.38, delay: reduced ? 0 : 0.42, ease: EASE }}
                    >
                      <TeamAvatar size={62} cell={0} />
                    </motion.span>
                    <TeamAvatar size={48} cell={14} className="z-10 opacity-80" />
                  </div>
                  <div className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/62">Your team</div>
                </motion.div>
              </div>

              <p className="max-w-[500px] border-t border-white/10 pt-5 text-[13px] leading-[1.65] text-white/66">
                You decide when Zapla answers, when it takes details, and when it hands the conversation to your team.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function HandleItem({ icon, title, copy }: { icon: ReactNode; title: string; copy: string }) {
  return (
    <div className="border-t border-[#D2C8BC] pt-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#1E2B29] text-[#F7F4EE]">{icon}</span>
      <h3 className="mt-5 text-[23px] font-medium tracking-[-0.035em]" style={{ fontFamily: DISPLAY }}>{title}</h3>
      <p className="mt-2.5 max-w-[290px] text-[13px] leading-[1.62] text-[#666B67]">{copy}</p>
    </div>
  );
}

function FollowThrough() {
  const reduced = !!useReducedMotion();

  const artifacts = [
    {
      n: "01",
      label: "Call",
      title: "Incoming enquiry",
      body: (
        <div className="mt-5 rounded-[16px] border border-white/10 bg-white/[0.035] p-4">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
            <Phone size={13} className="text-[#E97D62]" />
            Caller
          </div>
          <div className="mt-3 rounded-[12px] rounded-tl-[4px] bg-white/[0.07] px-3 py-2.5 text-[12px] leading-[1.45] text-white/82">
            Do you have anything Tuesday morning?
          </div>
        </div>
      ),
    },
    {
      n: "02",
      label: "Booking",
      title: "10:30 booked",
      body: (
        <div className="mt-5 rounded-[16px] border border-[#DDA34B]/20 bg-[#DDA34B]/[0.055] p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#DDA34B]/12 text-[#DDA34B]">
              <Calendar size={15} />
            </span>
            <span className="rounded-full border border-[#99A36D]/25 bg-[#99A36D]/10 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.11em] text-[#B8C28A]">
              Booked
            </span>
          </div>
          <div className="mt-4 text-[16px] font-medium tracking-[-0.03em] text-white">Tuesday · 10:30am</div>
          <div className="mt-1.5 text-[10px] text-white/42">Appointment confirmed</div>
        </div>
      ),
    },
    {
      n: "03",
      label: "Customer",
      title: "Record updated",
      body: (
        <div className="mt-5 rounded-[16px] border border-white/10 bg-white/[0.035] p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/72">
              <UserRound size={14} />
            </span>
            <div>
              <div className="text-[11px] font-semibold text-white/84">New customer</div>
              <div className="mt-0.5 text-[9px] text-white/36">Call context saved</div>
            </div>
          </div>
          <div className="mt-4 divide-y divide-white/[0.07] border-y border-white/[0.07]">
            <div className="flex items-center justify-between gap-3 py-2 text-[9px]">
              <span className="text-white/38">Appointment</span>
              <span className="font-semibold text-white/74">Tue · 10:30am</span>
            </div>
            <div className="flex items-center justify-between gap-3 py-2 text-[9px]">
              <span className="text-white/38">Call notes</span>
              <span className="inline-flex items-center gap-1 font-semibold text-[#B8C28A]">
                <Check size={9} strokeWidth={2.4} />
                Saved
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      n: "04",
      label: "Follow-up",
      title: "Confirmation sent",
      body: (
        <div className="mt-5 rounded-[16px] border border-[#C96C85]/18 bg-[#C96C85]/[0.045] p-4">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
            <MessageSquare size={13} className="text-[#C96C85]" />
            Sent
          </div>
          <div className="mt-3 rounded-[12px] rounded-tr-[4px] bg-[#F7F4EE] px-3 py-2.5 text-[11px] font-medium leading-[1.45] text-[#343834]">
            You’re booked for Tuesday at 10:30am.
          </div>
        </div>
      ),
    },
  ] as const;

  return (
    <section className="bg-[#111214] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="grid gap-7 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-10">
          <div>
            <Eyebrow light>The Zapla difference</Eyebrow>
            <h2 className="mt-4 max-w-[620px] text-[42px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[54px] lg:text-[60px]" style={{ fontFamily: DISPLAY }}>
              The call ends.
              <span className="block text-[#DDA34B]">The work keeps moving.</span>
            </h2>
          </div>
          <p className="max-w-[510px] text-[15px] leading-[1.65] text-white/64 sm:text-[16px]">
            Zapla does not stop at answering. It can book the next step, update the customer record and trigger follow-up while the conversation is still fresh.
          </p>
        </Reveal>

        <div className="relative mt-12">
          <div className="relative mb-5 hidden h-5 lg:block" aria-hidden="true">
            <div className="absolute left-[12.5%] right-[12.5%] top-1/2 h-px -translate-y-1/2 bg-white/10" />
            <motion.div
              className="absolute left-[12.5%] right-[12.5%] top-1/2 h-px origin-left -translate-y-1/2 bg-[#DDA34B]/70"
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: reduced ? 0 : 1.05, ease: EASE }}
            />
            {[12.5, 37.5, 62.5, 87.5].map((left, index) => (
              <motion.span
                key={left}
                className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#DDA34B]/50 bg-[#111214] shadow-[0_0_0_4px_rgba(221,163,75,.06)]"
                style={{ left: `${left}%` }}
                initial={reduced ? false : { opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: reduced ? 0 : 0.28, delay: reduced ? 0 : 0.18 + index * 0.18, ease: EASE }}
              />
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {artifacts.map((artifact, index) => (
              <motion.div
                key={artifact.n}
                className="min-h-[238px] rounded-[20px] border border-white/10 bg-[#17181B] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.025)] sm:p-6"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: reduced ? 0 : 0.42, delay: reduced ? 0 : index * 0.09, ease: EASE }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[9px] font-bold tracking-[0.18em] text-[#DDA34B]">{artifact.n}</div>
                  <div className="text-[8px] font-semibold uppercase tracking-[0.15em] text-white/32">{artifact.label}</div>
                </div>
                <h3 className="mt-4 text-[22px] font-medium tracking-[-0.04em] text-white" style={{ fontFamily: DISPLAY }}>{artifact.title}</h3>
                {artifact.body}
              </motion.div>
            ))}
          </div>

          <Reveal className="mt-6 flex items-start gap-3 border-t border-white/10 pt-5.5">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#DDA34B]/14 text-[#DDA34B]">
              <Check size={12} strokeWidth={2.4} />
            </span>
            <p className="max-w-[760px] text-[13px] font-semibold leading-[1.55] text-white/78 sm:text-[14px]">
              So the call does not become another thing your team has to remember.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SetupAndPricing() {
  return (
    <section className="bg-[#EFE3D4] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-[24px] bg-[#F7F4EE] p-6 sm:p-8 lg:p-10">
            <Eyebrow>Guided setup</Eyebrow>
            <h2 className="mt-4 max-w-[520px] text-[37px] font-medium leading-[0.99] tracking-[-0.05em] sm:text-[48px]" style={{ fontFamily: DISPLAY }}>
              We set up the receptionist around your business.
            </h2>
            <div className="mt-8 divide-y divide-[#D8CFC3] border-y border-[#D8CFC3]">
              {[
                ["01", "Map the calls", "What people ask and what should happen next."],
                ["02", "Build the flow", "Questions, booking, routing and handoff."],
                ["03", "Test and launch", "Run real scenarios before customers reach it."],
              ].map(([n, title, copy]) => (
                <div key={n} className="grid grid-cols-[38px_1fr] gap-x-3 gap-y-1 py-5 sm:grid-cols-[50px_150px_1fr] sm:gap-3">
                  <div className="row-span-2 pt-0.5 text-[10px] font-bold tracking-[0.16em] text-[#C96F55] sm:row-span-1">{n}</div>
                  <div className="text-[14px] font-semibold text-[#111318]">{title}</div>
                  <div className="col-start-2 text-[12px] leading-[1.6] text-[#666B67] sm:col-start-auto">{copy}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="h-full rounded-[24px] bg-[#1E2B29] p-6 text-[#F7F4EE] sm:p-8 lg:p-10">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#DDA34B]">AI Receptionist add-on</div>
            <div className="mt-5 flex items-end gap-2">
              <div className="text-[58px] font-medium leading-none tracking-[-0.065em]" style={{ fontFamily: DISPLAY }}>A$199</div>
              <div className="pb-1 text-[13px] font-semibold text-white/58">/mo + GST</div>
            </div>

            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              <PriceLine label="Included" value="200 Voice AI minutes" />
              <PriceLine label="Additional usage" value="A$0.90 + GST / min" />
              <PriceLine label="Guided setup" value="from A$997 + GST" />
              <PriceLine label="Requires" value="an active Zapla plan" />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={BOOK_URL} className="inline-flex h-[48px] items-center gap-2 rounded-[10px] bg-[#F7F4EE] px-6 text-[13px] font-semibold text-[#1E2B29] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDA34B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E2B29]">
                Book a Call <ArrowRight size={15} />
              </a>
              <a href={PRICING_URL} className="inline-flex h-[48px] items-center rounded-[10px] border border-white/20 px-6 text-[13px] font-semibold text-[#F7F4EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDA34B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E2B29]">
                Full pricing
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PriceLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-5 py-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/62">{label}</div>
      <div className="text-[13px] font-semibold text-white/88">{value}</div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1000px]">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[62px]" style={{ fontFamily: DISPLAY }}>
            The practical stuff.
          </h2>
        </Reveal>

        <div className="mt-9 divide-y divide-[#D8CFC3] border-y border-[#D8CFC3]">
          {FAQS.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C96F55] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F4EE] sm:py-6"
                  aria-expanded={isOpen}
                  aria-controls={`ai-receptionist-faq-${index}`}
                >
                  <span className="text-[17px] font-semibold tracking-[-0.025em] text-[#111318] sm:text-[19px]" style={{ fontFamily: DISPLAY }}>
                    {item.q}
                  </span>
                  <ChevronDown size={18} className={"shrink-0 text-[#777168] transition-transform " + (isOpen ? "rotate-180" : "")} />
                </button>
                <div className={"grid transition-[grid-template-rows,opacity] duration-200 " + (isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <div
                    id={`ai-receptionist-faq-${index}`}
                    role="region"
                    className="overflow-hidden"
                  >
                    <p className="max-w-[790px] pb-6 text-[14px] leading-[1.7] text-[#626762] sm:text-[15px]">{item.a}</p>
                  </div>
                </div>
              </div>
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
      <Reveal className="mx-auto max-w-[980px] text-center">
        <Eyebrow light>Keep the next call moving</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-[860px] text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[68px]" style={{ fontFamily: DISPLAY }}>
          Keep working. Zapla keeps the call moving.
        </h2>
        <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-[1.7] text-white/58 sm:text-[17px]">
          We will map the routine calls your team handles today and show you where Zapla can answer, act or hand off.
        </p>
        <a href={BOOK_URL} className="mt-8 inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#F7F4EE] px-6 text-[13px] font-semibold text-[#1E2B29] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDA34B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E2B29]">
          Book a Call <ArrowRight size={15} />
        </a>
      </Reveal>
    </section>
  );
}

export default AIReceptionistPage;
