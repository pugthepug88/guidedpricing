import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  ExternalLink,
  MessageSquareText,
  ShieldCheck,
  Star,
} from "lucide-react";
import { DominoFooter } from "@/components/DominoFooter";
import { ZaplaPetal } from "@/components/ZaplaPetal";

export const Route = createFileRoute("/reviews")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Reviews & Reputation for Service Businesses | Zapla" },
      {
        name: "description",
        content:
          "Zapla automates review requests after completed work, keeps customer feedback connected to the CRM, and helps service businesses manage reviews and responses.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ReviewsPage,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

const FAQS = [
  {
    q: "Where can customers leave a review?",
    a: "The core review flow is built around your Google Business Profile. Zapla also supports review widgets for your own website. Other destinations depend on the setup you choose.",
  },
  {
    q: "Do we only ask happy customers?",
    a: "No. The review request should be neutral and go to the eligible customers you define, without filtering people based on whether you expect a positive or negative review. The goal is genuine feedback, not review gating.",
  },
  {
    q: "What happens if someone is unhappy?",
    a: "Do not hide it. If a customer replies with a problem or leaves feedback that needs attention, your team can follow up with the customer context in front of them and decide what response should be posted.",
  },
  {
    q: "Can I choose when the review request is sent?",
    a: "Yes. The review workflow can be tied to the point you choose, such as a completed job or payment stage, with the timing and message agreed during setup.",
  },
  {
    q: "Does the review stay connected to the customer?",
    a: "The review workflow sits inside the same customer journey as the job, messages and follow-up, so your team is not managing reputation in a disconnected tool with no context.",
  },
  {
    q: "Which Zapla plans include the Review Engine?",
    a: "The Review Engine is included in Follow-Through and Growth. Follow-Through is currently A$399 per month plus GST, with Guided Launch from A$1,997 plus GST. Growth is A$699 per month plus GST, with Guided Launch from A$2,997 plus GST.",
  },
] as const;

function ReviewsPage() {
  return (
    <main
      className="min-h-screen overflow-hidden bg-white text-[#111318] antialiased"
      style={{ fontFamily: BODY }}
    >
      <Hero />
      <ProblemSection />
      <MechanismSection />
      <TimingSection />
      <FeedbackSection />
      <CustomerRecordSection />
      <CommercialSection />
      <Faq />
      <FinalCta />
      <DominoFooter />
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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={
        "text-[10px] font-semibold uppercase tracking-[0.2em] " +
        (light ? "text-[#E8B75F]" : "text-[#80551C]")
      }
    >
      {children}
    </p>
  );
}

function ExampleAvatar({
  column = 2,
  row = 1,
  className = "h-11 w-11",
}: {
  column?: number;
  row?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={"block shrink-0 overflow-hidden rounded-full border border-white/80 bg-[#E7DED2] " + className}
      style={{
        backgroundImage: `url(${PORTRAIT_SHEET})`,
        backgroundPosition: `${(column / 5) * 100}% ${(row / 3) * 100}%`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
      }}
    />
  );
}

function Stars({ small = false }: { small?: boolean }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label="Five star example review">
      {[0, 1, 2, 3, 4].map((item) => (
        <Star
          key={item}
          size={small ? 12 : 15}
          className="fill-[#DDA34B] text-[#DDA34B]"
          strokeWidth={1.4}
        />
      ))}
    </span>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#DDE5EE] bg-[#F7FAFD] px-5 pb-14 pt-[112px] sm:px-10 sm:pb-20 sm:pt-[124px] lg:px-16 lg:pb-20 lg:pt-[136px]">
      <div className="pointer-events-none absolute right-[-120px] top-[70px] h-[420px] w-[420px] rounded-full bg-[#2563FF]/[0.045] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-180px] left-[18%] h-[360px] w-[360px] rounded-full bg-[#DDA34B]/[0.07] blur-3xl" />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="max-w-[680px]">
            <Eyebrow>Reviews & Reputation</Eyebrow>
            <h1
              className="mt-4 text-[50px] font-medium leading-[0.92] tracking-[-0.06em] sm:text-[68px] lg:text-[84px]"
              style={{ fontFamily: DISPLAY }}
            >
              A good job should keep selling
              <span className="block text-[#A66F20]">after it&apos;s done.</span>
            </h1>
            <p className="mt-6 max-w-[610px] text-[16px] leading-[1.72] text-[#56616D] sm:text-[18px]">
              Zapla asks for a review at the moment you choose, keeps the feedback
              connected to the customer, and turns finished work into proof your
              next customer can actually see.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={BOOK_URL}
                className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDA34B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7FAFD]"
              >
                Book a Call <ArrowRight size={15} />
              </a>
              <a
                href="#review-loop"
                className="inline-flex h-[50px] items-center rounded-[10px] border border-[#CCD7E2] bg-white px-6 text-[13px] font-semibold text-[#111318] shadow-[0_6px_18px_rgba(27,45,64,.04)] transition-colors hover:border-[#9EACBA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDA34B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7FAFD]"
              >
                See how it works
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ReviewHeroScene />
          </Reveal>
        </div>

        <Reveal className="mt-12 border-t border-[#DCE5ED] pt-5 lg:mt-10">
          <div className="grid gap-4 text-[11px] font-semibold text-[#596775] sm:grid-cols-3 sm:text-[12px]">
            {[
              ["01", "Completed work", "The trigger"],
              ["02", "Honest request", "The ask"],
              ["03", "Visible proof", "The outcome"],
            ].map(([number, title, label]) => (
              <div key={number} className="flex items-center gap-3">
                <span className="text-[9px] font-bold tracking-[0.16em] text-[#A66F20]">{number}</span>
                <span>{title}</span>
                <span className="text-[#9AA7B4]">/ {label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ReviewHeroScene() {
  const reduced = !!useReducedMotion();
  const beat = (delay: number) =>
    reduced
      ? { initial: false as const, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.42, delay, ease: EASE },
        };

  return (
    <div className="relative mx-auto min-h-[570px] w-full max-w-[650px] py-5 sm:min-h-[600px] sm:py-8">
      <div className="pointer-events-none absolute left-[12%] top-[12%] h-[72%] w-[70%] rounded-[50%] bg-[#EAF1F8] blur-[44px]" />
      <div className="pointer-events-none absolute right-[2%] top-[2%] h-[120px] w-[120px] rounded-full border border-[#2563FF]/10" />
      <div className="pointer-events-none absolute right-[6%] top-[6%] h-[72px] w-[72px] rounded-full border border-[#DDA34B]/20" />

      <motion.div
        {...beat(0.08)}
        viewport={{ once: true, amount: 0.75 }}
        className="relative z-10 mr-auto max-w-[390px] rounded-[18px] border border-[#D9E2EA] bg-white p-4 shadow-[0_18px_45px_rgba(31,49,68,.09)]"
      >
        <div className="flex items-center gap-3">
          <ExampleAvatar />
          <div className="min-w-0 flex-1">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#7C8995]">Customer record</div>
            <div className="mt-0.5 truncate text-[14px] font-semibold text-[#26313B]">Mia Thompson</div>
          </div>
          <span className="rounded-full bg-[#DCE0CC] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-[#56643E]">
            Completed
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-[#E7EDF2] pt-3 text-[10px] text-[#687581]">
          <span>Hot water repair</span>
          <span>4:12 PM</span>
        </div>
      </motion.div>

      <div className="relative z-10 ml-8 h-9 w-px bg-gradient-to-b from-[#B7C4D0] to-[#DDA34B] sm:ml-14" />

      <motion.div
        {...beat(0.28)}
        viewport={{ once: true, amount: 0.7 }}
        className="relative z-10 ml-auto max-w-[455px] rounded-[20px] bg-[#1E2B29] p-5 text-white shadow-[0_24px_54px_rgba(20,37,35,.16)]"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#E4BE72]">
            <MessageSquareText size={13} />
            Review request · SMS
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-white/55">
            Automated
          </span>
        </div>
        <p className="mt-4 text-[12.5px] font-semibold leading-[1.58] text-white/88">
          Hi Mia, thanks for choosing Northside Plumbing. If you have a minute,
          we&apos;d value an honest Google review about your experience.
        </p>
        <div className="mt-4 inline-flex items-center gap-1.5 text-[9px] font-semibold text-white/48">
          <Clock3 size={11} />
          Sent 2 hours after completion
        </div>
      </motion.div>

      <div className="relative z-10 ml-auto mr-10 h-9 w-px bg-gradient-to-b from-[#DDA34B] to-[#B7C4D0] sm:mr-20" />

      <motion.div
        {...beat(0.5)}
        viewport={{ once: true, amount: 0.7 }}
        className="relative z-10 ml-4 max-w-[485px] rounded-[22px] border border-[#D9E2EA] bg-white p-5 shadow-[0_24px_60px_rgba(31,49,68,.11)] sm:ml-12"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#758390]">Google Business Profile</div>
            <div className="mt-1 text-[14px] font-semibold text-[#252E36]">Example review received</div>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2E3BF] text-[#80551C]">
            <ZaplaPetal size={22} />
          </span>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <ExampleAvatar column={2} row={1} className="h-9 w-9" />
          <div>
            <div className="text-[11px] font-semibold text-[#343A3F]">Mia T.</div>
            <div className="mt-0.5"><Stars small /></div>
          </div>
          <span className="ml-auto text-[8px] font-semibold uppercase tracking-[0.1em] text-[#9AA5AE]">Example</span>
        </div>
        <p className="mt-3 text-[12px] leading-[1.58] text-[#59646D]">
          Great communication. Arrived when they said they would and explained
          the repair clearly.
        </p>
      </motion.div>

      <motion.div
        {...beat(0.68)}
        viewport={{ once: true, amount: 0.7 }}
        className="relative z-10 ml-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-[#D7E0E8] bg-white/90 px-3.5 py-2 text-[9px] font-semibold text-[#56636F] shadow-[0_10px_24px_rgba(31,49,68,.06)]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#99A36D]" />
        Finished work becomes visible proof
        <ExternalLink size={11} className="text-[#A66F20]" />
      </motion.div>
    </div>
  );
}

function ProblemSection() {
  return (
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>What gets missed</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[56px] lg:text-[68px]"
            style={{ fontFamily: DISPLAY }}
          >
            The work gets done.
            <span className="block text-[#B27B2D]">The proof gets left behind.</span>
          </h2>
          <p className="mt-5 max-w-[650px] text-[15px] leading-[1.72] text-[#666B67] sm:text-[16px]">
            Review collection usually fails for boring reasons: nobody asks,
            the ask comes too late, or a review arrives and nobody owns what
            happens next.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <article className="relative min-h-[360px] overflow-hidden rounded-[30px] bg-[#17212B] p-7 text-white sm:p-9">
              <div className="text-[9px] font-semibold uppercase tracking-[0.19em] text-[#DDA34B]">No request</div>
              <h3
                className="mt-12 max-w-[620px] text-[46px] font-medium leading-[0.94] tracking-[-0.058em] text-white sm:text-[60px]"
                style={{ fontFamily: DISPLAY }}
              >
                Happy customer.
                <span className="block text-[#E2B35E]">Nobody asked.</span>
              </h3>
              <p className="mt-7 max-w-[470px] text-[14px] leading-[1.7] text-white/62">
                They pay, leave and get on with their day. Goodwill expires faster
                than your team remembers to send the link.
              </p>
            </article>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.06}>
            <article className="min-h-[360px] rounded-[30px] bg-[#E8EEF4] p-7 sm:p-9">
              <div className="text-[9px] font-semibold uppercase tracking-[0.19em] text-[#667789]">Bad timing</div>
              <div
                className="mt-14 text-[58px] font-medium leading-[0.88] tracking-[-0.07em] text-[#26323D] sm:text-[70px]"
                style={{ fontFamily: DISPLAY }}
              >
                TOO
                <br />
                LATE.
              </div>
              <p className="mt-7 max-w-[350px] text-[14px] leading-[1.68] text-[#5D6A76]">
                A generic request two weeks later feels like admin. The service
                moment is already gone.
              </p>
            </article>
          </Reveal>

          <Reveal className="lg:col-span-12">
            <article className="grid min-h-[260px] overflow-hidden rounded-[30px] bg-[#DCE0CC] text-[#1A2018] sm:grid-cols-[0.82fr_1.18fr]">
              <div className="p-7 sm:p-9">
                <div className="text-[9px] font-semibold uppercase tracking-[0.19em] text-[#667044]">No ownership</div>
                <h3
                  className="mt-8 text-[42px] font-medium leading-[0.95] tracking-[-0.055em] sm:text-[54px]"
                  style={{ fontFamily: DISPLAY }}
                >
                  A review lands.
                  <span className="block text-[#647046]">Then it sits there.</span>
                </h3>
              </div>
              <div className="flex items-center border-t border-[#1A2018]/10 p-7 sm:border-l sm:border-t-0 sm:p-10">
                <p className="max-w-[570px] text-[16px] leading-[1.72] text-[#525B47]">
                  Positive or negative, a customer has said something in public.
                  Someone should know who they are, what happened, and what the
                  business wants to say back.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MechanismSection() {
  const steps = [
    {
      n: "01",
      label: "Finished",
      title: "The job reaches the trigger you chose.",
      copy: "For example: work completed, payment received, or a manual stage your team controls.",
      tone: "#D58C75",
    },
    {
      n: "02",
      label: "Asked",
      title: "Zapla sends one neutral review request.",
      copy: "The message, channel and delay are set around the customer experience, not around expected sentiment.",
      tone: "#DDA34B",
    },
    {
      n: "03",
      label: "Heard",
      title: "A review or reply becomes visible.",
      copy: "Public praise becomes proof. A concern becomes something the team can act on.",
      tone: "#99A36D",
    },
    {
      n: "04",
      label: "Owned",
      title: "Your team decides the response.",
      copy: "The customer context stays close so the reply is grounded in what actually happened.",
      tone: "#E7E0EA",
    },
  ] as const;

  return (
    <section
      id="review-loop"
      className="scroll-mt-20 bg-[#111214] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[980px]">
          <Eyebrow light>The review loop</Eyebrow>
          <h2
            className="mt-4 text-[46px] font-medium leading-[0.94] tracking-[-0.056em] sm:text-[62px] lg:text-[76px]"
            style={{ fontFamily: DISPLAY }}
          >
            The ask should happen because the job finished.
            <span className="block text-[#DDA34B]">Not because someone remembered.</span>
          </h2>
        </Reveal>

        <div className="relative mt-14 grid gap-px overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.08] lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.n} delay={index * 0.07}>
              <div className="relative min-h-[330px] bg-[#161719] p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-white/30">{step.n}</span>
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: step.tone }}
                  />
                </div>
                <div
                  className="mt-10 text-[34px] font-medium tracking-[-0.05em]"
                  style={{ fontFamily: DISPLAY, color: step.tone }}
                >
                  {step.label}
                </div>
                <h3 className="mt-5 max-w-[270px] text-[18px] font-semibold leading-[1.38] text-white/90">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[280px] text-[12.5px] leading-[1.7] text-white/50">
                  {step.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3 rounded-[18px] border border-[#DDA34B]/15 bg-[#DDA34B]/[0.045] px-5 py-4">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#E8C27D]">
            <ShieldCheck size={14} />
            One neutral request
          </span>
          <span className="text-[11px] leading-[1.55] text-white/48">
            No sentiment filtering. No hiding customers you think may be unhappy.
          </span>
        </Reveal>
      </div>
    </section>
  );
}

function TimingSection() {
  return (
    <section className="bg-[#F4F7FA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <Reveal className="max-w-[570px]">
          <Eyebrow>Timing & control</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.056em] sm:text-[58px] lg:text-[68px]"
            style={{ fontFamily: DISPLAY }}
          >
            Ask while the work is
            <span className="block text-[#B27B2D]">still fresh.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-[1.75] text-[#625D57] sm:text-[16px]">
            You choose what starts the review workflow, how long Zapla waits,
            which message goes out and when the workflow should pause. The
            automation handles the remembering. You keep the rules.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <ReviewTimingUi />
        </Reveal>
      </div>
    </section>
  );
}

function ReviewTimingUi() {
  const rows = [
    ["Trigger", "Job marked completed"],
    ["Wait", "2 hours"],
    ["Channel", "SMS"],
    ["Destination", "Google Business Profile"],
  ] as const;

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#D7E0E8] bg-white shadow-[0_24px_60px_rgba(76,55,40,.10)]">
      <div className="flex items-center justify-between border-b border-[#DDE5EC] bg-[#E8EEF4] px-5 py-4 sm:px-6">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#76501C]">Review request workflow</div>
          <div className="mt-1 text-[17px] font-semibold tracking-[-0.025em] text-[#2B2C28]">After the job is finished</div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DCE0CC] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-[#5F6949]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7B8959]" />
          Active
        </span>
      </div>

      <div className="grid sm:grid-cols-[0.86fr_1.14fr]">
        <div className="border-b border-[#E1E8EE] p-5 sm:border-b-0 sm:border-r sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8C8379]">Rules</div>
          <div className="mt-4 divide-y divide-[#E4EAF0] border-y border-[#E4EAF0]">
            {rows.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[0.72fr_1.28fr] gap-3 py-3.5">
                <span className="text-[10px] font-semibold text-[#8B8277]">{label}</span>
                <span className="text-[11px] font-semibold text-[#333530]">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold text-[#68645D]">
            <ShieldCheck size={13} className="text-[#73804E]" />
            Manual pause stays available
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8C8379]">Message preview</div>
          <div className="mt-4 rounded-[18px] bg-[#1E2B29] p-4 text-[#F7F4EE]">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111214]">
                <ZaplaPetal size={23} />
              </span>
              <div>
                <div className="text-[11px] font-semibold">Northside Plumbing</div>
                <div className="mt-0.5 text-[9px] text-white/42">Today · 6:12 PM</div>
              </div>
            </div>
            <p className="mt-4 text-[12.5px] leading-[1.58] text-white/82">
              Hi Mia, thanks for choosing Northside Plumbing. If you have a minute,
              we&apos;d value an honest Google review about your experience.
            </p>
            <div className="mt-4 rounded-[12px] bg-white/[0.07] px-3 py-2.5 text-[10px] font-semibold text-[#E5C47F]">
              Leave a Google review
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedbackSection() {
  return (
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>What happens next</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[56px] lg:text-[68px]"
            style={{ fontFamily: DISPLAY }}
          >
            Good feedback becomes proof.
            <span className="block text-[#BF7458]">Problems become visible too.</span>
          </h2>
          <p className="mt-5 max-w-[700px] text-[15px] leading-[1.72] text-[#666B67] sm:text-[16px]">
            Zapla should not decide who is allowed to review you. The same honest
            ask goes out. What changes is what your team does when the customer
            speaks.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="flex min-h-[430px] flex-col rounded-[30px] bg-[#F0D59D] p-7 sm:p-9">
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#76501C]">Public proof</div>
              <h3
                className="mt-5 max-w-[500px] text-[36px] font-medium leading-[0.98] tracking-[-0.05em] text-[#292922] sm:text-[44px]"
                style={{ fontFamily: DISPLAY }}
              >
                A real review can keep working after the customer leaves.
              </h3>
              <div className="mt-auto pt-8">
                <div className="rounded-[20px] bg-[#FFF9ED] p-5 shadow-[0_16px_38px_rgba(79,57,28,.10)]">
                  <div className="flex items-center gap-3">
                    <ExampleAvatar column={4} row={0} className="h-10 w-10" />
                    <div className="flex-1">
                      <div className="text-[11px] font-semibold text-[#33342F]">Daniel K.</div>
                      <div className="mt-1"><Stars small /></div>
                    </div>
                    <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-[#8A8278]">Example</span>
                  </div>
                  <p className="mt-3 text-[12px] leading-[1.58] text-[#5D605A]">
                    Easy to book, clear communication and the team left everything tidy.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex min-h-[430px] flex-col rounded-[30px] bg-[#E7CEC2] p-7 sm:p-9">
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9A6553]">Needs attention</div>
              <h3
                className="mt-5 max-w-[500px] text-[36px] font-medium leading-[0.98] tracking-[-0.05em] text-[#302926] sm:text-[44px]"
                style={{ fontFamily: DISPLAY }}
              >
                If something went wrong, your team should know.
              </h3>
              <div className="mt-auto pt-8">
                <div className="rounded-[20px] border border-white/60 bg-[#FFF9F5]/80 p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BF7458]/12 text-[#A65E47]">
                      <MessageSquareText size={15} />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9A6B5D]">Customer reply</div>
                      <p className="mt-2 text-[12px] font-semibold leading-[1.5] text-[#403632]">
                        The repair is fine, but I waited longer than expected and wasn&apos;t sure what was happening.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-[#E6D4CA] pt-3">
                    <span className="text-[9px] font-semibold text-[#765F57]">Customer record attached</span>
                    <span className="rounded-full bg-[#BF7458]/12 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-[#9C5D49]">
                      Team reply
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CustomerRecordSection() {
  const timeline = [
    ["17 SEP · 2:10 PM", "Booking completed", "Hot water repair"],
    ["17 SEP · 4:12 PM", "Job marked completed", "Review workflow started"],
    ["17 SEP · 6:12 PM", "Review request sent", "SMS · neutral request"],
    ["17 SEP · 7:04 PM", "Review received", "Google Business Profile"],
    ["18 SEP · 9:16 AM", "Business replied", "Handled by team"],
  ] as const;

  return (
    <section className="bg-[#DCE0CC] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[900px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#667044]">Connected to the CRM</p>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.95] tracking-[-0.057em] text-[#182018] sm:text-[58px] lg:text-[70px]"
            style={{ fontFamily: DISPLAY }}
          >
            Every review has a customer
            <span className="block text-[#5F6B42]">behind it.</span>
          </h2>
          <p className="mt-5 max-w-[680px] text-[15px] leading-[1.72] text-[#535D4C] sm:text-[16px]">
            Reputation is more useful when it is not a separate inbox. Keep the
            job, the messages, the review request and the response in the same
            customer story.
          </p>
        </Reveal>

        <Reveal className="mt-12 overflow-hidden rounded-[32px] border border-[#1E2B29]/10 bg-[#FCFCFA] shadow-[0_28px_70px_rgba(61,70,48,.10)]">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
            <div className="flex min-h-[370px] flex-col justify-between border-b border-[#1E2B29]/10 bg-[#F6F6F0] p-7 sm:p-9 lg:border-b-0 lg:border-r">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6B7168]">Customer</div>
                <div className="mt-5 flex items-center gap-4">
                  <ExampleAvatar className="h-14 w-14" />
                  <div>
                    <div className="text-[26px] font-medium tracking-[-0.04em] text-[#202420]" style={{ fontFamily: DISPLAY }}>
                      Mia Thompson
                    </div>
                    <div className="mt-1 text-[11px] text-[#777D74]">Northside · Residential</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#6B7168]">Latest outcome</div>
                <div className="mt-2 text-[34px] font-medium leading-[0.98] tracking-[-0.05em] text-[#536039]" style={{ fontFamily: DISPLAY }}>
                  Review received.
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#DCE0CC] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.11em] text-[#5D6845]">
                  <Check size={11} strokeWidth={2.5} />
                  Follow-through complete
                </div>
              </div>
            </div>

            <div className="p-7 sm:p-9 lg:p-10">
              <div className="flex items-center justify-between">
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6B7168]">Customer history</div>
                <div className="text-[10px] text-[#8A9086]">Context stays attached</div>
              </div>
              <div className="relative mt-5">
                <div className="absolute bottom-3 left-[5px] top-3 w-px bg-[#D4D8CB]" />
                {timeline.map(([date, title, copy], index) => (
                  <div key={date} className="relative grid gap-2 border-b border-[#1E2B29]/8 py-4 pl-8 last:border-b-0 sm:grid-cols-[0.75fr_1.25fr] sm:items-start">
                    <span
                      className="absolute left-0 top-[22px] h-[11px] w-[11px] rounded-full border-2 border-[#FCFCFA]"
                      style={{ backgroundColor: ["#C2A07B", "#D58C75", "#DDA34B", "#99A36D", "#667044"][index] }}
                    />
                    <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#8B9188]">{date}</div>
                    <div>
                      <div className="text-[14px] font-semibold text-[#2C302B]">{title}</div>
                      <div className="mt-1 text-[11px] leading-[1.5] text-[#777D74]">{copy}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CommercialSection() {
  return (
    <section className="bg-[#F5F7F9] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>Included in Zapla</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[56px] lg:text-[66px]"
            style={{ fontFamily: DISPLAY }}
          >
            Reviews aren&apos;t another
            <span className="block text-[#B27B2D]">bolt-on subscription.</span>
          </h2>
          <p className="mt-5 max-w-[690px] text-[15px] leading-[1.72] text-[#666B67] sm:text-[16px]">
            The Review Engine is included in both Follow-Through and Growth, so
            the request can sit inside the same system already handling your
            customer journey.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="flex min-h-[390px] flex-col rounded-[28px] border border-[#D9E1E8] bg-white p-7 sm:p-9">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8B6A3C]">Follow-Through</div>
              <h3 className="mt-5 max-w-[470px] text-[34px] font-medium leading-[0.98] tracking-[-0.048em]" style={{ fontFamily: DISPLAY }}>
                Stop losing the business already coming to you.
              </h3>
              <p className="mt-5 max-w-[500px] text-[14px] leading-[1.7] text-[#666B67]">
                Review Engine included alongside lead capture, quote follow-up
                and appointment recovery.
              </p>
              <div className="mt-auto pt-9">
                <div className="text-[34px] font-medium tracking-[-0.045em]" style={{ fontFamily: DISPLAY }}>
                  A$399
                  <span className="ml-1 text-[12px] font-medium tracking-normal text-[#77716A]">/mo + GST</span>
                </div>
                <div className="mt-1 text-[11px] text-[#827B73]">Guided Launch from A$1,997 + GST</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex min-h-[390px] flex-col rounded-[28px] bg-[#1E2B29] p-7 text-[#F7F4EE] sm:p-9">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#DDA34B]">Growth</div>
              <h3 className="mt-5 max-w-[470px] text-[34px] font-medium leading-[0.98] tracking-[-0.048em]" style={{ fontFamily: DISPLAY }}>
                Add reactivation and proactive campaigns around the same customer record.
              </h3>
              <p className="mt-5 max-w-[500px] text-[14px] leading-[1.7] text-white/58">
                Everything in Follow-Through, including Review Engine, plus the
                proactive growth workflows in the Growth plan.
              </p>
              <div className="mt-auto pt-9">
                <div className="text-[34px] font-medium tracking-[-0.045em]" style={{ fontFamily: DISPLAY }}>
                  A$699
                  <span className="ml-1 text-[12px] font-medium tracking-normal text-white/45">/mo + GST</span>
                </div>
                <div className="mt-1 text-[11px] text-white/42">Guided Launch from A$2,997 + GST</div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={BOOK_URL}
            className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px"
          >
            Book a Call <ArrowRight size={15} />
          </a>
          <a
            href={PRICING_URL}
            className="inline-flex h-[50px] items-center rounded-full border border-[#D8CFC4] bg-white px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#BFB3A5]"
          >
            View full pricing
          </a>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="bg-[#EEF2F6] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1160px]">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.97] tracking-[-0.052em] sm:text-[56px]"
            style={{ fontFamily: DISPLAY }}
          >
            The practical questions
            <span className="block text-[#8A7459]">before you switch it on.</span>
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-[#D4DDE5] border-y border-[#D4DDE5]">
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
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
      >
        <span className="text-[14px] font-semibold text-[#2E2A27] sm:text-[16px]">{q}</span>
        <ChevronDown
          size={17}
          className={"shrink-0 text-[#7B6A50] transition-transform " + (open ? "rotate-180" : "")}
        />
      </button>
      {open ? (
        <div className="max-w-[820px] pb-6 pr-10 text-[13.5px] leading-[1.75] text-[#69635E]">
          {a}
        </div>
      ) : null}
    </div>
  );
}

function FinalCta() {
  return (
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1120px] text-center">
        <div className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#111214] ring-1 ring-black/[0.06]">
          <ZaplaPetal size={34} />
        </div>
        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80551C]">
          Make the good work visible
        </p>
        <h2
          className="mx-auto mt-3 max-w-[920px] text-[42px] font-medium leading-[0.98] tracking-[-0.052em] text-[#111318] sm:text-[56px] lg:text-[64px]"
          style={{ fontFamily: DISPLAY }}
        >
          Do great work.
          <span className="block text-[#B27B2D]">Make sure people can see it.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[700px] text-[15px] leading-[1.68] text-[#5F655F] sm:text-[16px]">
          We&apos;ll map the right trigger, timing and review flow around how your
          customers already move through the business.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={BOOK_URL}
            className="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px sm:w-auto"
          >
            Book a Call <ArrowRight size={15} />
          </a>
          <a
            href={PRICING_URL}
            className="inline-flex h-[50px] w-full items-center justify-center rounded-full border border-[#E2DBD1] bg-white px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#CFC6BA] sm:w-auto"
          >
            View pricing
          </a>
        </div>
      </div>
    </section>
  );
}