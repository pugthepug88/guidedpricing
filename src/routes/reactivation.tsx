import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Database,
  MessageSquare,
  Send,
  UserRound,
} from "lucide-react";

export const Route = createFileRoute("/reactivation")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Customer & Lead Reactivation for Service Businesses | Zapla" },
      {
        name: "description",
        content:
          "Zapla helps service businesses reactivate dormant enquiries, old quotes and past customers with targeted outreach that stops on reply and routes interest back to the team.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ReactivationPage,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;

const FAQS = [
  {
    q: "How is Reactivation different from Follow-Up?",
    a: "Follow-Up keeps active opportunities moving while they are still live. Reactivation goes back to older enquiries, stale quotes and past customers that have already gone quiet, then gives them a fresh reason to re-engage.",
  },
  {
    q: "Does Zapla message my whole database?",
    a: "No. Reactivation should start with an agreed audience. You can exclude active opportunities, recent contacts, unsubscribed contacts, people who have already replied and anyone outside the segment you want to reach.",
  },
  {
    q: "What happens when someone replies?",
    a: "The outreach can stop automatically and the conversation can route back to your team with the existing customer history still attached.",
  },
  {
    q: "Do we need to build the campaign ourselves?",
    a: "Not necessarily. Growth gives you the reactivation capability for ongoing use. If you want Zapla to build and launch the campaign for you, Ghost to Gold is the optional done-for-you path.",
  },
  {
    q: "Which Zapla plan includes Reactivation?",
    a: "Reactivation is included in Growth. Growth is currently A$699 per month plus GST, with Guided Launch from A$2,997 plus GST.",
  },
  {
    q: "What is Ghost to Gold?",
    a: "Ghost to Gold is a one-off reactivation service. Sprint starts from A$997 plus GST and covers campaign build and launch. Managed starts from A$1,497 plus GST and also includes campaign monitoring and handoff of interested customers to your team.",
  },
] as const;

const SCENARIOS = [
  {
    tab: "Old enquiry",
    dormant: "Web enquiry",
    age: "Quiet for 7 months",
    reason: "A relevant reason to restart the conversation",
    message: "Still looking to get this sorted?",
    reply: "Yes. What are the next steps?",
    owner: "Sales",
  },
  {
    tab: "Stale quote",
    dormant: "Quote sent",
    age: "No activity for 5 months",
    reason: "A reason to revisit an older quote",
    message: "Want us to update that quote?",
    reply: "Yes, please send me the latest pricing.",
    owner: "Sales",
  },
  {
    tab: "Past customer",
    dormant: "Previous customer",
    age: "No contact for 14 months",
    reason: "A useful reason to come back",
    message: "Need a hand with this again?",
    reply: "Actually yes. Can someone call me today?",
    owner: "Inbox",
  },
] as const;

function ReactivationPage() {
  return (
    <main
      className="min-h-screen bg-[#FCFCFA] text-[#111318] antialiased"
      style={{ fontFamily: BODY }}
    >
      <Hero />
      <DormantRevenue />
      <Mechanism />
      <ControlledAudience />
      <ScenarioSection />
      <ConnectedHistory />
      <CommercialPaths />
      <Faq />
      <FinalCta />
    </main>
  );
}

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
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

function Eyebrow({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={
        "text-[10px] font-semibold uppercase tracking-[0.2em] " +
        (dark ? "text-[#DDA34B]" : "text-[#C96F55]")
      }
    >
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F6F0E8] px-5 pb-20 pt-[116px] sm:px-10 sm:pb-24 sm:pt-[126px] lg:px-16 lg:pb-28 lg:pt-[138px]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#111318]/8" />

      <div className="relative mx-auto grid max-w-[1420px] items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        <Reveal className="max-w-[650px]">
          <Eyebrow>Reactivation</Eyebrow>

          <h1
            className="mt-4 text-[50px] font-medium leading-[0.92] tracking-[-0.062em] sm:text-[68px] lg:text-[82px]"
            style={{ fontFamily: DISPLAY }}
          >
            New revenue doesn't always need a new lead.
            <span className="mt-2 block text-[#C96F55]">
              Sometimes it's already sitting in your database.
            </span>
          </h1>

          <p className="mt-6 max-w-[610px] text-[16px] leading-[1.72] text-[#626762] sm:text-[18px]">
            Zapla reactivates dormant enquiries, older quotes and past
            customers with targeted outreach that stops when they reply and
            brings the conversation back to your team.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BOOK_URL}
              className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px"
            >
              Book a Call <ArrowRight size={15} />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex h-[50px] items-center rounded-[10px] border border-[#CBC2B7] bg-[#FBFAF7] px-6 text-[13px] font-semibold text-[#111318]"
            >
              See how it works
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-semibold text-[#555B56] sm:text-[12px]">
            {["Dormant enquiries", "Older quotes", "Past customers"].map(
              (item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#DDA34B]" />
                  {item}
                </span>
              ),
            )}
          </div>
        </Reveal>

        <Reveal>
          <RecoveryHeroScene />
        </Reveal>
      </div>
    </section>
  );
}

function RecoveryHeroScene() {
  const reduced = !!useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-[26px] bg-[#1E2B29] p-4 text-[#F7F4EE] shadow-[0_28px_78px_rgba(57,45,32,.18)] sm:p-5 lg:p-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#DDA34B]">
            Zapla
          </div>
          <div className="mt-1 text-[18px] font-semibold tracking-[-0.025em]">
            Reactivation
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/64">
          <span className="h-1.5 w-1.5 rounded-full bg-[#99A36D]" />
          Campaign ready
        </div>
      </div>

      <div className="grid gap-4 pt-5 lg:grid-cols-[1fr_0.72fr]">
        <div className="rounded-[20px] border border-white/10 bg-white/[0.035] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/44">
              Dormant opportunities
            </span>
            <span className="text-[9px] font-semibold text-white/38">
              Existing records
            </span>
          </div>

          <div className="grid gap-2.5">
            <DormantRow
              title="Web enquiry"
              detail="Quiet for 7 months"
              state="Waiting"
            />
            <motion.div
              initial={reduced ? false : { opacity: 0.58 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.18 }}
            >
              <DormantRow
                title="Quote sent"
                detail="No activity for 5 months"
                state="Selected"
                active
              />
            </motion.div>
            <DormantRow
              title="Previous customer"
              detail="No contact for 14 months"
              state="Waiting"
            />
          </div>
        </div>

        <div className="grid gap-3">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: reduced ? 0 : 0.42, delay: reduced ? 0 : 0.34, ease: EASE }}
            className="rounded-[18px] bg-[#F2CDBD] p-4 text-[#262A26]"
          >
            <div className="flex items-center gap-2">
              <Send size={14} className="text-[#9B6758]" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#9B6758]">
                Reactivation message
              </span>
            </div>
            <p className="mt-3 text-[13px] font-semibold leading-[1.48]">
              Want us to update that quote?
            </p>
            <div className="mt-3 text-[9px] font-semibold text-[#8F776F]">
              Sent to selected contact
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: reduced ? 0 : 0.42, delay: reduced ? 0 : 0.58, ease: EASE }}
            className="rounded-[18px] bg-[#F7F4EE] p-4 text-[#242824]"
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={14} className="text-[#6C7746]" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#6C7746]">
                Reply received
              </span>
            </div>
            <p className="mt-3 text-[13px] font-semibold leading-[1.48]">
              Yes, please send me the latest pricing.
            </p>
            <div className="mt-3 grid gap-2 border-t border-[#D9D5CB] pt-3">
              <OutcomePill>Outreach stopped</OutcomePill>
              <OutcomePill>Routed to your team</OutcomePill>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-[16px] border border-white/10 bg-white/[0.035] px-4 py-3">
        <Database size={15} className="text-[#DDA34B]" />
        <span className="text-[11px] leading-[1.45] text-white/62">
          Same customer record. Old context stays attached.
        </span>
      </div>
    </div>
  );
}

function DormantRow({
  title,
  detail,
  state,
  active = false,
}: {
  title: string;
  detail: string;
  state: string;
  active?: boolean;
}) {
  return (
    <div
      className={
        "flex items-center gap-3 rounded-[14px] border px-3 py-3 " +
        (active
          ? "border-[#DDA34B]/45 bg-[#DDA34B]/10"
          : "border-white/[0.08] bg-white/[0.025]")
      }
    >
      <span
        className={
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full " +
          (active
            ? "bg-[#DDA34B] text-[#1E2B29]"
            : "bg-white/[0.06] text-white/46")
        }
      >
        <UserRound size={15} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[11.5px] font-semibold text-white/88">
          {title}
        </div>
        <div className="mt-0.5 truncate text-[9.5px] text-white/42">
          {detail}
        </div>
      </div>
      <span
        className={
          "shrink-0 rounded-full px-2 py-1 text-[8.5px] font-semibold uppercase tracking-[0.08em] " +
          (active
            ? "bg-[#DDA34B]/18 text-[#EAC27E]"
            : "bg-white/[0.05] text-white/36")
        }
      >
        {state}
      </span>
    </div>
  );
}

function OutcomePill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#99A36D]/14 px-2.5 py-1 text-[9px] font-semibold text-[#667044]">
      <Check size={10} strokeWidth={2.5} />
      {children}
    </span>
  );
}

function DormantRevenue() {
  const moments = [
    {
      tag: "OLD ENQUIRIES",
      title: "They asked. Then life happened.",
      copy: "The enquiry was real. The timing was not. Months later, nobody has tried again.",
    },
    {
      tag: "STALE QUOTES",
      title: "You sent it. Nobody reopened it.",
      copy: "It is no longer an active quote chase. It is an older opportunity sitting untouched.",
    },
    {
      tag: "PAST CUSTOMERS",
      title: "They bought once. Nobody invited them back.",
      copy: "The relationship already exists. The next conversation simply never started.",
    },
  ];

  return (
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>Where revenue goes quiet</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.056em] sm:text-[56px] lg:text-[68px]"
            style={{ fontFamily: DISPLAY }}
          >
            Some opportunities don't disappear.
            <span className="block text-[#C96F55]">
              They just stop moving.
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 border-y border-[#DADBD6] lg:grid lg:grid-cols-3">
          {moments.map((moment, index) => (
            <Reveal
              key={moment.tag}
              className={
                index === 0
                  ? ""
                  : "border-t border-[#DADBD6] lg:border-l lg:border-t-0"
              }
            >
              <article className="min-h-[280px] px-1 py-8 sm:px-3 sm:py-10 lg:px-8 lg:py-12">
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8A6B5E]">
                  {moment.tag}
                </div>
                <h3
                  className="mt-6 max-w-[340px] text-[30px] font-medium leading-[1.02] tracking-[-0.045em]"
                  style={{ fontFamily: DISPLAY }}
                >
                  {moment.title}
                </h3>
                <p className="mt-5 max-w-[350px] text-[13.5px] leading-[1.7] text-[#656962]">
                  {moment.copy}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mechanism() {
  const steps = [
    {
      n: "01",
      word: "FIND",
      title: "Choose the dormant audience worth revisiting.",
      copy: "Start with the records you already own and define who is actually eligible for this campaign.",
    },
    {
      n: "02",
      word: "REASON",
      title: "Give them a reason to restart the conversation.",
      copy: "Not another empty check-in. The message should make sense for that audience and that moment.",
    },
    {
      n: "03",
      word: "REOPEN",
      title: "When interest returns, hand it back to your team.",
      copy: "A reply can stop the outreach and reopen the existing conversation with the context still attached.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-[#1E2B29] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow dark>How it works</Eyebrow>
          <h2
            className="mt-4 text-[46px] font-medium leading-[0.94] tracking-[-0.057em] sm:text-[62px] lg:text-[76px]"
            style={{ fontFamily: DISPLAY }}
          >
            FIND.
            <span className="text-[#DDA34B]"> REASON.</span>
            <span className="block">REOPEN.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.n}>
              <div
                className={
                  "h-full min-h-[300px] rounded-[22px] border p-6 sm:p-7 " +
                  (index === 1
                    ? "border-[#DDA34B]/28 bg-[#DDA34B]/[0.07]"
                    : "border-white/10 bg-white/[0.035]")
                }
              >
                <div className="text-[10px] font-semibold tracking-[0.18em] text-white/35">
                  {step.n}
                </div>
                <div
                  className={
                    "mt-8 text-[38px] font-medium tracking-[-0.05em] " +
                    (index === 1 ? "text-[#DDA34B]" : "text-white")
                  }
                  style={{ fontFamily: DISPLAY }}
                >
                  {step.word}
                </div>
                <h3 className="mt-5 max-w-[330px] text-[18px] font-semibold leading-[1.35] text-white/88">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[350px] text-[13px] leading-[1.7] text-white/52">
                  {step.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ControlledAudience() {
  const rows = [
    ["Dormant enquiry", "No open opportunity", "INCLUDE", true],
    ["Active opportunity", "Team is already working it", "EXCLUDE", false],
    ["Already replied", "Conversation is open again", "EXCLUDE", false],
    ["Unsubscribed", "Do not contact", "EXCLUDE", false],
  ] as const;

  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="max-w-[590px]">
          <Eyebrow>Controlled reactivation</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[56px] lg:text-[66px]"
            style={{ fontFamily: DISPLAY }}
          >
            Not another database blast.
          </h2>
          <p className="mt-5 max-w-[560px] text-[15px] leading-[1.75] text-[#626762] sm:text-[16px]">
            The goal is not to message everyone because their name happens to
            exist in a CRM. Pick the right audience, exclude the people who
            should not be touched, release outreach deliberately, and stop when
            the conversation becomes active again.
          </p>

          <div className="mt-8 grid gap-3 text-[12px] font-semibold text-[#4E544F] sm:grid-cols-2">
            {[
              "Audience rules",
              "Controlled batches",
              "Stop on reply",
              "Human handoff",
            ].map((item) => (
              <span key={item} className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#99A36D]/18 text-[#667044]">
                  <Check size={13} strokeWidth={2.5} />
                </span>
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="overflow-hidden rounded-[24px] border border-[#D8D2C7] bg-[#FCFCFA] shadow-[0_24px_70px_rgba(57,45,32,.09)]">
            <div className="flex items-center justify-between border-b border-[#E4DED4] bg-[#EFE7DA] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#1E2B29] text-[#F7F4EE]">
                  <Database size={16} />
                </span>
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#94786A]">
                    Audience review
                  </div>
                  <div className="mt-0.5 text-[15px] font-semibold text-[#282C28]">
                    Who should this campaign reach?
                  </div>
                </div>
              </div>
              <span className="hidden rounded-full bg-white px-3 py-1.5 text-[9px] font-semibold text-[#6B706B] sm:block">
                Before anything sends
              </span>
            </div>

            <div className="p-4 sm:p-5">
              {rows.map(([title, detail, status, include]) => (
                <div
                  key={title}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-[#ECE9E2] px-2 py-4 last:border-b-0"
                >
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-semibold text-[#303430]">
                      {title}
                    </div>
                    <div className="mt-1 text-[10.5px] text-[#8A8E89]">
                      {detail}
                    </div>
                  </div>
                  <span
                    className={
                      "rounded-full px-2.5 py-1 text-[8.5px] font-semibold tracking-[0.08em] " +
                      (include
                        ? "bg-[#99A36D]/18 text-[#657041]"
                        : "bg-[#ECEAE5] text-[#858985]")
                    }
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E4DED4] bg-[#FBF8F2] px-5 py-4 text-[11px] leading-[1.55] text-[#6D726D] sm:px-6">
              Your rules decide who is eligible before the campaign starts.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ScenarioSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SCENARIOS[activeIndex];
  const reduced = !!useReducedMotion();

  return (
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>Three common reactivation moments</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[56px] lg:text-[66px]"
            style={{ fontFamily: DISPLAY }}
          >
            Same capability.
            <span className="block text-[#C96F55]">
              Different reason to come back.
            </span>
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {SCENARIOS.map((scenario, index) => (
            <button
              key={scenario.tab}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={
                "rounded-full px-4 py-2.5 text-[11px] font-semibold transition " +
                (activeIndex === index
                  ? "bg-[#1E2B29] text-[#F7F4EE]"
                  : "border border-[#D7D9D4] bg-white text-[#555B56] hover:border-[#1E2B29]/25")
              }
            >
              {scenario.tab}
            </button>
          ))}
        </div>

        <div className="mt-5 overflow-hidden rounded-[26px] border border-[#DFDED8] bg-[#F7F4EE] p-5 sm:p-7 lg:p-8">
          <motion.div
            key={active.tab}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.34, ease: EASE }}
            className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr]"
          >
            <div className="rounded-[20px] bg-[#1E2B29] p-5 text-[#F7F4EE] sm:p-6">
              <div className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#DDA34B]">
                Dormant record
              </div>
              <h3
                className="mt-4 text-[34px] font-medium leading-[1] tracking-[-0.048em]"
                style={{ fontFamily: DISPLAY }}
              >
                {active.dormant}
              </h3>
              <p className="mt-2 text-[12px] text-white/46">{active.age}</p>

              <div className="mt-8 border-t border-white/10 pt-5">
                <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/36">
                  Reason to re-engage
                </div>
                <p className="mt-2 max-w-[360px] text-[13px] leading-[1.6] text-white/72">
                  {active.reason}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[20px] bg-[#F2CDBD] p-5 text-[#292C29] sm:p-6">
                <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#9B6758]">
                  <Send size={13} />
                  Outreach
                </div>
                <div className="mt-6 rounded-[15px] bg-white/60 px-4 py-3 text-[13px] font-semibold leading-[1.5]">
                  {active.message}
                </div>
                <p className="mt-4 text-[11px] leading-[1.55] text-[#826F68]">
                  The wording changes with the audience. The point is the
                  reason, not a generic check-in.
                </p>
              </div>

              <div className="rounded-[20px] bg-[#E7E4D4] p-5 text-[#292C29] sm:p-6">
                <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#667044]">
                  <MessageSquare size={13} />
                  Response
                </div>
                <div className="mt-6 rounded-[15px] bg-white/70 px-4 py-3 text-[13px] font-semibold leading-[1.5]">
                  {active.reply}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#99A36D]/18 px-2.5 py-1 text-[9px] font-semibold text-[#667044]">
                    Outreach stopped
                  </span>
                  <span className="rounded-full bg-[#1E2B29]/8 px-2.5 py-1 text-[9px] font-semibold text-[#4E5550]">
                    Routed to {active.owner}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ConnectedHistory() {
  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1220px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
        <Reveal className="max-w-[560px]">
          <Eyebrow>The old context stays useful</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[64px]"
            style={{ fontFamily: DISPLAY }}
          >
            A reply does not become a brand-new lead.
          </h2>
          <p className="mt-5 max-w-[540px] text-[15px] leading-[1.75] text-[#626762]">
            The old enquiry, quote, notes and messages stay tied to the same
            customer record, so your team can see what happened before and pick
            up from there instead of starting cold.
          </p>
        </Reveal>

        <Reveal>
          <div className="overflow-hidden rounded-[24px] border border-[#D8D2C7] bg-white shadow-[0_24px_70px_rgba(57,45,32,.08)]">
            <div className="flex items-center gap-3 border-b border-[#E7E2D8] bg-[#EFE7DA] px-5 py-4 sm:px-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E2B29] text-[#F7F4EE]">
                <UserRound size={16} />
              </span>
              <div>
                <div className="text-[13px] font-semibold text-[#2C302C]">
                  Existing customer record
                </div>
                <div className="mt-0.5 text-[10px] text-[#898B86]">
                  History before reactivation
                </div>
              </div>
            </div>

            <div className="grid gap-0 sm:grid-cols-[0.85fr_1.15fr]">
              <div className="border-b border-[#ECE9E2] p-5 sm:border-b-0 sm:border-r sm:p-6">
                {[
                  ["Original enquiry", "12 Feb"],
                  ["Quote sent", "14 Feb"],
                  ["Last note", "No response"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border-b border-[#F0EEE9] py-3 text-[11px] last:border-b-0"
                  >
                    <span className="text-[#7A7E79]">{label}</span>
                    <span className="font-semibold text-[#373B37]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-5 sm:p-6">
                <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#6C7746]">
                  New reply
                </div>
                <div className="mt-3 rounded-[15px] bg-[#E7E4D4] px-4 py-3 text-[12.5px] font-semibold leading-[1.5] text-[#303430]">
                  Yes, send me the latest pricing.
                </div>
                <div className="mt-4 flex items-center gap-2.5 text-[10.5px] font-semibold text-[#5D645E]">
                  <span className="h-2 w-2 rounded-full bg-[#99A36D]" />
                  Conversation reopened on the same record
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CommercialPaths() {
  return (
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1220px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>Two ways to use it</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[56px] lg:text-[66px]"
            style={{ fontFamily: DISPLAY }}
          >
            Run reactivation yourself.
            <span className="block text-[#C96F55]">
              Or hand us the first campaign.
            </span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full min-h-[390px] flex-col rounded-[24px] bg-[#F1EADF] p-6 sm:p-8">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8C7164]">
                Growth
              </div>
              <h3
                className="mt-5 text-[34px] font-medium leading-[1] tracking-[-0.047em]"
                style={{ fontFamily: DISPLAY }}
              >
                Ongoing reactivation inside Zapla.
              </h3>
              <p className="mt-4 max-w-[490px] text-[13.5px] leading-[1.7] text-[#656962]">
                Build audiences, run targeted reactivation and keep using the
                capability whenever the business needs it.
              </p>

              <div className="mt-8 border-t border-[#D6CCBF] pt-6">
                <div className="text-[30px] font-semibold tracking-[-0.04em] text-[#1E2B29]">
                  A$699
                  <span className="ml-1 text-[12px] font-medium tracking-normal text-[#6B706B]">
                    /mo + GST
                  </span>
                </div>
                <div className="mt-1 text-[11px] text-[#7A7F79]">
                  Guided Launch from A$2,997 + GST
                </div>
              </div>

              <a
                href={PRICING_URL}
                className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-[12.5px] font-semibold text-[#1E2B29]"
              >
                View Growth <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex h-full min-h-[390px] flex-col rounded-[24px] bg-[#1E2B29] p-6 text-[#F7F4EE] sm:p-8">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#DDA34B]">
                Ghost to Gold
              </div>
              <h3
                className="mt-5 text-[34px] font-medium leading-[1] tracking-[-0.047em]"
                style={{ fontFamily: DISPLAY }}
              >
                Want us to run the first one?
              </h3>
              <p className="mt-4 max-w-[500px] text-[13.5px] leading-[1.7] text-white/56">
                Ghost to Gold is the done-for-you reactivation path. Zapla can
                build and launch the campaign, or manage the response flow as
                well.
              </p>

              <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/36">
                    Sprint
                  </div>
                  <div className="mt-2 text-[22px] font-semibold">
                    From A$997
                  </div>
                  <div className="mt-1 text-[10px] text-white/42">
                    + GST
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/36">
                    Managed
                  </div>
                  <div className="mt-2 text-[22px] font-semibold">
                    From A$1,497
                  </div>
                  <div className="mt-1 text-[10px] text-white/42">
                    + GST
                  </div>
                </div>
              </div>

              <a
                href={BOOK_URL}
                className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-[12.5px] font-semibold text-[#F7F4EE]"
              >
                Ask about Ghost to Gold <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[980px]">
        <Reveal className="max-w-[720px]">
          <Eyebrow>FAQ</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[54px]"
            style={{ fontFamily: DISPLAY }}
          >
            The obvious questions before you wake the database up.
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-[#D9D4CA] border-y border-[#D9D4CA]">
          {FAQS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="text-[14px] font-semibold text-[#2E322E] sm:text-[15px]">
          {q}
        </span>
        <ChevronDown
          size={17}
          className={
            "shrink-0 text-[#6D726D] transition-transform " +
            (open ? "rotate-180" : "")
          }
        />
      </button>

      {open && (
        <div className="max-w-[800px] pb-5 pr-10 text-[13.5px] leading-[1.75] text-[#656A65]">
          {a}
        </div>
      )}
    </div>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#1E2B29] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#DDA34B]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1100px] text-center">
        <Reveal>
          <Eyebrow dark>Reactivate what is already there</Eyebrow>
          <h2
            className="mx-auto mt-5 max-w-[900px] text-[44px] font-medium leading-[0.94] tracking-[-0.057em] sm:text-[60px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            Before you buy another lead,
            <span className="block text-[#DDA34B]">
              see what you already have.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-[650px] text-[15px] leading-[1.75] text-white/56">
            We can help you work out which dormant opportunities are worth
            revisiting and the cleanest way to bring them back into
            conversation.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={BOOK_URL}
              className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#F7F4EE] px-6 text-[13px] font-semibold text-[#1E2B29] transition-transform hover:-translate-y-px"
            >
              Book a Call <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
