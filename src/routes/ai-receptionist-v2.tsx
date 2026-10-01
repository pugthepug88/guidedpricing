import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  Hammer,
  Home,
  MessageSquare,
  Phone,
  PhoneForwarded,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";

export const Route = createFileRoute("/ai-receptionist-v2")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "AI Receptionist V2 | Zapla" },
      {
        name: "description",
        content:
          "A simplified product-led concept for Zapla AI Receptionist.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "preconnect", href: "https://cdn.openart.ai" }],
  }),
  component: AIReceptionistV2,
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
    a: "Yes. If your booking flow and calendar are connected, Zapla can move suitable callers into the booking step you choose.",
  },
  {
    q: "Can it transfer calls to my team?",
    a: "Yes. You decide which calls stay with the AI and which should route or transfer to a person.",
  },
  {
    q: "What happens if it does not know the answer?",
    a: "It can collect the right details, take a clean message or hand the call to your team instead of inventing an answer.",
  },
  {
    q: "Where does the information from the call go?",
    a: "The caller, outcome and next step can stay with the contact in Zapla and trigger the configured booking, task, message or pipeline action.",
  },
] as const;

function AIReceptionistV2() {
  return (
    <main className="min-h-screen bg-[#FCFCFA] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <Hero />
      <ConnectedCall />
      <IndustryExamples />
      <SetupControlPricing />
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
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduced ? 0 : 0.42, ease: EASE }}
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

function PetalMark({ size = 44 }: { size?: number }) {
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

function Hero() {
  const capabilities = [
    [<MessageSquare size={16} />, "Answer questions"],
    [<Calendar size={16} />, "Book appointments"],
    [<UserRound size={16} />, "Capture details"],
    [<PhoneForwarded size={16} />, "Hand off calls"],
  ] as const;

  return (
    <section className="bg-[#F7F2EB] px-5 pb-14 pt-[108px] sm:px-10 sm:pb-20 sm:pt-[120px] lg:px-16 lg:pb-20 lg:pt-[132px]">
      <div className="mx-auto max-w-[1420px]">
        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <Reveal className="max-w-[620px]">
            <Eyebrow>AI Receptionist</Eyebrow>
            <h1
              className="mt-4 text-[50px] font-medium leading-[0.93] tracking-[-0.06em] sm:text-[66px] lg:text-[80px]"
              style={{ fontFamily: DISPLAY }}
            >
              Your phone rings.
              <span className="block">Zapla picks up.</span>
              <span className="block text-[#C96F55]">You keep working.</span>
            </h1>

            <p className="mt-6 max-w-[560px] text-[16px] leading-[1.68] text-[#5F655F] sm:text-[18px]">
              Answer questions, book appointments, capture details and hand off the calls that need a person.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={BOOK_URL}
                className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px"
              >
                Book a Call <ArrowRight size={15} />
              </a>
              <a
                href={PRICING_URL}
                className="inline-flex h-[50px] items-center rounded-full border border-[#CEC7BD] bg-white/70 px-6 text-[13px] font-semibold text-[#111318]"
              >
                View pricing
              </a>
            </div>

            <div className="mt-8 text-[12px] font-semibold text-[#59615A]">
              A$199/mo + GST · 200 Voice AI minutes included
            </div>
          </Reveal>

          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] bg-[#111214] shadow-[0_30px_80px_rgba(50,42,34,.15)]">
              <img
                src={HERO_IMAGE}
                alt="Physiotherapist treating a patient while Zapla handles an incoming call"
                width={1448}
                height={1086}
                loading="eager"
                fetchPriority="high"
                className="h-[520px] w-full object-cover object-center lg:h-[610px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 max-w-[420px] rounded-[18px] border border-white/55 bg-[#F7F4EE]/78 p-4 shadow-[0_16px_40px_rgba(0,0,0,.16)] backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E2B29] text-white">
                      <Phone size={13} />
                    </span>
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#746F68]">Live call</div>
                      <div className="mt-0.5 text-[11px] font-semibold text-[#313632]">New customer enquiry</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-semibold text-[#69735D]">00:42</span>
                </div>
                <div className="mt-4 text-[15px] font-medium tracking-[-0.02em] text-[#222522]" style={{ fontFamily: DISPLAY }}>
                  “Do you have anything Tuesday morning?”
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 rounded-[13px] bg-[#1E2B29] px-3.5 py-3 text-[12px] font-semibold text-white">
                  <span>10:30 is available. Want me to book it?</span>
                  <PetalMark size={28} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10 border-y border-[#D7D1C8]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(([icon, label], index) => (
              <div
                key={label}
                className={"flex items-center gap-3 py-5 text-[13px] font-semibold text-[#3A403B] " + (index ? "lg:border-l lg:border-[#D7D1C8] lg:pl-7" : "")}
              >
                <span className="text-[#1E2B29]">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ConnectedCall() {
  const reduced = !!useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const callRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const hubRingAnchorRef = useRef<HTMLDivElement>(null);
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
      const hubRingAnchor = hubRingAnchorRef.current;
      const appointment = appointmentRef.current;
      const record = recordRef.current;
      const confirmation = confirmationRef.current;
      if (!stage || !call || !hub || !hubRingAnchor || !appointment || !record || !confirmation) return;

      // Use layout geometry instead of getBoundingClientRect so Framer Motion's
      // entrance transforms cannot move the connector anchors away from the cards.
      const callRight = call.offsetLeft + call.offsetWidth;
      const callY = call.offsetTop; // desktop card is vertically centred with translateY(-50%)

      // Measure a non-animated twin of the visible 176px hub ring.
      // This gives the actual rendered ring boundary after the hub's centering transforms.
      const stageBox = stage.getBoundingClientRect();
      const hubRingBox = hubRingAnchor.getBoundingClientRect();
      const hubLeft = hubRingBox.left - stageBox.left + 2;
      const hubRight = hubRingBox.right - stageBox.left - 2;
      const hubY = hubRingBox.top - stageBox.top + hubRingBox.height / 2;

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
      const straight = (sx: number, sy: number, ex: number, ey: number) =>
        `M${sx.toFixed(1)} ${sy.toFixed(1)} L${ex.toFixed(1)} ${ey.toFixed(1)}`;

      const next = {
        inbound: curve(callRight, callY, hubLeft, hubY),
        appointment: curve(hubRight, hubY - 12, appointmentLeft, appointmentY),
        record: straight(hubRight, hubY, recordLeft, hubY),
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
    [stageRef, callRef, hubRef, hubRingAnchorRef, appointmentRef, recordRef, confirmationRef].forEach((ref) => {
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
        <Reveal className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow light>The Zapla difference</Eyebrow>
            <h2 className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[56px] lg:text-[66px]" style={{ fontFamily: DISPLAY }}>
              The call ends.
              <span className="block text-[#DDA34B]">The next step is already moving.</span>
            </h2>
          </div>
          <p className="max-w-[600px] text-[15px] leading-[1.7] text-white/56 sm:text-[17px]">
            The caller, appointment, customer record and follow-up stay connected inside Zapla.
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
              <div
                ref={hubRingAnchorRef}
                className="pointer-events-none absolute left-1/2 top-1/2 h-[176px] w-[176px] -translate-x-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
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


function IndustryExamples() {
  const examples = [
    {
      key: "allied-health",
      label: "Allied health",
      icon: <Stethoscope size={16} />,
      caller: "Are you taking new patients, and do you have anything after 5?",
      reply: "I can help with your booking options and practice information. What day works best for you?",
      outcome: ["Enquiry captured", "Booking path started", "Handoff available"],
      accent: "#99A36D",
    },
    {
      key: "trades",
      label: "Trades",
      icon: <Hammer size={16} />,
      caller: "My hot water has stopped. Can someone come out today?",
      reply: "I can take the details and check the urgent-job flow. What suburb are you in?",
      outcome: ["Urgency captured", "Job routed", "Customer details attached"],
      accent: "#DDA34B",
    },
    {
      key: "real-estate",
      label: "Real estate",
      icon: <Home size={16} />,
      caller: "I’m thinking of selling and would like to organise an appraisal.",
      reply: "Absolutely. I can take the property details and arrange the next step with the team.",
      outcome: ["Seller lead created", "Property details saved", "Follow-up task triggered"],
      accent: "#E97D62",
    },
    {
      key: "professional-services",
      label: "Professional services",
      icon: <Briefcase size={16} />,
      caller: "I’m not sure which service I need. Can someone talk me through it?",
      reply: "I can take a few details, identify the right enquiry path and arrange the next step with the team.",
      outcome: ["Need captured", "Enquiry routed", "Next step recorded"],
      accent: "#9B86B8",
    },
  ] as const;

  const reduced = !!useReducedMotion();
  const [selectedKey, setSelectedKey] = useState(examples[0].key);
  const selected = examples.find((example) => example.key === selectedKey) ?? examples[0];

  return (
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>Built around your business</Eyebrow>
            <h2 className="mt-4 text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[62px]" style={{ fontFamily: DISPLAY }}>
              Same AI. Different job.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {examples.map((example) => {
              const active = selected.key === example.key;
              return (
                <button
                  key={example.key}
                  type="button"
                  onClick={() => setSelectedKey(example.key)}
                  aria-pressed={active}
                  className="inline-flex h-[42px] items-center gap-2 rounded-full border px-4 text-[12px] font-semibold transition-colors"
                  style={
                    active
                      ? { borderColor: example.accent, backgroundColor: example.accent + "18", color: "#111318" }
                      : { borderColor: "#DDE1DB", backgroundColor: "#FAFAF8", color: "#555C56" }
                  }
                >
                  {example.icon}
                  {example.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div
          key={selected.key}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
          className="mt-8 grid border-y border-[#E2E5E1] py-9 lg:grid-cols-[1.05fr_.95fr] lg:gap-16"
        >
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8A8178]">Caller</div>
            <div className="mt-3 max-w-[610px] text-[28px] font-medium leading-[1.24] tracking-[-0.04em] text-[#111318]" style={{ fontFamily: DISPLAY }}>
              “{selected.caller}”
            </div>
            <div className="mt-8 text-[9px] font-semibold uppercase tracking-[0.16em]" style={{ color: selected.accent }}>Zapla</div>
            <div className="mt-3 max-w-[610px] text-[21px] font-medium leading-[1.4] tracking-[-0.025em] text-[#343A35]" style={{ fontFamily: DISPLAY }}>
              “{selected.reply}”
            </div>
          </div>

          <div className="mt-8 border-t border-[#E7E9E5] pt-8 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8A8178]">What happens next</div>
            <div className="mt-5 space-y-4">
              {selected.outcome.map((item, index) => (
                <div key={item} className="flex items-center gap-4 border-b border-[#E7E9E5] pb-4">
                  <span className="text-[10px] font-semibold tracking-[0.12em] text-[#A3A8A2]">0{index + 1}</span>
                  <span className="text-[14px] font-semibold text-[#343A35]">{item}</span>
                  <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full" style={{ color: selected.accent, backgroundColor: selected.accent + "18" }}>
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SetupControlPricing() {
  const rules = [
    {
      icon: <MessageSquare size={17} />,
      title: "Handles the routine",
      copy: "Questions, simple enquiries and suitable bookings.",
      accent: "#C96F55",
    },
    {
      icon: <PhoneForwarded size={17} />,
      title: "Hands off when it should",
      copy: "Calls needing judgement or a person move to your team.",
      accent: "#9B86B8",
    },
    {
      icon: <ShieldCheck size={17} />,
      title: "Falls back instead of guessing",
      copy: "Out-of-scope calls can become a message or escalation.",
      accent: "#788565",
    },
  ];

  return (
    <section className="bg-[#EEF2EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Configured for your front desk</Eyebrow>
          <h2 className="mt-4 max-w-[690px] text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[62px]" style={{ fontFamily: DISPLAY }}>
            We set it up.
            <span className="block">You decide where it stops.</span>
          </h2>
          <p className="mt-5 max-w-[620px] text-[15px] leading-[1.7] text-[#606761] sm:text-[17px]">
            We map the common calls, booking rules, handoffs and fallbacks before customers reach it.
          </p>

          <div className="mt-10 border-y border-[#CFD8CF]">
            {rules.map((rule, index) => (
              <div key={rule.title} className={"grid gap-3 py-5 sm:grid-cols-[44px_210px_1fr] sm:items-center sm:gap-5 " + (index ? "border-t border-[#D9E0D9]" : "")}>
                <span className="flex h-9 w-9 items-center justify-center rounded-[10px]" style={{ color: rule.accent, backgroundColor: rule.accent + "18" }}>
                  {rule.icon}
                </span>
                <div className="text-[16px] font-semibold text-[#202420]">{rule.title}</div>
                <div className="text-[12px] leading-[1.6] text-[#697069]">{rule.copy}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-[12px] font-semibold text-[#59615A]">
            Guided setup from A$997 + GST
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-[28px] bg-[#1E2B29] p-7 text-white shadow-[0_24px_70px_rgba(30,43,41,.14)] sm:p-9 lg:p-10">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#DDA34B]">AI Receptionist add-on</div>
            <div className="mt-5 flex items-end gap-2">
              <div className="text-[64px] font-medium leading-none tracking-[-0.065em]" style={{ fontFamily: DISPLAY }}>A$199</div>
              <div className="pb-1 text-[13px] font-semibold text-white/58">/mo + GST</div>
            </div>

            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              <PriceLine label="Included" value="200 Voice AI minutes" />
              <PriceLine label="Additional" value="A$0.90 + GST / min" />
              <PriceLine label="Setup" value="from A$997 + GST" />
              <PriceLine label="Requires" value="an active Zapla plan" />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={BOOK_URL} className="inline-flex h-[48px] items-center gap-2 rounded-full bg-white px-6 text-[13px] font-semibold text-[#1E2B29]">
                Book a Call <ArrowRight size={15} />
              </a>
              <a href={PRICING_URL} className="inline-flex h-[48px] items-center rounded-full border border-white/20 px-6 text-[13px] font-semibold text-white">
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
    <div className="grid grid-cols-[110px_1fr] gap-5 py-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/56">{label}</div>
      <div className="text-[13px] font-semibold text-white/88">{value}</div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-[38px] font-medium leading-[0.98] tracking-[-0.05em] sm:text-[50px]" style={{ fontFamily: DISPLAY }}>
            The practical stuff.
          </h2>
        </Reveal>

        <div className="divide-y divide-[#DDE2DD] border-y border-[#DDE2DD]">
          {FAQS.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[17px] font-semibold tracking-[-0.025em] text-[#111318]" style={{ fontFamily: DISPLAY }}>
                    {item.q}
                  </span>
                  <ChevronDown size={17} className={"shrink-0 text-[#777168] transition-transform " + (isOpen ? "rotate-180" : "")} />
                </button>

                <div className={"grid transition-[grid-template-rows,opacity] duration-200 " + (isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <div className="overflow-hidden">
                    <p className="max-w-[720px] pb-5 text-[14px] leading-[1.7] text-[#626762]">{item.a}</p>
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
    <section className="border-t border-[#E5E8E4] bg-[#F7F8F6] px-5 py-16 sm:px-10 sm:py-18 lg:px-16 lg:py-20">
      <Reveal className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <div>
          <h2
            className="max-w-[720px] text-[42px] font-medium leading-[0.97] tracking-[-0.052em] text-[#111318] sm:text-[54px] lg:text-[60px]"
            style={{ fontFamily: DISPLAY }}
          >
            Show us your call flow.
          </h2>
          <p className="mt-4 max-w-[700px] text-[15px] leading-[1.68] text-[#5F655F] sm:text-[16px]">
            We’ll show you exactly what Zapla can answer, book, route or hand off before anything goes live.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          <a
            href={BOOK_URL}
            className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px"
          >
            Book a Call <ArrowRight size={15} />
          </a>
          <a
            href={PRICING_URL}
            className="inline-flex h-[50px] items-center rounded-full border border-[#D7DDD7] bg-white px-6 text-[13px] font-semibold text-[#111318]"
          >
            View pricing
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export default AIReceptionistV2;
