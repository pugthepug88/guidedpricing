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
  MousePointerClick,
  Send,
  ShieldCheck,
  Smartphone,
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
const IN_PERSON_SCENE = "/concept/reviews-v3-human-clean.png";

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
    a: "The Review Engine is included in Follow-Through and Growth. See the Pricing page for current plan details.",
  },
] as const;

function ReviewsPage() {
  return (
    <main
      className="min-h-screen overflow-hidden bg-white text-[#111318] antialiased"
      style={{ fontFamily: BODY }}
    >
      <Hero />
      <EvidenceSection />
      <ProblemSection />
      <MechanismSection />
      <TimingSection />
      <InPersonMomentSection />
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
    <section className="relative overflow-hidden border-b border-[#DDE5EE] bg-[#F7FAFD] px-5 pb-16 pt-[112px] sm:px-10 sm:pb-20 sm:pt-[124px] lg:px-16 lg:pb-24 lg:pt-[136px]">
      <div className="pointer-events-none absolute right-[8%] top-[16%] h-[380px] w-[380px] rounded-full bg-[#2563FF]/[0.035] blur-3xl" />
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
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
      </div>
    </section>
  );
}

function ReviewHeroScene() {
  const reduced = !!useReducedMotion();
  const beat = (delay: number, x = 0) =>
    reduced
      ? { initial: false as const, whileInView: { opacity: 1, x: 0, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, x, y: 14 },
          whileInView: { opacity: 1, x: 0, y: 0 },
          transition: { duration: 0.48, delay, ease: EASE },
        };

  return (
    <div className="relative mx-auto min-h-[510px] w-full max-w-[690px] sm:min-h-[530px]">
      <div className="pointer-events-none absolute inset-[12%] rounded-[44%] bg-[#EAF1F7] blur-[52px]" />

      <motion.div
        {...beat(0.06, -12)}
        viewport={{ once: true, amount: 0.65 }}
        className="absolute left-0 top-[3%] z-10 w-[73%] rounded-[20px] border border-[#DCE5ED] bg-white p-4 shadow-[0_18px_44px_rgba(31,49,68,.08)] sm:left-[2%]"
      >
        <div className="flex items-center gap-3">
          <ExampleAvatar column={1} row={0} className="h-10 w-10 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#7C8995]">Customer record</div>
            <div className="mt-0.5 truncate text-[14px] font-semibold text-[#26313B]">Mia Thompson</div>
          </div>
          <span className="rounded-full bg-[#DCE0CC] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-[#56643E]">
            Completed
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-[#E7EDF2] pt-3 text-[10px] text-[#687581]">
          <span>Service completed</span>
          <span>4:12 PM</span>
        </div>
      </motion.div>

      <motion.div
        {...beat(0.22, 14)}
        viewport={{ once: true, amount: 0.65 }}
        className="absolute right-0 top-[32%] z-20 w-[82%] rounded-[22px] bg-[#1E2B29] p-5 text-white shadow-[0_24px_56px_rgba(20,37,35,.18)]"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#E4BE72]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.07]">
              <ZaplaPetal size={18} />
            </span>
            Zapla AI · Review request
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-white/55">
            Automated
          </span>
        </div>
        <p className="mt-4 max-w-[470px] text-[12.5px] font-semibold leading-[1.58] text-white/88">
          Hi Mia, thanks for choosing Northside. If you have a minute, we&apos;d
          value an honest Google review about your experience.
        </p>
        <div className="mt-4 inline-flex items-center gap-1.5 text-[9px] font-semibold text-white/48">
          <Clock3 size={11} />
          Sent at the moment you choose
        </div>
      </motion.div>

      <motion.div
        {...beat(0.4, -10)}
        viewport={{ once: true, amount: 0.65 }}
        className="absolute bottom-[1%] left-[7%] z-10 w-[78%] rounded-[22px] border border-[#D9E2EA] bg-white p-5 shadow-[0_24px_58px_rgba(31,49,68,.10)]"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#758390]">Google Business Profile</div>
            <div className="mt-1 text-[14px] font-semibold text-[#252E36]">Review received</div>
          </div>
          <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-[#9AA5AE]">Example</span>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <ExampleAvatar column={1} row={0} className="h-9 w-9 shrink-0" />
          <div>
            <div className="text-[11px] font-semibold text-[#343A3F]">Mia T.</div>
            <div className="mt-0.5"><Stars small /></div>
          </div>
        </div>
        <p className="mt-3 text-[12px] leading-[1.58] text-[#59646D]">
          Great communication. Everything was clear and the team followed through
          exactly as promised.
        </p>
      </motion.div>
    </div>
  );
}

function EvidenceSection() {
  return (
    <section className="relative overflow-hidden bg-[#101820] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-24">
      <div className="pointer-events-none absolute -left-[8%] top-[28%] h-[440px] w-[440px] rounded-full bg-[#DDA34B]/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute right-[-3%] top-[18%] h-[380px] w-[380px] rounded-full bg-[#2563FF]/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-[1320px]">
        <Reveal className="max-w-[980px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E0B15A]">Why reviews matter</p>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.95] tracking-[-0.057em] sm:text-[60px] lg:text-[74px]"
            style={{ fontFamily: DISPLAY }}
          >
            People check your reviews
            <span className="block text-[#E4B85F]">before they call.</span>
          </h2>
          <p className="mt-5 max-w-[720px] text-[15px] leading-[1.72] text-white/58 sm:text-[16px]">
            Your rating matters. So does how many reviews you have and how recent
            they are.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.18fr_.82fr] lg:grid-rows-2">
          <Reveal className="lg:row-span-2">
            <article className="relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[34px] border border-[#E4B85F]/20 bg-gradient-to-br from-[#3A2C1F] via-[#24231F] to-[#171F25] p-8 shadow-[0_34px_90px_rgba(0,0,0,.18)] sm:p-10">
              <div className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-[#E4B85F]/12 blur-3xl" />
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E7C67F]">Positive reviews</span>
                <div className="flex items-center gap-1 text-[#E4B85F]">
                  {[0,1,2,3,4].map((item) => <Star key={item} size={14} className="fill-current" strokeWidth={1.2} />)}
                </div>
              </div>
              <div className="relative z-10 mt-auto">
                <div
                  className="text-[104px] font-medium leading-[0.84] tracking-[-0.075em] text-white sm:text-[128px]"
                  style={{ fontFamily: DISPLAY }}
                >
                  85%
                </div>
                <p className="mt-7 max-w-[470px] text-[18px] font-medium leading-[1.55] text-white/76 sm:text-[21px]">
                  are more likely to use a business after reading positive reviews.
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="relative overflow-hidden rounded-[30px] border border-[#8EAEBD]/20 bg-gradient-to-br from-[#1F2A31] to-[#172028] p-7 shadow-[0_26px_70px_rgba(0,0,0,.14)] sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#AFC7D2]">Review count</div>
                  <div
                    className="mt-4 text-[72px] font-medium leading-none tracking-[-0.065em] text-white sm:text-[82px]"
                    style={{ fontFamily: DISPLAY }}
                  >
                    47%
                  </div>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8EAEBD]/12 text-[#AFC7D2]">
                  <MessageSquareText size={20} strokeWidth={1.7} />
                </span>
              </div>
              <p className="mt-4 max-w-[360px] text-[14px] font-medium leading-[1.6] text-white/68 sm:text-[15px]">
                won&apos;t use a business with fewer than 20 reviews.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.12}>
            <article className="relative overflow-hidden rounded-[30px] border border-[#9DAF77]/20 bg-gradient-to-br from-[#242B20] to-[#172027] p-7 shadow-[0_26px_70px_rgba(0,0,0,.14)] sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#BDCAA0]">Recent reviews</div>
                  <div
                    className="mt-4 text-[72px] font-medium leading-none tracking-[-0.065em] text-white sm:text-[82px]"
                    style={{ fontFamily: DISPLAY }}
                  >
                    74%
                  </div>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#9DAF77]/12 text-[#BDCAA0]">
                  <Clock3 size={20} strokeWidth={1.7} />
                </span>
              </div>
              <p className="mt-4 max-w-[360px] text-[14px] font-medium leading-[1.6] text-white/68 sm:text-[15px]">
                look for reviews written within the last three months.
              </p>
            </article>
          </Reveal>
        </div>

        <div className="mt-7 grid gap-5 border-t border-white/10 pt-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <p className="max-w-[860px] text-[18px] font-medium leading-[1.55] text-white/88 sm:text-[20px]">
            More reviews and positive ratings can also help your business rank better in local search.
          </p>
          <a
            href="https://support.google.com/business/answer/7091?hl=en"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#E7C67F] transition-colors hover:text-white"
          >
            Local ranking guidance <ExternalLink size={12} />
          </a>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-[11px] leading-[1.6] text-white/46">
          <span>Consumer figures: BrightLocal Local Consumer Review Survey 2026, 1,002 US adults.</span>
          <a
            href="https://www.brightlocal.com/research/local-consumer-review-survey/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-white/56 transition-colors hover:text-white/80"
          >
            View source <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="bg-[#FAF7F1] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-20">
          <Reveal className="max-w-[760px]">
            <Eyebrow>The part businesses miss</Eyebrow>
            <h2
              className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.056em] sm:text-[58px] lg:text-[70px]"
              style={{ fontFamily: DISPLAY }}
            >
              Happy customers leave.
              <span className="block text-[#A66F20]">Most don&apos;t think to review you.</span>
            </h2>
            <p className="mt-6 max-w-[650px] text-[15px] leading-[1.75] text-[#626B73] sm:text-[16px]">
              They pay, get back to work, pick up the kids, or move on to the next
              thing. If nobody asks, a good experience can disappear without ever
              becoming a review.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="relative py-4 lg:pl-10">
              <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-[#D8D0C4] lg:block" />
              <div
                className="text-[96px] font-medium leading-[0.86] tracking-[-0.075em] text-[#17212B] sm:text-[118px]"
                style={{ fontFamily: DISPLAY }}
              >
                94%
              </div>
              <p className="mt-5 text-[17px] font-medium text-[#38434D]">
                are open to leaving a review.
              </p>

              <div className="mt-9 flex flex-wrap items-end gap-x-5 gap-y-2 border-t border-[#DDD4C7] pt-7">
                <div
                  className="text-[42px] font-medium leading-none tracking-[-0.055em] text-[#A66F20] sm:text-[50px]"
                  style={{ fontFamily: DISPLAY }}
                >
                  4–6
                </div>
                <div className="pb-1">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A7550]">
                    reviews a year
                  </div>
                  <div className="mt-1 text-[13px] text-[#6D746F]">
                    from the typical consumer.
                  </div>
                </div>
              </div>

              <a
                href="https://www.brightlocal.com/research/local-consumer-review-survey/"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#7D8992] transition-colors hover:text-[#58636C]"
              >
                BrightLocal, 2026 <ExternalLink size={11} />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14 border-t border-[#DDD4C7] pt-8">
          <div className="grid gap-8 lg:grid-cols-[.84fr_1.16fr] lg:items-center">
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#17212B] text-[#E4B85F]">
                <ArrowRight size={18} />
              </span>
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8B682F]">
                  The missing step
                </div>
                <div
                  className="mt-2 text-[34px] font-medium leading-[1] tracking-[-0.05em] text-[#1D2832] sm:text-[42px]"
                  style={{ fontFamily: DISPLAY }}
                >
                  Ask while it&apos;s still fresh.
                </div>
              </div>
            </div>

            <p className="max-w-[700px] text-[16px] leading-[1.7] text-[#5D6973] sm:text-[18px]">
              Not two weeks later. Not when somebody remembers. Ask when the work
              is finished and the experience is still fresh.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MechanismSection() {
  const levers = [
    {
      eyebrow: "Right moment",
      title: "Ask while it’s fresh.",
      copy: "When the service is complete, after the appointment, when payment clears, or whenever the moment makes sense.",
      icon: Clock3,
      tone: "bg-[#F7E7C7] border-[#E6C98E]",
      iconTone: "bg-[#FFF7E8] text-[#9B671F]",
    },
    {
      eyebrow: "Automatic",
      title: "Make it automatic.",
      copy: "Once the trigger happens, Zapla sends the request. Nobody has to remember on a busy day.",
      icon: Send,
      tone: "bg-[#E9F0F4] border-[#CFDDE6]",
      iconTone: "bg-white text-[#526D80]",
    },
    {
      eyebrow: "One tap away",
      title: "Open the review screen.",
      copy: "The customer taps the link and lands on the review screen. No searching for your business first.",
      icon: MousePointerClick,
      tone: "bg-[#EEF0E5] border-[#D8DCC5]",
      iconTone: "bg-white text-[#6E7B4F]",
    },
  ] as const;

  return (
    <section
      id="review-loop"
      className="scroll-mt-20 bg-[#FBFCFD] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[960px]">
          <Eyebrow>The ask</Eyebrow>
          <h2
            className="mt-4 text-[46px] font-medium leading-[0.94] tracking-[-0.056em] text-[#121820] sm:text-[62px] lg:text-[76px]"
            style={{ fontFamily: DISPLAY }}
          >
            The difference is
            <span className="block text-[#A66F20]">how you ask.</span>
          </h2>
          <p className="mt-6 max-w-[720px] text-[16px] leading-[1.72] text-[#626D77] sm:text-[18px]">
            Timing matters. Consistency matters. And the fewer steps between the
            request and the review screen, the easier it is for the customer to act.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {levers.map((lever, index) => {
            const Icon = lever.icon;
            return (
              <Reveal key={lever.title} delay={index * 0.06}>
                <article className={"flex h-full min-h-[360px] flex-col items-center rounded-[30px] border p-7 text-center shadow-[0_18px_44px_rgba(31,49,68,.045)] sm:p-8 " + lever.tone}>
                  <span className={"flex h-12 w-12 items-center justify-center rounded-full shadow-[0_8px_20px_rgba(31,49,68,.08)] " + lever.iconTone}>
                    <Icon size={19} strokeWidth={1.8} />
                  </span>
                  <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8B682F]">
                    {lever.eyebrow}
                  </p>
                  <h3
                    className="mt-3 max-w-[330px] text-[34px] font-medium leading-[1.02] tracking-[-0.047em] text-[#202931] sm:text-[38px]"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {lever.title}
                  </h3>
                  <p className="mx-auto mt-5 max-w-[340px] text-[13.5px] leading-[1.72] text-[#5F6C76]">
                    {lever.copy}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-5">
          <div className="grid gap-6 rounded-[26px] bg-[#17212B] p-7 text-white sm:p-8 lg:grid-cols-[.38fr_1.62fr] lg:items-center">
            <div>
              <div
                className="text-[62px] font-medium leading-none tracking-[-0.06em] text-white sm:text-[72px]"
                style={{ fontFamily: DISPLAY }}
              >
                83%
              </div>
              <p className="mt-2 max-w-[230px] text-[11px] font-semibold uppercase tracking-[0.11em] text-white/46">
                of people asked to leave a review went on to leave one
              </p>
            </div>
            <div className="border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="max-w-[720px] text-[19px] font-medium leading-[1.5] tracking-[-0.02em] text-white/90 sm:text-[22px]">
                Customers are willing to review businesses. The missed opportunity is often simply not asking them.
              </p>
              <a
                href="https://www.brightlocal.com/research/local-consumer-review-survey/"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold text-white/44 transition-colors hover:text-white/70"
              >
                BrightLocal Local Consumer Review Survey 2026 <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TimingSection() {
  return (
    <section className="overflow-hidden bg-[#0D141A] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[920px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E0B15A]">
            What Zapla actually does
          </p>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.95] tracking-[-0.057em] sm:text-[60px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            Set the rule once.
            <span className="block text-[#E4B85F]">Zapla carries it through.</span>
          </h2>
          <p className="mt-5 max-w-[720px] text-[15px] leading-[1.72] text-white/58 sm:text-[16px]">
            The workflow starts when the service is complete, waits for the moment
            you choose, sends the request, and opens the review screen for the customer.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <ReviewTimingUi />
        </Reveal>
      </div>
    </section>
  );
}

function ReviewTimingUi() {
  const reduced = !!useReducedMotion();

  const stepTransition = (index: number) => ({
    duration: reduced ? 0 : 0.46,
    delay: reduced ? 0 : 0.2 + index * 0.17,
    ease: EASE,
  });

  const mobileSteps = [
    { eyebrow: "Trigger", title: "Service completed", icon: Check },
    { eyebrow: "Timing", title: "Wait 2 hours", icon: Clock3 },
    { eyebrow: "Zapla AI", title: "Send review request", icon: ZaplaPetal, zapla: true },
    { eyebrow: "Customer", title: "SMS arrives", icon: Smartphone },
    { eyebrow: "Outcome", title: "Review screen opens", icon: Star },
  ] as const;

  return (
    <>
      <div className="hidden lg:block">
        <div className="relative mx-auto min-h-[470px] max-w-[1180px]">
          <div className="pointer-events-none absolute left-1/2 top-[48%] h-[360px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#1C2C36] blur-[84px]" />

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 1180 470"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M110 245 C210 245 215 145 315 145 S430 235 525 235 S635 128 760 128 S880 285 1040 285"
              fill="none"
              stroke="rgba(255,255,255,.16)"
              strokeWidth="2"
              strokeDasharray="5 7"
              initial={reduced ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reduced ? 0 : 1.45, ease: EASE }}
            />
          </svg>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={stepTransition(0)}
            className="absolute left-[1%] top-[35%] w-[210px] rounded-[24px] border border-white/10 bg-[#172129]/92 p-5 shadow-[0_22px_56px_rgba(0,0,0,.16)]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8EAEBD]/12 text-[#AFC7D2]">
              <Check size={17} />
            </span>
            <div className="mt-5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/38">Trigger</div>
            <div className="mt-2 text-[16px] font-semibold text-white/90">Service completed</div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: .9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={stepTransition(1)}
            className="absolute left-[24%] top-[18%] flex flex-col items-center text-center"
          >
            <span className="flex h-24 w-24 items-center justify-center rounded-full border border-[#D9AA55]/25 bg-[#D9AA55]/10 text-[#E4B85F] shadow-[0_18px_50px_rgba(217,170,85,.10)]">
              <Clock3 size={28} strokeWidth={1.6} />
            </span>
            <div className="mt-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/38">Wait</div>
            <div className="mt-1 text-[15px] font-semibold text-white/90">2 hours</div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: .86 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={stepTransition(2)}
            className="absolute left-1/2 top-[31%] flex -translate-x-1/2 flex-col items-center text-center"
          >
            <span className="relative flex h-32 w-32 items-center justify-center rounded-full border border-[#2563FF]/35 bg-[#153258] shadow-[0_0_0_18px_rgba(37,99,255,.06),0_24px_70px_rgba(37,99,255,.16)]">
              <ZaplaPetal size={58} />
              <span className="absolute inset-[-10px] rounded-full border border-[#2563FF]/12" />
            </span>
            <div className="mt-5 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#8EB0FF]">Zapla AI</div>
            <div className="mt-1 text-[16px] font-semibold text-white/92">Sends the request</div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={stepTransition(3)}
            className="absolute right-[19%] top-[9%] w-[270px] rounded-[22px] bg-white p-5 text-[#253039] shadow-[0_28px_70px_rgba(0,0,0,.22)]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1E2B29]">
                <ZaplaPetal size={23} />
              </span>
              <div>
                <div className="text-[10px] font-semibold text-[#273039]">Northside</div>
                <div className="mt-0.5 text-[8px] text-[#8A949D]">just now</div>
              </div>
            </div>
            <p className="mt-4 text-[11px] leading-[1.55] text-[#4F5A63]">
              Hi Mia, if you have a minute, we&apos;d value an honest Google review.
            </p>
            <div className="mt-4 rounded-[10px] bg-[#1E2B29] px-3 py-2.5 text-[9px] font-semibold text-white">
              Leave a Google review
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, x: 16, y: 10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={stepTransition(4)}
            className="absolute bottom-[2%] right-[1%] w-[300px] rounded-[22px] border border-white/10 bg-[#F8F9FA] p-5 text-[#202930] shadow-[0_28px_70px_rgba(0,0,0,.22)]"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#7E8992]">Google review screen</div>
                <div className="mt-1 text-[14px] font-semibold">Northside</div>
              </div>
              <span className="text-[9px] font-semibold text-[#8A949D]">Google</span>
            </div>
            <div className="mt-5 flex items-center gap-1">
              {[0,1,2,3,4].map((item) => (
                <Star key={item} size={22} className="fill-[#E1AD45] text-[#E1AD45]" strokeWidth={1.2} />
              ))}
            </div>
            <p className="mt-3 text-[11px] text-[#66717A]">Tap a star to rate your experience</p>
          </motion.div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="relative ml-5 border-l border-white/10 pl-8">
          {mobileSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={stepTransition(index)}
                className="relative mb-5 rounded-[20px] border border-white/10 bg-[#172129]/92 p-5"
              >
                <span className="absolute -left-[49px] top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#101820]">
                  <Icon size={step.zapla ? 22 : 15} className={step.zapla ? "" : "text-[#E4B85F]"} />
                </span>
                <div className={step.zapla ? "text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8EB0FF]" : "text-[9px] font-semibold uppercase tracking-[0.16em] text-white/38"}>
                  {step.eyebrow}
                </div>
                <div className="mt-2 text-[15px] font-semibold text-white/90">{step.title}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function InPersonMomentSection() {
  return (
    <section className="bg-[#EEF3F7] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-16">
        <Reveal className="max-w-[570px]">
          <Eyebrow>When they&apos;re still there</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.055em] text-[#16202A] sm:text-[56px] lg:text-[64px]"
            style={{ fontFamily: DISPLAY }}
          >
            Make the human ask
            <span className="block text-[#A66F20]">easy too.</span>
          </h2>
          <p className="mt-5 max-w-[560px] text-[15px] leading-[1.72] text-[#616D77] sm:text-[16px]">
            If the customer is still there, your team can simply say the review
            link has been sent. No directions. No searching. They can open it from
            their phone when they&apos;re ready.
          </p>
          
        </Reveal>

        <Reveal delay={0.05} className="w-full lg:max-w-[620px] lg:justify-self-end">
          <div className="relative text-white drop-shadow-[0_22px_58px_rgba(31,49,68,.14)]">
            <div className="relative aspect-[3/2]">
              <div className="absolute inset-0 overflow-hidden rounded-t-[26px]">
                <img
                  src={IN_PERSON_SCENE}
                  alt="Customer checking a review link while a staff member finishes the interaction"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="absolute bottom-[-46px] right-3 z-20 w-[250px] max-w-[calc(100%-1.5rem)] rounded-[16px] border border-[#E6EAED] bg-white p-3.5 text-[#26313A] shadow-[0_16px_38px_rgba(18,29,38,.20)] sm:w-[270px] lg:right-[-24px]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E2B29] text-white">
                      <MessageSquareText size={13} strokeWidth={1.8} />
                    </span>
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#59656F]">
                        Review request
                      </div>
                      <div className="mt-0.5 text-[8px] text-[#98A1A8]">SMS · just now</div>
                    </div>
                  </div>
                  <Check size={13} className="text-[#82905B]" />
                </div>
                <p className="mt-2.5 text-[10px] leading-[1.5] text-[#4C5861]">
                  Thanks again. If you have a minute, we&apos;d really appreciate a quick Google review.
                </p>
                <div className="mt-2.5 flex items-center justify-between border-t border-[#E4E8EB] pt-2 text-[9px] font-semibold text-[#1E2B29]">
                  Leave a review
                  <ArrowRight size={11} />
                </div>
              </div>
            </div>

            <div className="rounded-b-[26px] bg-[#17212B] px-6 pb-6 pt-14 sm:px-7 sm:pb-7 sm:pt-16">
              <blockquote
                className="max-w-[560px] text-[22px] font-medium leading-[1.3] tracking-[-0.03em] text-white sm:text-[25px]"
                style={{ fontFamily: DISPLAY }}
              >
                “You&apos;re all sorted. I&apos;ve just sent a review link to your phone.
                If you&apos;ve got 30 seconds, would you mind leaving us a quick review?”
              </blockquote>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
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
            See the review.
            <span className="block text-[#BF7458]">See the customer behind it.</span>
          </h2>
          <p className="mt-5 max-w-[700px] text-[15px] leading-[1.72] text-[#666B67] sm:text-[16px]">
            The same honest request goes out to eligible customers. If someone is
            happy, you see the review. If something went wrong, your team sees that
            too.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="flex min-h-[410px] h-full flex-col rounded-[30px] bg-[#F0D59D] p-7 sm:p-9">
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#76501C]">Public proof</div>
              <h3
                className="mt-5 max-w-[500px] text-[36px] font-medium leading-[0.98] tracking-[-0.05em] text-[#292922] sm:text-[44px]"
                style={{ fontFamily: DISPLAY }}
              >
                Positive feedback becomes visible to the next customer.
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
            <div className="flex min-h-[410px] h-full flex-col rounded-[30px] bg-[#E7CEC2] p-7 sm:p-9">
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
                        The service was fine, but I waited longer than expected and wasn&apos;t sure what was happening.
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
    ["17 SEP · 2:10 PM", "Appointment completed", "Service completed"],
    ["17 SEP · 4:12 PM", "Service marked completed", "Review workflow started"],
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
            The review stays connected
            <span className="block text-[#5F6B42]">to the customer.</span>
          </h2>
          <p className="mt-5 max-w-[680px] text-[15px] leading-[1.72] text-[#535D4C] sm:text-[16px]">
            The job, messages, review request and response stay in the same
            customer story, instead of becoming another disconnected inbox.
          </p>
        </Reveal>

        <Reveal className="mt-12 overflow-hidden rounded-[32px] border border-[#1E2B29]/10 bg-[#FCFCFA] shadow-[0_28px_70px_rgba(61,70,48,.10)]">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
            <div className="flex min-h-[320px] flex-col justify-between border-b border-[#1E2B29]/10 bg-[#F6F6F0] p-7 sm:p-9 lg:border-b-0 lg:border-r">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6B7168]">Customer</div>
                <div className="mt-5 flex items-center gap-4">
                  <ExampleAvatar className="h-14 w-14" />
                  <div>
                    <div className="text-[26px] font-medium tracking-[-0.04em] text-[#202420]" style={{ fontFamily: DISPLAY }}>
                      Mia Thompson
                    </div>
                    <div className="mt-1 text-[11px] text-[#777D74]">Northside · Customer</div>
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
    <section className="bg-[#F5F7F9] px-5 py-16 sm:px-10 sm:py-[72px] lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1160px]">
        <Reveal>
          <div className="grid gap-8 rounded-[28px] border border-[#D9E1E8] bg-white px-7 py-8 shadow-[0_18px_46px_rgba(31,49,68,.05)] sm:px-9 sm:py-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
            <div className="max-w-[720px]">
              <Eyebrow>Included in Zapla</Eyebrow>
              <h2
                className="mt-3 text-[38px] font-medium leading-[0.98] tracking-[-0.052em] text-[#111318] sm:text-[48px] lg:text-[54px]"
                style={{ fontFamily: DISPLAY }}
              >
                Review Engine
                <span className="text-[#B27B2D]"> is included.</span>
              </h2>
              <p className="mt-4 max-w-[650px] text-[15px] leading-[1.7] text-[#666B67] sm:text-[16px]">
                Included in Follow-Through and Growth. No add-on. No separate
                review-management subscription.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href={PRICING_URL}
                className="inline-flex h-[48px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px"
              >
                See plans &amp; pricing <ArrowRight size={15} />
              </a>
              <a
                href={BOOK_URL}
                className="inline-flex h-[48px] items-center rounded-full border border-[#D8DEE4] bg-white px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#B8C1C9]"
              >
                Book a Call
              </a>
            </div>
          </div>
        </Reveal>
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
          Stop forgetting to ask
        </p>
        <h2
          className="mx-auto mt-3 max-w-[920px] text-[42px] font-medium leading-[0.98] tracking-[-0.052em] text-[#111318] sm:text-[56px] lg:text-[64px]"
          style={{ fontFamily: DISPLAY }}
        >
          Get more reviews
          <span className="block text-[#B27B2D]">without remembering to ask.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[700px] text-[15px] leading-[1.68] text-[#5F655F] sm:text-[16px]">
          Choose the trigger, timing and message. Zapla handles the review request
          as part of the customer journey.
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