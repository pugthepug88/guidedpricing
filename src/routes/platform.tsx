import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  MessageSquareText,
  Phone,
  RefreshCw,
  Send,
  Sparkles,
  Star,
  UserRound,
  Workflow,
} from "lucide-react";
import heroColor from "@/assets/connected-hero-color.png.asset.json";
import heroSketch from "@/assets/connected-hero-sketch.png.asset.json";

export const Route = createFileRoute("/platform")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Zapla Platform | One Customer. One Connected System." },
      {
        name: "description",
        content:
          "See how Zapla connects CRM, customer marketing, AI reception, reviews and follow-through around one customer history.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PlatformPage,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';

function PlatformPage() {
  return (
    <main
      data-page="platform"
      className="min-h-screen overflow-hidden bg-white text-[#111318] antialiased"
      style={{ fontFamily: BODY }}
    >
      <Hero />
      <PlatformMap />
      <Differentiators />
      <IntentRouter />
      <FinalCta />
    </main>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = !!useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={"text-[10px] font-bold uppercase tracking-[0.2em] " + (dark ? "text-[#8EADFF]" : "text-[#2563FF]")}>
      {children}
    </p>
  );
}

function Hero() {
  return (
    <section className="relative bg-white px-5 pb-10 pt-[108px] sm:px-10 sm:pb-12 sm:pt-[120px] lg:px-16 lg:pt-[128px]">
      <div className="pointer-events-none absolute left-1/2 top-20 h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-[#2563FF]/[0.055] blur-[120px]" />
      <div className="relative mx-auto max-w-[1180px] text-center">
        <Reveal>
          <Eyebrow>Zapla Platform</Eyebrow>
          <h1
            className="mx-auto mt-4 max-w-[1020px] text-[50px] font-medium leading-[0.94] tracking-[-0.058em] sm:text-[70px] lg:text-[88px]"
            style={{ fontFamily: DISPLAY }}
          >
            One customer.
            <span className="block text-[#2563FF]">One connected system around them.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[760px] text-[16px] leading-[1.7] text-[#606978] sm:text-[18px]">
            Calls, messages, bookings, payments, follow-up and reviews stay attached to the same customer, so the next step can move with them.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#platform-map"
              className="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#111827] px-6 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px sm:w-auto"
            >
              See what makes up Zapla <ArrowDown size={14} />
            </a>
            <a
              href={BOOK_URL}
              className="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-full border border-[#D8E0EC] bg-white px-6 text-[13px] font-semibold text-[#172033] transition-colors hover:border-[#2563FF] sm:w-auto"
            >
              Book a Call <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>
      </div>

      <ConnectedCustomerScene />
    </section>
  );
}

const MOMENT_CARDS = [
  {
    title: "Enquiry captured",
    meta: "Call added to the customer record",
    icon: Phone,
    tone: "blue",
    pos: "left-[3%] top-[8%]",
    appear: 0.12,
  },
  {
    title: "Conversation",
    meta: "Reply lands in the same history",
    icon: MessageSquareText,
    tone: "cyan",
    pos: "right-[3%] top-[8%]",
    appear: 0.24,
  },
  {
    title: "Booking confirmed",
    meta: "The customer state changes",
    icon: CalendarDays,
    tone: "blue",
    pos: "right-[1%] top-[49%]",
    appear: 0.38,
  },
  {
    title: "Payment received",
    meta: "Accounts can see the latest status",
    icon: CreditCard,
    tone: "green",
    pos: "right-[22%] bottom-[4%]",
    appear: 0.52,
  },
  {
    title: "Follow-up adjusts",
    meta: "The next action changes with the customer",
    icon: Workflow,
    tone: "cyan",
    pos: "left-[22%] bottom-[4%]",
    appear: 0.66,
  },
  {
    title: "Review moment",
    meta: "The completed job can trigger what comes next",
    icon: Star,
    tone: "amber",
    pos: "left-[1%] top-[49%]",
    appear: 0.80,
  },
] as const;

function ConnectedCustomerScene() {
  const reduced = !!useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(reduced ? 1 : 0);

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setProgress(p);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  const colorProgress = reduced ? 1 : Math.min(1, Math.max(0, (progress - 0.1) / 0.42));

  return (
    <>
      <div ref={sectionRef} className="relative mt-10 hidden h-[185vh] lg:block">
        <div className="sticky top-[64px] h-[calc(100vh-64px)] overflow-hidden">
          <div className="relative mx-auto h-full max-w-[1380px]">
            <div className="absolute left-1/2 top-[45%] h-[54vh] w-[360px] -translate-x-1/2 -translate-y-1/2">
              <img
                src={heroSketch.url}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-contain"
                style={{ opacity: 1 - colorProgress }}
              />
              <img
                src={heroColor.url}
                alt="A customer at the centre of a connected customer journey"
                className="absolute inset-0 h-full w-full object-contain"
                style={{ opacity: colorProgress }}
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#D8E1F0] bg-white/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#667389] shadow-sm backdrop-blur">
                One customer · one history
              </div>
            </div>

            {MOMENT_CARDS.map((card) => (
              <MomentCard key={card.title} card={card} progress={progress} />
            ))}

            <div
              className="absolute bottom-[5%] left-1/2 -translate-x-1/2 text-center transition-opacity duration-500"
              style={{ opacity: Math.min(1, Math.max(0, (progress - 0.82) / 0.12)) }}
            >
              <div className="text-[13px] font-semibold text-[#263246]">Same customer. More context. Better next step.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[760px] lg:hidden">
        <div className="mx-auto h-[280px] w-[220px]">
          <img src={heroColor.url} alt="A customer at the centre of a connected customer journey" className="h-full w-full object-contain" />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {MOMENT_CARDS.map((card) => (
            <StaticMomentCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </>
  );
}

type MomentCardData = (typeof MOMENT_CARDS)[number];

function toneClasses(tone: MomentCardData["tone"]) {
  if (tone === "green") return "bg-[#EAF8F1] text-[#159767]";
  if (tone === "cyan") return "bg-[#E7F8FB] text-[#0891B2]";
  if (tone === "amber") return "bg-[#FFF5D8] text-[#B77900]";
  return "bg-[#E8EFFF] text-[#2563FF]";
}

function MomentCard({ card, progress }: { card: MomentCardData; progress: number }) {
  const Icon = card.icon;
  const enter = Math.min(1, Math.max(0, (progress - card.appear) / 0.07));
  return (
    <div
      className={"absolute w-[270px] " + card.pos}
      style={{
        opacity: enter,
        transform: `translateY(${18 * (1 - enter)}px) scale(${0.96 + 0.04 * enter})`,
      }}
    >
      <div className="rounded-[20px] border border-[#DDE3EC] bg-white p-4 shadow-[0_18px_45px_rgba(31,43,67,.10)]">
        <div className="flex items-center gap-3">
          <span className={"grid h-10 w-10 shrink-0 place-items-center rounded-[12px] " + toneClasses(card.tone)}>
            <Icon size={18} />
          </span>
          <div>
            <div className="text-[13px] font-semibold text-[#202B3D]">{card.title}</div>
            <div className="mt-1 text-[10px] leading-[1.5] text-[#778195]">{card.meta}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StaticMomentCard({ card }: { card: MomentCardData }) {
  const Icon = card.icon;
  return (
    <div className="rounded-[18px] border border-[#DDE3EC] bg-white p-4 shadow-[0_12px_30px_rgba(31,43,67,.07)]">
      <div className="flex items-center gap-3">
        <span className={"grid h-9 w-9 shrink-0 place-items-center rounded-[11px] " + toneClasses(card.tone)}>
          <Icon size={16} />
        </span>
        <div>
          <div className="text-[12px] font-semibold text-[#202B3D]">{card.title}</div>
          <div className="mt-1 text-[10px] leading-[1.5] text-[#778195]">{card.meta}</div>
        </div>
      </div>
    </div>
  );
}

function PlatformMap() {
  const areas = [
    {
      title: "CRM",
      copy: "Customer records, conversations, opportunities and the work around them.",
      href: "/crm",
      icon: UserRound,
    },
    {
      title: "Customer Marketing",
      copy: "Use customer data to reach the right groups and keep replies connected.",
      href: "/customer-marketing",
      icon: Send,
    },
    {
      title: "AI Receptionist",
      copy: "Answer calls, qualify, book and hand off without losing the next step.",
      href: "/ai-receptionist",
      icon: Phone,
    },
    {
      title: "Reviews & Reputation",
      copy: "Ask for reviews at the right customer moment after the work is done.",
      href: "/reviews",
      icon: Star,
    },
  ];

  return (
    <section id="platform-map" className="bg-[#0D1626] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-[820px]">
          <Eyebrow dark>What makes up Zapla</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[60px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            Four parts.
            <span className="block text-[#8EADFF]">One customer system.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid overflow-hidden rounded-[28px] border border-white/10 md:grid-cols-2">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <a
                key={area.title}
                href={area.href}
                className={
                  "group bg-white/[0.045] p-6 transition-colors hover:bg-white/[0.07] sm:p-8 " +
                  (index >= 2 ? "border-t border-white/10 " : "") +
                  (index % 2 === 1 ? "md:border-l md:border-white/10 " : "") +
                  (index === 1 ? "border-t border-white/10 md:border-t-0 " : "")
                }
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#2563FF]/18 text-[#8EADFF]">
                    <Icon size={18} />
                  </span>
                  <ArrowRight size={16} className="mt-2 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-[#8EADFF]" />
                </div>
                <h3 className="mt-6 text-[30px] font-medium tracking-[-0.045em]" style={{ fontFamily: DISPLAY }}>
                  {area.title}
                </h3>
                <p className="mt-3 max-w-[470px] text-[12px] leading-[1.7] text-white/50 sm:text-[13px]">{area.copy}</p>
              </a>
            );
          })}
        </div>

        <Reveal className="mt-6 text-[12px] leading-[1.7] text-white/42">
          Follow-up, reactivation, bookings, payments and automation run through the same customer records and workflows.
        </Reveal>
      </div>
    </section>
  );
}

function Differentiators() {
  const items = [
    ["Unlimited users", "The whole team can work from the same customer history."],
    ["Unlimited stored contacts*", "Keep past leads and customers usable as the database grows."],
    ["Guided Launch", "We map what moves, what connects and what should happen automatically."],
    ["Connect what you keep", "Specialist systems can stay where they still make sense."],
  ];

  return (
    <section className="bg-[#2563FF] px-5 py-12 text-white sm:px-10 sm:py-14 lg:px-16">
      <div className="mx-auto grid max-w-[1280px] gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {items.map(([title, copy], index) => (
          <Reveal
            key={title}
            className={"lg:px-7 " + (index ? "lg:border-l lg:border-white/20" : "")}
            delay={index * 0.04}
          >
            <div className="text-[16px] font-semibold tracking-[-0.02em]">{title}</div>
            <div className="mt-2 text-[11px] leading-[1.6] text-white/70">{copy}</div>
          </Reveal>
        ))}
      </div>
      <div className="mx-auto mt-7 max-w-[1280px] text-[9px] text-white/52">
        *Unlimited stored contacts are subject to fair use. Communications and other usage-based services are separate.
      </div>
    </section>
  );
}

function IntentRouter() {
  const intents = [
    ["Stop enquiries going quiet", "Follow-Up", "/follow-up", Workflow],
    ["Answer more calls", "AI Receptionist", "/ai-receptionist", Phone],
    ["Bring old leads back", "Reopen", "/reactivation", RefreshCw],
    ["Market to existing customers", "Customer Marketing", "/customer-marketing", Send],
    ["Get more reviews", "Reviews & Reputation", "/reviews", Star],
    ["Manage customers and opportunities", "CRM", "/crm", UserRound],
  ] as const;

  return (
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <Eyebrow>Go deeper</Eyebrow>
            <h2
              className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[60px] lg:text-[72px]"
              style={{ fontFamily: DISPLAY }}
            >
              What do you want
              <span className="block text-[#2563FF]">to fix first?</span>
            </h2>
          </div>
          <p className="max-w-[520px] text-[14px] leading-[1.7] text-[#657083]">
            Start with the job that is getting stuck today.
          </p>
        </Reveal>

        <div className="mt-12 grid overflow-hidden rounded-[26px] border border-[#DDE3EC] md:grid-cols-2">
          {intents.map(([title, product, href, Icon], index) => (
            <a
              key={title}
              href={href}
              className={
                "group flex items-center gap-4 bg-white p-5 transition-colors hover:bg-[#F7F9FD] sm:p-6 " +
                (index >= 2 ? "border-t border-[#DDE3EC] " : "") +
                (index % 2 === 1 ? "md:border-l md:border-[#DDE3EC] " : "") +
                (index === 1 ? "border-t border-[#DDE3EC] md:border-t-0 " : "")
              }
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E8EFFF] text-[#2563FF]">
                <Icon size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[17px] font-semibold tracking-[-0.025em] text-[#1D2738]">{title}</div>
                <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#8A94A6]">{product}</div>
              </div>
              <ArrowRight size={15} className="shrink-0 text-[#A0A8B6] transition-transform group-hover:translate-x-1 group-hover:text-[#2563FF]" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-[#F7F9FC] px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <Reveal className="mx-auto max-w-[960px] text-center">
        <div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#111827] text-white">
          <Sparkles size={18} />
        </div>
        <h2
          className="mx-auto mt-5 max-w-[900px] text-[42px] font-medium leading-[0.98] tracking-[-0.052em] text-[#111827] sm:text-[56px] lg:text-[66px]"
          style={{ fontFamily: DISPLAY }}
        >
          See how the pieces should fit
          <span className="block text-[#2563FF]">around your business.</span>
        </h2>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={BOOK_URL}
            className="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#111827] px-6 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px sm:w-auto"
          >
            Book a Call <ArrowRight size={14} />
          </a>
          <a
            href={PRICING_URL}
            className="inline-flex h-[50px] w-full items-center justify-center rounded-full border border-[#D8E0EC] bg-white px-6 text-[13px] font-semibold text-[#172033] transition-colors hover:border-[#2563FF] sm:w-auto"
          >
            View pricing
          </a>
        </div>
      </Reveal>
    </section>
  );
}
