import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { DominoFooter } from "@/components/DominoFooter";
import { ZaplaPetal } from "@/components/ZaplaPetal";

export const Route = createFileRoute("/reactivation")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Lead & Customer Reactivation for Service Businesses | Zapla" },
      {
        name: "description",
        content:
          "Zapla Reopen helps service businesses bring old enquiries, stale quotes and past customers back into conversation with controlled lead and customer reactivation.",
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
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

const FAQS = [
  {
    q: "What is Reopen?",
    a: "Reopen is Zapla's lead and customer reactivation solution. It helps you identify dormant enquiries, older quotes and past customers worth revisiting, then restart the conversation with rules around who gets contacted and what happens when they reply.",
  },
  {
    q: "How is Reopen different from Follow-Up?",
    a: "Follow-Up keeps active opportunities moving while they are still live. Reopen goes back to opportunities that have already gone quiet and gives them a fresh reason to re-engage.",
  },
  {
    q: "Does Reopen message my whole database?",
    a: "No. The audience should be deliberate. You can exclude active opportunities, recent contacts, unsubscribed contacts, people who already replied and anyone outside the segment you want to reach.",
  },
  {
    q: "What happens when someone replies?",
    a: "The outreach can stop automatically and the conversation can route back to your team with the previous customer history still attached.",
  },
  {
    q: "Which Zapla plan includes Reopen?",
    a: "Reopen is included in Growth. Growth is currently A$699 per month plus GST, with Guided Launch from A$2,997 plus GST.",
  },
  {
    q: "What is Ghost to Gold?",
    a: "Ghost to Gold is the done for you Reopen service. Sprint starts from A$997 plus GST and covers campaign build and launch. Managed starts from A$1,497 plus GST and also includes monitoring and handoff of interested customers to your team.",
  },
] as const;

const AUDIENCE = [
  { cell: 0, label: "Old enquiry", selected: true },
  { cell: 3, label: "Active quote", selected: false },
  { cell: 7, label: "Past customer", selected: true },
  { cell: 12, label: "Recent contact", selected: false },
  { cell: 18, label: "Old quote", selected: true },
  { cell: 21, label: "Unsubscribed", selected: false },
  { cell: 5, label: "Dormant lead", selected: true },
  { cell: 9, label: "Active job", selected: false },
  { cell: 14, label: "Past customer", selected: true },
  { cell: 20, label: "Already replied", selected: false },
  { cell: 11, label: "Old enquiry", selected: true },
  { cell: 16, label: "Recent lead", selected: false },
] as const;

function ReactivationPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F1] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <Hero />
      <QuietMoments />
      <AudienceSection />
      <ReopenedStory />
      <CommercialPaths />
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
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({
  children,
  tone = "coral",
}: {
  children: ReactNode;
  tone?: "coral" | "gold" | "muted" | "light";
}) {
  const tones = {
    coral: "text-[#BF7458]",
    gold: "text-[#DDA34B]",
    muted: "text-[#77716A]",
    light: "text-white/62",
  };

  return (
    <div className={"text-[10px] font-semibold uppercase tracking-[0.22em] " + tones[tone]}>
      {children}
    </div>
  );
}

function AutumnAvatar({
  cell,
  size,
  muted = false,
  className = "",
}: {
  cell: number;
  size: number;
  muted?: boolean;
  className?: string;
}) {
  const column = cell % 6;
  const row = Math.floor(cell / 6);

  return (
    <span
      className={
        "block shrink-0 overflow-hidden rounded-full border border-black/[0.06] shadow-[0_10px_28px_rgba(46,36,28,.11)] " +
        className
      }
      style={{
        width: size,
        height: size,
        backgroundImage: "url(" + PORTRAIT_SHEET + ")",
        backgroundPosition: (column / 5) * 100 + "% " + (row / 3) * 100 + "%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
        filter: muted ? "grayscale(.78) saturate(.58)" : undefined,
      }}
      aria-hidden="true"
    />
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F7F2EA] px-5 pb-8 pt-[92px] sm:px-10 sm:pt-[96px] lg:pl-0 lg:pr-14 lg:pb-8 lg:pt-[88px]">

      <div className="relative mx-auto grid min-h-[700px] max-w-[1700px] items-center gap-4 lg:grid-cols-[1.24fr_.76fr] lg:gap-2">
        <Reveal className="order-2 lg:order-1">
          <ReopenHeroVisual />
        </Reveal>

        <Reveal className="order-1 max-w-[650px] lg:order-2 lg:justify-self-end lg:pl-5" delay={0.04}>
          <div className="flex items-center gap-4">
            <Eyebrow>Reopen</Eyebrow>
            <span className="h-px flex-1 bg-[#D4C5B8]" />
          </div>

          <h1
            className="mt-8 text-[52px] font-medium leading-[0.88] tracking-[-0.068em] sm:text-[70px] lg:text-[78px]"
            style={{ fontFamily: DISPLAY }}
          >
            <span className="block text-[#151817] lg:whitespace-nowrap">They went quiet.</span>
            <span className="mt-2 block text-[#BF7458] lg:whitespace-nowrap">That doesn't mean</span>
            <span className="block text-[#BF7458] lg:whitespace-nowrap">they're gone.</span>
          </h1>

          <p className="mt-7 max-w-[575px] text-[16px] leading-[1.68] text-[#625D57] sm:text-[18px]">
            Zapla finds old enquiries, stale quotes and past customers worth reopening, reaches out with the right message, and stops the moment they reply.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BOOK_URL}
              className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#1E2B29] px-7 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px"
            >
              Book a Call <ArrowRight size={15} />
            </a>
            <a
              href="#how-reopen-works"
              className="inline-flex h-[52px] items-center rounded-full border border-[#C9BDB2] bg-white/40 px-7 text-[13px] font-semibold text-[#1F211E]"
            >
              See how Reopen works
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 border-t border-[#D7CCC2] pt-5">
            <div className="pr-4">
              <div className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#9A8F85]">Last activity</div>
              <div className="mt-2 text-[18px] font-medium tracking-[-0.02em] text-[#302C28]">14 February</div>
            </div>
            <div className="border-l border-[#D7CCC2] px-4">
              <div className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#9A8F85]">Days since reply</div>
              <div className="mt-2 text-[18px] font-medium tracking-[-0.02em] text-[#302C28]">167</div>
            </div>
            <div className="border-l border-[#D7CCC2] pl-4">
              <div className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#9A8F85]">Status</div>
              <div className="mt-2 flex items-center gap-2 text-[18px] font-medium tracking-[-0.02em] text-[#302C28]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#879653]" />
                Reopened
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ReopenHeroVisual() {
  const visualRef = useRef<HTMLDivElement>(null);
  const sarahRef = useRef<HTMLDivElement>(null);
  const outgoingRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<HTMLDivElement>(null);
  const reopenedRef = useRef<HTMLDivElement>(null);
  const [connectorGeometry, setConnectorGeometry] = useState<{
    width: number;
    height: number;
    orange: { start: { x: number; y: number }; end: { x: number; y: number } };
    greenOne: { start: { x: number; y: number }; end: { x: number; y: number } };
    greenTwo: { start: { x: number; y: number }; end: { x: number; y: number } };
  } | null>(null);

  useEffect(() => {
    const updateConnectors = () => {
      const container = visualRef.current?.getBoundingClientRect();
      const sarah = sarahRef.current?.getBoundingClientRect();
      const outgoing = outgoingRef.current?.getBoundingClientRect();
      const reply = replyRef.current?.getBoundingClientRect();
      const reopened = reopenedRef.current?.getBoundingClientRect();

      if (!container || !sarah || !outgoing || !reply || !reopened) return;

      const point = (rect: DOMRect, xRatio: number, yRatio: number) => ({
        x: rect.left - container.left + rect.width * xRatio,
        y: rect.top - container.top + rect.height * yRatio,
      });

      setConnectorGeometry({
        width: container.width,
        height: container.height,
        orange: {
          start: point(sarah, 0.28, 1),
          end: point(outgoing, 0, 0.5),
        },
        greenOne: {
          start: point(outgoing, 0.18, 1),
          end: point(reply, 0, 0.52),
        },
        greenTwo: {
          start: point(reply, 0.16, 1),
          end: point(reopened, 0, 0.5),
        },
      });
    };

    const frame = requestAnimationFrame(updateConnectors);
    const observer = new ResizeObserver(updateConnectors);

    [visualRef.current, sarahRef.current, outgoingRef.current, replyRef.current, reopenedRef.current].forEach(
      (element) => element && observer.observe(element),
    );

    window.addEventListener("resize", updateConnectors);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", updateConnectors);
    };
  }, []);

  const archiveCards = [
    { cell: 4, name: "Daniel Brooks", type: "Enquiry", quiet: "132 days quiet", x: 0.5, y: 7.5, w: 38.0, rz: 0.55, ry: 10.0, opacity: 0.70, blur: 0.12, z: 8 },
    { cell: 2, name: "Chloe Martin", type: "Past customer", quiet: "156 days quiet", x: 15.0, y: 0.5, w: 40.5, rz: 0.30, ry: 9.0, opacity: 0.34, blur: 0.78, z: 1 },
    { cell: 16, name: "James Wilson", type: "Enquiry", quiet: "111 days quiet", x: 23.5, y: 5.5, w: 41.0, rz: 0.40, ry: 9.5, opacity: 0.38, blur: 0.62, z: 2 },
    { cell: 13, name: "Priya Sharma", type: "Quote sent", quiet: "96 days quiet", x: 30.0, y: 13.0, w: 39.5, rz: 0.50, ry: 10.0, opacity: 0.66, blur: 0.12, z: 9 },
    { cell: 6, name: "Sofia Patel", type: "Quote sent", quiet: "118 days quiet", x: 9.5, y: 22.0, w: 40.5, rz: 0.35, ry: 9.5, opacity: 0.35, blur: 0.74, z: 2 },
    { cell: 18, name: "Marcus Lee", type: "Enquiry", quiet: "201 days quiet", x: -1.5, y: 30.0, w: 38.0, rz: 0.50, ry: 9.5, opacity: 0.66, blur: 0.12, z: 7 },
    { cell: 23, name: "Noah Taylor", type: "Past customer", quiet: "173 days quiet", x: 18.0, y: 31.0, w: 41.0, rz: 0.35, ry: 9.5, opacity: 0.33, blur: 0.78, z: 2 },
    { cell: 7, name: "Ellie Carter", type: "Quote sent", quiet: "124 days quiet", x: 0.0, y: 49.0, w: 38.0, rz: 0.60, ry: 10.0, opacity: 0.67, blur: 0.12, z: 7 },
    { cell: 15, name: "Liam Evans", type: "Enquiry", quiet: "149 days quiet", x: 14.0, y: 46.0, w: 41.0, rz: 0.35, ry: 9.5, opacity: 0.36, blur: 0.72, z: 2 },
    { cell: 3, name: "Maya Collins", type: "Old quote", quiet: "136 days quiet", x: 22.0, y: 55.0, w: 40.5, rz: 0.40, ry: 9.5, opacity: 0.31, blur: 0.82, z: 1 },
    { cell: 21, name: "Tom Bennett", type: "Past customer", quiet: "188 days quiet", x: 1.5, y: 67.0, w: 38.0, rz: 0.60, ry: 10.0, opacity: 0.64, blur: 0.13, z: 7 },
    { cell: 11, name: "Hannah Brooks", type: "Enquiry", quiet: "142 days quiet", x: 33.0, y: 72.0, w: 38.0, rz: 0.50, ry: 10.0, opacity: 0.63, blur: 0.13, z: 7 },
  ] as const;

  const floatingAvatars = [
    { cell: 2, left: "46.5%", top: "4%", size: 54, opacity: 0.50 },
    { cell: 16, left: "76.5%", top: "10.5%", size: 54, opacity: 0.48 },
    { cell: 12, left: "88.5%", top: "32%", size: 52, opacity: 0.46 },
    { cell: 20, left: "43.5%", top: "65.5%", size: 50, opacity: 0.43 },
  ] as const;

  return (
    <div ref={visualRef} className="relative mx-auto aspect-[1000/780] w-full max-w-[1040px] lg:-ml-[16%] lg:-mt-[105px] lg:w-[122%] lg:max-w-none">
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
        viewBox="0 0 1000 780"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M 10 98 C 238 72, 478 84, 674 218 C 796 302, 850 418, 916 540" fill="none" stroke="#C98D74" strokeWidth="1.15" strokeDasharray="5 7" opacity=".42" />
        <path d="M 96 742 C 314 724, 452 624, 548 486 C 644 349, 756 286, 958 316" fill="none" stroke="#88945E" strokeWidth="1.05" strokeDasharray="4 7" opacity=".40" />
        <path d="M 354 15 C 568 26, 728 91, 814 208 C 888 309, 884 426, 842 510" fill="none" stroke="#D5C7B9" strokeWidth="1" opacity=".45" />
        <path d="M 370 146 C 546 150, 680 202, 742 300 C 784 366, 782 437, 754 502" fill="none" stroke="#DDB59F" strokeWidth=".85" opacity=".33" />
        <circle cx="674" cy="218" r="6" fill="#BF7458" opacity=".86" />
        <circle cx="842" cy="510" r="6" fill="#879653" opacity=".86" />
      </svg>

      {floatingAvatars.map((avatar, index) => (
        <div
          key={index}
          className="absolute z-[3]"
          style={{ left: avatar.left, top: avatar.top, opacity: avatar.opacity }}
        >
          <AutumnAvatar cell={avatar.cell} size={avatar.size} muted />
        </div>
      ))}

      {archiveCards.map((record, index) => (
        <div
          key={record.name + index}
          className="absolute"
          style={{
            left: record.x + "%",
            top: record.y + "%",
            width: record.w + "%",
            zIndex: record.z,
            opacity: record.opacity,
            filter: `blur(${record.blur}px)`,
          }}
        >
          <div
            className="rounded-[22px] border border-white/70 bg-[#FBF8F2]/92 px-4 py-4 shadow-[16px_22px_44px_rgba(70,54,40,.08)]"
            style={{
              transform: `perspective(1050px) rotateY(${record.ry}deg) rotateZ(${record.rz}deg)`,
              transformOrigin: "16% 50%",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="flex items-center gap-3">
              <AutumnAvatar cell={record.cell} size={record.name ? 58 : 54} muted />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12px] font-semibold text-[#59514B]">{record.name}</div>
                <div className="mt-1 text-[10px] text-[#7C736B]">{record.type}</div>
                <div className="mt-0.5 text-[10px] text-[#867D75]">{record.quiet}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="h-2.5 w-[76%] rounded-full bg-black/[0.065]" />
              <div className="h-2.5 w-[49%] rounded-full bg-black/[0.047]" />
            </div>
          </div>
        </div>
      ))}

      <div ref={sarahRef} className="absolute left-[24%] top-[23.5%] z-30 w-[62.5%]">
        <div
          className="rounded-[25px] border border-white/85 bg-[#FCF9F4]/[0.99] p-[22px] shadow-[26px_34px_76px_rgba(76,55,40,.19)]"
          style={{
            transform: "perspective(720px) rotateY(12.5deg) rotateZ(0.95deg)",
            transformOrigin: "13% 50%",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="flex items-start gap-[24px]">
            <div className="rounded-full bg-[#EBC5B3] p-[9px]">
              <AutumnAvatar cell={9} size={118} />
            </div>
            <div className="min-w-0 flex-1 pt-1">
              <div className="flex items-center justify-between gap-4">
                <div className="text-[22px] font-semibold tracking-[-0.035em] text-[#282522]">Sarah Mitchell</div>
                <span className="rounded-full bg-[#EAE9E4] px-3.5 py-2 text-[8px] font-bold uppercase tracking-[0.12em] text-[#6D6861]">Dormant</span>
              </div>
              <div className="mt-3 text-[15px] text-[#69615A]">
                Quote sent <span className="px-2 text-[#B0A69E]">•</span> A$4,800
              </div>
              <div className="mt-1.5 text-[15px] text-[#766E67]">167 days quiet</div>
              <div className="mt-5 space-y-2">
                <div className="h-3 w-[77%] rounded-full bg-black/[0.074]" />
                <div className="h-3 w-[52%] rounded-full bg-black/[0.055]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {connectorGeometry && (
        <svg
          className="pointer-events-none absolute inset-0 z-[34] h-full w-full overflow-visible"
          viewBox={`0 0 ${connectorGeometry.width} ${connectorGeometry.height}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {(() => {
            const { start, end } = connectorGeometry.orange;
            return (
              <>
                <path
                  d={`M ${start.x} ${start.y} C ${start.x} ${start.y + 34}, ${end.x - 26} ${end.y}, ${end.x} ${end.y}`}
                  fill="none"
                  stroke="#B75E3F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx={start.x} cy={start.y} r="5.5" fill="#B75E3F" />
                <circle cx={end.x} cy={end.y} r="5" fill="#B75E3F" />
              </>
            );
          })()}

          {(() => {
            const { start, end } = connectorGeometry.greenOne;
            return (
              <>
                <path
                  d={`M ${start.x} ${start.y} C ${start.x - 2} ${start.y + 34}, ${end.x - 24} ${end.y}, ${end.x} ${end.y}`}
                  fill="none"
                  stroke="#76834F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx={start.x} cy={start.y} r="5" fill="#76834F" />
                <circle cx={end.x} cy={end.y} r="5" fill="#76834F" />
              </>
            );
          })()}

          {(() => {
            const { start, end } = connectorGeometry.greenTwo;
            return (
              <>
                <path
                  d={`M ${start.x} ${start.y} C ${start.x} ${start.y + 35}, ${end.x - 25} ${end.y}, ${end.x} ${end.y}`}
                  fill="none"
                  stroke="#76834F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx={start.x} cy={start.y} r="5" fill="#76834F" />
                <circle cx={end.x} cy={end.y} r="5" fill="#76834F" />
              </>
            );
          })()}
        </svg>
      )}

      <div ref={outgoingRef} className="absolute left-[45%] top-[50.5%] z-40 w-[33%]">
        <div className="rounded-[17px] border border-[#E6D9CF] bg-white/[0.99] px-[18px] py-[14px] shadow-[0_18px_44px_rgba(74,53,39,.11)]">
          <div className="flex items-center gap-[14px]">
            <ZaplaPetal size={37} className="shrink-0" />
            <div>
              <div className="text-[14px] font-semibold leading-[1.4] text-[#292623]">Want us to update that quote?</div>
              <div className="mt-1.5 text-[9px] text-[#A0968C]">10:14 AM</div>
            </div>
          </div>
        </div>
      </div>

      <div ref={replyRef} className="absolute left-[53.5%] top-[63.8%] z-40 w-[38.5%]">
        <div className="rounded-[17px] border border-[#C7D0A7] bg-[#E8EBD9]/[0.99] px-[18px] py-[14px] shadow-[0_18px_44px_rgba(77,85,54,.11)]">
          <div className="flex items-center gap-3">
            <AutumnAvatar cell={9} size={46} />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold leading-[1.4] text-[#2E3128]">Yes. Please send me the latest pricing.</div>
              <div className="mt-1.5 flex items-center gap-2 text-[9px] text-[#7B8367]">
                10:27 AM <Check size={11} strokeWidth={2.4} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute left-[89.5%] top-[61.3%] z-50">
        <span className="absolute h-[18px] w-[3px] -rotate-[12deg] bg-[#70804B]" />
        <span className="absolute left-3 top-[-4px] h-[18px] w-[3px] rotate-[8deg] bg-[#70804B]" />
        <span className="absolute left-6 top-[2px] h-[16px] w-[3px] rotate-[28deg] bg-[#70804B]" />
      </div>

      <div ref={reopenedRef} className="absolute left-[58.5%] top-[78%] z-40 w-[35.5%]">
        <div className="flex items-center justify-between gap-4 rounded-[17px] border border-[#D5D7C5] bg-[#FAF8F2]/[0.99] px-[18px] py-[14px] shadow-[0_18px_44px_rgba(61,64,46,.095)]">
          <div className="flex min-w-0 items-center gap-3">
            <span className="h-3 w-3 shrink-0 rounded-full bg-[#879653]" />
            <div className="flex min-w-0 items-center gap-3.5">
              <div className="shrink-0 rounded-full bg-[#E5E8D5] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#637044]">Reopened</div>
              <div className="h-7 w-px shrink-0 bg-[#D5D3C9]" />
              <div className="min-w-0">
                <div className="whitespace-nowrap text-[11px] font-semibold text-[#373631]">Sarah is back</div>
                <div className="mt-1 whitespace-nowrap text-[9px] text-[#77726C]">Resumed conversation</div>
              </div>
            </div>
          </div>
          <ArrowRight size={16} className="shrink-0 text-[#5E6257]" />
        </div>
      </div>
    </div>
  );
}

function QuietMoments() {
  return (
    <section className="bg-[#FCFBF8] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow tone="muted">Where opportunities go quiet</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.056em] sm:text-[58px] lg:text-[70px]"
            style={{ fontFamily: DISPLAY }}
          >
            Some opportunities never really ended.
            <span className="block text-[#BF7458]">They just stopped moving.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <article className="relative min-h-[360px] overflow-hidden rounded-[30px] bg-[#BF7458] p-7 text-[#FFF9F5] sm:p-9">
              <div className="relative flex min-h-[290px] flex-col justify-between">
                <div className="text-[9px] font-semibold uppercase tracking-[0.19em] text-white/62">Old enquiries</div>
                <div>
                  <h3 className="max-w-[560px] text-[46px] font-medium leading-[0.94] tracking-[-0.058em] sm:text-[58px]" style={{ fontFamily: DISPLAY }}>
                    They asked.
                    <span className="block">Timing got in the way.</span>
                  </h3>
                  <p className="mt-6 max-w-[460px] text-[14px] leading-[1.68] text-white/72 sm:text-[15px]">
                    The interest was real. The conversation simply never made it to the next step.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal className="lg:col-span-5">
            <article className="relative min-h-[360px] overflow-hidden rounded-[30px] bg-[#F0D59D] p-7 text-[#24231E] sm:p-9">
              <div className="relative flex min-h-[290px] flex-col justify-between">
                <div className="text-[9px] font-semibold uppercase tracking-[0.19em] text-[#9B6722]">Stale quotes</div>
                <div>
                  <h3 className="max-w-[430px] text-[43px] font-medium leading-[0.94] tracking-[-0.058em] sm:text-[53px]" style={{ fontFamily: DISPLAY }}>
                    They didn't say no.
                    <span className="block">They stopped replying.</span>
                  </h3>
                  <p className="mt-6 max-w-[370px] text-[14px] leading-[1.68] text-[#5D563F]">
                    An older quote can still be an opportunity. It just needs a reason to come back into view.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal className="lg:col-span-12">
            <article className="grid min-h-[270px] overflow-hidden rounded-[30px] bg-[#DCE0CC] text-[#1A2018] sm:grid-cols-[0.78fr_1.22fr]">
              <div className="relative flex items-end p-7 sm:p-9">
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.19em] text-[#667044]">Past customers</div>
                  <h3 className="mt-7 text-[44px] font-medium leading-[0.93] tracking-[-0.057em] sm:text-[56px]" style={{ fontFamily: DISPLAY }}>
                    They already know you.
                  </h3>
                </div>
              </div>
              <div className="flex items-center border-t border-[#1A2018]/10 p-7 sm:border-l sm:border-t-0 sm:p-10">
                <div>
                  <div className="text-[34px] font-medium leading-[1] tracking-[-0.046em] text-[#49513B]" style={{ fontFamily: DISPLAY }}>
                    Nobody invited them back.
                  </div>
                  <p className="mt-5 max-w-[590px] text-[16px] leading-[1.7] text-[#59604D]">
                    The relationship already exists. Reopen gives the next conversation somewhere to start.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section
      id="how-reopen-works"
      className="relative overflow-hidden bg-[#E7E0EA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      <div className="pointer-events-none absolute right-[-8%] top-[-18%] h-[460px] w-[460px] rounded-full bg-white/26 blur-3xl" />
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <Reveal className="max-w-[570px]">
          <Eyebrow tone="muted">Not another database blast</Eyebrow>
          <h2
            className="mt-4 text-[43px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[58px] lg:text-[70px]"
            style={{ fontFamily: DISPLAY }}
          >
            Don't wake everyone up.
            <span className="block text-[#7E687F]">Wake the right ones.</span>
          </h2>
          <p className="mt-6 max-w-[540px] text-[15px] leading-[1.75] text-[#645D66] sm:text-[17px]">
            Reopen starts with selection, not sending. Active opportunities stay out. Recent contacts stay out. Unsubscribed people stay out. Only the right dormant records move forward.
          </p>

          <div className="mt-8 grid gap-3 text-[12px] font-semibold text-[#514C53] sm:grid-cols-2">
            {["Audience rules", "Controlled batches", "Stop on reply", "Human handoff"].map((item) => (
              <span key={item} className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/56 text-[#7E687F]">
                  <Check size={13} strokeWidth={2.5} />
                </span>
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="relative mx-auto max-w-[720px]">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
              {AUDIENCE.map((person, index) => (
                <AudiencePerson key={index} person={person} index={index} />
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#7E687F]/15 pt-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#776E79]">
                6 records selected for this audience
              </div>
              <div className="flex items-center gap-4 text-[10px] font-semibold text-[#776E79]">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#7E687F]" />
                  Eligible
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#AAA1AA]" />
                  Excluded
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AudiencePerson({
  person,
  index,
}: {
  person: (typeof AUDIENCE)[number];
  index: number;
}) {
  const reduced = !!useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : index * 0.035, ease: EASE }}
      className={
        "relative flex min-h-[158px] flex-col items-center justify-center rounded-[22px] border px-3 py-4 text-center " +
        (person.selected
          ? "border-[#7E687F]/22 bg-white/60 shadow-[0_14px_36px_rgba(83,70,87,.08)]"
          : "border-white/30 bg-white/22")
      }
    >
      <AutumnAvatar cell={person.cell} size={54} muted={!person.selected} />
      <div className={"mt-3 text-[10px] font-semibold " + (person.selected ? "text-[#3D3940]" : "text-[#8A818B]")}>
        {person.label}
      </div>
      <div
        className={
          "mt-2 rounded-full px-2 py-1 text-[8px] font-bold uppercase tracking-[0.1em] " +
          (person.selected
            ? "bg-[#7E687F]/10 text-[#7E687F]"
            : "bg-black/[0.035] text-[#9A929B]")
        }
      >
        {person.selected ? "Select" : "Exclude"}
      </div>
    </motion.div>
  );
}

function ReopenedStory() {
  return (
    <section className="bg-[#F3EBDD] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>Context stays attached</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[60px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            A reply doesn't become a brand-new lead.
            <span className="block text-[#BF7458]">It reopens the same customer story.</span>
          </h2>
          <p className="mt-6 max-w-[720px] text-[15px] leading-[1.75] text-[#6A625B] sm:text-[17px]">
            The enquiry, quote, notes and messages stay with the same customer record, so your team picks up where the conversation left off.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:gap-6">
          <Reveal>
            <div className="h-full rounded-[28px] border border-[#D8CABC] bg-white/50 p-6 sm:p-8">
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8D8176]">History that stays attached</div>
              <div className="relative mt-8">
                <div className="absolute bottom-4 left-[15px] top-4 w-px bg-[#D9CFC3]" />
                {[
                  ["12 FEB", "Enquiry received", "Asked about pricing and timing."],
                  ["14 FEB", "Quote sent", "A$4,800 proposal sent."],
                  ["28 FEB", "Conversation went quiet", "No reply after the quote."],
                  ["08 AUG", "Reopen selected the record", "Eligible for a new conversation."],
                ].map(([date, title, copy], index) => (
                  <div key={title} className="relative grid grid-cols-[32px_1fr] gap-4 pb-7 last:pb-0">
                    <span
                      className="relative z-10 mt-1 h-[10px] w-[10px] rounded-full border-2 border-[#F3EBDD]"
                      style={{ backgroundColor: ["#C2A07B", "#DDA34B", "#9A9870", "#BF7458"][index] }}
                    />
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#9A8E83]">{date}</div>
                      <div className="mt-1.5 text-[15px] font-semibold text-[#2C2926]">{title}</div>
                      <div className="mt-1 text-[12px] leading-[1.55] text-[#716A63]">{copy}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="relative min-h-[520px] overflow-hidden rounded-[28px] bg-[#1E2B29] p-6 text-[#F7F4EE] sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-[#BF7458]/12 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-4">
                  <AutumnAvatar cell={9} size={72} />
                  <div>
                    <div className="text-[24px] font-semibold tracking-[-0.035em]">Sarah Nguyen</div>
                    <div className="mt-1 text-[11px] text-white/42">Existing customer record · 5 months quiet</div>
                  </div>
                </div>

                <div className="mt-9 max-w-[490px] rounded-[20px] bg-[#E7CEC2] px-5 py-5 text-[#2B2926] shadow-[0_16px_42px_rgba(0,0,0,.12)]">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#9C6756]">Reopen</div>
                  <div className="mt-3 text-[17px] font-medium leading-[1.48] tracking-[-0.015em]">
                    Hi Sarah, want us to update the quote we sent earlier this year?
                  </div>
                </div>

                <div className="ml-auto mt-5 max-w-[430px] rounded-[20px] border border-white/10 bg-white/[0.055] px-5 py-5">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/40">Sarah replied</div>
                  <div className="mt-3 text-[18px] font-medium leading-[1.45] tracking-[-0.018em] text-white/94">
                    Yes. Please send me the latest pricing.
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2.5 border-t border-white/10 pt-6">
                  {["Outreach stopped", "Conversation reopened", "Routed to Sales"].map((item) => (
                    <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white/[0.055] px-3 py-2 text-[10px] font-semibold text-white/68">
                      <Check size={11} className="text-[#B9C88C]" strokeWidth={2.5} />
                      {item}
                    </span>
                  ))}
                </div>

                <p className="mt-8 max-w-[620px] text-[12px] leading-[1.65] text-white/46">
                  The reply does not become a brand new lead. The enquiry, quote, notes and messages stay with the same customer record.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CommercialPaths() {
  return (
    <section className="bg-[#F7F5F1] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1220px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>Two ways to use Reopen</Eyebrow>
          <h2
            className="mt-4 text-[43px] font-medium leading-[0.96] tracking-[-0.056em] sm:text-[58px] lg:text-[68px]"
            style={{ fontFamily: DISPLAY }}
          >
            Use Reopen yourself.
            <span className="block text-[#BF7458]">Or let us run the first campaign.</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full min-h-[400px] flex-col rounded-[28px] bg-[#E7E0EA] p-6 sm:p-8">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7E687F]">Growth</div>
              <h3 className="mt-5 max-w-[460px] text-[36px] font-medium leading-[0.98] tracking-[-0.048em]" style={{ fontFamily: DISPLAY }}>
                Reopen whenever the business needs it.
              </h3>
              <p className="mt-5 max-w-[500px] text-[14px] leading-[1.7] text-[#655D66]">
                Build the audience, run targeted reactivation and keep the capability inside Zapla for ongoing use.
              </p>

              <div className="mt-9 border-t border-[#7E687F]/16 pt-6">
                <div className="text-[31px] font-semibold tracking-[-0.04em] text-[#28242A]">
                  A$699
                  <span className="ml-1 text-[12px] font-medium tracking-normal text-[#706972]">/mo + GST</span>
                </div>
                <div className="mt-1 text-[11px] text-[#827A84]">Guided Launch from A$2,997 + GST</div>
              </div>

              <a href={PRICING_URL} className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-[12.5px] font-semibold text-[#332E35]">
                View Growth <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <div className="flex h-full min-h-[400px] flex-col rounded-[28px] bg-[#1E2B29] p-6 text-[#F7F4EE] sm:p-8">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#DDA34B]">Ghost to Gold</div>
              <h3 className="mt-5 max-w-[480px] text-[36px] font-medium leading-[0.98] tracking-[-0.048em]" style={{ fontFamily: DISPLAY }}>
                Want us to run the Reopen campaign for you?
              </h3>
              <p className="mt-5 max-w-[510px] text-[14px] leading-[1.7] text-white/56">
                Ghost to Gold is the done for you offer. Zapla can build and launch the campaign, or manage the response flow as well.
              </p>

              <div className="mt-9 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/36">Sprint</div>
                  <div className="mt-2 text-[23px] font-semibold">From A$997</div>
                  <div className="mt-1 text-[10px] text-white/42">+ GST</div>
                </div>
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/36">Managed</div>
                  <div className="mt-2 text-[23px] font-semibold">From A$1,497</div>
                  <div className="mt-1 text-[10px] text-white/42">+ GST</div>
                </div>
              </div>

              <a href={BOOK_URL} className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-[12.5px] font-semibold text-[#F7F4EE]">
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
    <section className="bg-[#F3EBDD] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[980px]">
        <Reveal className="max-w-[760px]">
          <Eyebrow tone="muted">FAQ</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.97] tracking-[-0.052em] sm:text-[54px]"
            style={{ fontFamily: DISPLAY }}
          >
            Questions before you reopen old conversations.
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-[#D8CFC3] border-y border-[#D8CFC3]">
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
        <span className="text-[14px] font-semibold text-[#2E2A27] sm:text-[15px]">{q}</span>
        <ChevronDown
          size={17}
          className={"shrink-0 text-[#746D66] transition-transform " + (open ? "rotate-180" : "")}
        />
      </button>
      {open && (
        <div className="max-w-[820px] pb-5 pr-10 text-[13.5px] leading-[1.75] text-[#69635E]">
          {a}
        </div>
      )}
    </div>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#BF7458] px-5 py-20 text-[#FFF9F5] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full bg-[#F0D59D]/16 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[320px] w-[320px] rounded-full bg-[#E7E0EA]/12 blur-3xl" />

      <div className="relative mx-auto max-w-[1080px] text-center">
        <Reveal>
          <Eyebrow tone="light">Before you buy another lead</Eyebrow>
          <h2
            className="mx-auto mt-5 max-w-[960px] text-[45px] font-medium leading-[0.93] tracking-[-0.058em] sm:text-[62px] lg:text-[76px]"
            style={{ fontFamily: DISPLAY }}
          >
            Look at the conversations you already paid to start.
          </h2>
          <p className="mx-auto mt-6 max-w-[650px] text-[15px] leading-[1.75] text-white/72">
            Reopen the ones that still have somewhere to go.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={BOOK_URL}
              className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px"
            >
              Book a Call <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
