import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { DominoFooter } from "@/components/DominoFooter";

export const Route = createFileRoute("/reactivation_v4")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Reopen | Lead & Customer Reactivation | Zapla" },
      {
        name: "description",
        content:
          "Zapla Reopen helps service businesses bring dormant enquiries, stale quotes and past customers back into conversation without blasting the whole database.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ReopenV4,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;

const MEDIA = {
  montageVideo: "/concept/human-work/hero-montage.mp4",
  montagePoster: "/concept/human-work/hero-montage.jpg",
  mechanicVideo: "/concept/human-work/mechanic.mp4",
  mechanicPoster: "/concept/human-work/mechanic.jpg",
  brokerVideo: "/concept/human-work/broker.mp4",
  brokerPoster: "/concept/human-work/broker.jpg",
  dentistVideo: "/concept/human-work/dentist.mp4",
  dentistPoster: "/concept/human-work/dentist.jpg",
  agentVideo: "/concept/human-work/agent.mp4",
  agentPoster: "/concept/human-work/agent.jpg",
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

function ReopenV4() {
  return (
    <main className="min-h-screen bg-[#F5EFE5] text-[#171816]" style={{ fontFamily: BODY }}>
      <HeroFilm />
      <ThreeQuietStories />
      <SelectionBeforeSending />
      <TimePassed />
      <ReplyMoment />
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

function Eyebrow({ children, color = "#8A7F75" }: { children: ReactNode; color?: string }) {
  return (
    <div className="text-[9px] font-semibold uppercase tracking-[0.24em]" style={{ color }}>
      {children}
    </div>
  );
}

function Film({
  video,
  poster,
  className = "",
}: {
  video: string;
  poster: string;
  className?: string;
}) {
  const reduced = !!useReducedMotion();
  if (reduced) {
    return <img src={poster} alt="" className={"h-full w-full object-cover " + className} />;
  }
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      className={"h-full w-full object-cover " + className}
    >
      <source src={video} type="video/mp4" />
    </video>
  );
}

function HeroFilm() {
  return (
    <section className="relative min-h-[860px] overflow-hidden bg-[#17201D] text-white lg:min-h-[calc(100svh-56px)]">
      <div className="absolute inset-0">
        <Film video={MEDIA.montageVideo} poster={MEDIA.montagePoster} className="scale-[1.02]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,28,25,.88)_0%,rgba(20,28,25,.52)_44%,rgba(20,28,25,.18)_72%,rgba(20,28,25,.42)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,32,29,.15)_0%,rgba(23,32,29,.12)_48%,rgba(23,32,29,.78)_100%)]" />
        <div className="absolute inset-0 bg-[#BF7458]/[0.07] mix-blend-color" />
      </div>

      <div className="relative mx-auto flex min-h-[860px] max-w-[1500px] flex-col px-5 pb-8 pt-[110px] sm:px-10 lg:min-h-[calc(100svh-56px)] lg:px-16 lg:pt-[128px]">
        <div className="flex items-center justify-between border-b border-white/18 pb-3 text-[8px] font-semibold uppercase tracking-[0.18em] text-white/52">
          <span>Zapla Reopen</span>
          <span>Lead & customer reactivation</span>
        </div>

        <div className="flex flex-1 items-end pb-10">
          <div className="grid w-full gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <Reveal className="max-w-[930px]">
              <Eyebrow color="#E9A58B">Reopen</Eyebrow>
              <h1
                className="mt-5 text-[58px] font-medium leading-[0.87] tracking-[-0.07em] sm:text-[80px] lg:text-[108px]"
                style={{ fontFamily: DISPLAY }}
              >
                They went quiet.
                <span className="block text-[#E89B7D]">That doesn't mean they're gone.</span>
              </h1>
              <p className="mt-7 max-w-[700px] text-[16px] leading-[1.72] text-white/64 sm:text-[18px]">
                Reopen finds old enquiries, stale quotes and past customers worth revisiting, then brings the right conversations back to life.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={BOOK_URL}
                  className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#F7F4EE] px-6 text-[13px] font-semibold text-[#17201D]"
                >
                  Book a Call <ArrowRight size={15} />
                </a>
                <a
                  href="#stories"
                  className="inline-flex h-[50px] items-center rounded-full border border-white/30 bg-white/[0.06] px-6 text-[13px] font-semibold text-white backdrop-blur-sm"
                >
                  See what went quiet
                </a>
              </div>
            </Reveal>

            <Reveal className="lg:justify-self-end" delay={0.08}>
              <div className="w-full max-w-[430px] border-t border-white/20 pt-5">
                <div className="grid grid-cols-[1fr_auto] gap-5">
                  <div>
                    <div className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/38">Last activity</div>
                    <div className="mt-2 text-[19px] font-medium tracking-[-0.025em]" style={{ fontFamily: DISPLAY }}>14 February</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/38">Quiet for</div>
                    <div className="mt-2 text-[19px] font-medium tracking-[-0.025em]" style={{ fontFamily: DISPLAY }}>167 days</div>
                  </div>
                </div>

                <div className="mt-8 border-l-2 border-[#E89B7D] pl-5">
                  <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#E9A58B]">LAST KNOWN CONTEXT</div>
                  <div className="mt-3 text-[25px] font-medium leading-[1.05] tracking-[-0.035em]" style={{ fontFamily: DISPLAY }}>
                    Quote sent.
                    <br />
                    No decision recorded.
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="grid border-t border-white/16 pt-5 text-[8px] font-semibold uppercase tracking-[0.15em] text-white/34 sm:grid-cols-3">
          <div>12 FEB · ENQUIRY RECEIVED</div>
          <div className="mt-2 sm:mt-0 sm:text-center">14 FEB · QUOTE SENT</div>
          <div className="mt-2 sm:mt-0 sm:text-right">28 FEB · CONVERSATION QUIET</div>
        </div>
      </div>
    </section>
  );
}

function ThreeQuietStories() {
  return (
    <section id="stories" className="bg-[#F5EFE5] py-20 sm:py-24 lg:py-28">
      <div className="px-5 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1380px]">
          <Reveal className="max-w-[1050px]">
            <Eyebrow color="#BF7458">The quiet pipeline</Eyebrow>
            <h2
              className="mt-5 text-[48px] font-medium leading-[0.92] tracking-[-0.062em] sm:text-[68px] lg:text-[84px]"
              style={{ fontFamily: DISPLAY }}
            >
              Not lost leads.
              <span className="block text-[#BF7458]">Unfinished conversations.</span>
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 space-y-3 sm:space-y-4">
        <FilmChapter
          video={MEDIA.mechanicVideo}
          poster={MEDIA.mechanicPoster}
          eyebrow="OLD ENQUIRY · 7 MONTHS QUIET"
          title="They asked. Then timing got in the way."
          align="left"
          wash="bg-[#BF7458]/[0.10]"
        />
        <FilmChapter
          video={MEDIA.brokerVideo}
          poster={MEDIA.brokerPoster}
          eyebrow="STALE QUOTE · 5 MONTHS QUIET"
          title="They didn't say no. They stopped replying."
          align="right"
          wash="bg-[#DDA34B]/[0.08]"
        />
        <FilmChapter
          video={MEDIA.dentistVideo}
          poster={MEDIA.dentistPoster}
          eyebrow="PAST CUSTOMER · 11 MONTHS QUIET"
          title="They already know you. Nobody invited them back."
          align="left"
          wash="bg-[#A9B47A]/[0.10]"
        />
      </div>
    </section>
  );
}

function FilmChapter({
  video,
  poster,
  eyebrow,
  title,
  align,
  wash,
}: {
  video: string;
  poster: string;
  eyebrow: string;
  title: string;
  align: "left" | "right";
  wash: string;
}) {
  return (
    <section className="relative min-h-[650px] overflow-hidden sm:min-h-[760px] lg:min-h-[82svh]">
      <div className="absolute inset-0">
        <Film video={video} poster={poster} />
        <div className={"absolute inset-0 " + wash} />
        <div
          className={
            "absolute inset-0 " +
            (align === "left"
              ? "bg-[linear-gradient(90deg,rgba(20,28,25,.88)_0%,rgba(20,28,25,.47)_42%,rgba(20,28,25,.08)_75%)]"
              : "bg-[linear-gradient(270deg,rgba(20,28,25,.88)_0%,rgba(20,28,25,.47)_42%,rgba(20,28,25,.08)_75%)]")
          }
        />
      </div>

      <div className="relative mx-auto flex min-h-[650px] max-w-[1500px] items-end px-5 pb-10 pt-10 text-white sm:min-h-[760px] sm:px-10 sm:pb-14 lg:min-h-[82svh] lg:px-16">
        <Reveal
          className={
            "max-w-[760px] " +
            (align === "right" ? "ml-auto text-right" : "")
          }
        >
          <Eyebrow color="#F3C1AE">{eyebrow}</Eyebrow>
          <h3
            className="mt-5 text-[46px] font-medium leading-[0.94] tracking-[-0.058em] sm:text-[64px] lg:text-[76px]"
            style={{ fontFamily: DISPLAY }}
          >
            {title}
          </h3>
        </Reveal>
      </div>
    </section>
  );
}

function SelectionBeforeSending() {
  return (
    <section className="bg-[#17201D] px-5 py-24 text-white sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1360px]">
        <Reveal className="max-w-[1040px]">
          <Eyebrow color="#DDA34B">Before Reopen sends anything</Eyebrow>
          <h2
            className="mt-5 text-[46px] font-medium leading-[0.92] tracking-[-0.062em] sm:text-[64px] lg:text-[80px]"
            style={{ fontFamily: DISPLAY }}
          >
            It decides who should
            <span className="block text-[#C7D19B]">hear from you again.</span>
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-white/14">
          <DecisionRow label="ACTIVE QUOTE" detail="Still moving." result="LEAVE IT ALONE" dim />
          <DecisionRow label="CONTACTED YESTERDAY" detail="Too soon." result="LEAVE IT ALONE" dim />
          <DecisionRow label="UNSUBSCRIBED" detail="Not eligible." result="LEAVE IT ALONE" dim />
          <DecisionRow
            label="5 MONTHS QUIET · NO ACTIVE JOB"
            detail="No clear no."
            result="REOPEN"
            accent
          />
        </div>

        <div className="mt-8 max-w-[720px] text-[15px] leading-[1.75] text-white/46">
          Reopen is not a megaphone. The first decision is often who should be left alone.
        </div>
      </div>
    </section>
  );
}

function DecisionRow({
  label,
  detail,
  result,
  dim = false,
  accent = false,
}: {
  label: string;
  detail: string;
  result: string;
  dim?: boolean;
  accent?: boolean;
}) {
  return (
    <Reveal>
      <div
        className={
          "grid gap-4 border-b border-white/14 py-7 sm:grid-cols-[1.3fr_.7fr_auto] sm:items-center " +
          (dim ? "opacity-32" : "")
        }
      >
        <div
          className={
            "text-[28px] font-medium tracking-[-0.035em] sm:text-[36px] lg:text-[44px] " +
            (accent ? "text-[#E89B7D]" : "text-white")
          }
          style={{ fontFamily: DISPLAY }}
        >
          {label}
        </div>
        <div className="text-[12px] text-white/46">{detail}</div>
        <div
          className={
            "text-[10px] font-bold uppercase tracking-[0.15em] " +
            (accent ? "text-[#E89B7D]" : "text-white/48")
          }
        >
          {result}
        </div>
      </div>
    </Reveal>
  );
}

function TimePassed() {
  const months = [
    { month: "FEB", note: "QUOTE SENT", active: true },
    { month: "MAR", note: "", active: false },
    { month: "APR", note: "", active: false },
    { month: "MAY", note: "", active: false },
    { month: "JUN", note: "", active: false },
    { month: "JUL", note: "", active: false },
    { month: "AUG", note: "REOPEN", active: true },
  ] as const;

  return (
    <section className="bg-[#F5EFE5] px-5 py-24 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <Reveal className="max-w-[560px]">
          <Eyebrow color="#BF7458">Time is part of the story</Eyebrow>
          <h2
            className="mt-5 text-[48px] font-medium leading-[0.92] tracking-[-0.062em] sm:text-[66px] lg:text-[78px]"
            style={{ fontFamily: DISPLAY }}
          >
            Five months passed.
            <span className="block text-[#BF7458]">Nothing moved.</span>
          </h2>
          <p className="mt-6 max-w-[520px] text-[16px] leading-[1.75] text-[#69615B]">
            The quote did not disappear. The conversation simply stopped.
          </p>
        </Reveal>

        <div className="relative overflow-hidden border-y border-[#D9CFC5]">
          {months.map((item, index) => (
            <Reveal key={item.month} delay={index * 0.025}>
              <div
                className={
                  "grid grid-cols-[110px_1fr_auto] items-center border-b border-[#DED5CC] py-5 last:border-b-0 sm:grid-cols-[150px_1fr_auto] " +
                  (item.active ? "" : "opacity-30")
                }
              >
                <div
                  className={
                    "text-[44px] font-medium tracking-[-0.055em] sm:text-[58px] " +
                    (item.month === "AUG" ? "text-[#BF7458]" : "text-[#2E2A26]")
                  }
                  style={{ fontFamily: DISPLAY }}
                >
                  {item.month}
                </div>
                <div className="h-px bg-[#D2C6BB]" />
                <div
                  className={
                    "ml-5 min-w-[100px] text-right text-[8px] font-bold uppercase tracking-[0.14em] " +
                    (item.month === "AUG" ? "text-[#BF7458]" : "text-[#8E857E]")
                  }
                >
                  {item.note || "NO CHANGE"}
                </div>
              </div>
            </Reveal>
          ))}

          <div className="absolute right-[8%] top-[42%] -rotate-90 text-[74px] font-medium tracking-[-0.065em] text-[#EAE3DC] sm:text-[96px]" style={{ fontFamily: DISPLAY }}>
            167 DAYS
          </div>
        </div>
      </div>
    </section>
  );
}

function ReplyMoment() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-[#A9B47A]">
      <div className="absolute inset-0">
        <Film video={MEDIA.brokerVideo} poster={MEDIA.brokerPoster} className="saturate-[.92]" />
        <div className="absolute inset-0 bg-[#1E2B29]/68" />
        <div className="absolute inset-0 bg-[#A9B47A]/10 mix-blend-color" />
      </div>

      <div className="relative mx-auto flex min-h-[720px] max-w-[1440px] items-center px-5 py-20 text-white sm:px-10 lg:px-16">
        <Reveal className="mx-auto max-w-[1040px] text-center">
          <Eyebrow color="#D9E2B1">08 AUG · REOPEN</Eyebrow>
          <div
            className="mt-7 text-[44px] font-medium leading-[1] tracking-[-0.05em] text-white sm:text-[62px] lg:text-[78px]"
            style={{ fontFamily: DISPLAY }}
          >
            “Want us to update that quote?”
          </div>
          <div className="mx-auto mt-8 h-px w-20 bg-white/30" />
          <div
            className="mt-8 text-[34px] font-medium leading-[1.08] tracking-[-0.045em] text-[#D9E2B1] sm:text-[48px] lg:text-[58px]"
            style={{ fontFamily: DISPLAY }}
          >
            “Yes. Please send me the latest pricing.”
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 text-[9px] font-semibold uppercase tracking-[0.13em] text-white/58">
            {["Outreach stopped", "History preserved", "Sales notified"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <Check size={11} className="text-[#D9E2B1]" />
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Commercial() {
  return (
    <section className="bg-[#F7F4EE] px-5 py-24 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1260px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow color="#81776F">Two ways to use Reopen</Eyebrow>
          <h2
            className="mt-5 text-[46px] font-medium leading-[0.94] tracking-[-0.058em] sm:text-[62px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            Run it yourself.
            <span className="block text-[#BF7458]">Or hand us the first campaign.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid border-y border-[#D9D0C6] lg:grid-cols-2">
          <div className="border-b border-[#D9D0C6] py-10 lg:border-b-0 lg:border-r lg:pr-12">
            <Eyebrow color="#667044">Reopen inside Growth</Eyebrow>
            <h3 className="mt-5 max-w-[500px] text-[38px] font-medium leading-[0.98] tracking-[-0.05em]" style={{ fontFamily: DISPLAY }}>
              Keep Reopen in your toolkit.
            </h3>
            <p className="mt-5 max-w-[500px] text-[14px] leading-[1.75] text-[#69635D]">
              Build audiences and run targeted reactivation whenever the business needs it.
            </p>
            <div className="mt-8 text-[38px] font-semibold tracking-[-0.045em] text-[#252A22]">
              A$699 <span className="text-[12px] font-medium tracking-normal text-[#6F7468]">/mo + GST</span>
            </div>
            <div className="mt-2 text-[11px] text-[#817B74]">Guided Launch from A$2,997 + GST</div>
            <a href={PRICING_URL} className="mt-9 inline-flex items-center gap-2 text-[12.5px] font-semibold text-[#252A22]">
              View Growth <ArrowRight size={14} />
            </a>
          </div>

          <div className="py-10 lg:pl-12">
            <Eyebrow color="#BF7458">Ghost to Gold</Eyebrow>
            <h3 className="mt-5 max-w-[500px] text-[38px] font-medium leading-[0.98] tracking-[-0.05em]" style={{ fontFamily: DISPLAY }}>
              Want us to run it?
            </h3>
            <p className="mt-5 max-w-[510px] text-[14px] leading-[1.75] text-[#69635D]">
              Ghost to Gold is the done for you Reopen offer, from campaign build and launch through to managed monitoring and handoff.
            </p>
            <div className="mt-8 grid max-w-[430px] grid-cols-2 gap-8 border-t border-[#D9D0C6] pt-6">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9C938B]">Sprint</div>
                <div className="mt-2 text-[25px] font-semibold">A$997+</div>
              </div>
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9C938B]">Managed</div>
                <div className="mt-2 text-[25px] font-semibold">A$1,497+</div>
              </div>
            </div>
            <a href={BOOK_URL} className="mt-9 inline-flex items-center gap-2 text-[12.5px] font-semibold text-[#332E2A]">
              Ask about Ghost to Gold <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="bg-[#E7E0EA] px-5 py-20 sm:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[960px]">
        <Eyebrow color="#7E687F">FAQ</Eyebrow>
        <h2
          className="mt-5 max-w-[760px] text-[42px] font-medium leading-[0.97] tracking-[-0.052em] sm:text-[54px]"
          style={{ fontFamily: DISPLAY }}
        >
          Before you reopen anything.
        </h2>

        <div className="mt-10 divide-y divide-[#7E687F]/18 border-y border-[#7E687F]/18">
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
        <span className="text-[14px] font-semibold text-[#332E35] sm:text-[15px]">{q}</span>
        <ChevronDown
          size={17}
          className={"shrink-0 text-[#776D79] transition-transform " + (open ? "rotate-180" : "")}
        />
      </button>
      {open && <div className="max-w-[820px] pb-5 pr-10 text-[13.5px] leading-[1.75] text-[#6A626C]">{a}</div>}
    </div>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#17201D] px-5 py-24 text-white sm:px-10 lg:px-16 lg:py-28">
      <div className="absolute inset-y-0 right-0 w-[42%] opacity-22">
        <img src={MEDIA.agentPoster} alt="" className="h-full w-full object-cover grayscale" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#17201D] via-[#17201D]/64 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1120px]">
        <Eyebrow color="#DDA34B">Before you buy another lead</Eyebrow>
        <h2
          className="mt-5 max-w-[1040px] text-[48px] font-medium leading-[0.92] tracking-[-0.06em] sm:text-[66px] lg:text-[82px]"
          style={{ fontFamily: DISPLAY }}
        >
          Look at the conversations
          <span className="block text-[#C7D19B]">you already paid to start.</span>
        </h2>
        <p className="mt-6 max-w-[620px] text-[15px] leading-[1.75] text-white/50">
          Reopen the ones that still have somewhere to go.
        </p>
        <a
          href={BOOK_URL}
          className="mt-9 inline-flex h-[52px] items-center gap-2 rounded-full bg-[#F7F4EE] px-7 text-[13px] font-semibold text-[#171816]"
        >
          Book a Call <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}
