import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, CalendarDays, Check, CreditCard, Star } from "lucide-react";
import { AppShell } from "@/components/v5/kit";
import { useIsMobile } from "@/hooks/use-mobile";

const NAV = 66;
const CYAN = "#06B6D4";
const INK = "#111318";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const V5 = "/concept/cinematic-v5";

/**
 * V5 media contract
 * -----------------
 * Every profession resolves to exactly ONE approved source in
 * /public/concept/cinematic-v5/. No probing, no remote guess, no
 * cross-profession fallback.
 */
type Film = {
  key: string;
  label: string;
  video: string;
  videoWebm: string;
  poster: string;
  start?: number;
  end?: number;
  /** Crop focus, desktop / mobile. */
  position?: string;
  positionMobile?: string;
};

const HERO_KEYS = ["mechanic", "broker", "agent", "construction"] as const;

const src = (stem: string) => ({
  video: `${V5}/${stem}.mp4`,
  videoWebm: `${V5}/${stem}.webm`,
  poster: `${V5}/${stem}.jpg`,
});

const FILMS: Film[] = [
  {
    key: "mechanic",
    label: "Automotive workshop",
    ...src("mechanic"),
    start: 1.2,
    end: 8.6,
    position: "50% 46%",
    positionMobile: "52% 48%",
  },
  {
    key: "broker",
    label: "Mortgage broker",
    ...src("broker"),
    start: 0.3,
    end: 3.6,
    position: "49% 50%",
    positionMobile: "52% 52%",
  },
  {
    key: "agent",
    label: "Property / real estate",
    ...src("agent"),
    start: 0.4,
    end: 5.2,
    position: "50% 48%",
    positionMobile: "56% 50%",
  },
  {
    key: "construction",
    label: "Construction / project contractor",
    ...src("construction"),
    start: 0.2,
    end: 3.5,
    // Crop holds the people reviewing / pointing at the plan.
    position: "50% 52%",
    positionMobile: "54% 54%",
  },
  { key: "solar", label: "Solar installer", ...src("solar"), start: 0.3, end: 4.9, position: "50% 46%", positionMobile: "50% 44%" },
  { key: "roofing", label: "Roofing contractor", ...src("roofing"), start: 0.2, end: 3.9, position: "50% 44%" },
  { key: "personal-trainer", label: "Personal trainer", ...src("personal-trainer"), start: 0.3, end: 5.4, position: "50% 46%" },
  { key: "photographer", label: "Photographer", ...src("photographer"), start: 0.2, end: 4.9, position: "50% 40%", positionMobile: "50% 34%" },
  { key: "dentist", label: "Dentist", ...src("dentist"), start: 0.3, end: 4.9, position: "50% 48%" },
];

const film = (key: string) => FILMS.find((f) => f.key === key)!;
const HERO = HERO_KEYS.map((k) => film(k));

const THREAD_STATES = [
  { at: 0.03, label: "New enquiry" },
  { at: 0.13, label: "Reply sent" },
  { at: 0.23, label: "Booking offered" },
  { at: 0.36, label: "Booked" },
  { at: 0.50, label: "Paid" },
  { at: 0.60, label: "Review requested" },
] as const;

/* ---------------- choreography ---------------- */
/* hero worlds        0.00 - 0.34
   hero -> collage    0.34 - 0.46  (last world dims first, hero four recompose)
   support tiles in   0.44 - 0.55
   statement + peak   0.50 - 0.62
   collage recedes    0.62 - 0.70
   product (as one)   0.68 - 0.76
   readable hold      0.76 - 0.90
   release            0.90 - 1.00 */
const MORPH_IN = 0.34;
const MORPH_OUT = 0.46;
const COLLAGE_END = 0.62;
const RECEDE_END = 0.70;
const PRODUCT_IN = 0.68;
const PRODUCT_FULL = 0.76;

/** Scroll drives geometry only. It never chooses which film is playing. */
function useStoryScroll(ref: React.RefObject<HTMLDivElement | null>) {
  const p = useMotionValue(0);
  const [stateIndex, setStateIndex] = useState(0);
  /** Stage is on screen: everything visible may play. */
  const [stageVisible, setStageVisible] = useState(true);
  /** Support films are (or are about to be) on screen. */
  const [collageArmed, setCollageArmed] = useState(false);
  /** Past this point the hero no longer time-cycles: the world that is live
   *  is the world that recomposes, so its playback is never interrupted. */
  const [heroLocked, setHeroLocked] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let visible = true;
    let maxP = 0;

    const tick = () => {
      const total = el.offsetHeight - (window.innerHeight - NAV);
      const raw = total > 0 ? (NAV - el.getBoundingClientRect().top) / total : 0;
      const v = Math.max(0, Math.min(1, raw));
      p.set(v);

      if (v > maxP) {
        maxP = v;
        let nextState = 0;
        THREAD_STATES.forEach((s, i) => { if (maxP >= s.at) nextState = i; });
        setStateIndex((old) => Math.max(old, nextState));
      }

      setHeroLocked((old) => (v >= MORPH_IN - 0.02 ? true : old));
      const armed = v >= 0.26 && v <= RECEDE_END + 0.06;
      setCollageArmed((old) => (old === armed ? old : armed));
      if (visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      setStageVisible(entry.isIntersecting);
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    }, { rootMargin: "12% 0px" });

    io.observe(el);
    raf = requestAnimationFrame(tick);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [p, ref]);

  return { p, threadLabel: THREAD_STATES[stateIndex].label, stageVisible, collageArmed, heroLocked };
}

/** Autoplay owns time: hero worlds crossfade on a wall clock, zero scroll needed. */
function useHeroCycle(count: number, ms: number, running: boolean) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), ms);
    return () => window.clearInterval(id);
  }, [count, ms, running]);
  return index;
}

/* ---------------- media ---------------- */

/**
 * Always a live <video>. The poster JPG is only the pre-readiness frame
 * (the `poster` attribute). There is no visible still-image state: geometry
 * changes never convert a playing film into a picture. `play` goes false only
 * when the tile is genuinely off screen, or when the visitor has asked for
 * reduced motion.
 */
function FilmMedia({
  f,
  play,
  reduced,
  mobile = false,
  eager = false,
}: {
  f: Film;
  play: boolean;
  reduced: boolean;
  mobile?: boolean;
  eager?: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const position = (mobile && f.positionMobile) || f.position || "50% 50%";

  // Kick playback whenever it is allowed. Never seeks, so a geometry change
  // (or a re-render) cannot restart the clip.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (reduced || !play) {
      if (!v.paused) v.pause();
      return;
    }
    void v.play().catch(() => {});
  }, [play, reduced]);

  const kick = (v: HTMLVideoElement) => {
    if (reduced || !play) return;
    if (v.paused) void v.play().catch(() => {});
  };

  return (
    <video
      ref={video}
      poster={f.poster}
      muted
      autoPlay={!reduced}
      playsInline
      loop={false}
      preload={eager ? "auto" : "metadata"}
      aria-hidden
      className="h-full w-full object-cover"
      style={{ objectPosition: position }}
      onLoadedMetadata={(e) => {
        const v = e.currentTarget;
        const start = Math.min(f.start ?? 0, Math.max(0, v.duration - 0.05));
        if (Math.abs(v.currentTime - start) > 0.05) v.currentTime = start;
        kick(v);
      }}
      onCanPlay={(e) => kick(e.currentTarget)}
      onLoadedData={(e) => kick(e.currentTarget)}
      // Loop inside the approved window only.
      onTimeUpdate={(e) => {
        const v = e.currentTarget;
        const start = f.start ?? 0;
        const end = f.end ?? Math.max(start + 0.5, v.duration - 0.05);
        if (v.currentTime >= Math.min(end, v.duration - 0.02)) v.currentTime = Math.min(start, Math.max(0, v.duration - 0.05));
      }}
      onEnded={(e) => {
        const v = e.currentTarget;
        v.currentTime = f.start ?? 0;
        kick(v);
      }}
    >
      {/* mp4 first for Safari/iOS, webm as the universal decode path */}
      <source src={f.video} type="video/mp4" />
      <source src={f.videoWebm} type="video/webm" />
    </video>
  );
}

/* ---------------- collage geometry ---------------- */

type Box = { l: number; t: number; w: number; h: number };
type Tile = { key: string; box: Box; rotate?: number; z: number; from?: number; label?: boolean };

const DESKTOP_HERO_TILES: Tile[] = [
  { key: "mechanic", box: { l: -4, t: 1, w: 38, h: 31 }, rotate: -0.8, z: 22 },
  { key: "broker", box: { l: 62, t: -4, w: 42, h: 35 }, rotate: 0.8, z: 21, label: true },
  { key: "agent", box: { l: 68, t: 41, w: 36, h: 46 }, rotate: 0.6, z: 23, label: true },
  { key: "construction", box: { l: 1, t: 62, w: 35, h: 41 }, rotate: -0.6, z: 22 },
];

const DESKTOP_SUPPORT_TILES: Tile[] = [
  { key: "solar", box: { l: 39, t: -9, w: 13, h: 31 }, rotate: 1.2, z: 18, from: 0.445 },
  { key: "roofing", box: { l: 53, t: 5, w: 15, h: 23 }, rotate: -0.8, z: 19, from: 0.465 },
  { key: "photographer", box: { l: -5, t: 35, w: 17, h: 34 }, rotate: 1.1, z: 18, from: 0.485 },
  { key: "personal-trainer", box: { l: 39, t: 77, w: 20, h: 29 }, rotate: 0.8, z: 19, from: 0.505 },
  { key: "dentist", box: { l: 61, t: 85, w: 23, h: 25 }, rotate: -1.1, z: 20, from: 0.525 },
];

const MOBILE_HERO_TILES: Tile[] = [
  { key: "mechanic", box: { l: -8, t: 2, w: 66, h: 17 }, rotate: -0.8, z: 22 },
  { key: "broker", box: { l: 56, t: 8, w: 52, h: 15 }, rotate: 0.8, z: 21 },
  { key: "construction", box: { l: -6, t: 22, w: 52, h: 18 }, rotate: -0.6, z: 22 },
  { key: "agent", box: { l: 60, t: 26, w: 48, h: 20 }, rotate: 0.6, z: 23 },
];

const MOBILE_SUPPORT_TILES: Tile[] = [
  { key: "solar", box: { l: -4, t: 62, w: 30, h: 16 }, rotate: 1.2, z: 18, from: 0.45 },
  { key: "roofing", box: { l: 29, t: 64, w: 34, h: 14 }, rotate: -0.8, z: 19, from: 0.47 },
  { key: "photographer", box: { l: 68, t: 60, w: 38, h: 18 }, rotate: 1.0, z: 18, from: 0.49 },
  { key: "personal-trainer", box: { l: 2, t: 81, w: 46, h: 16 }, rotate: 0.8, z: 19, from: 0.51 },
  { key: "dentist", box: { l: 53, t: 82, w: 50, h: 15 }, rotate: -1.0, z: 20, from: 0.53 },
];

/** Hero world: full bleed, then recomposes into its collage position. */
function HeroWorldTile({
  f,
  tile,
  active,
  visible,
  p,
  reduced,
  mobile,
}: {
  visible: boolean;
  f: Film;
  tile: Tile;
  active: boolean;
  p: MotionValue<number>;
  reduced: boolean;
  mobile: boolean;
}) {
  const stops = [MORPH_IN, MORPH_OUT];
  const left = useTransform(p, stops, [0, tile.box.l]);
  const top = useTransform(p, stops, [0, tile.box.t]);
  const width = useTransform(p, stops, [100, tile.box.w]);
  const height = useTransform(p, stops, [100, tile.box.h]);
  const radius = useTransform(p, stops, [0, 4]);
  const rotate = useTransform(p, stops, [0, tile.rotate ?? 0]);

  // Hero phase: only the active world is visible. During the morph every hero
  // world fades up into its collage slot, so the composition transforms.
  const reveal = useTransform(p, [MORPH_IN, MORPH_IN + 0.05], [0, 1]);
  const fade = useTransform(p, [COLLAGE_END, RECEDE_END], [1, 0]);
  const opacity = useTransform([reveal, fade], ([r, fd]: number[]) => (active ? (fd as number) : Math.min(r as number, fd as number)));
  const blur = useTransform(p, [COLLAGE_END, RECEDE_END], [0, mobile ? 6 : 10]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  const l = useTransform(left, (v) => `${v}%`);
  const t = useTransform(top, (v) => `${v}%`);
  const w = useTransform(width, (v) => `${v}%`);
  const h = useTransform(height, (v) => `${v}%`);
  const br = useTransform(radius, (v) => `${v}px`);

  return (
    <motion.div
      className="absolute overflow-hidden bg-[#0A0E14]"
      style={{ left: l, top: t, width: w, height: h, borderRadius: br, rotate, opacity, filter, zIndex: active ? tile.z + 4 : tile.z }}
    >
      <FilmMedia f={f} play={visible} reduced={reduced} mobile={mobile} eager />
      <TileScrim p={p} label={tile.label ? f.label : undefined} />
    </motion.div>
  );
}

/** Scrim + subtle label that only exist once the tile is a collage tile. */
function TileScrim({ p, label }: { p: MotionValue<number>; label?: string }) {
  const opacity = useTransform(p, [MORPH_IN + 0.02, MORPH_OUT], [0, 1]);
  return (
    <motion.div className="pointer-events-none absolute inset-0" style={{ opacity }}>
      <span className="absolute inset-0 bg-[#070B14]/[0.14]" />
      <span className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-black/62 to-transparent" />
      {label && (
        <span className="absolute bottom-2.5 left-3 right-3 truncate text-[10px] font-semibold uppercase tracking-[0.15em] text-white/72">{label}</span>
      )}
    </motion.div>
  );
}

function SupportTile({ tile, p, reduced, mobile, armed }: { tile: Tile; p: MotionValue<number>; reduced: boolean; mobile: boolean; armed: boolean }) {
  const f = film(tile.key);
  const from = tile.from ?? 0.45;
  const enterOpacity = useTransform(p, [from, from + 0.03, COLLAGE_END, RECEDE_END], [0, 1, 1, 0]);
  const scale = useTransform(p, [from, from + 0.045, COLLAGE_END, RECEDE_END], [0.88, 1, 1, 0.9]);
  const blur = useTransform(p, [COLLAGE_END, RECEDE_END], [0, mobile ? 6 : 10]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.div
      className="absolute overflow-hidden rounded-[4px] bg-[#0A0E14]"
      style={{
        left: `${tile.box.l}%`,
        top: `${tile.box.t}%`,
        width: `${tile.box.w}%`,
        height: `${tile.box.h}%`,
        rotate: tile.rotate ?? 0,
        opacity: enterOpacity,
        scale,
        filter,
        zIndex: tile.z,
      }}
    >
      <FilmMedia f={f} play={armed} reduced={reduced} mobile={mobile} />
      <span className="pointer-events-none absolute inset-0 bg-[#070B14]/[0.16]" />
    </motion.div>
  );
}

/* ---------------- hero copy + thread ---------------- */

function HeroCopy({ mobile }: { mobile: boolean }) {
  return (
    <div className={mobile ? "max-w-[340px]" : "max-w-[590px]"}>
      <div className="flex items-start gap-3">
        <span className="mt-[7px] h-[2px] w-7 shrink-0" style={{ background: CYAN }} />
        <span className="text-[10px] font-semibold uppercase leading-[1.45] tracking-[0.19em] text-white/70 md:text-[11px]">BUILT FOR TEAMS WHERE FOLLOW-THROUGH CANNOT DEPEND ON MEMORY.</span>
      </div>
      <h1 className={mobile ? "mt-4 text-[48px] leading-[0.98] tracking-[-0.045em] text-white" : "mt-5 text-[80px] leading-[0.94] tracking-[-0.05em] text-white"} style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
        You lead.<br />Zapla follows through.
      </h1>
      <p className={mobile ? "mt-4 text-[15px] leading-[1.55] text-white/74" : "mt-6 max-w-[525px] text-[17px] leading-[1.6] text-white/74"}>
        Your team does the work. Zapla keeps customers moving, from enquiries and replies to bookings, payments and reviews.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a href="https://zapla.io/booking" className="inline-flex h-[48px] items-center gap-2 rounded-[10px] bg-white px-5 text-[14px] font-semibold text-[#111318]">Book a Call <ArrowRight className="h-4 w-4" /></a>
        <a href="#zapla-product-v5" className="inline-flex h-[48px] items-center rounded-[10px] border border-white/35 px-5 text-[14px] font-semibold text-white">See how it works</a>
      </div>
    </div>
  );
}

/** Persistent system layer. Always sits above every tile, never inside one. */
function FollowThread({ p, label, mobile }: { p: MotionValue<number>; label: string; mobile: boolean }) {
  const opacity = useTransform(p, [0.02, 0.06, COLLAGE_END, RECEDE_END - 0.02], [0, 1, 1, 0]);
  return (
    <motion.div
      className={mobile ? "absolute bottom-[3%] left-[4%] right-[4%] z-[45]" : "absolute bottom-[3.5%] left-1/2 z-[45] w-[46%] -translate-x-1/2"}
      style={{ opacity }}
    >
      <div className="flex items-center gap-3 rounded-full border border-white/12 bg-black/45 px-4 py-2.5 backdrop-blur-md">
        <span className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: CYAN }} />
        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/50">Follow-through</span>
        <span className="h-px flex-1 bg-white/18" />
        <motion.span key={label} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="shrink-0 text-[13px] font-medium text-white">{label}</motion.span>
      </div>
    </motion.div>
  );
}

/* ---------------- collage ---------------- */

function RecognitionCollage({ p, reduced, mobile }: { p: MotionValue<number>; reduced: boolean; mobile: boolean }) {
  const heroTiles = mobile ? MOBILE_HERO_TILES : DESKTOP_HERO_TILES;
  const supportTiles = mobile ? MOBILE_SUPPORT_TILES : DESKTOP_SUPPORT_TILES;
  const statementOpacity = useTransform(p, [0.50, 0.545, COLLAGE_END, RECEDE_END - 0.04], [0, 1, 1, 0]);
  const statementY = useTransform(p, [0.50, 0.56], [16, 0]);

  return (
    <>
      {supportTiles.map((tile) => <SupportTile key={tile.key} tile={tile} p={p} reduced={reduced} mobile={mobile} />)}
      <motion.div
        className={mobile ? "absolute left-[6%] top-[44%] z-[40] w-[88%]" : "absolute left-[20%] top-[35%] z-[40] w-[44%]"}
        style={{ opacity: statementOpacity, y: statementY }}
      >
        <h2
          className={mobile ? "text-[32px] leading-[1.02] tracking-[-0.045em] text-white" : "text-[58px] leading-[0.95] tracking-[-0.05em] text-white"}
          style={{ fontFamily: DISPLAY, fontWeight: 500, textShadow: "0 2px 30px rgba(0,0,0,.78)" }}
        >
          Different work.<br />Same follow-through.
        </h2>
        <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.19em] text-white/50">Customer follow-through for service businesses</div>
      </motion.div>
    </>
  );
}

/* ---------------- product ---------------- */

function GenericCustomerRecord() {
  const rows = [
    ["Enquiry received", "8:42 AM", true],
    ["Reply sent", "8:44 AM", true],
    ["Booking confirmed", "9:07 AM", true],
    ["Payment received", "Yesterday", true],
    ["Review requested", "2 days after", false],
  ] as const;

  return (
    <div id="zapla-product-v5" className="h-full w-full bg-white">
      <AppShell activeKey="inbox" title="Customer record" subtitle="Everything connected">
        <div className="grid h-full min-h-0 grid-cols-1 bg-[#F7F8FA] lg:grid-cols-[1fr_300px]">
          <div className="min-h-0 border-r border-slate-200/80 bg-white p-5 md:p-7">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Follow-through activity</div>
            <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-slate-950">Activity timeline</h3>
            <p className="mt-2 max-w-[620px] text-[13.5px] leading-[1.55] text-slate-500">Every customer touchpoint, in order.</p>
            <div className="mt-6 space-y-3">
              {rows.map(([label, time, done]) => (
                <div key={label} className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: done ? "#ECFEFF" : "#F3F4F6", color: done ? CYAN : "#9CA3AF" }}>{done ? <Check className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-current" />}</span>
                  <div className="min-w-0 flex-1"><div className="text-[13.5px] font-semibold text-slate-900">{label}</div><div className="mt-0.5 text-[11px] text-slate-400">{time}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden bg-white p-5 lg:block">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Connected</div>
            <div className="mt-4 space-y-3">
              {[
                [CalendarDays, "Booking", "Confirmed"],
                [CreditCard, "Payment", "Paid"],
                [Star, "Review", "Requested"],
              ].map(([Icon, label, value]) => {
                const I = Icon as typeof CalendarDays;
                return <div key={label as string} className="flex items-center gap-3 border-b border-slate-100 pb-3"><span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-cyan-50 text-cyan-600"><I className="h-4 w-4" /></span><div><div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-400">{label as string}</div><div className="mt-0.5 text-[13px] font-semibold text-slate-900">{value as string}</div></div></div>;
              })}
            </div>
          </div>
        </div>
      </AppShell>
    </div>
  );
}

/* ---------------- stage ---------------- */

function StoryStage({ mobile }: { mobile: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = !!useReducedMotion();
  const { p, worldIndex, threadLabel } = useStoryScroll(wrap);

  const heroOpacity = useTransform(p, [0.00, 0.05, 0.10], [1, 1, 0]);
  // Full-bleed cinematic grade only exists while the hero worlds are full frame.
  const gradeOpacity = useTransform(p, [MORPH_IN, MORPH_IN + 0.045], [1, 0]);
  const worldLabelOpacity = useTransform(p, [0.0, 0.02, MORPH_IN, MORPH_IN + 0.03], [0, 1, 1, 0]);

  // Product and heading reveal as one coordinated moment, after the collage has receded.
  const productOpacity = useTransform(p, [PRODUCT_IN, PRODUCT_FULL, 0.94, 1], [0, 1, 1, 0.92]);
  const productY = useTransform(p, [PRODUCT_IN, PRODUCT_FULL], [mobile ? 18 : 26, 0]);
  const bg = useTransform(p, [RECEDE_END - 0.06, PRODUCT_FULL - 0.02], ["#080B10", "#F7F8FA"]);

  return (
    <div ref={wrap} data-v5-stage className={mobile ? "relative h-[520vh]" : "relative h-[560vh]"}>
      <motion.div className="sticky overflow-hidden" style={{ top: NAV, height: `calc(100vh - ${NAV}px)`, background: bg }}>
        {/* hero worlds -> collage tiles (same objects) */}
        {HERO.map((f, i) => (
          <HeroWorldTile
            key={f.key}
            f={f}
            tile={(mobile ? MOBILE_HERO_TILES : DESKTOP_HERO_TILES).find((t) => t.key === f.key)!}
            active={i === worldIndex}
            p={p}
            reduced={reduced}
            mobile={mobile}
          />
        ))}

        {/* cinematic grade for hero legibility */}
        <motion.div className="pointer-events-none absolute inset-0 z-[28]" style={{ opacity: gradeOpacity }}>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,13,.78)_0%,rgba(5,8,13,.54)_34%,rgba(5,8,13,.16)_64%,rgba(5,8,13,.36)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-black/55 to-transparent" />
        </motion.div>

        <motion.div className="absolute right-[4%] top-[5%] z-[30] text-[10px] font-semibold uppercase tracking-[0.19em] text-white/45" style={{ opacity: worldLabelOpacity }}>
          {HERO[worldIndex].label}
        </motion.div>

        <motion.div
          className={mobile ? "absolute left-[6%] right-[6%] top-[46%] z-[32]" : "absolute left-[5.5%] top-1/2 z-[32] w-[42%] -translate-y-1/2"}
          style={{ opacity: heroOpacity }}
        >
          <HeroCopy mobile={mobile} />
        </motion.div>

        <RecognitionCollage p={p} reduced={reduced} mobile={mobile} />
        <FollowThread p={p} label={threadLabel} mobile={mobile} />

        {/* product: heading + surface as one group */}
        <motion.div
          className={mobile ? "absolute inset-x-[4%] top-[3%] bottom-[3%] z-[60] flex flex-col" : "absolute inset-x-[5%] top-[5%] bottom-[5%] z-[60] flex flex-col"}
          style={{ opacity: productOpacity, y: productY }}
        >
          <div>
            <h2
              className={mobile ? "text-[27px] leading-[1.04] tracking-[-0.04em]" : "text-[46px] leading-[0.98] tracking-[-0.045em]"}
              style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
            >
              One customer. Everything connected.
            </h2>
            <p className={mobile ? "mt-1.5 text-[12.5px] leading-[1.45] text-slate-500" : "mt-2.5 max-w-[650px] text-[15px] leading-[1.55] text-slate-500"}>
              Every enquiry, message, booking, payment and review stays connected in one customer record.
            </p>
          </div>
          <div className={mobile ? "mt-3 min-h-0 flex-1 overflow-hidden rounded-[12px] border border-slate-200/80 bg-white shadow-[0_40px_110px_-48px_rgba(15,23,42,.38)]" : "mt-5 min-h-0 flex-1 overflow-hidden rounded-[14px] border border-slate-200/80 bg-white shadow-[0_40px_110px_-48px_rgba(15,23,42,.38)]"}>
            <GenericCustomerRecord />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function CinematicFollowThroughV5() {
  const mobile = useIsMobile();
  return (
    <div className="bg-[#F7F8FA]">
      <StoryStage mobile={mobile} />
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-7 px-6 py-16 md:flex-row md:items-end md:justify-between md:px-10 md:py-20">
          <div>
            <h2 className="max-w-[760px] text-[36px] leading-[1.02] tracking-[-0.04em] text-[#111318] md:text-[52px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>While you do the work, Zapla handles the follow-through.</h2>
            <p className="mt-4 max-w-[660px] text-[16px] leading-[1.6] text-slate-500">Different kinds of service businesses. The same customer problem: the next step still has to happen.</p>
          </div>
          <a href="https://zapla.io/booking" className="inline-flex h-[50px] shrink-0 items-center gap-2 rounded-[10px] px-6 text-[14px] font-semibold text-white" style={{ background: CYAN }}>Book a Call <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>
    </div>
  );
}
