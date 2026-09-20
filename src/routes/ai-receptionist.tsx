import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Headphones,
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
  }),
  component: AIReceptionistPage,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;

const C = {
  paper: "#F7F4EE",
  paper2: "#F2EADF",
  ink: "#111318",
  muted: "#676B67",
  line: "#D8CFC3",
  dark: "#111214",
  green: "#1E2B29",
  coral: "#E97D62",
  amber: "#DDA34B",
  sage: "#99A36D",
  plum: "#9B86B8",
} as const;

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
      initial={reduced ? false : { opacity: 0, y: 12 }}
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
          </h1>
          <p className="mt-6 max-w-[570px] text-[16px] leading-[1.68] text-[#626762] sm:text-[18px]">
            Answer routine enquiries, capture what matters, book or route the next step, and keep the follow-up moving when your team is busy.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BOOK_URL}
              className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-transform duration-200 hover:-translate-y-px"
            >
              Book a Call <ArrowRight size={15} />
            </a>
            <a
              href={PRICING_URL}
              className="inline-flex h-[50px] items-center rounded-[10px] border border-[#CBC2B7] bg-[#FBFAF7] px-6 text-[13px] font-semibold text-[#111318]"
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

function HumanHeroCard() {
  const reduced = !!useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[#111214] shadow-[0_28px_78px_rgba(57,45,32,.16)]">
      <div className="relative min-h-[470px] sm:min-h-[560px] lg:min-h-[620px]">
        <motion.img
          src="/concept/operator-away/poster.jpg"
          alt="Small business owner working while checking her phone"
          className="absolute inset-0 h-full w-full object-cover"
          initial={reduced ? false : { scale: 1.015 }}
          animate={reduced ? undefined : { scale: [1.015, 1.035, 1.015] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-black/[0.04] to-transparent" />

        <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.2, ease: EASE }}
            className="max-w-[420px] rounded-[18px] bg-[#F7F4EE] p-4 shadow-[0_18px_50px_rgba(0,0,0,.2)] sm:p-5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E2B29] text-[#F7F4EE]">
                <Phone size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8A8178]">Incoming call</div>
                <div className="mt-1 text-[14px] font-semibold text-[#111318]">New customer enquiry</div>
              </div>
              <span className="rounded-full bg-[#E7EAD9] px-3 py-1.5 text-[10px] font-semibold text-[#66705A]">Answered</span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#DDD5CA] pt-4">
              <div className="text-[12px] leading-[1.55] text-[#626762]">Zapla is handling the call while you keep working.</div>
              <ArrowRight size={15} className="ml-4 shrink-0 text-[#C96F55]" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function WhatItHandles() {
  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[860px]">
          <Eyebrow>Keep the routine moving</Eyebrow>
          <h2 className="mt-4 text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[64px]" style={{ fontFamily: DISPLAY }}>
            Let AI handle the calls that should not stop your day.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <div className="h-full rounded-[24px] bg-[#F1EADF] p-6 sm:p-8 lg:p-10">
              <div className="grid gap-7 sm:grid-cols-2">
                <HandleItem icon={<MessageSquare size={18} />} title="Routine questions" copy="Hours, services, availability and the information you choose to provide." />
                <HandleItem icon={<Calendar size={18} />} title="Bookings" copy="Move suitable callers into the appointment flow you have set." />
                <HandleItem icon={<UserRound size={18} />} title="Caller details" copy="Capture names, contact details and the reason they called." />
                <HandleItem icon={<PhoneForwarded size={18} />} title="Routing" copy="Send the call to the right person when it should not stay with AI." />
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-[24px] bg-[#111214]">
              <img
                src="/concept/human-work/agent.jpg"
                alt="Service professional speaking with customers"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#DDA34B]">Human handoff</div>
                <h3 className="mt-3 max-w-[470px] text-[31px] font-medium leading-[1.02] tracking-[-0.045em]" style={{ fontFamily: DISPLAY }}>
                  The calls that need a person still get a person.
                </h3>
                <p className="mt-4 max-w-[470px] text-[13px] leading-[1.65] text-white/68">
                  You decide when Zapla answers, when it takes details, and when it hands the conversation to your team.
                </p>
              </div>
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
  const steps = [
    ["01", "Answer", "The call gets picked up."],
    ["02", "Take action", "Book, route or capture the next step."],
    ["03", "Update Zapla", "Keep the customer context with the record."],
    ["04", "Follow through", "Trigger the next message, task or pipeline move."],
  ] as const;

  return (
    <section className="bg-[#111214] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow light>The Zapla difference</Eyebrow>
            <h2 className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[70px]" style={{ fontFamily: DISPLAY }}>
              Answering is useful.
              <span className="block text-[#DDA34B]">Follow-through is the point.</span>
            </h2>
          </div>
          <p className="max-w-[590px] text-[15px] leading-[1.7] text-white/58 sm:text-[17px]">
            A basic answering bot can stop when the call ends. Zapla can keep that customer moving into the rest of the work.
          </p>
        </Reveal>

        <Reveal className="mt-12 overflow-hidden rounded-[24px] border border-white/10 bg-[#17181B]">
          <div className="grid md:grid-cols-4 md:divide-x md:divide-white/10">
            {steps.map(([n, title, copy], index) => (
              <div key={n} className={"p-6 sm:p-7 lg:p-8 " + (index ? "border-t border-white/10 md:border-t-0" : "")}>
                <div className="text-[10px] font-bold tracking-[0.18em] text-[#DDA34B]">{n}</div>
                <h3 className="mt-5 text-[25px] font-medium tracking-[-0.04em] text-white" style={{ fontFamily: DISPLAY }}>{title}</h3>
                <p className="mt-3 text-[13px] leading-[1.62] text-white/52">{copy}</p>
              </div>
            ))}
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
                <div key={n} className="grid grid-cols-[44px_130px_1fr] gap-3 py-5 sm:grid-cols-[50px_150px_1fr]">
                  <div className="text-[10px] font-bold tracking-[0.16em] text-[#C96F55]">{n}</div>
                  <div className="text-[14px] font-semibold text-[#111318]">{title}</div>
                  <div className="text-[12px] leading-[1.6] text-[#666B67]">{copy}</div>
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
              <a href={BOOK_URL} className="inline-flex h-[48px] items-center gap-2 rounded-[10px] bg-[#F7F4EE] px-6 text-[13px] font-semibold text-[#1E2B29]">
                Book a Call <ArrowRight size={15} />
              </a>
              <a href={PRICING_URL} className="inline-flex h-[48px] items-center rounded-[10px] border border-white/20 px-6 text-[13px] font-semibold text-[#F7F4EE]">
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
      <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/40">{label}</div>
      <div className="text-[13px] font-semibold text-white/88">{value}</div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

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
                  className="flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
                  aria-expanded={isOpen}
                >
                  <span className="text-[17px] font-semibold tracking-[-0.025em] text-[#111318] sm:text-[19px]" style={{ fontFamily: DISPLAY }}>
                    {item.q}
                  </span>
                  <ChevronDown size={18} className={"shrink-0 text-[#777168] transition-transform " + (isOpen ? "rotate-180" : "")} />
                </button>
                <div className={"grid transition-[grid-template-rows,opacity] duration-200 " + (isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <div className="overflow-hidden">
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
          Let the phone ring without stopping the work.
        </h2>
        <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-[1.7] text-white/58 sm:text-[17px]">
          We will map the routine calls your team handles today and show you where Zapla can answer, act or hand off.
        </p>
        <a href={BOOK_URL} className="mt-8 inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#F7F4EE] px-6 text-[13px] font-semibold text-[#1E2B29]">
          Book a Call <ArrowRight size={15} />
        </a>
      </Reveal>
    </section>
  );
}

export default AIReceptionistPage;
