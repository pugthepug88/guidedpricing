import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  MessageSquareText,
  Phone,
  Sparkles,
  Star,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import heroColor from "@/assets/connected-hero-color.png.asset.json";
import heroSketch from "@/assets/connected-hero-sketch.png.asset.json";

const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

type Moment = {
  kind: "enquiry" | "conversation" | "pipeline" | "booking" | "payment" | "review";
  label: string;
  icon: LucideIcon;
  accent: string;
  soft: string;
  x: number;
  y: number;
  width: number;
};

const MOMENTS: Moment[] = [
  {
    kind: "enquiry",
    label: "Enquiry",
    icon: Phone,
    accent: "#F17364",
    soft: "#FFF0EC",
    x: 16,
    y: 14,
    width: 326,
  },
  {
    kind: "conversation",
    label: "Conversation",
    icon: MessageSquareText,
    accent: "#D45B8A",
    soft: "#FCECF3",
    x: 83,
    y: 20,
    width: 302,
  },
  {
    kind: "pipeline",
    label: "Pipeline & follow-up",
    icon: Workflow,
    accent: "#A97ABB",
    soft: "#F3ECF8",
    x: 18,
    y: 49,
    width: 314,
  },
  {
    kind: "booking",
    label: "Booking",
    icon: CalendarDays,
    accent: "#2563FF",
    soft: "#EAF0FF",
    x: 86,
    y: 46,
    width: 288,
  },
  {
    kind: "payment",
    label: "Payment",
    icon: CreditCard,
    accent: "#99965E",
    soft: "#F3F2E8",
    x: 15,
    y: 82,
    width: 300,
  },
  {
    kind: "review",
    label: "Review",
    icon: Star,
    accent: "#E99A3A",
    soft: "#FFF4E5",
    x: 81,
    y: 79,
    width: 320,
  },
];

export function PlatformConnectedSystemScene() {
  const reduced = !!useReducedMotion();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  return (
    <section className="relative overflow-x-clip border-b border-[#E4E8EF] bg-[#FCFCFA] px-5 pb-16 pt-[112px] text-[#111318] sm:px-10 sm:pb-20 sm:pt-[120px] lg:px-16 lg:pb-24 lg:pt-[122px]">
      <div className="pointer-events-none absolute -left-[12%] top-[18%] h-[520px] w-[520px] rounded-full bg-[#DDE7FF]/30 blur-[170px]" />
      <div className="pointer-events-none absolute -right-[10%] top-[32%] h-[420px] w-[420px] rounded-full bg-[#F7DED5]/22 blur-[165px]" />

      <div className="relative mx-auto max-w-[1380px]">
        <div className="mx-auto max-w-[960px] text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#58706F]">
            Zapla Platform
          </div>

          <h1 className="mx-auto mt-5 max-w-[900px] font-zapla text-[40px] font-medium leading-[0.99] tracking-[-0.052em] sm:text-[48px] lg:text-[54px]">
            <span className="block">One customer.</span>
            <span className="block text-[#2563FF]">One connected system.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[960px] text-[15px] font-medium leading-[1.65] text-[#5F655F] sm:text-[17px]">
            When someone enquires, replies, books, pays, leaves a review or comes back months later, Zapla keeps that activity attached to the same customer story, so the next step can change with it.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#platform-map"
              className="inline-flex h-[52px] items-center rounded-full border border-[#D8D0C5] bg-white px-7 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#C7BDAF]"
            >
              Explore the platform
            </a>
            <a
              href="https://zapla.io/booking"
              className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#1E2B29] px-7 text-[13px] font-semibold text-[#F7F4EE] shadow-[0_12px_28px_rgba(30,43,41,.14)] transition-transform hover:-translate-y-px"
            >
              Book a Call <ArrowRight size={15} />
            </a>
          </div>
        </div>

        {desktop && !reduced ? <DesktopContextScene /> : <StaticContextScene />}
      </div>
    </section>
  );
}

function DesktopContextScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    let raf = 0;
    const update = () => {
      const total = Math.max(1, section.scrollHeight - window.innerHeight);
      const value = (window.scrollY - section.offsetTop) / total;
      setProgress(Math.max(0, Math.min(1, value)));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scene = smoothstep(0.10, 0.84, progress);
  const personScale = 0.88 + scene * 0.24;
  const sketchOpacity = 1 - smoothstep(0.12, 0.78, progress);
  const colourOpacity = smoothstep(0.12, 0.82, progress);
  const cardScale = 1 - scene * 0.40;
  const cardOpacity = 1 - smoothstep(0.60, 0.92, progress) * 0.97;
  const inward = scene * 0.055;
  const endLabelOpacity = smoothstep(0.82, 0.95, progress);

  return (
    <div ref={ref} className="relative mt-12 h-[300vh]">
      <div className="sticky top-[66px] flex h-[calc(100vh-66px)] items-center overflow-hidden">
        <div className="relative mx-auto h-[650px] max-h-[calc(100vh-96px)] min-h-[540px] w-full max-w-[1280px]">
          <div
            className="pointer-events-none absolute left-1/2 top-[53%] h-[72%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle at center, rgba(37,99,255,0.10), rgba(212,91,138,0.042) 34%, rgba(255,255,255,0) 72%)",
              opacity: 0.26 + scene * 0.74,
            }}
          />

          <div
            className="pointer-events-none absolute left-1/2 top-[55%] h-[74%] -translate-x-1/2 -translate-y-1/2"
            style={{ transform: `translate(-50%, -50%) scale(${personScale})` }}
          >
            <motion.img
              src={heroSketch.url}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute left-1/2 top-1/2 h-full w-auto max-w-none -translate-x-1/2 -translate-y-1/2 select-none object-contain"
              animate={{ opacity: sketchOpacity }}
              transition={{ duration: 0.08 }}
            />
            <motion.img
              src={heroColor.url}
              alt="A customer at the centre of a connected customer journey"
              draggable={false}
              className="absolute left-1/2 top-1/2 h-full w-auto max-w-none -translate-x-1/2 -translate-y-1/2 select-none object-contain"
              animate={{ opacity: colourOpacity }}
              transition={{ duration: 0.08 }}
            />
          </div>

          {MOMENTS.map((moment) => {
            const x = moment.x + (50 - moment.x) * inward;
            const y = moment.y + (54 - moment.y) * inward;
            return (
              <div
                key={moment.kind}
                className="absolute z-20"
                style={{
                  width: moment.width,
                  left: `${x}%`,
                  top: `${y}%`,
                  opacity: cardOpacity,
                  transform: `translate(-50%, -50%) scale(${cardScale})`,
                  transformOrigin: "center center",
                }}
              >
                <MomentCard moment={moment} />
              </div>
            );
          })}

          <div
            className="absolute bottom-[1.5%] left-1/2 -translate-x-1/2 rounded-full border border-[#DDE3EC] bg-white/94 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#6D7686] shadow-sm backdrop-blur"
            style={{ opacity: endLabelOpacity }}
          >
            One customer · one history
          </div>
        </div>
      </div>
    </div>
  );
}

function MomentCard({ moment }: { moment: Moment }) {
  return (
    <div className="rounded-[22px] bg-[#F1F2F4] p-3.5 shadow-[0_10px_28px_rgba(24,38,64,.045)]">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="text-[15px] font-semibold tracking-[-0.025em] text-[#171A20]">{moment.label}</div>
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: moment.accent }} />
      </div>
      <div className="overflow-hidden rounded-[15px] border border-[#E2E5EA] bg-white shadow-[0_8px_20px_rgba(24,38,64,.045)]">
        <MomentBody moment={moment} />
      </div>
    </div>
  );
}

function HomepageAvatar({ size = 28, cell = 0 }: { size?: number; cell?: number }) {
  const column = cell % 6;
  const row = Math.floor(cell / 6);
  return (
    <span
      className="shrink-0 overflow-hidden rounded-full border-2 border-white shadow-[0_4px_12px_rgba(35,53,76,.10)]"
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${PORTRAIT_SHEET})`,
        backgroundPosition: `${(column / 5) * 100}% ${(row / 3) * 100}%`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
        backgroundColor: "#B98278",
      }}
      aria-hidden="true"
    />
  );
}

function CardHeader({
  moment,
  title,
  meta,
}: {
  moment: Moment;
  title: string;
  meta: string;
}) {
  const Icon = moment.icon;
  return (
    <div className="flex items-center gap-3 border-b border-[#EDF0F4] px-4 py-3.5">
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px]"
        style={{ backgroundColor: moment.soft, color: moment.accent }}
      >
        <Icon size={16} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[11.5px] font-semibold text-[#222C3B]">{title}</div>
        <div className="mt-0.5 text-[9px] text-[#858E9D]">{meta}</div>
      </div>
      <HomepageAvatar size={28} cell={0} />
    </div>
  );
}

function MomentBody({ moment }: { moment: Moment }) {
  if (moment.kind === "enquiry") {
    return (
      <>
        <CardHeader moment={moment} title="Incoming call" meta="Emma Wilson · just now" />
        <div className="bg-[#FBFCFE] px-4 py-3.5">
          <div className="rounded-[12px] px-3 py-3" style={{ backgroundColor: moment.soft }}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm" style={{ color: moment.accent }}>
                <Phone size={15} />
              </div>
              <div className="flex flex-1 items-end justify-center gap-[3px]">
                {[10, 18, 13, 24, 16, 28, 12, 20, 9, 17, 12, 23, 14, 19].map((height, index) => (
                  <span
                    key={index}
                    className="w-[3px] rounded-full"
                    style={{ height, backgroundColor: moment.accent, opacity: 0.42 + (index % 3) * 0.18 }}
                  />
                ))}
              </div>
              <div className="text-right">
                <div className="text-[10px] font-semibold text-[#303947]">00:42</div>
                <div className="mt-0.5 text-[7.5px] font-bold uppercase tracking-[0.08em]" style={{ color: moment.accent }}>AI listening</div>
              </div>
            </div>
          </div>
          <div className="mt-2.5 truncate rounded-[9px] bg-white px-3 py-2 text-[9px] text-[#697382] ring-1 ring-[#E7EBF1]">
            “Calling about a bathroom renovation next month…”
          </div>
        </div>
      </>
    );
  }

  if (moment.kind === "conversation") {
    return (
      <>
        <CardHeader moment={moment} title="SMS conversation" meta="Emma Wilson · same history" />
        <div className="bg-[#FBFCFE] px-4 py-3.5">
          <div className="max-w-[88%] rounded-[12px] rounded-bl-[4px] bg-white px-3 py-2 text-[9.5px] leading-[1.45] text-[#596474] ring-1 ring-[#E6EAF0]">
            Can I move my 3pm to Thursday?
          </div>
          <div className="mt-2 ml-auto max-w-[82%] rounded-[12px] rounded-br-[4px] px-3 py-2 text-[9.5px] leading-[1.45] text-[#394456]" style={{ backgroundColor: moment.soft }}>
            Thursday at 2 works.
          </div>
          <div className="mt-2 text-right text-[8px] font-medium text-[#9199A5]">SMS · synced to customer history</div>
        </div>
      </>
    );
  }

  if (moment.kind === "pipeline") {
    const stages = ["Lead", "Qualified", "Proposal", "Won"];
    return (
      <>
        <CardHeader moment={moment} title="Opportunity updated" meta="Bathroom renovation · $4,800" />
        <div className="bg-[#FBFCFE] px-4 py-3.5">
          <div className="grid grid-cols-4 gap-1.5">
            {stages.map((stage, index) => (
              <div
                key={stage}
                className="rounded-full px-1 py-1.5 text-center text-[7.5px] font-bold"
                style={{
                  backgroundColor: index < 2 ? "#EAF8F1" : index === 2 ? moment.soft : "#EEF0F3",
                  color: index < 2 ? "#428B69" : index === 2 ? moment.accent : "#A2A9B4",
                }}
              >
                {stage}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-[10px] bg-white px-3 py-2.5 ring-1 ring-[#E7EBF1]">
            <span className="grid h-5 w-5 place-items-center rounded-full text-[8px] font-bold" style={{ backgroundColor: moment.soft, color: moment.accent }}>3</span>
            <div className="flex-1">
              <div className="text-[9px] font-semibold text-[#344052]">Next action</div>
              <div className="mt-0.5 text-[8.5px] text-[#7C8696]">Follow up automatically in 2 days</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (moment.kind === "booking") {
    return (
      <>
        <CardHeader moment={moment} title="Booking confirmed" meta="Emma Wilson · consultation" />
        <div className="grid grid-cols-[62px_1fr] items-center gap-3 bg-[#FBFCFE] px-4 py-3.5">
          <div className="overflow-hidden rounded-[11px] bg-white text-center ring-1 ring-[#DFE5ED]">
            <div className="py-1 text-[7px] font-bold uppercase tracking-[0.08em] text-white" style={{ backgroundColor: moment.accent }}>Thu</div>
            <div className="py-2 text-[20px] font-semibold leading-none text-[#232D3C]">14</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#263142]">2:00 PM · 45 min</div>
            <div className="mt-1 text-[9px] text-[#7B8595]">Calendar updated automatically</div>
            <div className="mt-2 flex items-center gap-1.5 text-[8.5px] font-semibold" style={{ color: moment.accent }}>
              <CheckCircle2 size={10} /> Confirmation sent
            </div>
          </div>
        </div>
      </>
    );
  }

  if (moment.kind === "payment") {
    return (
      <>
        <CardHeader moment={moment} title="Invoice paid" meta="INV-2841 · Emma Wilson" />
        <div className="flex items-end justify-between gap-4 bg-[#FBFCFE] px-4 py-4">
          <div>
            <div className="text-[8px] font-bold uppercase tracking-[0.11em] text-[#8A93A2]">Amount received</div>
            <div className="mt-1 text-[24px] font-semibold tracking-[-0.04em] text-[#1E2837]">$1,250.00</div>
            <div className="mt-1 text-[8.5px] text-[#7B8595]">Visa ending 4242 · today 3:12 PM</div>
          </div>
          <span className="rounded-full px-2.5 py-1 text-[7px] font-bold" style={{ backgroundColor: moment.soft, color: moment.accent }}>PAID</span>
        </div>
      </>
    );
  }

  return (
    <>
      <CardHeader moment={moment} title="New 5-star review" meta="Requested after completed work" />
      <div className="bg-[#FBFCFE] px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <HomepageAvatar size={30} cell={0} />
          <div>
            <div className="text-[10.5px] font-semibold text-[#263142]">Emma Wilson</div>
            <div className="mt-0.5 flex gap-0.5" style={{ color: moment.accent }}>
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={11} fill="currentColor" />)}
            </div>
          </div>
        </div>
        <div className="mt-2.5 rounded-[10px] bg-white px-3 py-2.5 text-[9.5px] leading-[1.5] text-[#596474] ring-1 ring-[#E6EAF0]">
          “Absolutely brilliant service from start to finish.”
        </div>
      </div>
    </>
  );
}

function StaticContextScene() {
  return (
    <div className="mx-auto mt-12 max-w-[980px]">
      <div className="relative mx-auto h-[350px] w-[270px]">
        <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(37,99,255,0.09),rgba(212,91,138,0.04)_42%,transparent_72%)]" />
        <img
          src={heroColor.url}
          alt="A customer at the centre of a connected customer journey"
          className="relative h-full w-full object-contain"
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {MOMENTS.map((moment) => (
          <MomentCard key={moment.kind} moment={moment} />
        ))}
      </div>
    </div>
  );
}

function smoothstep(start: number, end: number, value: number) {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
}
