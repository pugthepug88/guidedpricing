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
import pCustomer from "@/assets/portrait-customer.jpg.asset.json";

type Moment = {
  kind: "enquiry" | "conversation" | "followup" | "booking" | "payment" | "review";
  label: string;
  icon: LucideIcon;
  accent: string;
  soft: string;
  x: number;
  y: number;
};

const MOMENTS: Moment[] = [
  {
    kind: "enquiry",
    label: "Enquiry",
    icon: Phone,
    accent: "#F17364",
    soft: "#FFF0EC",
    x: 16,
    y: 17,
  },
  {
    kind: "conversation",
    label: "Conversation",
    icon: MessageSquareText,
    accent: "#D45B8A",
    soft: "#FCECF3",
    x: 84,
    y: 17,
  },
  {
    kind: "followup",
    label: "Follow-up",
    icon: Workflow,
    accent: "#A97ABB",
    soft: "#F3ECF8",
    x: 16,
    y: 50,
  },
  {
    kind: "booking",
    label: "Booking",
    icon: CalendarDays,
    accent: "#2563FF",
    soft: "#EAF0FF",
    x: 84,
    y: 50,
  },
  {
    kind: "payment",
    label: "Payment",
    icon: CreditCard,
    accent: "#99965E",
    soft: "#F3F2E8",
    x: 16,
    y: 81,
  },
  {
    kind: "review",
    label: "Review",
    icon: Star,
    accent: "#E99A3A",
    soft: "#FFF4E5",
    x: 84,
    y: 81,
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
  const personScale = 0.86 + scene * 0.34;
  const sketchOpacity = 1 - smoothstep(0.12, 0.78, progress);
  const colourOpacity = smoothstep(0.12, 0.82, progress);
  const cardScale = 1 - scene * 0.42;
  const cardOpacity = 1 - smoothstep(0.58, 0.92, progress) * 0.97;
  const inward = scene * 0.08;
  const endLabelOpacity = smoothstep(0.82, 0.95, progress);

  return (
    <div ref={ref} className="relative mt-12 h-[300vh]">
      <div className="sticky top-[66px] flex h-[calc(100vh-66px)] items-center overflow-hidden">
        <div className="relative mx-auto h-[650px] max-h-[calc(100vh-100px)] min-h-[550px] w-full max-w-[1280px]">
          <div
            className="pointer-events-none absolute left-1/2 top-[51%] h-[76%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle at center, rgba(37,99,255,0.105), rgba(212,91,138,0.045) 34%, rgba(255,255,255,0) 72%)",
              opacity: 0.28 + scene * 0.72,
            }}
          />

          <div
            className="pointer-events-none absolute left-1/2 top-[52%] h-[86%] -translate-x-1/2 -translate-y-1/2"
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
            const y = moment.y + (52 - moment.y) * inward;
            return (
              <div
                key={moment.kind}
                className="absolute z-20 w-[314px]"
                style={{
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
            className="absolute bottom-[2.5%] left-1/2 -translate-x-1/2 rounded-full border border-[#DDE3EC] bg-white/94 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#6D7686] shadow-sm backdrop-blur"
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
      <div className="mb-3 px-1 text-[16px] font-semibold tracking-[-0.025em] text-[#171A20]">
        {moment.label}
      </div>

      <div className="overflow-hidden rounded-[15px] border border-[#E2E5EA] bg-white shadow-[0_8px_20px_rgba(24,38,64,.045)]">
        <MomentBody moment={moment} />
      </div>
    </div>
  );
}

function MomentHeader({ moment, title, meta }: { moment: Moment; title: string; meta: string }) {
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
      <img src={pCustomer.url} alt="" className="h-7 w-7 rounded-full object-cover ring-2 ring-white" />
    </div>
  );
}

function MomentBody({ moment }: { moment: Moment }) {
  if (moment.kind === "enquiry") {
    return (
      <>
        <MomentHeader moment={moment} title="Incoming call" meta="Emma Wilson · just now" />
        <div className="bg-[#FBFCFE] px-4 py-3.5">
          <div className="rounded-[10px] bg-white px-3 py-2.5 text-[10px] leading-[1.48] text-[#596474] ring-1 ring-[#E6EAF0]">
            “Calling about a quote for a bathroom renovation next month…”
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[8.5px] font-semibold" style={{ color: moment.accent }}>
              <Sparkles size={10} /> AI transcribed
            </span>
            <span className="text-[8.5px] font-medium text-[#7B8595]">Added to customer</span>
          </div>
        </div>
      </>
    );
  }

  if (moment.kind === "conversation") {
    return (
      <>
        <MomentHeader moment={moment} title="SMS conversation" meta="Emma Wilson · same history" />
        <div className="bg-[#FBFCFE] px-4 py-3.5">
          <div className="max-w-[88%] rounded-[12px] rounded-bl-[4px] bg-white px-3 py-2 text-[9.5px] leading-[1.45] text-[#596474] ring-1 ring-[#E6EAF0]">
            Can I move my 3pm to Thursday?
          </div>
          <div className="mt-2 ml-auto max-w-[82%] rounded-[12px] rounded-br-[4px] px-3 py-2 text-[9.5px] leading-[1.45] text-[#394456]" style={{ backgroundColor: moment.soft }}>
            Thursday at 2 works. I’ll update it now.
          </div>
        </div>
      </>
    );
  }

  if (moment.kind === "followup") {
    const steps = [
      ["Lead captured", true],
      ["Welcome SMS sent", true],
      ["Follow-up paused after reply", false],
    ] as const;

    return (
      <>
        <MomentHeader moment={moment} title="Workflow running" meta="Enquiry → nurture" />
        <div className="space-y-2 bg-[#FBFCFE] px-4 py-3.5">
          {steps.map(([label, done], index) => (
            <div key={label} className="flex items-center gap-2.5 rounded-[9px] bg-white px-2.5 py-2 ring-1 ring-[#E9ECF1]">
              <span
                className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[8px] font-bold"
                style={{ backgroundColor: done ? "#EAF8F1" : moment.soft, color: done ? "#159767" : moment.accent }}
              >
                {done ? "✓" : index + 1}
              </span>
              <span className={"text-[9.5px] " + (done ? "text-[#87909E]" : "font-semibold text-[#313B4B]")}>{label}</span>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (moment.kind === "booking") {
    return (
      <>
        <MomentHeader moment={moment} title="Booking confirmed" meta="Emma Wilson · consultation" />
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
        <MomentHeader moment={moment} title="Invoice paid" meta="INV-2841 · Emma Wilson" />
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
      <MomentHeader moment={moment} title="New 5-star review" meta="Auto-requested after completed work" />
      <div className="bg-[#FBFCFE] px-4 py-3.5">
        <div className="flex items-center gap-2">
          <img src={pCustomer.url} alt="" className="h-8 w-8 rounded-full object-cover ring-2 ring-white" />
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
