import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { DominoFooter } from "@/components/DominoFooter";

export const Route = createFileRoute("/reactivation_v3")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Reopen | Lead & Customer Reactivation | Zapla" },
      {
        name: "description",
        content:
          "Zapla Reopen brings old enquiries, stale quotes and past customers back into conversation without blasting the whole database.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ReopenV3,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;

const STORY_IMAGES = {
  broker: "/concept/customer-stories-v6/broker.webp",
  mechanic: "/concept/customer-stories-v6/mechanic.webp",
  practice: "/concept/customer-stories-v6/practice.webp",
  property: "/concept/customer-stories-v6/property.webp",
  studio: "/concept/customer-stories-v6/studio.webp",
};

const FAQS = [
  {
    q: "What is Reopen?",
    a: "Reopen is Zapla's lead and customer reactivation solution. It helps identify dormant enquiries, older quotes and past customers worth revisiting, then restart the conversation under rules you control.",
  },
  {
    q: "How is Reopen different from Follow-Up?",
    a: "Follow-Up keeps active opportunities moving while they are still live. Reopen goes back to opportunities that have already gone quiet.",
  },
  {
    q: "Does Reopen message everyone?",
    a: "No. Active opportunities, recent contacts, unsubscribed contacts and people who have already replied can be excluded before anything sends.",
  },
  {
    q: "What happens when someone replies?",
    a: "The outreach can stop automatically and the conversation can route back to your team with the previous customer history still attached.",
  },
  {
    q: "What is Ghost to Gold?",
    a: "Ghost to Gold is the done for you Reopen service. Sprint starts from A$997 plus GST. Managed starts from A$1,497 plus GST and adds monitoring and handoff.",
  },
] as const;

function ReopenV3() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#171816]" style={{ fontFamily: BODY }}>
      <Hero />
      <QuietStories />
      <Selection />
      <Rewind />
      <Commercial />
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
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduced ? 0 : 0.58, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, color = "#7C746D" }: { children: ReactNode; color?: string }) {
  return (
    <div className="text-[9px] font-semibold uppercase tracking-[0.24em]" style={{ color }}>
      {children}
    </div>
  );
}

function Hero() {
  const reduced = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#F4EBDD] px-5 pb-20 pt-[112px] sm:px-10 lg:px-16 lg:pt-[132px]">
      <div className="pointer-events-none absolute right-[-10%] top-[-15%] h-[600px] w-[600px] rounded-full bg-[#DCE0CC]/48 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="flex items-center justify-between border-b border-[#D2C4B6] pb-3 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#8B8178]">
          <span>Zapla Reopen</span>
          <span>Lead & customer reactivation</span>
        </div>

        <Reveal className="mx-auto max-w-[1120px] pt-14 text-center">
          <Eyebrow color="#BF7458">Reopen</Eyebrow>
          <h1
            className="mx-auto mt-6 text-[58px] font-medium leading-[0.9] tracking-[-0.065em] sm:text-[78px] lg:text-[104px]"
            style={{ fontFamily: DISPLAY }}
          >
            They went quiet.
            <span className="block text-[#BF7458]">That doesn't mean they're gone.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-[720px] text-[16px] leading-[1.72] text-[#675F58] sm:text-[18px]">
            Reopen finds old enquiries, stale quotes and past customers worth revisiting, then brings the right conversations back to life.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={BOOK_URL}
              className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-white"
            >
              Book a Call <ArrowRight size={15} />
            </a>
            <a
              href="#quiet-stories"
              className="inline-flex h-[50px] items-center rounded-full border border-[#C9B9AB] bg-white/45 px-6 text-[13px] font-semibold text-[#302B27]"
            >
              See what went quiet
            </a>
          </div>
        </Reveal>

        <div className="relative mt-14 overflow-hidden border-y border-[#D2C4B6] py-5">
          <div className="relative h-[520px] overflow-hidden bg-[#D5C6B7] sm:h-[620px] lg:h-[670px]">
            {!reduced ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/concept/human-work/hero-montage.jpg"
                className="h-full w-full object-cover"
              >
                <source src="/concept/human-work/hero-montage.mp4" type="video/mp4" />
              </video>
            ) : (
              <img src="/concept/human-work/hero-montage.jpg" alt="" className="h-full w-full object-cover" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#17201D]/58 via-transparent to-[#F4EBDD]/12" />

            <div className="absolute left-5 top-5 bg-[#F4EBDD]/90 px-4 py-3 backdrop-blur-sm sm:left-7 sm:top-7">
              <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#9D6B58]">167 DAYS QUIET</div>
              <div className="mt-1 text-[11px] font-semibold text-[#312D29]">Quote sent · A$4,800</div>
            </div>

            <motion.div
              className="absolute bottom-[92px] left-[6%] max-w-[320px] border-l-2 border-[#BF7458] bg-[#FFF9F4]/94 px-5 py-5 shadow-[0_18px_50px_rgba(54,38,27,.13)]"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.25, ease: EASE }}
            >
              <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#A66B57]">REOPEN</div>
              <div className="mt-3 text-[17px] font-medium leading-[1.48] text-[#2E2925]">
                Want us to update that quote?
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-6 right-[5%] w-[54%] max-w-[650px] bg-[#1E2B29] px-6 py-5 text-[#F7F4EE] shadow-[0_28px_68px_rgba(31,43,41,.22)]"
              initial={reduced ? false : { opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.4, ease: EASE }}
            >
              <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/36">Reply received</div>
                  <div className="mt-2 text-[20px] font-medium leading-[1.34] tracking-[-0.025em]" style={{ fontFamily: DISPLAY }}>
                    “Yes. Please send me the latest pricing.”
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.12em] text-[#C5D098]">
                  <span className="h-2 w-2 rounded-full bg-[#A9B47A]" />
                  Reopened
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-5 text-[10px] text-[#81776F]">
            <div><span className="block text-[8px] font-semibold uppercase tracking-[0.14em] text-[#A0968D]">Last activity</span><strong className="mt-2 block text-[14px] text-[#342F2B]">14 February</strong></div>
            <div><span className="block text-[8px] font-semibold uppercase tracking-[0.14em] text-[#A0968D]">Quiet for</span><strong className="mt-2 block text-[14px] text-[#342F2B]">167 days</strong></div>
            <div><span className="block text-[8px] font-semibold uppercase tracking-[0.14em] text-[#A0968D]">Status</span><strong className="mt-2 block text-[14px] text-[#342F2B]">Conversation reopened</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuietStories() {
  return (
    <section id="quiet-stories" className="bg-[#17201D] px-5 py-24 text-[#F7F4EE] sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1380px]">
        <Reveal className="max-w-[980px]">
          <Eyebrow color="#DDA34B">The quiet pipeline</Eyebrow>
          <h2
            className="mt-5 text-[48px] font-medium leading-[0.92] tracking-[-0.062em] sm:text-[68px] lg:text-[84px]"
            style={{ fontFamily: DISPLAY }}
          >
            Three different conversations.
            <span className="block text-[#C7D19B]">None of them actually finished.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-4">
            <StoryImage
              src={STORY_IMAGES.mechanic}
              height="h-[520px]"
              label="OLD ENQUIRY"
              title="They asked. Timing got in the way."
              meta="7 months quiet"
              tone="#D58C75"
            />
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.05}>
            <StoryImage
              src={STORY_IMAGES.broker}
              height="h-[610px]"
              label="STALE QUOTE"
              title="They didn't say no. They stopped replying."
              meta="5 months quiet"
              tone="#DDA34B"
              active
            />
          </Reveal>

          <Reveal className="lg:col-span-3" delay={0.1}>
            <StoryImage
              src={STORY_IMAGES.practice}
              height="h-[460px]"
              label="PAST CUSTOMER"
              title="They already know who you are."
              meta="11 months quiet"
              tone="#A9B47A"
            />
          </Reveal>
        </div>

        <div className="mt-10 grid gap-8 border-t border-white/10 pt-7 lg:grid-cols-[.55fr_1.45fr]">
          <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/30">
            The active pipeline is obvious.
            <br />
            The quiet pipeline isn't.
          </div>
          <p className="max-w-[760px] text-[17px] leading-[1.75] text-white/52">
            Reopen looks for opportunities that stopped without a clear ending, then gives the right ones a sensible reason to speak again.
          </p>
        </div>
      </div>
    </section>
  );
}

function StoryImage({
  src,
  height,
  label,
  title,
  meta,
  tone,
  active = false,
}: {
  src: string;
  height: string;
  label: string;
  title: string;
  meta: string;
  tone: string;
  active?: boolean;
}) {
  return (
    <article className={"relative overflow-hidden " + height}>
      <img
        src={src}
        alt=""
        className={"absolute inset-0 h-full w-full object-cover " + (active ? "" : "grayscale-[.75] saturate-[.55]")}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#17201D] via-[#17201D]/22 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <div className="text-[8px] font-bold uppercase tracking-[0.15em]" style={{ color: tone }}>{label}</div>
        <h3 className="mt-3 max-w-[420px] text-[30px] font-medium leading-[1.02] tracking-[-0.045em]" style={{ fontFamily: DISPLAY }}>
          {title}
        </h3>
        <div className="mt-5 flex items-center gap-3 text-[10px] text-white/48">
          <span className="h-px w-8" style={{ backgroundColor: tone }} />
          {meta}
        </div>
      </div>
    </article>
  );
}

function Selection() {
  return (
    <section className="overflow-hidden bg-[#E7E0EA] px-5 py-24 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1380px] gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-20">
        <Reveal className="max-w-[560px]">
          <Eyebrow color="#7E687F">Selection before sending</Eyebrow>
          <h2
            className="mt-5 text-[48px] font-medium leading-[0.92] tracking-[-0.062em] sm:text-[64px] lg:text-[76px]"
            style={{ fontFamily: DISPLAY }}
          >
            Reopen is not a database blast.
          </h2>
          <p className="mt-6 max-w-[520px] text-[16px] leading-[1.75] text-[#625B64]">
            It starts with who should not hear from you. Active quote? Leave it alone. Recent contact? Leave it alone. Unsubscribed? Leave it alone.
          </p>

          <div className="mt-10 border-t border-[#7E687F]/18">
            {[
              ["Active quote", "Leave alone"],
              ["Recent contact", "Leave alone"],
              ["Unsubscribed", "Leave alone"],
              ["Dormant opportunity", "Worth reviewing"],
            ].map(([left, right], index) => (
              <div key={left} className="flex items-center justify-between gap-5 border-b border-[#7E687F]/14 py-4 text-[11px]">
                <span className="font-semibold text-[#4D474F]">{left}</span>
                <span className={index === 3 ? "font-semibold text-[#6E5870]" : "text-[#8B838D]"}>{right}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="relative h-[680px]">
            <div className="absolute left-[2%] top-[18%] h-[54%] w-[29%] overflow-hidden opacity-25">
              <img src={STORY_IMAGES.property} alt="" className="h-full w-full object-cover grayscale" />
              <div className="absolute inset-x-0 bottom-0 bg-[#E7E0EA]/92 p-4">
                <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#817783]">RECENT CONTACT</div>
                <div className="mt-1 text-[10px] font-semibold text-[#716873]">Leave alone</div>
              </div>
            </div>

            <div className="absolute left-[28%] top-[4%] z-20 h-[84%] w-[44%] overflow-hidden shadow-[0_34px_80px_rgba(70,58,74,.18)]">
              <img src={STORY_IMAGES.broker} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#332735]/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#E7B69F]">5 MONTHS QUIET</div>
                <div className="mt-2 text-[27px] font-medium tracking-[-0.03em]" style={{ fontFamily: DISPLAY }}>Worth reopening.</div>
                <div className="mt-3 text-[11px] text-white/62">No active opportunity. No recent contact. No clear no.</div>
              </div>
              <span className="absolute right-5 top-5 h-3 w-3 bg-[#7E687F]" />
            </div>

            <div className="absolute right-[2%] top-[22%] h-[52%] w-[28%] overflow-hidden opacity-22">
              <img src={STORY_IMAGES.studio} alt="" className="h-full w-full object-cover grayscale" />
              <div className="absolute inset-x-0 bottom-0 bg-[#E7E0EA]/92 p-4">
                <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#817783]">ACTIVE QUOTE</div>
                <div className="mt-1 text-[10px] font-semibold text-[#716873]">Leave alone</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Rewind() {
  const reduced = !!useReducedMotion();

  const items = [
    ["12 FEB", "Enquiry received", "Asked about pricing and timing.", "#C2A07B"],
    ["14 FEB", "Quote sent", "A$4,800 proposal sent.", "#DDA34B"],
    ["28 FEB", "Conversation went quiet", "No clear no. No next step.", "#9A9870"],
    ["08 AUG", "Reopen", "Want us to update that quote?", "#BF7458"],
  ] as const;

  return (
    <section className="bg-[#F8F5F0] px-5 py-24 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow color="#BF7458">One conversation, reopened</Eyebrow>
          <h2
            className="mt-5 text-[48px] font-medium leading-[0.92] tracking-[-0.062em] sm:text-[66px] lg:text-[80px]"
            style={{ fontFamily: DISPLAY }}
          >
            Five months of silence.
            <span className="block text-[#BF7458]">One reason to speak again.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className="relative h-[620px] overflow-hidden">
              <img src={STORY_IMAGES.broker} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E2B29]/70 via-transparent to-transparent" />
              <div className="absolute bottom-7 left-7 right-7 text-white">
                <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#F0C1AD]">SAME CUSTOMER · SAME HISTORY</div>
                <div className="mt-3 max-w-[480px] text-[30px] font-medium leading-[1.02] tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>
                  Reopen doesn't create a new lead. It resumes an old conversation.
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="relative h-full min-h-[620px] border-l border-[#DDD5CC] pl-8 sm:pl-10">
              {items.map(([date, title, copy, tone], index) => (
                <motion.div
                  key={date}
                  className="relative pb-8 last:pb-0"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : index * 0.06, ease: EASE }}
                >
                  <span
                    className="absolute -left-[45px] top-2 h-3 w-3 ring-4 ring-[#F8F5F0]"
                    style={{ backgroundColor: tone }}
                  />
                  <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#999088]">{date}</div>
                  <div className="mt-2 text-[18px] font-semibold text-[#2C2926]">{title}</div>
                  <div className="mt-2 text-[13px] leading-[1.65] text-[#746D67]">{copy}</div>

                  {index === 2 && (
                    <div className="mt-5 border-y border-[#E0D8D0] py-5">
                      <div className="text-[38px] font-medium tracking-[-0.045em] text-[#D6CEC6]" style={{ fontFamily: DISPLAY }}>167 days</div>
                    </div>
                  )}
                </motion.div>
              ))}

              <div className="mt-7 bg-[#1E2B29] px-6 py-6 text-[#F7F4EE]">
                <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/34">Reply received</div>
                <div className="mt-2 text-[24px] font-medium leading-[1.26] tracking-[-0.03em]" style={{ fontFamily: DISPLAY }}>
                  “Yes. Please send me the latest pricing.”
                </div>
                <div className="mt-5 flex flex-wrap gap-4 text-[9px] font-semibold text-white/52">
                  {["Outreach stopped", "History preserved", "Sales notified"].map((item) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      <Check size={10} className="text-[#B9C88C]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Commercial() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="bg-[#DCE0CC] px-5 py-20 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[610px] lg:ml-auto lg:mr-0">
          <Eyebrow color="#667044">Reopen inside Growth</Eyebrow>
          <h2 className="mt-5 text-[44px] font-medium leading-[0.95] tracking-[-0.057em] sm:text-[56px]" style={{ fontFamily: DISPLAY }}>
            Keep Reopen in your toolkit.
          </h2>
          <p className="mt-6 max-w-[510px] text-[15px] leading-[1.75] text-[#59604D]">
            Build audiences and run targeted reactivation whenever the business needs it.
          </p>
          <div className="mt-10 text-[38px] font-semibold tracking-[-0.045em] text-[#252A22]">
            A$699 <span className="text-[12px] font-medium tracking-normal text-[#69705F]">/mo + GST</span>
          </div>
          <div className="mt-2 text-[11px] text-[#727866]">Guided Launch from A$2,997 + GST</div>
          <a href={PRICING_URL} className="mt-10 inline-flex items-center gap-2 text-[12.5px] font-semibold text-[#252A22]">
            View Growth <ArrowRight size={14} />
          </a>
        </div>
      </div>

      <div className="bg-[#BF7458] px-5 py-20 text-[#FFF9F5] sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[610px] lg:ml-0 lg:mr-auto">
          <Eyebrow color="#F2D6A5">Ghost to Gold</Eyebrow>
          <h2 className="mt-5 text-[44px] font-medium leading-[0.95] tracking-[-0.057em] sm:text-[56px]" style={{ fontFamily: DISPLAY }}>
            Or let us run the first campaign.
          </h2>
          <p className="mt-6 max-w-[510px] text-[15px] leading-[1.75] text-white/72">
            Ghost to Gold is the done for you Reopen offer. We build and launch the campaign, with a managed option for monitoring and handoff.
          </p>
          <div className="mt-10 grid max-w-[430px] grid-cols-2 gap-8 border-t border-white/20 pt-6">
            <div><div className="text-[9px] uppercase tracking-[0.14em] text-white/48">Sprint</div><div className="mt-2 text-[25px] font-semibold">A$997+</div></div>
            <div><div className="text-[9px] uppercase tracking-[0.14em] text-white/48">Managed</div><div className="mt-2 text-[25px] font-semibold">A$1,497+</div></div>
          </div>
          <a href={BOOK_URL} className="mt-10 inline-flex items-center gap-2 text-[12.5px] font-semibold text-white">
            Ask about Ghost to Gold <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="bg-[#F2E8DA] px-5 py-20 sm:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[980px]">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-5 max-w-[760px] text-[42px] font-medium leading-[0.97] tracking-[-0.052em] sm:text-[54px]" style={{ fontFamily: DISPLAY }}>
          Before you reopen anything.
        </h2>
        <div className="mt-10 divide-y divide-[#D4C6B8] border-y border-[#D4C6B8]">
          {FAQS.map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
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
        <span className="text-[14px] font-semibold text-[#2D2925] sm:text-[15px]">{q}</span>
        <ChevronDown size={17} className={"shrink-0 text-[#776D64] transition-transform " + (open ? "rotate-180" : "")} />
      </button>
      {open && <div className="max-w-[820px] pb-5 pr-10 text-[13.5px] leading-[1.75] text-[#6A625B]">{a}</div>}
    </div>
  );
}

function FinalCta() {
  return (
    <section className="bg-[#17201D] px-5 py-24 text-[#F7F5F1] sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1120px]">
        <Eyebrow color="#DDA34B">Before you buy another lead</Eyebrow>
        <h2 className="mt-5 max-w-[1040px] text-[48px] font-medium leading-[0.92] tracking-[-0.06em] sm:text-[66px] lg:text-[82px]" style={{ fontFamily: DISPLAY }}>
          Look at the conversations
          <span className="block text-[#C7D19B]">you already paid to start.</span>
        </h2>
        <p className="mt-6 max-w-[620px] text-[15px] leading-[1.75] text-white/50">
          Reopen the ones that still have somewhere to go.
        </p>
        <a href={BOOK_URL} className="mt-9 inline-flex h-[52px] items-center gap-2 rounded-full bg-[#F7F5F1] px-7 text-[13px] font-semibold text-[#171816]">
          Book a Call <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}
