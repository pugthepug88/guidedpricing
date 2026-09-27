import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { DominoFooter } from "@/components/DominoFooter";

export const Route = createFileRoute("/reactivation_v2")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Reopen V2 | Lead & Customer Reactivation | Zapla" },
      {
        name: "description",
        content:
          "Zapla Reopen helps service businesses bring dormant enquiries, stale quotes and past customers back into conversation without blasting the whole database.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ReactivationV2Page,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

const FAQS = [
  {
    q: "What is Reopen?",
    a: "Reopen is Zapla's lead and customer reactivation solution. It helps you identify dormant enquiries, older quotes and past customers worth revisiting, then restart the conversation under rules you control.",
  },
  {
    q: "How is Reopen different from Follow-Up?",
    a: "Follow-Up keeps active opportunities moving while they are still live. Reopen goes back to opportunities that have already gone quiet and gives them a fresh reason to re-engage.",
  },
  {
    q: "Does Reopen message everyone?",
    a: "No. The audience is selected first. Active opportunities, recent contacts, unsubscribed contacts and people who already replied can be excluded before anything sends.",
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

const FIELD_RECORDS = [
  { cell: 2, age: "42 DAYS", type: "ENQUIRY", x: 10, y: 19, width: 29, tone: "#D58C75" },
  { cell: 7, age: "3 MONTHS", type: "QUOTE", x: 42, y: 13, width: 23, tone: "#DDA34B" },
  { cell: 14, age: "11 MONTHS", type: "CUSTOMER", x: 68, y: 23, width: 25, tone: "#9B86B8" },
  { cell: 20, age: "7 MONTHS", type: "ENQUIRY", x: 17, y: 57, width: 24, tone: "#A9B47A" },
  { cell: 11, age: "4 MONTHS", type: "QUOTE", x: 69, y: 60, width: 25, tone: "#C89A5D" },
  { cell: 18, age: "9 MONTHS", type: "CUSTOMER", x: 42, y: 75, width: 21, tone: "#BF7458" },
] as const;

const CAST = [
  { cell: 0, label: "7 months quiet", state: "ELIGIBLE", selected: true },
  { cell: 5, label: "Active quote", state: "LEAVE ALONE", selected: false },
  { cell: 7, label: "Past customer", state: "ELIGIBLE", selected: true },
  { cell: 12, label: "Recent contact", state: "LEAVE ALONE", selected: false },
  { cell: 18, label: "5 months quiet", state: "ELIGIBLE", selected: true },
] as const;

function ReactivationV2Page() {
  return (
    <main className="min-h-screen bg-[#F7F5F1] text-[#171816] antialiased" style={{ fontFamily: BODY }}>
      <DesktopExperience />
      <MobileExperience />
      <Commercial />
      <Faq />
      <FinalCta />
      <DominoFooter />
    </main>
  );
}

function Eyebrow({ children, color = "#7A7169" }: { children: ReactNode; color?: string }) {
  return (
    <div className="text-[9px] font-semibold uppercase tracking-[0.24em]" style={{ color }}>
      {children}
    </div>
  );
}

function Portrait({
  cell,
  className = "",
  muted = false,
}: {
  cell: number;
  className?: string;
  muted?: boolean;
}) {
  const column = cell % 6;
  const row = Math.floor(cell / 6);

  return (
    <div
      className={"bg-[#D8C6B2] " + className}
      style={{
        backgroundImage: `url(${PORTRAIT_SHEET})`,
        backgroundPosition: `${(column / 5) * 100}% ${(row / 3) * 100}%`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
        filter: muted ? "grayscale(.96) saturate(.34) contrast(.93)" : undefined,
      }}
      aria-hidden="true"
    />
  );
}

function DesktopExperience() {
  const ref = useRef<HTMLElement>(null);
  const reduced = !!useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.17, 0.27], [1, 1, 0]);
  const fieldOpacity = useTransform(scrollYProgress, [0.19, 0.29, 0.47, 0.56], [0, 1, 1, 0]);
  const castOpacity = useTransform(scrollYProgress, [0.49, 0.59, 0.72, 0.8], [0, 1, 1, 0]);
  const rewindOpacity = useTransform(scrollYProgress, [0.74, 0.84, 1], [0, 1, 1]);

  const warmOpacity = useTransform(scrollYProgress, [0, 0.22, 0.32], [1, 1, 0]);
  const darkOpacity = useTransform(scrollYProgress, [0.22, 0.32, 0.5, 0.6], [0, 1, 1, 0]);
  const lavenderOpacity = useTransform(scrollYProgress, [0.52, 0.61, 0.74, 0.84], [0, 1, 1, 0]);
  const creamOpacity = useTransform(scrollYProgress, [0.76, 0.86, 1], [0, 1, 1]);

  const portraitScale = useTransform(scrollYProgress, [0, 0.2, 0.36, 0.56, 0.7, 0.84, 1], [1, 0.92, 0.54, 0.58, 0.72, 0.52, 0.42]);
  const portraitX = useTransform(scrollYProgress, [0, 0.22, 0.38, 0.58, 0.72, 0.86, 1], [0, 0, -270, -310, -30, -355, -350]);
  const portraitY = useTransform(scrollYProgress, [0, 0.22, 0.38, 0.58, 0.72, 0.86, 1], [0, 0, 85, 40, 0, 220, 250]);
  const colorOpacity = useTransform(scrollYProgress, [0.83, 0.91, 1], [0, 0.35, 1]);
  const quietLabelOpacity = useTransform(scrollYProgress, [0, 0.2, 0.31], [1, 1, 0]);
  const selectedLabelOpacity = useTransform(scrollYProgress, [0.57, 0.66, 0.78], [0, 1, 0]);
  const reopenedLabelOpacity = useTransform(scrollYProgress, [0.87, 0.94, 1], [0, 1, 1]);

  return (
    <section ref={ref} className="relative hidden h-[470vh] lg:block">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0 bg-[#F0E5D7]" style={{ opacity: warmOpacity }} />
        <motion.div className="absolute inset-0 bg-[#151614]" style={{ opacity: darkOpacity }} />
        <motion.div className="absolute inset-0 bg-[#E7E0EA]" style={{ opacity: lavenderOpacity }} />
        <motion.div className="absolute inset-0 bg-[#FCFBF8]" style={{ opacity: creamOpacity }} />

        <div className="pointer-events-none absolute inset-x-16 top-9 z-50 flex items-center justify-between border-b border-current/10 pb-3 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#877B70] mix-blend-multiply">
          <span>Zapla Reopen</span>
          <span>Lead & customer reactivation</span>
        </div>

        <motion.div
          className="absolute right-[5.5vw] top-[16vh] z-30 h-[68vh] w-[35vw] max-w-[520px] origin-center overflow-hidden shadow-[0_34px_90px_rgba(45,34,25,.12)]"
          style={{
            scale: reduced ? 1 : portraitScale,
            x: reduced ? 0 : portraitX,
            y: reduced ? 0 : portraitY,
          }}
        >
          <Portrait cell={9} muted className="absolute inset-0 h-full w-full" />
          <motion.div className="absolute inset-0" style={{ opacity: colorOpacity }}>
            <Portrait cell={9} className="h-full w-full" />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#281F18]/22 via-transparent to-transparent"
            style={{ opacity: quietLabelOpacity }}
          />
        </motion.div>

        <motion.div
          className="absolute right-[6vw] top-[10vh] z-40 border-l-2 border-[#BF7458] pl-4"
          style={{ opacity: quietLabelOpacity }}
        >
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A36550]">167 DAYS QUIET</div>
          <div className="mt-2 text-[11px] text-[#796E65]">Quote · A$4,800 · no decision</div>
        </motion.div>

        <motion.div
          className="absolute left-[48vw] top-[21vh] z-40 bg-[#7E687F] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.15em] text-white"
          style={{ opacity: selectedLabelOpacity }}
        >
          selected to reopen
        </motion.div>

        <motion.div
          className="absolute left-[33vw] top-[63vh] z-50 flex items-center gap-2 bg-[#1E2B29] px-4 py-3 text-[9px] font-bold uppercase tracking-[0.14em] text-[#C6D19B]"
          style={{ opacity: reopenedLabelOpacity }}
        >
          <span className="h-2 w-2 rounded-full bg-[#A9B47A]" />
          Reopened
        </motion.div>

        <HeroScene opacity={heroOpacity} />
        <FieldScene opacity={fieldOpacity} />
        <CastScene opacity={castOpacity} />
        <RewindScene opacity={rewindOpacity} progress={scrollYProgress} />
      </div>
    </section>
  );
}

function HeroScene({ opacity }: { opacity: any }) {
  return (
    <motion.div className="absolute inset-0 z-10 px-16 pb-12 pt-[124px]" style={{ opacity }}>
      <div className="mx-auto flex h-full max-w-[1460px] flex-col justify-between">
        <div className="max-w-[690px] pt-[6vh]">
          <Eyebrow color="#BF7458">Reopen</Eyebrow>
          <h1
            className="mt-6 text-[92px] font-medium leading-[0.87] tracking-[-0.07em]"
            style={{ fontFamily: DISPLAY }}
          >
            They went quiet.
            <span className="mt-3 block text-[#BF7458]">That doesn't mean they're gone.</span>
          </h1>
          <p className="mt-7 max-w-[575px] text-[18px] leading-[1.72] text-[#655E57]">
            Reopen finds old enquiries, stale quotes and past customers worth revisiting, then brings the right conversations back to life.
          </p>
          <div className="mt-8 flex gap-3">
            <a href={BOOK_URL} className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE]">
              Book a Call <ArrowRight size={15} />
            </a>
            <span className="inline-flex h-[50px] items-center rounded-full border border-[#C9B8A9] px-6 text-[13px] font-semibold text-[#302B27]">
              Scroll to rewind
            </span>
          </div>
        </div>

        <div className="max-w-[550px] border-t border-[#CDBEAF] pt-5 text-[11px] leading-[1.65] text-[#8A8179]">
          Most businesses keep watching what is active. Reopen looks back at what stopped moving.
        </div>
      </div>
    </motion.div>
  );
}

function FieldScene({ opacity }: { opacity: any }) {
  return (
    <motion.div className="absolute inset-0 z-10 px-16 pb-12 pt-[124px] text-[#F7F5F1]" style={{ opacity }}>
      <div className="mx-auto h-full max-w-[1460px]">
        <div className="max-w-[960px]">
          <Eyebrow color="#DDA34B">The second pipeline</Eyebrow>
          <h2
            className="mt-5 max-w-[950px] text-[78px] font-medium leading-[0.91] tracking-[-0.063em]"
            style={{ fontFamily: DISPLAY }}
          >
            Your pipeline doesn't end
            <span className="block text-[#C7D19B]">where your team stopped looking.</span>
          </h2>
        </div>

        <div className="absolute bottom-[7vh] left-16 right-16 top-[47vh] border-y border-white/10">
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
          {[18, 38, 58, 78].map((x, i) => (
            <div key={x} className="absolute bottom-0 top-0 w-px bg-white/[0.055]" style={{ left: x + "%" }}>
              <span className="absolute bottom-3 -translate-x-1/2 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/18">
                {i + 1} QTR
              </span>
            </div>
          ))}

          {FIELD_RECORDS.map((r, index) => (
            <div key={r.age + index} className="absolute flex items-center gap-3" style={{ left: r.x + "%", top: r.y + "%", width: r.width + "%" }}>
              <span className="h-px flex-1" style={{ backgroundColor: r.tone, opacity: .55 }} />
              <Portrait cell={r.cell} muted className="h-9 w-9 shrink-0 opacity-45" />
              <div className="shrink-0 text-right">
                <div className="text-[7px] font-bold uppercase tracking-[0.13em]" style={{ color: r.tone }}>{r.type}</div>
                <div className="mt-1 text-[8px] font-semibold text-white/28">{r.age}</div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-5 left-0 max-w-[600px] text-[13px] leading-[1.65] text-white/32">
            Quiet does not mean dead. It means the next step stopped happening.
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CastScene({ opacity }: { opacity: any }) {
  return (
    <motion.div className="absolute inset-0 z-10 px-16 pb-12 pt-[124px]" style={{ opacity }}>
      <div className="mx-auto h-full max-w-[1460px]">
        <div className="max-w-[900px]">
          <Eyebrow color="#7E687F">Selection before sending</Eyebrow>
          <h2
            className="mt-5 text-[76px] font-medium leading-[0.92] tracking-[-0.062em]"
            style={{ fontFamily: DISPLAY }}
          >
            Reopen doesn't blast the database.
            <span className="block text-[#7E687F]">It chooses.</span>
          </h2>
        </div>

        <div className="absolute bottom-0 left-0 right-0 top-[45vh]">
          <CastBackdrop />
        </div>
      </div>
    </motion.div>
  );
}

function CastBackdrop() {
  const positions = [
    "left-[3%] w-[19%] h-[83%] top-[9%]",
    "left-[22%] w-[18%] h-[72%] top-[20%]",
    "left-[41%] w-[22%] h-[88%] top-[4%]",
    "left-[64%] w-[16%] h-[70%] top-[22%]",
    "left-[81%] w-[17%] h-[82%] top-[10%]",
  ];

  return (
    <>
      {CAST.map((person, index) => (
        <div key={person.label + index} className={"absolute overflow-hidden " + positions[index]}>
          <Portrait
            cell={person.cell}
            muted={!person.selected}
            className={"absolute inset-0 h-full w-full " + (person.selected ? "" : "opacity-25")}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#E7E0EA] via-[#E7E0EA]/72 to-transparent px-4 pb-5 pt-20">
            <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#7C737E]">{person.label}</div>
            <div className={"mt-2 text-[10px] font-bold uppercase tracking-[0.08em] " + (person.selected ? "text-[#5D4C60]" : "text-[#978F99]")}>
              {person.state}
            </div>
          </div>
          {person.selected ? <span className="absolute right-4 top-4 h-3 w-3 bg-[#7E687F]" /> : null}
        </div>
      ))}
    </>
  );
}

function RewindScene({ opacity, progress }: { opacity: any; progress: any }) {
  const monthsY = useTransform(progress, [0.78, 1], [90, -10]);
  const messageOpacity = useTransform(progress, [0.84, 0.91, 1], [0, 1, 1]);
  const replyY = useTransform(progress, [0.9, 1], [40, 0]);

  return (
    <motion.div className="absolute inset-0 z-10 px-16 pb-12 pt-[124px]" style={{ opacity }}>
      <div className="mx-auto grid h-full max-w-[1460px] grid-cols-[.72fr_1.28fr] gap-20">
        <div className="pt-[5vh]">
          <Eyebrow color="#BF7458">One conversation, rewound</Eyebrow>
          <h2
            className="mt-5 text-[72px] font-medium leading-[0.92] tracking-[-0.062em]"
            style={{ fontFamily: DISPLAY }}
          >
            Go back far enough
            <span className="block text-[#BF7458]">to move forward again.</span>
          </h2>
          <p className="mt-6 max-w-[470px] text-[16px] leading-[1.72] text-[#68615B]">
            The old enquiry, quote and silence all stay part of the same customer story.
          </p>
        </div>

        <div className="relative border-l border-[#D9D0C6] pl-10 pt-[4vh]">
          <div className="grid grid-cols-[100px_1fr] border-b border-[#D9D0C6] pb-5">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#989088]">12 FEB</div>
            <div>
              <div className="text-[17px] font-semibold">Enquiry received</div>
              <div className="mt-1 text-[12px] text-[#766F68]">Sarah asks about pricing and timing.</div>
            </div>
          </div>
          <div className="grid grid-cols-[100px_1fr] border-b border-[#D9D0C6] py-5">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#989088]">14 FEB</div>
            <div>
              <div className="text-[17px] font-semibold">Quote sent</div>
              <div className="mt-1 text-[12px] text-[#766F68]">A$4,800 proposal sent.</div>
            </div>
          </div>
          <div className="grid grid-cols-[100px_1fr] border-b border-[#D9D0C6] py-5">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#989088]">28 FEB</div>
            <div>
              <div className="text-[17px] font-semibold">Conversation goes quiet</div>
              <div className="mt-1 text-[12px] text-[#766F68]">No clear no. No next step either.</div>
            </div>
          </div>

          <motion.div className="relative h-[32vh] overflow-hidden border-b border-[#D9D0C6]" style={{ y: monthsY }}>
            <div className="absolute left-[100px] top-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#BDB5AE]">MARCH</div>
            <div className="absolute left-[100px] top-[28%] text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C7C0B9]">APRIL</div>
            <div className="absolute left-[100px] top-[48%] text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D0C9C2]">MAY</div>
            <div className="absolute left-[100px] top-[68%] text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D8D2CC]">JUNE</div>
            <div className="absolute left-[100px] top-[86%] text-[10px] font-semibold uppercase tracking-[0.18em] text-[#DED9D4]">JULY</div>
            <div className="absolute bottom-4 right-0 text-[82px] font-medium leading-none tracking-[-0.07em] text-[#EEE9E4]" style={{ fontFamily: DISPLAY }}>
              167 DAYS
            </div>
          </motion.div>

          <motion.div className="absolute bottom-[6vh] left-10 right-0" style={{ opacity: messageOpacity }}>
            <div className="border-l-2 border-[#BF7458] bg-[#F2E4DA] px-5 py-4">
              <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#A76B58]">08 AUG · REOPEN</div>
              <div className="mt-2 text-[20px] font-medium tracking-[-0.02em]" style={{ fontFamily: DISPLAY }}>
                Want us to update that quote?
              </div>
            </div>
            <motion.div className="mt-3 bg-[#1E2B29] px-5 py-5 text-[#F7F4EE]" style={{ y: replyY }}>
              <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/34">Sarah replied</div>
              <div className="mt-2 text-[22px] font-medium tracking-[-0.025em]" style={{ fontFamily: DISPLAY }}>
                “Yes. Send me the latest pricing.”
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function MobileExperience() {
  return (
    <div className="lg:hidden">
      <section className="bg-[#F0E5D7] px-5 pb-20 pt-[110px]">
        <Eyebrow color="#BF7458">Reopen</Eyebrow>
        <h1 className="mt-5 text-[54px] font-medium leading-[0.9] tracking-[-0.065em]" style={{ fontFamily: DISPLAY }}>
          They went quiet.
          <span className="mt-2 block text-[#BF7458]">That doesn't mean they're gone.</span>
        </h1>
        <p className="mt-6 text-[16px] leading-[1.7] text-[#655E57]">
          Reopen finds old enquiries, stale quotes and past customers worth revisiting, then brings the right conversations back to life.
        </p>
        <div className="relative mt-10 h-[560px] overflow-hidden">
          <Portrait cell={9} muted className="absolute inset-x-0 top-0 h-[410px]" />
          <div className="absolute left-4 top-4 bg-[#F0E5D7]/90 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#A36550]">167 DAYS QUIET</div>
          <div className="absolute bottom-0 left-4 right-4 bg-[#1E2B29] px-5 py-5 text-white">
            <div className="text-[8px] uppercase tracking-[0.14em] text-white/34">Reply received</div>
            <div className="mt-2 text-[20px] font-medium" style={{ fontFamily: DISPLAY }}>“Yes. Send me the latest pricing.”</div>
          </div>
        </div>
      </section>

      <section className="bg-[#151614] px-5 py-20 text-white">
        <Eyebrow color="#DDA34B">The second pipeline</Eyebrow>
        <h2 className="mt-5 text-[48px] font-medium leading-[0.92] tracking-[-0.06em]" style={{ fontFamily: DISPLAY }}>
          Your pipeline doesn't end
          <span className="block text-[#C7D19B]">where your team stopped looking.</span>
        </h2>
        <div className="mt-12 space-y-7 border-y border-white/10 py-8">
          {FIELD_RECORDS.slice(0, 5).map((r) => (
            <div key={r.age} className="flex items-center gap-4">
              <span className="h-px flex-1" style={{ backgroundColor: r.tone, opacity: .55 }} />
              <Portrait cell={r.cell} muted className="h-10 w-10 opacity-45" />
              <div className="w-[92px] text-right">
                <div className="text-[8px] font-bold" style={{ color: r.tone }}>{r.type}</div>
                <div className="mt-1 text-[8px] text-white/28">{r.age}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#E7E0EA] px-5 py-20">
        <Eyebrow color="#7E687F">Selection before sending</Eyebrow>
        <h2 className="mt-5 text-[48px] font-medium leading-[0.92] tracking-[-0.06em]" style={{ fontFamily: DISPLAY }}>
          Reopen doesn't blast.
          <span className="block text-[#7E687F]">It chooses.</span>
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-2">
          {CAST.slice(0, 4).map((person) => (
            <div key={person.label} className="relative h-[320px] overflow-hidden">
              <Portrait cell={person.cell} muted={!person.selected} className={"h-full w-full " + (person.selected ? "" : "opacity-25")} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#E7E0EA] to-transparent px-3 pb-4 pt-16">
                <div className="text-[8px] font-semibold uppercase text-[#7C737E]">{person.label}</div>
                <div className="mt-1 text-[9px] font-bold text-[#5D4C60]">{person.state}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#FCFBF8] px-5 py-20">
        <Eyebrow color="#BF7458">One conversation, rewound</Eyebrow>
        <h2 className="mt-5 text-[48px] font-medium leading-[0.92] tracking-[-0.06em]" style={{ fontFamily: DISPLAY }}>
          Go back far enough
          <span className="block text-[#BF7458]">to move forward again.</span>
        </h2>
        <div className="mt-10 border-t border-[#D9D0C6]">
          <StoryRow date="12 FEB" title="Enquiry received" copy="Sarah asks about pricing and timing." />
          <StoryRow date="14 FEB" title="Quote sent" copy="A$4,800 proposal sent." />
          <StoryRow date="28 FEB" title="Conversation goes quiet" copy="No clear no. No next step either." />
          <div className="flex h-[360px] items-center border-b border-[#D9D0C6] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C2BBB4]">
            MARCH · APRIL · MAY · JUNE · JULY
          </div>
          <div className="border-l-2 border-[#BF7458] bg-[#F2E4DA] px-5 py-5">
            <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#A76B58]">08 AUG · REOPEN</div>
            <div className="mt-2 text-[21px] font-medium" style={{ fontFamily: DISPLAY }}>Want us to update that quote?</div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StoryRow({ date, title, copy }: { date: string; title: string; copy: string }) {
  return (
    <div className="grid grid-cols-[82px_1fr] border-b border-[#D9D0C6] py-5">
      <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#989088]">{date}</div>
      <div>
        <div className="text-[15px] font-semibold">{title}</div>
        <div className="mt-1 text-[12px] leading-[1.55] text-[#756E67]">{copy}</div>
      </div>
    </div>
  );
}

function Commercial() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="bg-[#DCE0CC] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[610px] lg:ml-auto lg:mr-0">
          <Eyebrow color="#667044">Reopen inside Growth</Eyebrow>
          <h2 className="mt-5 text-[44px] font-medium leading-[0.95] tracking-[-0.057em] sm:text-[58px]" style={{ fontFamily: DISPLAY }}>
            Keep the quiet pipeline visible.
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

      <div className="bg-[#BF7458] px-5 py-20 text-[#FFF9F5] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[610px] lg:ml-0 lg:mr-auto">
          <Eyebrow color="#F2D6A5">Ghost to Gold</Eyebrow>
          <h2 className="mt-5 text-[44px] font-medium leading-[0.95] tracking-[-0.057em] sm:text-[58px]" style={{ fontFamily: DISPLAY }}>
            Or let us reopen it for you.
          </h2>
          <p className="mt-6 max-w-[510px] text-[15px] leading-[1.75] text-white/70">
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
    <section className="bg-[#F0E5D7] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[960px]">
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
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="flex w-full items-center justify-between gap-6 py-5 text-left">
        <span className="text-[14px] font-semibold text-[#2D2925] sm:text-[15px]">{q}</span>
        <ChevronDown size={17} className={"shrink-0 text-[#776D64] transition-transform " + (open ? "rotate-180" : "")} />
      </button>
      {open && <div className="max-w-[820px] pb-5 pr-10 text-[13.5px] leading-[1.75] text-[#6A625B]">{a}</div>}
    </div>
  );
}

function FinalCta() {
  return (
    <section className="bg-[#151614] px-5 py-24 text-[#F7F5F1] sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1120px]">
        <Eyebrow color="#DDA34B">Look back before you buy forward</Eyebrow>
        <h2 className="mt-5 max-w-[1040px] text-[48px] font-medium leading-[0.92] tracking-[-0.06em] sm:text-[66px] lg:text-[82px]" style={{ fontFamily: DISPLAY }}>
          You already paid to get their attention.
          <span className="block text-[#C7D19B]">Reopen the conversations that still matter.</span>
        </h2>
        <a href={BOOK_URL} className="mt-9 inline-flex h-[52px] items-center gap-2 rounded-full bg-[#F7F5F1] px-7 text-[13px] font-semibold text-[#171816]">
          Book a Call <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}
