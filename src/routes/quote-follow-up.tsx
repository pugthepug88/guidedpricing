import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BellRing,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Link2,
  MessageSquareText,
  Pause,
  Search,
  UserRoundCheck,
  Workflow,
} from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";

export const Route = createFileRoute("/quote-follow-up")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Quote Follow-Up for Service Businesses | Zapla" },
      {
        name: "description",
        content:
          "Keep outstanding quotes visible, give each one a clear next action, and follow up without relying on staff memory. Zapla connects quote follow-up to the customer record.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: QuoteFollowUpPage,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;

const SAMPLE_QUOTES = [
  { customer: "Mia Thompson", service: "Roof replacement", value: "A$12,400", age: "3 days", state: "Follow-up due", next: "Today · 10:30 AM", owner: "Ben", tone: "amber" },
  { customer: "Daniel Brooks", service: "Outdoor renovation", value: "A$8,650", age: "5 days", state: "Customer replied", next: "Needs team reply", owner: "Sam", tone: "blue" },
  { customer: "Priya Shah", service: "Solar upgrade", value: "A$4,850", age: "1 day", state: "Waiting", next: "Friday · 9:00 AM", owner: "Alex", tone: "sage" },
  { customer: "Noah Taylor", service: "Electrical fit-out", value: "A$2,950", age: "8 days", state: "Decision needed", next: "Call today", owner: "Ben", tone: "coral" },
] as const;

const FAQS = [
  {
    q: "Does Zapla replace the quoting software I already use?",
    a: "Not necessarily. If your current quoting or job-management system already works for estimating, keep it. Zapla can sit around the customer follow-through, using Zapla records directly or supported API and webhook connections where the other system exposes them.",
  },
  {
    q: "Is this just automatic quote reminders?",
    a: "No. Reminders are one part. The useful part is keeping the quote, customer context, last interaction, next action and owner together so the workflow can change when something happens instead of sending the same message forever.",
  },
  {
    q: "What happens when the customer replies?",
    a: "Zapla workflows can react to message-received events and change what happens next. During Guided Launch we configure the relevant pause, handoff, task or stage rules around the way your team works.",
  },
  {
    q: "Can the timing and messages be customised?",
    a: "Yes. Waits, delays, conditions, channels, wording and next actions can be configured around the buying cycle you actually have. A roof replacement should not be followed up like an emergency repair.",
  },
  {
    q: "Which businesses is Quote Follow-Up best for?",
    a: "It is strongest where quotes are meaningful, customers usually take time to decide, and the business sends enough quotes for manual memory to become unreliable. Larger trade projects, renovations, roofing, solar, HVAC replacement and similar work are good examples.",
  },
  {
    q: "What if a quote has genuinely gone cold?",
    a: "That is where Reopen becomes more relevant. Quote Follow-Up is for active quoted work that still needs a decision. Reopen is for opportunities that have already gone dormant and need a fresh conversation later.",
  },
] as const;

function QuoteFollowUpPage() {
  return (
    <main data-page="quote-follow-up" className="min-h-screen overflow-hidden bg-[#FCFCFA] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <Hero />
      <OutstandingLedger />
      <SentToDecision />
      <ControlSection />
      <FitAroundTools />
      <CustomerContext />
      <BestFit />
      <Faq />
      <FinalCta />
    </main>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = !!useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <div className={"text-[10px] font-semibold uppercase tracking-[0.22em] " + (dark ? "text-[#DDA34B]" : "text-[#9A654E]")}>{children}</div>;
}

function PrimaryButton({ light = false }: { light?: boolean }) {
  return (
    <a
      href={BOOK_URL}
      className={
        "inline-flex h-[52px] items-center gap-2 rounded-full px-7 text-[13px] font-semibold transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
        (light
          ? "bg-[#F7F4EE] text-[#1E2B29] focus-visible:ring-white/70 focus-visible:ring-offset-[#1E2B29]"
          : "bg-[#1E2B29] text-[#F7F4EE] shadow-[0_12px_28px_rgba(30,43,41,.14)] focus-visible:ring-[#1E2B29] focus-visible:ring-offset-[#FCFCFA]")
      }
    >
      Book a Call <ArrowRight size={15} />
    </a>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#E2D8CC] bg-[#F6F0E8] px-5 pb-16 pt-[112px] sm:px-10 sm:pb-20 sm:pt-[122px] lg:px-16 lg:pb-24 lg:pt-[130px]">
      <div className="pointer-events-none absolute -right-[8%] top-[8%] h-[620px] w-[620px] rounded-full bg-[#E2C9B7]/35 blur-[170px]" />
      <div className="pointer-events-none absolute -left-[8%] bottom-[-28%] h-[520px] w-[520px] rounded-full bg-[#DDE4CF]/45 blur-[150px]" />
      <div className="relative mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:gap-14">
        <Reveal className="max-w-[640px]">
          <Eyebrow>Quote Follow-Up</Eyebrow>
          <h1 className="mt-5 text-[52px] font-medium leading-[0.91] tracking-[-0.064em] text-[#111318] sm:text-[68px] lg:text-[82px]" style={{ fontFamily: DISPLAY }}>
            The quote is sent.
            <span className="block text-[#BF7458]">The decision is not.</span>
          </h1>
          <p className="mt-6 max-w-[610px] text-[16px] leading-[1.72] text-[#625F5A] sm:text-[18px]">
            Keep outstanding quotes visible, give each one a clear next action, and follow up without relying on someone to remember who still needs an answer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton />
            <a href="#outstanding-quotes" className="inline-flex h-[52px] items-center rounded-full border border-[#D4C8BA] bg-white/72 px-7 text-[13px] font-semibold text-[#242622] transition-colors hover:border-[#BFB1A0]">
              See how it works
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-medium text-[#7B756E]">
            <span className="inline-flex items-center gap-1.5"><Check size={13} /> Outstanding quote visibility</span>
            <span className="inline-flex items-center gap-1.5"><Check size={13} /> Follow-up rules</span>
            <span className="inline-flex items-center gap-1.5"><Check size={13} /> Customer context</span>
          </div>
        </Reveal>
        <Reveal delay={0.05}><HeroLedger /></Reveal>
      </div>
    </section>
  );
}

function HeroLedger() {
  return (
    <div className="relative mx-auto w-full max-w-[760px]">
      <div className="absolute -left-4 top-10 h-[84%] w-[94%] rotate-[-2deg] rounded-[30px] border border-[#D7CCBF] bg-[#EADFD3]" />
      <div className="relative overflow-hidden rounded-[28px] border border-[#D8D0C6] bg-[#FCFCFB] shadow-[0_32px_70px_rgba(59,46,32,.14)]">
        <div className="flex items-center justify-between border-b border-[#E5E0D9] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-[#1E2B29] text-white"><FileText size={15} /></span>
            <div><div className="text-[11px] font-semibold text-[#2B302C]">Outstanding quotes</div><div className="mt-0.5 text-[8px] text-[#858B86]">Example workspace</div></div>
          </div>
          <div className="rounded-full border border-[#E3DDD4] bg-white px-3 py-1.5 text-[9px] font-semibold text-[#6C736D]">4 open</div>
        </div>
        <div className="grid border-b border-[#E5E0D9] bg-[#F7F5F1] sm:grid-cols-3">
          {[["Open quote value", "A$28,850"], ["Needs action", "3"], ["Waiting", "1"]].map(([label, value], index) => (
            <div key={label} className={"px-5 py-4 " + (index ? "border-t border-[#E5E0D9] sm:border-l sm:border-t-0" : "")}>
              <div className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#90958F]">{label}</div>
              <div className="mt-1.5 text-[20px] font-semibold tracking-[-0.04em] text-[#253029]">{value}</div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 sm:px-5 sm:py-4">
          <div className="hidden grid-cols-[1.25fr_.72fr_.6fr_.85fr] gap-3 px-3 pb-2 text-[7px] font-bold uppercase tracking-[0.12em] text-[#9A9F99] sm:grid">
            <span>Customer</span><span>Value</span><span>Age</span><span>Next</span>
          </div>
          <div className="space-y-2">
            {SAMPLE_QUOTES.slice(0, 3).map((quote, index) => (
              <div key={quote.customer} className={"grid gap-2 rounded-[14px] border px-3 py-3 sm:grid-cols-[1.25fr_.72fr_.6fr_.85fr] sm:items-center " + (index === 0 ? "border-[#E1C3AE] bg-[#FFF7F1]" : "border-[#E8E5E0] bg-white")}>
                <div><div className="text-[10px] font-semibold text-[#29312C]">{quote.customer}</div><div className="mt-0.5 text-[8px] text-[#858C86]">{quote.service}</div></div>
                <div className="text-[11px] font-semibold text-[#29312C]">{quote.value}</div>
                <div className="text-[9px] font-medium text-[#69716B]">{quote.age}</div>
                <div><div className="text-[9px] font-semibold text-[#A76446]">{quote.state}</div><div className="mt-0.5 text-[7px] text-[#90958F]">{quote.next}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-[#E5E0D9] bg-[#F7F8F5] px-5 py-3 text-[8px] font-medium text-[#747B75] sm:px-6">
          <Clock3 size={11} className="text-[#BF7458]" /> Every open quote has a next action or a clear waiting state.
        </div>
      </div>
    </div>
  );
}

function OutstandingLedger() {
  const [active, setActive] = useState(0);
  const quote = SAMPLE_QUOTES[active];

  return (
    <section id="outstanding-quotes" className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-[720px]">
            <Eyebrow>The operational problem</Eyebrow>
            <h2 className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.056em] sm:text-[58px] lg:text-[68px]" style={{ fontFamily: DISPLAY }}>
              An outstanding quote should not live
              <span className="block text-[#7B8360]">in someone&apos;s memory.</span>
            </h2>
          </div>
          <p className="max-w-[520px] text-[15px] leading-[1.72] text-[#666C67] sm:text-[16px] lg:justify-self-end">
            Once a quote is sent, the useful question is not just “did we send a reminder?” It is: what is still open, what happened last, who owns it, and what should happen next?
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.66fr_1.34fr]">
          <Reveal>
            <div className="rounded-[26px] border border-[#E4E2DC] bg-[#F6F7F4] p-4 sm:p-5">
              <div className="flex items-center justify-between px-2 pb-3">
                <div><div className="text-[11px] font-semibold text-[#29312C]">Quote queue</div><div className="mt-1 text-[8px] text-[#858C86]">Select a quote to see the next action.</div></div>
                <Search size={14} className="text-[#9AA19B]" />
              </div>
              <div className="space-y-2">
                {SAMPLE_QUOTES.map((item, index) => (
                  <button
                    key={item.customer}
                    type="button"
                    onClick={() => setActive(index)}
                    className={"w-full rounded-[16px] border px-4 py-3.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563FF]/45 " + (active === index ? "border-[#D6B79F] bg-white shadow-[0_10px_26px_rgba(49,42,35,.06)]" : "border-transparent bg-transparent hover:border-[#E4DED5] hover:bg-white/60")}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div><div className="text-[11px] font-semibold text-[#29312C]">{item.customer}</div><div className="mt-1 text-[8px] text-[#858C86]">{item.service}</div></div>
                      <div className="text-[12px] font-semibold text-[#26302A]">{item.value}</div>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="text-[8px] font-medium text-[#7C837D]">{item.age} outstanding</span>
                      <StatePill tone={item.tone}>{item.state}</StatePill>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <div className="h-full overflow-hidden rounded-[26px] border border-[#E3DED7] bg-white shadow-[0_20px_54px_rgba(44,37,30,.055)]">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E7E3DD] px-6 py-5 sm:px-7">
                <div><div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8B918C]">Selected quote</div><div className="mt-1 text-[20px] font-semibold tracking-[-0.035em] text-[#26302A]">{quote.customer}</div></div>
                <div className="text-right"><div className="text-[25px] font-semibold tracking-[-0.045em] text-[#26302A]">{quote.value}</div><div className="mt-1 text-[8px] text-[#8A918B]">{quote.service}</div></div>
              </div>
              <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                <div className="border-b border-[#E7E3DD] p-6 sm:p-7 md:border-b-0 md:border-r">
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
                    <Detail label="Time outstanding" value={quote.age} icon={<Clock3 size={14} />} />
                    <Detail label="Current state" value={quote.state} icon={<FileText size={14} />} />
                    <Detail label="Next action" value={quote.next} icon={<CalendarClock size={14} />} />
                    <Detail label="Owner" value={quote.owner} icon={<UserRoundCheck size={14} />} />
                  </div>
                </div>
                <div className="p-6 sm:p-7">
                  <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8B918C]">Customer history</div>
                  <div className="mt-5 space-y-4">
                    <HistoryItem marker="✓" title="Quote sent" meta="Tuesday · 9:24 AM" copy="Quote recorded against the customer." />
                    <HistoryItem marker="→" title="Follow-up scheduled" meta="Today · 10:30 AM" copy="Wait until the agreed decision window." />
                    {active === 1 ? (
                      <HistoryItem marker="↗" title="Customer replied" meta="Today · 8:42 AM" copy="Can you confirm the warranty period?" active />
                    ) : active === 2 ? (
                      <HistoryItem marker="•" title="Waiting" meta="Current" copy="No new customer response yet." active />
                    ) : (
                      <HistoryItem marker="!" title="Action due" meta={quote.next} copy="This quote needs the next agreed action." active />
                    )}
                  </div>
                </div>
              </div>
              <div className="border-t border-[#E7E3DD] bg-[#F7F8F5] px-6 py-4 sm:px-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[9px] font-medium text-[#646C65]">The quote is visible because it still needs a decision.</div>
                  <span className="rounded-full bg-[#E8ECDD] px-3 py-1.5 text-[8px] font-bold text-[#657047]">Next action attached</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StatePill({ children, tone }: { children: ReactNode; tone: string }) {
  const classes: Record<string, string> = {
    amber: "bg-[#F6E5C9] text-[#946B2F]",
    blue: "bg-[#E5ECFF] text-[#4566B1]",
    sage: "bg-[#E7EAD9] text-[#667045]",
    coral: "bg-[#F6E2D9] text-[#A35F45]",
  };
  return <span className={"rounded-full px-2.5 py-1 text-[7px] font-bold " + classes[tone]}>{children}</span>;
}

function Detail({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-[14px] border border-[#E8E5E0] bg-[#FBFBF9] p-3.5">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-[9px] bg-[#EFF1EC] text-[#6F786D]">{icon}</span>
      <div><div className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#929791]">{label}</div><div className="mt-1 text-[10px] font-semibold text-[#303832]">{value}</div></div>
    </div>
  );
}

function HistoryItem({ marker, title, meta, copy, active = false }: { marker: string; title: string; meta: string; copy: string; active?: boolean }) {
  return (
    <div className="flex gap-3">
      <div className={"grid h-7 w-7 shrink-0 place-items-center rounded-full text-[9px] font-bold " + (active ? "bg-[#1E2B29] text-white" : "bg-[#EEF0EC] text-[#6B736D]")}>{marker}</div>
      <div className="min-w-0 pt-0.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1"><div className="text-[10px] font-semibold text-[#2A322C]">{title}</div><div className="text-[7px] text-[#929791]">{meta}</div></div>
        <div className="mt-1 text-[8px] leading-[1.5] text-[#757D76]">{copy}</div>
      </div>
    </div>
  );
}

function SentToDecision() {
  const reduced = !!useReducedMotion();
  const steps = [
    { label: "Quote sent", copy: "The customer has the price and scope.", icon: FileText, tone: "#C96F55" },
    { label: "Decision window", copy: "Give them the right amount of time.", icon: Clock3, tone: "#DDA34B" },
    { label: "Follow-up due", copy: "The next action becomes visible or runs.", icon: BellRing, tone: "#8C9564" },
    { label: "Customer response", copy: "A question, yes, no or later changes the path.", icon: MessageSquareText, tone: "#6D82B7" },
    { label: "Decision", copy: "The quote stops being an unresolved task.", icon: CheckCircle2, tone: "#6D8B79" },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#111214] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute left-[18%] top-[-20%] h-[560px] w-[560px] rounded-full bg-[#C96F55]/10 blur-[170px]" />
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div className="max-w-[760px]">
            <Eyebrow dark>Sent is not the finish line</Eyebrow>
            <h2 className="mt-4 text-[46px] font-medium leading-[0.94] tracking-[-0.056em] sm:text-[62px] lg:text-[74px]" style={{ fontFamily: DISPLAY }}>
              Move the quote from
              <span className="block text-[#E1A77F]">sent to decided.</span>
            </h2>
          </div>
          <p className="max-w-[520px] text-[15px] leading-[1.72] text-white/58 sm:text-[16px] lg:justify-self-end">
            The job of the workflow is not to keep sending messages. It is to make sure the quote reaches a real next state instead of quietly ageing in the background.
          </p>
        </Reveal>

        <div className="relative mt-14 lg:mt-16">
          <div className="absolute left-[6%] right-[6%] top-[27px] hidden h-px bg-white/12 lg:block" />
          <motion.div
            className="absolute left-[6%] top-[26px] hidden h-[2px] origin-left bg-gradient-to-r from-[#C96F55] via-[#DDA34B] to-[#7E9A87] lg:block"
            initial={reduced ? false : { width: 0 }}
            whileInView={{ width: "88%" }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: reduced ? 0 : 1.4, ease: EASE }}
          />
          <div className="grid gap-3 lg:grid-cols-5">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.label} delay={index * 0.06}>
                  <div className="relative rounded-[22px] border border-white/10 bg-white/[0.045] p-5 lg:min-h-[260px] lg:border-transparent lg:bg-transparent lg:p-3">
                    <div className="relative z-10 grid h-[54px] w-[54px] place-items-center rounded-full border border-white/12 bg-[#17191B] shadow-[0_0_0_7px_#111214]" style={{ color: step.tone }}><Icon size={18} /></div>
                    <div className="mt-8 text-[8px] font-bold uppercase tracking-[0.14em] text-white/28">0{index + 1}</div>
                    <h3 className="mt-2 text-[22px] font-medium tracking-[-0.035em] text-white" style={{ fontFamily: DISPLAY }}>{step.label}</h3>
                    <p className="mt-3 max-w-[220px] text-[12px] leading-[1.65] text-white/50">{step.copy}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ControlSection() {
  const rules = [
    { icon: Clock3, title: "Wait the right amount of time", copy: "Use the decision window that fits the job instead of applying one cadence to every quote." },
    { icon: MessageSquareText, title: "Change course when the customer responds", copy: "A message-received event can move the workflow into a different next step or handoff." },
    { icon: Pause, title: "Stop the chase when it stops making sense", copy: "Build explicit pause, decision and handoff rules rather than running an endless reminder sequence." },
  ] as const;

  return (
    <section className="bg-[#F6F2EA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[860px]">
          <Eyebrow>Controlled follow-through</Eyebrow>
          <h2 className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[68px]" style={{ fontFamily: DISPLAY }}>
            Follow up without sounding
            <span className="block text-[#A76F54]">like you&apos;re chasing.</span>
          </h2>
          <p className="mt-5 max-w-[690px] text-[15px] leading-[1.72] text-[#66625C] sm:text-[16px]">
            The goal is not more messages. The goal is the right next action, with enough control to avoid awkward, repetitive follow-up.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {rules.map((rule, index) => {
            const Icon = rule.icon;
            return (
              <Reveal key={rule.title} delay={index * 0.045}>
                <div className="h-full rounded-[24px] border border-[#DDD4C8] bg-[#FCFBF8] p-6 sm:p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[#1E2B29] text-[#F4D5BF]"><Icon size={17} /></span>
                  <h3 className="mt-8 max-w-[330px] text-[28px] font-medium leading-[1.02] tracking-[-0.045em] text-[#282A27]" style={{ fontFamily: DISPLAY }}>{rule.title}</h3>
                  <p className="mt-5 max-w-[340px] text-[13px] leading-[1.7] text-[#696761]">{rule.copy}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-5 overflow-hidden rounded-[24px] border border-[#D7CDC0] bg-[#1E2B29] text-white">
          <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
            <div className="border-b border-white/10 p-7 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#DDA34B]">Example rule</div>
              <div className="mt-4 text-[31px] font-medium leading-[1.04] tracking-[-0.045em] sm:text-[36px]" style={{ fontFamily: DISPLAY }}>A reply should change what happens next.</div>
              <p className="mt-4 max-w-[390px] text-[13px] leading-[1.7] text-white/52">Keep human judgement where it matters. Automation removes remembering, not responsibility.</p>
            </div>
            <div className="grid gap-0 sm:grid-cols-3">
              {([
                ["Trigger", "Message received", MessageSquareText],
                ["Action", "Create team task", UserRoundCheck],
                ["State", "Follow-up paused", Pause],
              ] as const).map(([label, value, Icon], index) => (
                <div key={label as string} className={"p-7 sm:p-6 lg:p-8 " + (index ? "border-t border-white/10 sm:border-l sm:border-t-0" : "")}>
                  <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-white/7 text-[#E1A77F]"><Icon size={15} /></span>
                  <div className="mt-8 text-[8px] font-bold uppercase tracking-[0.14em] text-white/30">{label as string}</div>
                  <div className="mt-2 text-[13px] font-semibold text-white/84">{value as string}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FitAroundTools() {
  const nodes = [
    { eyebrow: "Your quoting process", title: "Quote or estimate sent", copy: "Keep the system that already handles the operational work.", icon: FileText, tone: "#C96F55" },
    { eyebrow: "Zapla", title: "Customer + quote state", copy: "Use Zapla records directly or supported API/webhook events where available.", icon: Link2, tone: "#2563FF" },
    { eyebrow: "Workflow", title: "Timing + next action", copy: "Wait, branch, message, create a task or update the record.", icon: Workflow, tone: "#8A9563" },
    { eyebrow: "Your team", title: "Conversation stays visible", copy: "Pick up the customer with the history and next step in front of you.", icon: MessageSquareText, tone: "#A76F54" },
  ] as const;

  return (
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div className="max-w-[760px]">
            <Eyebrow>Keep what already works</Eyebrow>
            <h2 className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[68px]" style={{ fontFamily: DISPLAY }}>
              Zapla does not need to become
              <span className="block text-[#2563FF]">your estimating software.</span>
            </h2>
          </div>
          <p className="max-w-[540px] text-[15px] leading-[1.72] text-[#656B66] sm:text-[16px] lg:justify-self-end">
            If a specialist system already handles parts, labour, job cards, estimates or compliance well, keep it. The stronger Zapla role is making sure the customer follow-through around that work stays connected.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-3 lg:grid-cols-4">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <Reveal key={node.title} delay={index * 0.045}>
                <div className="relative h-full rounded-[22px] border border-[#E3E0DA] bg-white p-6 shadow-[0_12px_30px_rgba(37,43,39,.035)]">
                  {index < nodes.length - 1 ? <ArrowRight size={15} className="absolute -right-[10px] top-[34px] z-20 hidden text-[#AEB3AE] lg:block" /> : null}
                  <span className="grid h-10 w-10 place-items-center rounded-[12px]" style={{ backgroundColor: node.tone + "18", color: node.tone }}><Icon size={16} /></span>
                  <div className="mt-7 text-[8px] font-bold uppercase tracking-[0.14em]" style={{ color: node.tone }}>{node.eyebrow}</div>
                  <h3 className="mt-2 text-[24px] font-medium leading-[1.03] tracking-[-0.04em] text-[#282E29]" style={{ fontFamily: DISPLAY }}>{node.title}</h3>
                  <p className="mt-4 text-[12px] leading-[1.68] text-[#6B716C]">{node.copy}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-5 rounded-[18px] border border-[#E5E0D9] bg-[#F8F7F3] px-5 py-4 text-[11px] leading-[1.65] text-[#6A706B] sm:px-6">
          Exact connection options depend on the systems and APIs involved. Guided Launch is where we map what can stay, what should connect, and what Zapla should own.
        </Reveal>
      </div>
    </section>
  );
}

function CustomerContext() {
  return (
    <section className="relative overflow-hidden bg-[#DDE4CF] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <Reveal className="max-w-[590px]">
          <Eyebrow>Not a disconnected reminder</Eyebrow>
          <h2 className="mt-4 text-[46px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[60px] lg:text-[70px]" style={{ fontFamily: DISPLAY }}>
            The quote is one part of
            <span className="block text-[#657148]">the customer story.</span>
          </h2>
          <p className="mt-5 max-w-[560px] text-[15px] leading-[1.72] text-[#56614E] sm:text-[16px]">
            When your team steps in, they should not have to reconstruct the relationship from an inbox, a spreadsheet and someone&apos;s memory.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              ["Quote", "A$8,650 · sent 5 days ago"],
              ["Last message", "Warranty question · today"],
              ["Owner", "Sam · sales"],
              ["Next action", "Reply before 2:00 PM"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[16px] border border-[#C8D2B8] bg-white/45 px-4 py-4">
                <div className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#76806A]">{label}</div>
                <div className="mt-1.5 text-[10px] font-semibold text-[#354032]">{value}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.05}><ConversationPanel /></Reveal>
      </div>
    </section>
  );
}

function ConversationPanel() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#BCC9AA] bg-[#FCFCFA] shadow-[0_28px_64px_rgba(57,70,48,.12)]">
      <div className="flex items-center justify-between border-b border-[#DDE3D5] px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1E2B29] text-white"><ZaplaPetal size={20} /></span>
          <div><div className="text-[11px] font-semibold text-[#2B332C]">Daniel Brooks</div><div className="mt-0.5 text-[8px] text-[#8B928A]">Quote · A$8,650</div></div>
        </div>
        <span className="rounded-full bg-[#E7EAD9] px-3 py-1.5 text-[8px] font-bold text-[#687147]">Needs team reply</span>
      </div>
      <div className="grid lg:grid-cols-[1.3fr_.7fr]">
        <div className="border-b border-[#E4E7DF] p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#90978F]">Conversation</div>
          <div className="mt-6 space-y-4">
            <div className="max-w-[78%] rounded-[15px] rounded-bl-[4px] bg-[#F0F1EC] px-4 py-3 text-[10px] leading-[1.58] text-[#4E574F]">
              Hi Daniel, just checking whether there&apos;s anything you need from us before you decide on the outdoor renovation quote.
            </div>
            <div className="ml-auto max-w-[78%] rounded-[15px] rounded-br-[4px] bg-[#1E2B29] px-4 py-3 text-[10px] leading-[1.58] text-white/86">
              Can you confirm how long the workmanship warranty is?
            </div>
          </div>
          <div className="mt-7 flex items-center gap-3 rounded-[14px] border border-[#DFE3DA] bg-[#FAFBF8] p-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-[#E7EAD9] text-[#687147]"><UserRoundCheck size={14} /></span>
            <div><div className="text-[9px] font-semibold text-[#354038]">Team task created</div><div className="mt-1 text-[7px] text-[#8A918A]">Reply to Daniel · due today</div></div>
          </div>
        </div>
        <div className="bg-[#F8F9F5] p-5 sm:p-6">
          <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#90978F]">Context</div>
          <div className="mt-5 space-y-3">
            {[["Quote status", "Sent"], ["Outstanding", "5 days"], ["Follow-up", "Paused"], ["Owner", "Sam"]].map(([label, value]) => (
              <div key={label} className="border-b border-[#E1E5DC] pb-3">
                <div className="text-[7px] text-[#929991]">{label}</div>
                <div className="mt-1 text-[10px] font-semibold text-[#344036]">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BestFit() {
  const good = ["Roofing and renovation", "Solar and HVAC replacement", "Landscaping and larger trade work", "Other considered, quote-led services"];
  const weaker = ["Emergency jobs decided immediately", "Small routine repairs with no real decision window", "Work where your existing system already handles follow-up perfectly"];

  return (
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="mx-auto max-w-[830px] text-center">
          <Eyebrow>Where this earns its keep</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.97] tracking-[-0.053em] sm:text-[56px] lg:text-[64px]" style={{ fontFamily: DISPLAY }}>
            Not every business needs quote follow-up automation.
          </h2>
          <p className="mx-auto mt-5 max-w-[690px] text-[15px] leading-[1.72] text-[#666C67] sm:text-[16px]">
            It is most useful when quoting takes real time, the jobs are worth following through, and customers normally have a genuine decision period.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[26px] border border-[#D2DAC8] bg-[#EFF3E8] p-7 sm:p-8">
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#6F7955] text-white"><CheckCircle2 size={17} /></span><div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#667047]">Strong fit</div></div>
              <div className="mt-7 space-y-3">{good.map((item) => <FitRow key={item} text={item} positive />)}</div>
            </div>
          </Reveal>
          <Reveal delay={0.04}>
            <div className="h-full rounded-[26px] border border-[#E3D7CE] bg-[#F8F2ED] p-7 sm:p-8">
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#A56F59] text-white"><Pause size={17} /></span><div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#98614B]">Probably not the priority</div></div>
              <div className="mt-7 space-y-3">{weaker.map((item) => <FitRow key={item} text={item} />)}</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FitRow({ text, positive = false }: { text: string; positive?: boolean }) {
  return (
    <div className="flex items-start gap-3 rounded-[14px] border border-black/[0.055] bg-white/55 px-4 py-3.5">
      <span className={"mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] " + (positive ? "bg-[#6F7955] text-white" : "bg-[#A56F59] text-white")}>{positive ? "✓" : "–"}</span>
      <div className="text-[12px] font-medium leading-[1.55] text-[#414740]">{text}</div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-[#F0ECE5] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[54px]" style={{ fontFamily: DISPLAY }}>Before you automate another message.</h2>
          <p className="mt-5 max-w-[360px] text-[14px] leading-[1.7] text-[#6A665F] sm:text-[15px]">
            The right setup depends on how you quote, how long customers usually decide, and what your existing systems already do well.
          </p>
        </Reveal>
        <Reveal delay={0.04}>
          <div className="border-t border-[#D9D2C8]">
            {FAQS.map((item, index) => {
              const isOpen = open === index;
              return (
                <div key={item.q} className="border-b border-[#D9D2C8]">
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563FF]/45 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F0ECE5] sm:py-6">
                    <span className="text-[15px] font-semibold leading-[1.45] text-[#32342F] sm:text-[16px]">{item.q}</span>
                    <ChevronDown size={17} className={"shrink-0 text-[#858079] transition-transform " + (isOpen ? "rotate-180" : "")} />
                  </button>
                  <div className={"grid transition-[grid-template-rows,opacity] duration-200 " + (isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <div className="overflow-hidden"><p className="max-w-[760px] pb-6 pr-10 text-[13.5px] leading-[1.75] text-[#69665F] sm:text-[14px]">{item.a}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-[#1E2B29] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <Reveal className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
        <div className="max-w-[780px]">
          <Eyebrow dark>Quote Follow-Up</Eyebrow>
          <h2 className="mt-4 text-[48px] font-medium leading-[0.94] tracking-[-0.058em] sm:text-[64px] lg:text-[74px]" style={{ fontFamily: DISPLAY }}>
            Find the quotes that still need
            <span className="block text-[#F0B48A]">a real next step.</span>
          </h2>
        </div>
        <div className="lg:justify-self-end">
          <p className="max-w-[470px] text-[15px] leading-[1.68] text-white/58 sm:text-[16px]">
            Book a call and we&apos;ll map how quotes are sent today, where follow-up becomes unreliable, and what Zapla should automate versus leave with your team.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <PrimaryButton light />
            <a href={PRICING_URL} className="inline-flex h-[52px] items-center rounded-full border border-white/18 px-7 text-[13px] font-semibold text-white transition-colors hover:border-white/32">View pricing</a>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-[10px] font-medium text-white/38">
            <a href="/follow-up" className="transition-colors hover:text-white/70">Follow-Up</a>
            <a href="/crm" className="transition-colors hover:text-white/70">CRM</a>
            <a href="/reactivation" className="transition-colors hover:text-white/70">Reopen</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
