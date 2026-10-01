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
} from "lucide-react";
import heroColor from "@/assets/connected-hero-color.png.asset.json";
import heroSketch from "@/assets/connected-hero-sketch.png.asset.json";

const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

type Moment = {
  kind: "enquiry" | "conversation" | "pipeline" | "booking" | "payment" | "review";
  label: string;
  accent: string;
  soft: string;
  x: number;
  y: number;
  width: number;
};

const MOMENTS: Moment[] = [
  { kind: "enquiry", label: "Enquiry", accent: "#BF7458", soft: "#F3E5DF", x: 16, y: 13, width: 300 },
  { kind: "conversation", label: "Conversation", accent: "#8E657A", soft: "#F0E6EB", x: 84, y: 18, width: 286 },
  { kind: "pipeline", label: "Pipeline & follow-up", accent: "#85845D", soft: "#ECECE3", x: 14, y: 48, width: 296 },
  { kind: "booking", label: "Booking", accent: "#0E777B", soft: "#E2F0EF", x: 87, y: 44, width: 274 },
  { kind: "payment", label: "Payment", accent: "#C89A5D", soft: "#F2E9DD", x: 19, y: 82, width: 280 },
  { kind: "review", label: "Review", accent: "#D69672", soft: "#F4E7DF", x: 82, y: 79, width: 300 },
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
      <div className="pointer-events-none absolute -left-[12%] top-[18%] h-[520px] w-[520px] rounded-full bg-[#DDE7FF]/28 blur-[170px]" />
      <div className="pointer-events-none absolute -right-[10%] top-[32%] h-[420px] w-[420px] rounded-full bg-[#EAD9CF]/20 blur-[165px]" />

      <div className="relative mx-auto max-w-[1380px]">
        <div className="mx-auto max-w-[960px] text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#58706F]">Zapla Platform</div>

          <h1 className="mx-auto mt-5 max-w-[900px] font-zapla text-[40px] font-medium leading-[0.99] tracking-[-0.052em] sm:text-[48px] lg:text-[54px]">
            <span className="block">One customer.</span>
            <span className="block text-[#2563FF]">One connected system.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[960px] text-[15px] font-medium leading-[1.65] text-[#5F655F] sm:text-[17px]">
            When someone enquires, replies, books, pays, leaves a review or comes back months later, Zapla keeps that activity attached to the same customer story, so the next step can change with it.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#platform-map" className="inline-flex h-[52px] items-center rounded-full border border-[#D8D0C5] bg-white px-7 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#C7BDAF]">
              Explore the platform
            </a>
            <a href="https://zapla.io/booking" className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#1E2B29] px-7 text-[13px] font-semibold text-[#F7F4EE] shadow-[0_12px_28px_rgba(30,43,41,.14)] transition-transform hover:-translate-y-px">
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

  // One shared transformation: the cards collapse inward together while the
  // central customer grows and receives the colour.
  const collapse = smoothstep(0.18, 0.84, progress);
  const personScale = 1.0 + collapse * 0.27;
  const sketchOpacity = 1 - collapse;
  const colourOpacity = collapse;
  const cardScale = 1 - collapse * 0.72;
  const cardOpacity = 1 - smoothstep(0.56, 0.90, collapse);
  const cardBlur = collapse * 1.4;
  const inward = collapse * 0.76;
  const endLabelOpacity = smoothstep(0.84, 0.96, progress);

  return (
    <div ref={ref} className="relative mt-12 h-[285vh]">
      <div className="sticky top-[66px] flex h-[calc(100vh-66px)] items-center overflow-hidden">
        <div className="relative mx-auto h-[650px] max-h-[calc(100vh-96px)] min-h-[540px] w-full max-w-[1280px]">
          <div
            className="pointer-events-none absolute left-1/2 top-[57%] h-[76%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle at center, rgba(37,99,255,0.105), rgba(214,150,114,0.045) 35%, rgba(255,255,255,0) 72%)",
              opacity: 0.22 + collapse * 0.78,
            }}
          />

          <div
            className="pointer-events-none absolute left-1/2 top-[59%] h-[82%]"
            style={{ transform: `translate(-50%, -50%) scale(${personScale})` }}
          >
            <motion.img
              src={heroSketch.url}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute left-1/2 top-1/2 h-full w-auto max-w-none -translate-x-1/2 -translate-y-1/2 select-none object-contain"
              animate={{ opacity: sketchOpacity }}
              transition={{ duration: 0.06 }}
            />
            <motion.img
              src={heroColor.url}
              alt="A customer at the centre of a connected customer journey"
              draggable={false}
              className="absolute left-1/2 top-1/2 h-full w-auto max-w-none -translate-x-1/2 -translate-y-1/2 select-none object-contain"
              animate={{ opacity: colourOpacity }}
              transition={{ duration: 0.06 }}
            />
          </div>

          {MOMENTS.map((moment) => {
            const x = moment.x + (50 - moment.x) * inward;
            const y = moment.y + (59 - moment.y) * inward;

            return (
              <div
                key={moment.kind}
                className="absolute z-20"
                style={{
                  width: moment.width,
                  left: `${x}%`,
                  top: `${y}%`,
                  opacity: cardOpacity,
                  filter: `blur(${cardBlur}px)`,
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
    <div className="rounded-[20px] bg-[#EFF0F1] p-3 shadow-[0_10px_24px_rgba(24,38,64,.035)]">
      <div className="mb-2.5 px-1 text-[14px] font-semibold tracking-[-0.025em] text-[#171A20]">{moment.label}</div>
      <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_5px_14px_rgba(24,38,64,.035)]">
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
      className="shrink-0 overflow-hidden rounded-full border-2 border-white shadow-[0_4px_12px_rgba(35,53,76,.08)]"
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

function MomentBody({ moment }: { moment: Moment }) {
  if (moment.kind === "enquiry") {
    return (
      <div className="p-3.5">
        <div className="flex items-center gap-2.5">
          <HomepageAvatar size={29} cell={0} />
          <div className="min-w-0 flex-1">
            <div className="text-[10.5px] font-semibold text-[#27313F]">Emma Wilson · incoming call</div>
            <div className="mt-0.5 text-[8.5px] text-[#8A918E]">just now · 00:42</div>
          </div>
          <Phone size={14} style={{ color: moment.accent }} />
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-[10px] px-3 py-2.5" style={{ backgroundColor: moment.soft }}>
          <div className="flex flex-1 items-end gap-[3px]">
            {[8, 16, 11, 23, 14, 26, 10, 18, 8, 15, 11, 21].map((height, index) => (
              <span key={index} className="w-[3px] rounded-full" style={{ height, backgroundColor: moment.accent, opacity: 0.45 + (index % 3) * 0.16 }} />
            ))}
          </div>
          <span className="text-[7px] font-bold uppercase tracking-[0.08em]" style={{ color: moment.accent }}>AI listening</span>
        </div>

        <div className="mt-2 truncate text-[9px] text-[#6F7873]">“Calling about a bathroom renovation next month…”</div>
      </div>
    );
  }

  if (moment.kind === "conversation") {
    return (
      <div className="p-3.5">
        <div className="flex items-center gap-2.5">
          <HomepageAvatar size={29} cell={0} />
          <div>
            <div className="text-[10.5px] font-semibold text-[#27313F]">Emma · SMS</div>
            <div className="mt-0.5 text-[8.5px] text-[#8A918E]">same customer history</div>
          </div>
        </div>
        <div className="mt-3 max-w-[88%] rounded-[11px] rounded-bl-[4px] bg-[#F6F6F4] px-3 py-2 text-[9px] text-[#5F6864]">Can I move my 3pm to Thursday?</div>
        <div className="ml-auto mt-2 max-w-[76%] rounded-[11px] rounded-br-[4px] px-3 py-2 text-[9px] text-[#454B48]" style={{ backgroundColor: moment.soft }}>Thursday at 2 works.</div>
      </div>
    );
  }

  if (moment.kind === "pipeline") {
    const stages = ["Lead", "Qualified", "Proposal", "Won"];
    return (
      <div className="p-3.5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[10.5px] font-semibold text-[#27313F]">Bathroom renovation</div>
            <div className="mt-0.5 text-[8.5px] text-[#8A918E]">$4,800 opportunity</div>
          </div>
          <Workflow size={14} style={{ color: moment.accent }} />
        </div>

        <div className="mt-3 grid grid-cols-4 gap-1">
          {stages.map((stage, index) => (
            <div
              key={stage}
              className="rounded-full py-1.5 text-center text-[7px] font-bold"
              style={{
                backgroundColor: index < 2 ? "#EBEFE7" : index === 2 ? moment.soft : "#F0F1F1",
                color: index < 2 ? "#737A5A" : index === 2 ? moment.accent : "#A5AAA7",
              }}
            >
              {stage}
            </div>
          ))}
        </div>

        <div className="mt-2.5 flex items-center gap-2 rounded-[9px] bg-[#F7F7F5] px-2.5 py-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: moment.accent }} />
          <span className="text-[8.5px] font-medium text-[#68706C]">Follow up automatically in 2 days</span>
        </div>
      </div>
    );
  }

  if (moment.kind === "booking") {
    return (
      <div className="grid grid-cols-[58px_1fr] items-center gap-3 p-3.5">
        <div className="overflow-hidden rounded-[10px] bg-[#F7F7F5] text-center">
          <div className="py-1 text-[7px] font-bold uppercase tracking-[0.08em] text-white" style={{ backgroundColor: moment.accent }}>Thu</div>
          <div className="py-2 text-[19px] font-semibold leading-none text-[#27313F]">14</div>
        </div>
        <div>
          <div className="text-[10.5px] font-semibold text-[#27313F]">2:00 PM · 45 min</div>
          <div className="mt-1 text-[8.5px] text-[#8A918E]">Emma Wilson · consultation</div>
          <div className="mt-2 flex items-center gap-1.5 text-[8px] font-semibold" style={{ color: moment.accent }}><CheckCircle2 size={10} /> Confirmed</div>
        </div>
      </div>
    );
  }

  if (moment.kind === "payment") {
    return (
      <div className="flex items-end justify-between gap-3 p-3.5">
        <div>
          <div className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#8A918E]">Amount received</div>
          <div className="mt-1 text-[23px] font-semibold tracking-[-0.04em] text-[#27313F]">$1,250</div>
          <div className="mt-1 text-[8.5px] text-[#8A918E]">INV-2841 · Emma Wilson</div>
        </div>
        <CreditCard size={15} style={{ color: moment.accent }} />
      </div>
    );
  }

  return (
    <div className="p-3.5">
      <div className="flex items-center gap-2.5">
        <HomepageAvatar size={30} cell={0} />
        <div>
          <div className="text-[10.5px] font-semibold text-[#27313F]">Emma Wilson</div>
          <div className="mt-0.5 flex gap-0.5" style={{ color: moment.accent }}>
            {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={10} fill="currentColor" />)}
          </div>
        </div>
      </div>
      <div className="mt-2.5 text-[9px] leading-[1.45] text-[#606965]">“Absolutely brilliant service from start to finish.”</div>
    </div>
  );
}

function StaticContextScene() {
  return (
    <div className="mx-auto mt-12 max-w-[980px]">
      <div className="relative mx-auto h-[350px] w-[270px]">
        <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(37,99,255,0.08),rgba(214,150,114,0.035)_42%,transparent_72%)]" />
        <img src={heroColor.url} alt="A customer at the centre of a connected customer journey" className="relative h-full w-full object-contain" />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {MOMENTS.map((moment) => <MomentCard key={moment.kind} moment={moment} />)}
      </div>
    </div>
  );
}

function smoothstep(start: number, end: number, value: number) {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
}
