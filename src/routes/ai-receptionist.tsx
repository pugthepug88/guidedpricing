import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
  const stageRef = useRef<HTMLDivElement>(null);
  const callRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const appointmentRef = useRef<HTMLDivElement>(null);
  const recordRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const [connectorPaths, setConnectorPaths] = useState<{
    inbound: string;
    appointment: string;
    record: string;
    confirmation: string;
  } | null>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      const stage = stageRef.current;
      const call = callRef.current;
      const hub = hubRef.current;
      const appointment = appointmentRef.current;
      const record = recordRef.current;
      const confirmation = confirmationRef.current;
      if (!stage || !call || !hub || !appointment || !record || !confirmation) return;

      // Use layout geometry instead of getBoundingClientRect so Framer Motion's
      // entrance transforms cannot move the connector anchors away from the cards.
      const callRight = call.offsetLeft + call.offsetWidth;
      const callY = call.offsetTop; // desktop card is vertically centred with translateY(-50%)

      const hubX = hub.offsetLeft;
      const hubY = hub.offsetTop;
      const hubRadius = 88;
      const hubLeft = hubX - hubRadius;
      const hubRight = hubX + hubRadius;

      const appointmentLeft = appointment.offsetLeft;
      const appointmentY = appointment.offsetTop + appointment.offsetHeight / 2;
      const recordLeft = record.offsetLeft;
      const recordY = record.offsetTop + record.offsetHeight / 2;
      const confirmationLeft = confirmation.offsetLeft;
      const confirmationY = confirmation.offsetTop + confirmation.offsetHeight / 2;

      const curve = (sx: number, sy: number, ex: number, ey: number) => {
        const span = Math.max(36, ex - sx);
        const control = Math.min(150, span * 0.44);
        return `M${sx.toFixed(1)} ${sy.toFixed(1)} C${(sx + control).toFixed(1)} ${sy.toFixed(1)} ${(ex - control).toFixed(1)} ${ey.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
      };

      const next = {
        inbound: curve(callRight, callY, hubLeft, hubY),
        appointment: curve(hubRight, hubY - 12, appointmentLeft, appointmentY),
        record: curve(hubRight, hubY, recordLeft, recordY),
        confirmation: curve(hubRight, hubY + 12, confirmationLeft, confirmationY),
      };

      setConnectorPaths((current) =>
        current &&
        current.inbound === next.inbound &&
        current.appointment === next.appointment &&
        current.record === next.record &&
        current.confirmation === next.confirmation
          ? current
          : next,
      );
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    scheduleMeasure();

    const observer = new ResizeObserver(scheduleMeasure);
    [stageRef, callRef, hubRef, appointmentRef, recordRef, confirmationRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#111214] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_57%_58%,rgba(221,163,75,.07),transparent_30%),radial-gradient(circle_at_72%_45%,rgba(201,108,133,.045),transparent_24%)]" />
      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="max-w-[760px]">
          <Eyebrow light>The Zapla difference</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[54px] lg:text-[62px]" style={{ fontFamily: DISPLAY }}>
            The call ends.
            <span className="block text-[#DDA34B]">The work keeps moving.</span>
          </h2>
          <p className="mt-5 max-w-[570px] text-[15px] leading-[1.65] text-white/60 sm:text-[16px]">
            Zapla turns one call into the next actions automatically, so your team does not have to restart the work.
          </p>
        </Reveal>

        <Reveal className="mt-10 sm:mt-12">
          <div ref={stageRef} className="relative min-h-[720px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[linear-gradient(145deg,#151619_0%,#101113_56%,#161518_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,.025)] sm:min-h-[700px] lg:min-h-[470px]">
            <div className="pointer-events-none absolute left-[50.5%] top-[46%] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(221,163,75,.12),rgba(221,163,75,.035)_36%,transparent_70%)] blur-xl" />

            {connectorPaths && (
              <svg
                className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
                width="100%"
                height="100%"
                fill="none"
                aria-hidden="true"
              >
                {[
                  [connectorPaths.inbound, "rgba(221,163,75,.46)"],
                  [connectorPaths.appointment, "rgba(221,163,75,.46)"],
                  [connectorPaths.record, "rgba(153,163,109,.42)"],
                  [connectorPaths.confirmation, "rgba(201,108,133,.44)"],
                ].map(([path, stroke], index) => (
                  <g key={index}>
                    <path d={path} stroke={stroke.replace(/\.[0-9]+\)$/, ".055)")} strokeWidth="4" strokeLinecap="round" />
                    <motion.path
                      d={path}
                      stroke={stroke}
                      strokeWidth="1.35"
                      strokeLinecap="round"
                      initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.55 }}
                      transition={{ duration: reduced ? 0 : 0.5 + index * 0.03, delay: reduced ? 0 : index * 0.12, ease: EASE }}
                    />
                    {!reduced && (
                      <motion.path
                        d={path}
                        pathLength={1}
                        stroke="#F2B24B"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeDasharray="0.075 0.925"
                        initial={{ strokeDashoffset: 1, opacity: 0 }}
                        animate={{ strokeDashoffset: 0, opacity: [0, 0.9, 0.9, 0] }}
                        transition={{
                          duration: index === 0 ? 1.05 : 1.15,
                          delay: index === 0 ? 0 : 0.78 + index * 0.08,
                          repeat: Infinity,
                          repeatDelay: index === 0 ? 2.55 : 2.45,
                          ease: "linear",
                        }}
                        style={{ filter: "drop-shadow(0 0 5px rgba(242,178,75,.72))" }}
                      />
                    )}
                  </g>
                ))}
              </svg>
            )}

            <motion.div
              ref={callRef}
              className="absolute left-6 top-7 w-[calc(100%-3rem)] rounded-[22px] border border-white/[0.09] bg-white/[0.035] p-5 backdrop-blur-sm sm:left-8 sm:top-9 sm:w-[360px] sm:p-5 lg:left-[5.4%] lg:top-[46%] lg:w-[305px] lg:-translate-y-1/2"
              initial={reduced ? false : { opacity: 0, x: -18, y: 8 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E97D62]/12 text-[#E97D62]">
                    <Phone size={15} />
                  </span>
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/34">Live call</div>
                    <div className="mt-0.5 text-[11px] font-semibold text-white/80">New customer enquiry</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-[#B8C28A]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#99A36D]" />
                  00:42
                </span>
              </div>

              <div className="mt-6 flex h-[72px] items-center justify-center gap-[7px]">
                {[14,20,30,42,56,70,56,42,30,20,14].map((height, index) => {
                  const distance = Math.abs(index - 5);
                  const accent = index === 5 ? "#E97D62" : index === 4 || index === 6 ? "rgba(233,125,98,.62)" : "rgba(255,255,255,.30)";
                  return (
                    <motion.span
                      key={index}
                      className="w-[4px] rounded-full"
                      style={{ backgroundColor: accent }}
                      animate={reduced ? { height: height * 0.72 } : { height: [height * 0.62, height, height * 0.72] }}
                      transition={reduced ? undefined : { duration: 1.25, repeat: Infinity, repeatType: "mirror", delay: distance * 0.055, ease: "easeInOut" }}
                    />
                  );
                })}
              </div>

              <div className="mt-5 border-t border-white/[0.08] pt-4">
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/30">Caller</div>
                <div className="mt-2 text-[18px] font-medium leading-[1.35] tracking-[-0.025em] text-white/92" style={{ fontFamily: DISPLAY }}>
                  “Do you have anything Tuesday morning?”
                </div>
              </div>
            </motion.div>

            <div ref={hubRef} className="absolute left-1/2 top-[270px] z-20 -translate-x-1/2 sm:top-[280px] lg:left-[50.5%] lg:top-[46%] lg:-translate-y-1/2">
              <motion.div
                className="absolute left-1/2 top-1/2 h-[176px] w-[176px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#DDA34B]/12"
                animate={reduced ? undefined : { scale: [0.84, 1.16], opacity: [0.34, 0] }}
                transition={reduced ? undefined : { duration: 1.9, repeat: Infinity, ease: "easeOut" }}
                aria-hidden="true"
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-[136px] w-[136px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DDA34B]/[0.035] blur-md"
                animate={reduced ? undefined : { scale: [0.94, 1.08, 0.94], opacity: [0.7, 1, 0.7] }}
                transition={reduced ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
              <motion.div
                initial={reduced ? false : { opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.15, ease: EASE }}
              >
                <ZaplaPetalSpeaker size={118} reduced />
              </motion.div>
              <div className="mt-3 text-center text-[8px] font-semibold uppercase tracking-[0.18em] text-white/34">Zapla</div>
            </div>

            <motion.div
              ref={appointmentRef}
              className="absolute right-6 top-[350px] w-[calc(100%-3rem)] rounded-[20px] border border-[#DDA34B]/18 bg-[#171719]/92 p-4 shadow-[0_18px_42px_rgba(0,0,0,.24)] backdrop-blur-lg sm:right-8 sm:w-[310px] lg:right-[11.5%] lg:top-[76px] lg:w-[280px]"
              initial={reduced ? false : { opacity: 0, x: 18, y: 8 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reduced ? 0 : 0.46, delay: reduced ? 0 : 0.3, ease: EASE }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#DDA34B]/12 text-[#DDA34B]">
                    <Calendar size={16} />
                  </span>
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.14em] text-white/30">Appointment</div>
                    <div className="mt-1 text-[15px] font-semibold tracking-[-0.025em] text-white/90">Tuesday · 10:30am</div>
                  </div>
                </div>
                <span className="rounded-full bg-[#99A36D]/10 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#B8C28A]">Booked</span>
              </div>
            </motion.div>

            <motion.div
              ref={recordRef}
              className="absolute right-4 top-[455px] w-[calc(100%-2rem)] rounded-[22px] border border-white/[0.09] bg-[#161719]/94 p-4 shadow-[0_20px_48px_rgba(0,0,0,.28)] backdrop-blur-lg sm:right-14 sm:w-[340px] lg:right-[9.5%] lg:top-[188px] lg:w-[312px]"
              initial={reduced ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reduced ? 0 : 0.48, delay: reduced ? 0 : 0.42, ease: EASE }}
            >
              <div className="flex items-center gap-3">
                <TeamAvatar size={38} cell={0} className="border-white/10" />
                <div className="min-w-0 flex-1">
                  <div className="text-[9px] uppercase tracking-[0.14em] text-white/30">Customer record</div>
                  <div className="mt-1 text-[14px] font-semibold text-white/90">New customer added</div>
                </div>
                <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#B8C28A]">
                  <Check size={10} strokeWidth={2.4} />
                  Notes saved
                </span>
              </div>
            </motion.div>

            <motion.div
              ref={confirmationRef}
              className="absolute right-8 top-[558px] w-[calc(100%-4rem)] rounded-[18px] border border-[#C96C85]/16 bg-[#181619]/95 p-4 shadow-[0_18px_42px_rgba(0,0,0,.24)] backdrop-blur-lg sm:right-10 sm:w-[320px] lg:right-[10.5%] lg:top-[314px] lg:w-[292px]"
              initial={reduced ? false : { opacity: 0, x: 16, y: -4 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reduced ? 0 : 0.48, delay: reduced ? 0 : 0.54, ease: EASE }}
            >
              <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#D69AAF]">
                <MessageSquare size={13} />
                Confirmation sent
              </div>
              <div className="mt-3 rounded-[12px] rounded-tr-[4px] bg-[#F7F4EE] px-3 py-2.5 text-[11px] font-medium leading-[1.45] text-[#343834]">
                You’re booked for Tuesday at 10:30am.
              </div>
            </motion.div>
          </div>
        </Reveal>
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
