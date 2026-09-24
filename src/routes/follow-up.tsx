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
    a: "No. You can use it for new enquiries, quotes, bookings, reminders and reactivation of past customers, depending on the workflow you set.",
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
  const steps = [
    {
      number: "01",
      eyebrow: "Trigger",
      title: "Something happens.",
      copy: "A new enquiry arrives, a quote is sent, a booking is coming up, a call is missed or a past customer reaches the right moment.",
      examples: ["New enquiry", "Quote sent", "Missed call", "Booking due", "Past customer"],
      tone: "#E97D62",
      ai: false,
    },
    {
      number: "02",
      eyebrow: "Rules",
      title: "Your workflow decides.",
      copy: "You choose the timing, channel, conditions, reply behaviour and the point where a person should step in.",
      examples: ["When to run", "Which channel", "If they reply", "When to hand off"],
      tone: "#DDA34B",
      ai: true,
    },
    {
      number: "03",
      eyebrow: "Action",
      title: "The next step happens.",
      copy: "Zapla carries out the action you set instead of leaving the next move to memory.",
      examples: ["Send follow-up", "Confirm or remind", "Update the record", "Assign to team"],
      tone: "#99A36D",
      ai: false,
    },
  ] as const;

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[#111214] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="max-w-[860px]">
          <Eyebrow dark>How follow-up works</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.97] tracking-[-0.052em] sm:text-[58px] lg:text-[66px]" style={{ fontFamily: DISPLAY }}>
            A trigger starts it. Your rules decide. Zapla acts.
          </h2>
          <p className="mt-6 max-w-[690px] text-[15px] leading-[1.72] text-white/52 sm:text-[16px]">
            Choose the moments that matter, the timing and conditions, and what should happen next. The same logic can run across the channels you use.
          </p>
        </Reveal>

        <div className="mt-14 border-y border-white/[0.09] lg:grid lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className={`relative px-0 py-8 sm:py-9 lg:min-h-[390px] lg:px-8 lg:py-10 ${index ? "border-t border-white/[0.09] lg:border-l lg:border-t-0" : ""}`}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : index * 0.08, ease: EASE }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: step.tone }}>{step.eyebrow}</span>
                <span className="text-[10px] font-semibold tracking-[0.16em] text-white/22">{step.number}</span>
              </div>

              <div className="mt-8 flex items-center gap-3">
                {step.ai ? (
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.04]">
                    <ZaplaPetal size={30} />
                  </span>
                ) : (
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: step.tone }} />
                )}
                <h3 className="text-[28px] font-medium leading-[1.02] tracking-[-0.04em] text-white/94" style={{ fontFamily: DISPLAY }}>
                  {step.title}
                </h3>
              </div>

              <p className="mt-5 max-w-[350px] text-[13px] leading-[1.68] text-white/47">{step.copy}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {step.examples.map((item) => (
                  <span key={item} className="rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-2 text-[9px] font-semibold text-white/58">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal>
          <div className="mt-6 flex flex-col gap-2 text-[11px] text-white/38 sm:flex-row sm:items-center sm:justify-between">
            <span>The automation follows the workflow you set.</span>
            <span className="font-semibold text-[#B8C28A]">Rules first. Automation second.</span>
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
              eyebrow="Past customers"
              title="Reconnect when there is a reason."
              copy="Bring the right customer back into a conversation when timing, service cycles or a campaign make it relevant."
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
    { label: "Continue follow-up", detail: "Keep the current workflow moving.", tone: "#DDA34B", team: false },
    { label: "Pause the sequence", detail: "Stop further automated messages for now.", tone: "#C96C85", team: false },
    { label: "Change workflow", detail: "Move the customer into a different next-step path.", tone: "#9B86B8", team: false },
    { label: "Send to your team", detail: "Bring a person in with the conversation context attached.", tone: "#99A36D", team: true },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#EAE4F0] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>You stay in control</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.98] tracking-[-0.052em] text-[#111318] sm:text-[58px] lg:text-[64px]" style={{ fontFamily: DISPLAY }}>
            A reply can change the plan. Your rules decide how.
          </h2>
          <p className="mt-6 max-w-[700px] text-[15px] leading-[1.72] text-[#626662] sm:text-[16px]">
            Follow-up does not have to behave the same way every time. You choose what a reply, status change or handoff should do next.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
          <Reveal>
            <div className="flex h-full min-h-[430px] flex-col justify-between rounded-[30px] bg-[#2B2630] p-7 text-[#F7F4EE] sm:p-9">
              <div>
                <div className="flex items-center gap-3">
                  <TeamAvatar size={54} cell={0} />
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/38">Customer reply</div>
                    <div className="mt-1 text-[13px] font-semibold text-white/78">Sarah Mitchell</div>
                  </div>
                </div>
                <div className="mt-12 text-[42px] font-medium leading-[0.98] tracking-[-0.05em] sm:text-[50px]" style={{ fontFamily: DISPLAY }}>
                  “Can I change the booking?”
                </div>
              </div>
              <div className="mt-10 border-t border-white/[0.09] pt-5 text-[11px] leading-[1.55] text-white/42">
                A reply is a new piece of context. What happens next is configurable.
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="h-full rounded-[30px] border border-[#8F8298]/16 bg-white/55 p-5 shadow-[0_18px_50px_rgba(74,62,87,.08)] backdrop-blur-sm sm:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-[#8F8298]/14 pb-5">
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8B6A7A]">Possible next actions</div>
                  <div className="mt-2 text-[24px] font-medium tracking-[-0.04em] text-[#2A2630]" style={{ fontFamily: DISPLAY }}>You decide which rule applies.</div>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#111214]">
                  <ZaplaPetal size={29} />
                </span>
              </div>

              <div className="divide-y divide-[#8F8298]/12">
                {actions.map((action) => (
                  <div key={action.label} className="grid gap-3 py-5 sm:grid-cols-[14px_1fr_auto] sm:items-center">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: action.tone }} />
                    <div>
                      <div className="text-[15px] font-semibold text-[#2A2630]">{action.label}</div>
                      <div className="mt-1 text-[11px] leading-[1.5] text-[#777078]">{action.detail}</div>
                    </div>
                    {action.team ? (
                      <div className="flex -space-x-2">
                        <TeamAvatar size={30} cell={7} />
                        <TeamAvatar size={34} cell={0} />
                        <TeamAvatar size={30} cell={14} />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 border-t border-[#8F8298]/18 pt-8 sm:grid-cols-3">
          <SmallPrinciple title="Timing" copy="Choose when follow-up starts and how it spaces out." />
          <SmallPrinciple title="Behaviour" copy="Decide what replies and status changes should trigger." />
          <SmallPrinciple title="Handoff" copy="Bring a person in when the workflow calls for judgment." />
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
    { label: "Relationship", value: "Existing customer", tone: "#E97D62" },
    { label: "Last message", value: "“Thanks, all sorted.”", tone: "#C96C85" },
    { label: "Last booking", value: "6 months ago", tone: "#DDA34B" },
    { label: "Owner", value: "Front desk", tone: "#99A36D" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#DDE4CF] px-5 py-20 text-[#111318] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="max-w-[920px]">
          <Eyebrow>Context-aware follow-up</Eyebrow>
          <h2 className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[62px]" style={{ fontFamily: DISPLAY }}>
            Follow-up works better when it already knows what happened.
          </h2>
          <p className="mt-6 max-w-[720px] text-[15px] leading-[1.72] text-[#596153] sm:text-[16px]">
            Source, recent messages, booking status and ownership stay with the customer record, so the workflow is not operating from a disconnected list.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-[34px] border border-[#1E2B29]/10 bg-[#FCFCFA] shadow-[0_28px_72px_rgba(62,70,49,.10)]">
            <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
              <div className="border-b border-[#1E2B29]/10 p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
                <div className="flex items-center gap-4">
                  <TeamAvatar size={70} cell={14} className="border-[#DDE4CF]" />
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6B7168]">Past customer context</div>
                    <div className="mt-2 text-[30px] font-medium tracking-[-0.045em] text-[#202420]" style={{ fontFamily: DISPLAY }}>Emma Chen</div>
                  </div>
                </div>

                <div className="mt-10 border-t border-[#1E2B29]/10 pt-7">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6B7168]">Before the next action</div>
                  <div className="mt-4 text-[40px] font-medium leading-[0.98] tracking-[-0.05em] text-[#1E2B29]" style={{ fontFamily: DISPLAY }}>
                    The workflow can see the history your team has already captured.
                  </div>
                </div>

                <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#1E2B29] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#F7F4EE]">
                  <ZaplaPetal size={20} />
                  Context stays connected
                </div>
              </div>

              <div>
                <div className="border-b border-[#1E2B29]/10 px-7 py-7 sm:px-9">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B7168]">Available before follow-up runs</div>
                </div>
                <div className="grid sm:grid-cols-2">
                  {facts.map((fact, index) => (
                    <div
                      key={fact.label}
                      className={`relative min-h-[180px] p-7 sm:p-8 ${index % 2 === 0 ? "sm:border-r sm:border-[#1E2B29]/10" : ""} ${index < 2 ? "border-b border-[#1E2B29]/10" : ""}`}
                    >
                      <div className="absolute left-7 top-0 h-[4px] w-14 sm:left-8" style={{ backgroundColor: fact.tone }} />
                      <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6B7168]">{fact.label}</div>
                      <div className="mt-10 max-w-[280px] text-[27px] font-medium leading-[1.05] tracking-[-0.04em] text-[#202420]" style={{ fontFamily: DISPLAY }}>{fact.value}</div>
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
          Zapla keeps the conversation, follow-up and next step connected so the next action does not quietly disappear into someone’s memory.
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
