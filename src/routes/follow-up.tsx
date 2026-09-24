import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
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
    q: "Which channels can Zapla use for follow-up?",
    a: "Follow-up can run across the channels you choose, including SMS, email, web chat and other connected channels. The exact mix depends on the workflow you set up.",
  },
  {
    q: "What happens when a customer replies?",
    a: "You decide. A reply can pause or continue a sequence, change the workflow, update the next step, or bring the conversation back to your team.",
  },
  {
    q: "Is follow-up only for new leads?",
    a: "No. Zapla can follow up around new enquiries, quotes, bookings, service or renewal dates, past customers and post-job actions such as review requests. The workflow depends on what you want to happen and when.",
  },
  {
    q: "Does my team still control the messages?",
    a: "Yes. You choose the timing, wording, channels, handoff points and rules. Automation should remove repetitive chasing, not remove human judgment.",
  },
  {
    q: "Do we have to build the workflows ourselves?",
    a: "No. Zapla can map the agreed workflow with you and build the initial setup as part of Guided Launch, so your team is not starting from a blank screen.",
  },
] as const;

function FollowUpPage() {
  return (
    <main className="min-h-screen bg-[#FCFCFA] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <Hero />
      <LeakSection />
      <MechanismSection />
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

function TeamAvatar({
  size = 42,
  cell = 0,
  className = "",
}: {
  size?: number;
  cell?: number;
  className?: string;
}) {
  const column = cell % 6;
  const row = Math.floor(cell / 6);
  return (
    <span
      className={`block shrink-0 overflow-hidden rounded-full border-2 border-white/15 shadow-[0_8px_24px_rgba(0,0,0,.22)] ${className}`}
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

  return (
    <div className="relative mx-auto max-w-[1340px] pt-10 sm:pt-14 lg:min-h-[600px] lg:pt-20">
      <div className="absolute bottom-0 left-[3.5%] right-[3.5%] top-[14.5%] rounded-[34px] bg-[#98A27F]" />

      <div className="relative z-10 lg:hidden">
        <div className="px-4">
          <CustomerRecord />
        </div>
        <div className="mt-5 grid gap-3 px-4 pb-5 sm:grid-cols-2">
          <OrbitCard
            visual={<TeamAvatar size={38} cell={0} className="border-white/80" />}
            eyebrow="Web chat"
            title="New enquiry"
            copy="Can I book a consultation next week?"
          />
          <OrbitCard
            visual={<span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111214]"><ZaplaPetal size={23} /></span>}
            eyebrow="Voice AI"
            title="Call captured"
            copy="Customer asked about Tuesday morning."
          />
          <OrbitCard
            visual={<TeamAvatar size={38} cell={14} className="border-white/80" />}
            eyebrow="Past customer"
            title="Follow-up ready"
            copy="Time to reconnect."
          />
          <OrbitCard
            visual={<span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111214]"><ZaplaPetal size={23} /></span>}
            eyebrow="SMS"
            title="SMS sent"
            copy="Would Tuesday morning suit you?"
          />
          <OrbitCard
            visual={<span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#99A36D]/16 text-[#6C7746]"><Calendar size={16} /></span>}
            eyebrow="Booking"
            title="Tuesday · 10:30am"
            copy="Consultation booked"
          />
          <OrbitCard
            visual={
              <span className="flex -space-x-2">
                <TeamAvatar size={34} cell={7} className="border-white/80" />
                <TeamAvatar size={38} cell={0} className="border-white/80" />
                <TeamAvatar size={34} cell={14} className="border-white/80" />
              </span>
            }
            eyebrow="Human handoff"
            title="Front desk notified"
            copy="Full context is ready."
          />
        </div>
      </div>

      <div className="relative z-10 hidden h-[600px] lg:block">
        <motion.div
          className="absolute bottom-0 left-1/2 top-0 w-[45%] -translate-x-1/2"
          initial={reduced ? false : { opacity: 0, y: 12, scale: 0.992 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
        >
          <CustomerRecord />
        </motion.div>

        <motion.div className="absolute left-[4.8%] top-0 w-[20%]" initial={reduced ? false : { opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.08, ease: EASE }}>
          <OrbitCard visual={<TeamAvatar size={38} cell={0} className="border-white/80" />} eyebrow="Web chat" title="New enquiry" copy="Can I book a consultation next week?" />
        </motion.div>

        <motion.div className="absolute left-[4.8%] top-[31.5%] w-[20%]" initial={reduced ? false : { opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.14, ease: EASE }}>
          <OrbitCard visual={<span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111214]"><ZaplaPetal size={23} /></span>} eyebrow="Voice AI" title="Call captured" copy="Customer asked about Tuesday morning." />
        </motion.div>

        <motion.div className="absolute left-[4.8%] top-[63%] w-[20%]" initial={reduced ? false : { opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.2, ease: EASE }}>
          <OrbitCard visual={<TeamAvatar size={38} cell={14} className="border-white/80" />} eyebrow="Past customer" title="Follow-up ready" copy="Time to reconnect." />
        </motion.div>

        <motion.div className="absolute right-[4.8%] top-0 w-[20%]" initial={reduced ? false : { opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.1, ease: EASE }}>
          <OrbitCard visual={<span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111214]"><ZaplaPetal size={23} /></span>} eyebrow="SMS" title="SMS sent" copy="Would Tuesday morning suit you?" />
        </motion.div>

        <motion.div className="absolute right-[4.8%] top-[31.5%] w-[20%]" initial={reduced ? false : { opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.16, ease: EASE }}>
          <OrbitCard visual={<span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#99A36D]/16 text-[#6C7746]"><Calendar size={16} /></span>} eyebrow="Booking" title="Tuesday · 10:30am" copy="Consultation booked" />
        </motion.div>

        <motion.div className="absolute right-[4.8%] top-[63%] w-[20%]" initial={reduced ? false : { opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.22, ease: EASE }}>
          <OrbitCard
            visual={
              <span className="flex -space-x-2">
                <TeamAvatar size={34} cell={7} className="border-white/80" />
                <TeamAvatar size={38} cell={0} className="border-white/80" />
                <TeamAvatar size={34} cell={14} className="border-white/80" />
              </span>
            }
            eyebrow="Human handoff"
            title="Front desk notified"
            copy="Full context is ready."
          />
        </motion.div>

        {["10.5%","42%","73.5%"].map((top) => (
          <span
            key={`left-${top}`}
            className="pointer-events-none absolute left-[24.8%] flex w-[2.7%] -translate-y-1/2 items-center text-white/66"
            style={{ top }}
          >
            <span className="h-px flex-1 bg-white/36" />
            <ArrowRight size={12} strokeWidth={1.45} />
          </span>
        ))}
        {["10.5%","42%","73.5%"].map((top) => (
          <span
            key={`right-${top}`}
            className="pointer-events-none absolute left-[72.5%] flex w-[2.7%] -translate-y-1/2 items-center text-white/66"
            style={{ top }}
          >
            <span className="h-px flex-1 bg-white/36" />
            <ArrowRight size={12} strokeWidth={1.45} />
          </span>
        ))}
      </div>
    </div>
  );
}

function CustomerRecord() {
  const ghostRows = Array.from({ length: 8 });

  return (
    <div className="relative h-full min-h-[600px] overflow-hidden rounded-[24px_24px_0_0] border border-black/[0.06] bg-white shadow-[0_28px_70px_rgba(48,54,40,.18)]">
      <div className="flex items-center gap-3 border-b border-[#E7E9E4] bg-[#F2CDBD] px-5 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#111214]">
          <ZaplaPetal size={23} />
        </span>
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#9B6758]">Zapla</div>
          <div className="mt-0.5 text-[17px] font-semibold tracking-[-0.025em] text-[#1E211E]">Follow-Up</div>
        </div>
        <div className="ml-auto flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.12em] text-[#687245]">
          <span className="h-2 w-2 rounded-full bg-[#99A36D]" />
          Active
        </div>
      </div>

      <div className="grid grid-cols-[1.1fr_1fr_.9fr] border-b border-[#ECEDE9] px-5 py-3 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#999D98]">
        <span>Customer</span>
        <span>Status</span>
        <span>Next step</span>
      </div>

      <div className="px-5 pb-4 pt-2">
        <div className="grid grid-cols-[1.1fr_1fr_.9fr] items-center rounded-[12px] bg-[#F6F2EF] px-3 py-3">
          <div className="flex items-center gap-2.5">
            <TeamAvatar size={28} cell={0} className="border-white/80" />
            <span className="text-[11px] font-semibold text-[#303430]">Sarah Mitchell</span>
          </div>
          <span className="text-[11px] font-semibold text-[#8A6527]">Reply received</span>
          <span className="text-[11px] font-semibold text-[#303430]">Tue · 10:30am</span>
        </div>

        {ghostRows.map((_, index) => (
          <div key={index} className="grid grid-cols-[1.1fr_1fr_.9fr] items-center border-b border-[#F1F2EF] px-3 py-[13px] last:border-b-0">
            {[72, 62, 58].map((width, cellIndex) => (
              <span key={cellIndex} className="pr-4">
                <span className="block h-2 rounded-full bg-[#ECEDE9]" style={{ width: `${width}%` }} />
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[220px] bg-gradient-to-b from-transparent via-white/82 to-[#E3E8D7]" />
    </div>
  );
}

function OrbitCard({
  visual,
  eyebrow,
  title,
  copy,
}: {
  visual: ReactNode;
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="rounded-[20px] border border-white/70 bg-white/[0.18] p-[3px] shadow-[0_18px_40px_rgba(44,48,35,.18),inset_0_1px_0_rgba(255,255,255,.72)] backdrop-blur-[18px]">
      <div className="h-[126px] rounded-[16px] border border-white/90 bg-white/[0.88] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-[14px]">
        <div className="flex items-center gap-2.5">
          <span className="shrink-0">{visual}</span>
          <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#737A74]">{eyebrow}</div>
        </div>
        <div className="mt-3 text-[18px] font-medium leading-[1.04] tracking-[-0.035em] text-[#171A17]" style={{ fontFamily: DISPLAY }}>{title}</div>
        <div className="mt-1.5 line-clamp-2 text-[10px] leading-[1.4] text-[#666C66]">{copy}</div>
      </div>
    </div>
  );
}

function LeakSection() {
  return (
    <section className="bg-[#F8F9F7] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>Where follow-up breaks</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[70px]" style={{ fontFamily: DISPLAY }}>
            Most leads don’t say no.
            <span className="block text-[#C96F55]">They just go quiet.</span>
          </h2>
          <p className="mt-6 max-w-[660px] text-[15px] leading-[1.72] text-[#666B67] sm:text-[17px]">
            Follow-up rarely fails in one dramatic moment. It slips when the next action waits in someone’s head, inbox or to-do list.
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
                  Silence gets mistaken for a no. The quote gets older because nobody brings the conversation back.
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

function MechanismSection() {
  const reduced = !!useReducedMotion();
  const stages = [
    {
      number: "01",
      title: "TRIGGER.",
      tone: "#E97D62",
      text: "#FFF8F4",
      accent: "#FFF8F4",
      items: ["Enquiry", "Quote", "Missed call", "Booking", "Service due", "Job complete"],
      ai: false,
    },
    {
      number: "02",
      title: "RULES.",
      tone: "#F6EFE2",
      text: "#1F211E",
      accent: "#DDA34B",
      items: ["When to run", "Which channel", "What happens on reply"],
      ai: true,
    },
    {
      number: "03",
      title: "ACTION.",
      tone: "#A9B47A",
      text: "#172019",
      accent: "#172019",
      items: ["Follow up", "Remind", "Book", "Ask for a review", "Hand off"],
      ai: false,
    },
  ] as const;

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[#111214] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow dark>How follow-up works</Eyebrow>
          <h2 className="mt-4 text-[46px] font-medium leading-[0.94] tracking-[-0.055em] sm:text-[64px] lg:text-[76px]" style={{ fontFamily: DISPLAY }}>
            Something happens. Your rules decide. Zapla acts.
          </h2>
        </Reveal>

        <div className="mt-14 rounded-[30px] border border-white/[0.07] p-2 sm:p-3">
          <div className="grid gap-3 lg:grid-cols-[1fr_52px_1fr_52px_1fr] lg:items-stretch lg:gap-0">
            {stages.map((stage, index) => (
              <div key={stage.number} className="contents">
                <motion.div
                  className="relative min-h-[286px] rounded-[26px] p-7 sm:p-8"
                  style={{ backgroundColor: stage.tone, color: stage.text }}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : index * 0.07, ease: EASE }}
                >
                  <div className="flex h-11 items-start justify-between">
                    <span className="pt-1 text-[10px] font-semibold tracking-[0.16em] opacity-55">{stage.number}</span>
                    {!stage.ai ? <span className="mt-1 h-2.5 w-2.5 rounded-full bg-current opacity-55" /> : null}
                  </div>

                  {stage.ai ? (
                    <span className="absolute right-7 top-7 flex h-11 w-11 items-center justify-center rounded-full bg-[#111214] sm:right-8 sm:top-8">
                      <ZaplaPetal size={29} />
                    </span>
                  ) : null}

                  <div
                    className="mt-8 text-[52px] font-medium leading-[0.88] tracking-[-0.065em] sm:text-[60px]"
                    style={{ fontFamily: DISPLAY, color: stage.accent }}
                  >
                    {stage.title}
                  </div>

                  <div className="mt-7">
                    {stage.ai ? (
                      <div className="divide-y divide-[#1F211E]/10 border-y border-[#1F211E]/10">
                        {stage.items.map((item) => (
                          <div key={item} className="py-3 text-[11px] font-semibold text-[#64665F]">{item}</div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {stage.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-current/20 bg-white/15 px-3 py-2 text-[10px] font-semibold opacity-80"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>

                {index < 2 ? (
                  <div className="hidden items-center px-3 lg:flex">
                    <span className="h-px flex-1 bg-white/[0.16]" />
                    <ArrowRight className="-ml-px shrink-0 text-white/42" size={15} strokeWidth={1.4} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="bg-[#F7F8F5] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-[840px]">
          <Eyebrow>Where Zapla follows through</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[58px]" style={{ fontFamily: DISPLAY }}>
            One follow-up system. Different moments that matter.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <UseCaseCard
              number="01"
              eyebrow="New enquiries"
              title="Reply while the enquiry is still warm."
              copy="A new enquiry can get a fast response, the right questions and a clear next step instead of sitting untouched until someone gets back to it."
              className="min-h-[330px] bg-[#1E2B29] text-[#F7F4EE]"
              dark
            />
          </Reveal>
          <Reveal className="lg:col-span-5">
            <UseCaseCard
              number="02"
              eyebrow="Quotes"
              title="Keep the decision alive."
              copy="Schedule relevant follow-up around a quote instead of relying on someone to remember the next touch."
              className="min-h-[330px] bg-white"
            />
          </Reveal>
          <Reveal className="lg:col-span-5">
            <UseCaseCard
              number="03"
              eyebrow="Bookings"
              title="Keep the booking visible."
              copy="Confirm, remind and follow up around appointments without turning your staff into a reminder service."
              className="min-h-[280px] bg-white"
            />
          </Reveal>
          <Reveal className="lg:col-span-7">
            <UseCaseCard
              number="04"
              eyebrow="Repeat business"
              title="Bring customers back at the right time."
              copy="Trigger follow-up around service cycles, renewals and return dates, or reconnect with customers who have gone quiet."
              className="min-h-[280px] bg-[#C96F55] text-[#FFF8F3]"
              dark
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function UseCaseCard({
  number,
  eyebrow,
  title,
  copy,
  className,
  dark = false,
}: {
  number: string;
  eyebrow: string;
  title: string;
  copy: string;
  className: string;
  dark?: boolean;
}) {
  return (
    <div className={`relative flex h-full flex-col justify-between overflow-hidden rounded-[26px] p-7 sm:p-9 ${className}`}>
      <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full border border-current opacity-[0.06]" />
      <div>
        <div className="flex items-center justify-between">
          <div className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${dark ? "text-white/56" : "text-[#C96F55]"}`}>{eyebrow}</div>
          <div className={`text-[11px] font-semibold tracking-[0.16em] ${dark ? "text-white/24" : "text-[#111318]/22"}`}>{number}</div>
        </div>
        <h3 className="mt-12 max-w-[560px] text-[32px] font-medium leading-[1.02] tracking-[-0.045em] sm:text-[38px]" style={{ fontFamily: DISPLAY }}>{title}</h3>
      </div>
      <p className={`mt-8 max-w-[560px] text-[14px] leading-[1.68] ${dark ? "text-white/68" : "text-[#666B67]"}`}>{copy}</p>
    </div>
  );
}

function HumanControl() {
  const actions = [
    { label: "Continue follow-up", tone: "#DDA34B", className: "bg-[#F7E5B8]", team: false },
    { label: "Pause sequence", tone: "#C96C85", className: "bg-[#F2DDE5]", team: false },
    { label: "Change workflow", tone: "#9B86B8", className: "bg-[#E5DFF0]", team: false },
    { label: "Send to your team", tone: "#99A36D", className: "bg-[#E1E7D0]", team: true },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#EAE4F0] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>You stay in control</Eyebrow>
          <h2 className="mt-4 text-[46px] font-medium leading-[0.95] tracking-[-0.055em] text-[#111318] sm:text-[64px] lg:text-[72px]" style={{ fontFamily: DISPLAY }}>
            You decide what happens next.
          </h2>
          <p className="mt-5 max-w-[680px] text-[15px] leading-[1.68] text-[#626662] sm:text-[16px]">
            A reply can pause, continue, change the workflow or bring in your team.
          </p>
        </Reveal>

        <div className="relative mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <Reveal>
            <div className="flex h-full min-h-[430px] flex-col justify-between rounded-[30px] bg-[#2B2630] p-7 text-[#F7F4EE] sm:p-9">
              <div className="flex items-center gap-3">
                <TeamAvatar size={54} cell={0} />
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/38">Customer reply</div>
                  <div className="mt-1 text-[13px] font-semibold text-white/78">Sarah Mitchell</div>
                </div>
              </div>

              <div className="my-10 text-[48px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px]" style={{ fontFamily: DISPLAY }}>
                “Can I change the booking?”
              </div>

              <div className="flex items-center gap-3 border-t border-white/[0.09] pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111214]"><ZaplaPetal size={27} /></span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/48">Your rules decide</span>
              </div>
            </div>
          </Reveal>

          <span className="pointer-events-none absolute left-[44.4%] top-1/2 z-20 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[5px] border-[#EAE4F0] bg-[#FCFCFA] text-[#5E5961] shadow-[0_10px_24px_rgba(53,45,61,.10)] lg:flex">
            <ArrowRight size={16} strokeWidth={1.5} />
          </span>

          <Reveal>
            <div className="h-full min-h-[430px] overflow-hidden rounded-[30px] border border-[#8F8298]/14 bg-white/55 shadow-[0_20px_55px_rgba(74,62,87,.08)] backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-[#8F8298]/12 px-6 py-5 sm:px-7">
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8B6A7A]">Possible outcomes</div>
                  <div className="mt-1 text-[17px] font-medium tracking-[-0.03em] text-[#2A2630]" style={{ fontFamily: DISPLAY }}>The reply changes what happens next.</div>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111214]">
                  <ZaplaPetal size={27} />
                </span>
              </div>

              <div className="grid gap-px bg-[#8F8298]/10 sm:grid-cols-2">
                {actions.map((action, index) => (
                  <div
                    key={action.label}
                    className={`relative flex min-h-[165px] flex-col justify-between p-6 ${action.className}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: action.tone }} />
                      <span className="text-[10px] font-semibold tracking-[0.14em] text-[#6D6870]/45">0{index + 1}</span>
                    </div>
                    <div className="mt-8 text-[27px] font-medium leading-[1] tracking-[-0.045em] text-[#2A2630] sm:text-[30px]" style={{ fontFamily: DISPLAY }}>
                      {action.label}
                    </div>
                    {action.team ? (
                      <div className="mt-5 flex -space-x-2">
                        <TeamAvatar size={30} cell={7} />
                        <TeamAvatar size={34} cell={0} />
                        <TeamAvatar size={30} cell={14} />
                      </div>
                    ) : (
                      <div className="mt-5 h-px w-12" style={{ backgroundColor: action.tone }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ConnectedCrm() {
  const reduced = !!useReducedMotion();
  const history = [
    { label: "Relationship", value: "Existing customer", meta: "Known history", tone: "#E97D62", featured: false },
    { label: "Last booking", value: "6 months ago", meta: "Service history", tone: "#DDA34B", featured: false },
    { label: "Last message", value: "“Thanks, all sorted.”", meta: "Previous conversation", tone: "#C96C85", featured: true },
    { label: "Owner", value: "Front desk", meta: "Who picks it up", tone: "#99A36D", featured: false },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#DDE4CF] px-5 py-20 text-[#111318] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>Context-aware follow-up</Eyebrow>
          <h2 className="mt-4 text-[48px] font-medium leading-[0.94] tracking-[-0.058em] sm:text-[66px] lg:text-[76px]" style={{ fontFamily: DISPLAY }}>
            One customer. One history.
          </h2>
          <p className="mt-5 max-w-[650px] text-[15px] leading-[1.68] text-[#596153] sm:text-[16px]">
            Follow-up sees the context already attached to the customer record.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid overflow-hidden rounded-[34px] border border-[#1E2B29]/10 bg-[#FCFCFA] shadow-[0_28px_72px_rgba(62,70,49,.10)] lg:grid-cols-[0.68fr_1.32fr]">
            <div className="flex min-h-[390px] flex-col justify-between border-b border-[#1E2B29]/10 bg-[#F7F7F2] p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
              <div className="flex items-center gap-4">
                <TeamAvatar size={72} cell={14} className="border-[#DDE4CF]" />
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6B7168]">Past customer</div>
                  <div className="mt-2 text-[34px] font-medium tracking-[-0.045em] text-[#202420]" style={{ fontFamily: DISPLAY }}>Emma Chen</div>
                </div>
              </div>

              <div>
                <div className="text-[43px] font-medium leading-[0.96] tracking-[-0.052em] text-[#1E2B29]" style={{ fontFamily: DISPLAY }}>
                  The history is already there.
                </div>
                <div className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#1E2B29] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#F7F4EE]">
                  <ZaplaPetal size={20} />
                  Context connected
                </div>
              </div>
            </div>

            <div className="relative min-h-[390px] px-7 py-7 sm:px-9 sm:py-8">
              <div className="flex items-center justify-between border-b border-[#1E2B29]/10 pb-5">
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6B7168]">History attached</div>
                <div className="text-[10px] text-[#8A9086]">Customer context</div>
              </div>

              <div className="relative mt-2">
                <div className="pointer-events-none absolute bottom-0 left-[7px] top-0 w-px bg-[#1E2B29]/10" />
                {history.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className={`relative grid gap-3 border-b border-[#1E2B29]/8 py-5 pl-8 last:border-b-0 sm:grid-cols-[0.72fr_1.28fr] sm:items-center ${item.featured ? "bg-[#F8F3F5]/55" : ""}`}
                    initial={reduced ? false : { opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: reduced ? 0 : 0.38, delay: reduced ? 0 : index * 0.06, ease: EASE }}
                  >
                    <span className="absolute left-0 top-1/2 h-[15px] w-[15px] -translate-x-[1px] -translate-y-1/2 rounded-full border-4 border-[#FCFCFA]" style={{ backgroundColor: item.tone }} />
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#6B7168]">{item.label}</div>
                      <div className="mt-1 text-[10px] text-[#8A9086]">{item.meta}</div>
                    </div>
                    <div
                      className={`text-[25px] font-medium leading-[1.04] tracking-[-0.04em] text-[#202420] sm:text-[28px] ${item.featured ? "sm:text-[31px]" : ""}`}
                      style={{ fontFamily: DISPLAY }}
                    >
                      {item.value}
                    </div>
                  </motion.div>
                ))}
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
  const reduced = !!useReducedMotion();

  return (
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <Reveal className="self-start lg:sticky lg:top-28 lg:h-fit">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.052em] sm:text-[58px]" style={{ fontFamily: DISPLAY }}>
            The practical stuff.
          </h2>
          <p className="mt-5 max-w-[360px] text-[14px] leading-[1.7] text-[#737872] sm:text-[15px]">
            Something else on your mind?{" "}
            <a href={BOOK_URL} className="font-semibold text-[#1E2B29] underline decoration-[#DDA34B] decoration-2 underline-offset-4">
              Ask us on a call.
            </a>
          </p>
        </Reveal>

        <div className="border-y border-[#DED7CF]">
          {FAQS.map((item, index) => {
            const active = open === index;
            return (
              <div key={item.q} className="border-b border-[#DED7CF] last:border-b-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-5 py-6 text-left sm:py-7"
                  onClick={() => setOpen(active ? null : index)}
                  aria-expanded={active}
                >
                  <span className="text-[16px] font-semibold tracking-[-0.02em] text-[#111318] sm:text-[18px]">
                    {item.q}
                  </span>
                  <motion.span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${active ? "border-[#1E2B29] bg-[#1E2B29] text-[#F7F4EE]" : "border-[#D8D1C8] bg-[#FCFCFA] text-[#4D534E]"}`}
                    animate={reduced ? undefined : { rotate: active ? 180 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.22, ease: EASE }}
                  >
                    <ChevronDown size={15} strokeWidth={1.6} />
                  </motion.span>
                </button>

                <motion.div
                  className="grid overflow-hidden"
                  initial={false}
                  animate={{ gridTemplateRows: active ? "1fr" : "0fr", opacity: active ? 1 : 0 }}
                  transition={{ duration: reduced ? 0 : 0.24, ease: EASE }}
                >
                  <div className="min-h-0">
                    <p className="max-w-[720px] pb-7 pr-12 text-[14px] leading-[1.75] text-[#696F69] sm:text-[15px]">
                      {item.a}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const reduced = !!useReducedMotion();

  return (
    <section className="bg-[#FCFCFA] px-5 pb-20 pt-4 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
      <Reveal className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[34px] bg-[#1E2B29] px-6 py-20 text-center text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -bottom-24 -right-20 h-56 w-56 rounded-full bg-[#E97D62]/[0.08]" />
          <div className="absolute -bottom-28 right-20 h-52 w-52 rounded-full bg-[#9E87C5]/[0.075]" />
          <div className="absolute bottom-5 -right-12 h-44 w-44 rounded-full bg-[#DDA34B]/[0.07]" />
          <div className="absolute -bottom-10 right-2 h-24 w-24 rounded-full bg-[#98A27F]/[0.10]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[920px]">
          <motion.span
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.12] bg-[#111214]/78 shadow-[0_10px_30px_rgba(0,0,0,.16)]"
            animate={reduced ? undefined : { y: [0, -4, 0], rotate: [0, 3, 0, -3, 0] }}
            transition={reduced ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ZaplaPetal size={36} />
          </motion.span>

          <div className="mt-7">
            <Eyebrow dark>Keep the next step moving</Eyebrow>
          </div>

          <h2 className="mx-auto mt-5 max-w-[900px] text-[48px] font-medium leading-[0.94] tracking-[-0.057em] sm:text-[66px] lg:text-[76px]" style={{ fontFamily: DISPLAY }}>
            Stop relying on memory to make the next move.
          </h2>

          <p className="mx-auto mt-6 max-w-[720px] text-[15px] leading-[1.72] text-white/62 sm:text-[17px]">
            Book a call and we’ll map where follow-up is slipping across your enquiries, quotes, bookings and repeat business, then show you what Zapla can automate and when.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={BOOK_URL}
              className="inline-flex h-[54px] items-center gap-2 rounded-full bg-[#F7F4EE] px-7 text-[13px] font-semibold text-[#1E2B29] transition-transform hover:-translate-y-px"
            >
              Book a Call <ArrowRight size={15} />
            </a>
            <a
              href={PRICING_URL}
              className="inline-flex h-[54px] items-center rounded-full border border-white/20 bg-white/[0.02] px-7 text-[13px] font-semibold text-[#F7F4EE] transition-colors hover:bg-white/[0.06]"
            >
              View pricing
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3 text-[12px] font-semibold text-white/52">
            <span className="flex items-center -space-x-2.5">
              <TeamAvatar size={34} cell={7} className="relative z-[1] ring-2 ring-[#1E2B29]" />
              <TeamAvatar size={38} cell={0} className="relative z-[3] ring-2 ring-[#1E2B29]" />
              <TeamAvatar size={34} cell={14} className="relative z-[2] ring-2 ring-[#1E2B29]" />
            </span>
            <span>Talk it through with the Zapla team</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
