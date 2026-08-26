import { useEffect, useMemo, useRef, useState } from "react";
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
 * cross-profession fallback. JPGs are `poster` only: never a visible state.
 */
type Film = {
  key: string;
  label: string;
  video: string;
  videoWebm: string;
  poster: string;
  /** Approved, deliberate entry point. Every hero entry starts exactly here. */
  start: number;
  /** Last usable frame time. A hero never plays past this and never wraps. */
  end: number;
  position?: string;
  positionMobile?: string;
};

const src = (stem: string) => ({
  video: `${V5}/${stem}.mp4`,
  videoWebm: `${V5}/${stem}.webm`,
  poster: `${V5}/${stem}.jpg`,
});

/** The four rotating hero worlds. One card, four professions. */
const HERO_FILMS: Film[] = [
  { key: "mechanic", label: "Automotive workshop", ...src("mechanic"), start: 1.2, end: 8.6, position: "50% 46%", positionMobile: "52% 48%" },
  { key: "broker", label: "Mortgage broker", ...src("broker"), start: 0.3, end: 3.62, position: "49% 50%", positionMobile: "52% 52%" },
  { key: "agent", label: "Property / real estate", ...src("agent"), start: 0.4, end: 5.24, position: "50% 48%", positionMobile: "56% 50%" },
  { key: "construction", label: "Construction / project contractor", ...src("construction"), start: 0.2, end: 3.52, position: "50% 52%", positionMobile: "54% 54%" },
];

/** Eight individual support worlds. Each is its own live card. */
const SUPPORT_FILMS: Film[] = [
  { key: "solar", label: "Solar installer", ...src("solar"), start: 0.3, end: 4.9, position: "50% 46%", positionMobile: "50% 44%" },
  { key: "roofing", label: "Roofing contractor", ...src("roofing"), start: 0.2, end: 3.9, position: "50% 44%" },
  { key: "hvac", label: "Gas / HVAC technician", ...src("hvac"), start: 0.1, end: 6.3, position: "58% 56%", positionMobile: "60% 58%" },
  { key: "medspa", label: "Medspa practitioner", ...src("medspa"), start: 0.1, end: 5.8, position: "64% 48%", positionMobile: "66% 48%" },
  { key: "physio", label: "Physiotherapist", ...src("physio"), start: 0.1, end: 5.8, position: "50% 44%" },
  { key: "dentist", label: "Dentist", ...src("dentist"), start: 0.3, end: 4.9, position: "50% 48%" },
  { key: "personal-trainer", label: "Personal trainer", ...src("personal-trainer"), start: 0.3, end: 5.4, position: "50% 46%" },
  { key: "photographer", label: "Photographer", ...src("photographer"), start: 0.2, end: 3.4, position: "33% 44%", positionMobile: "33% 40%" },
];

const support = (key: string) => SUPPORT_FILMS.find((f) => f.key === key)!;

const THREAD_STATES = [
  { at: 0.03, label: "New enquiry" },
  { at: 0.13, label: "Reply sent" },
  { at: 0.23, label: "Booking offered" },
  { at: 0.36, label: "Booked" },
  { at: 0.50, label: "Paid" },
  { at: 0.60, label: "Review requested" },
] as const;

/* ---------------- choreography ---------------- */
/* hero card full bleed   0.00 - 0.34
   hero card -> anchor    0.34 - 0.46   (ONE object shrinks, keeps playing)
   support cards in       0.44 - 0.55
   statement + peak       0.50 - 0.62
   collage recedes        0.62 - 0.70
   product                0.68 - 0.76
   readable hold          0.76 - 0.90 */
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
  const [stageVisible, setStageVisible] = useState(true);
  const [collageArmed, setCollageArmed] = useState(false);
  /** True only for the physical shrink/reposition window. */
  const [morphLock, setMorphLock] = useState(false);
  const [heroLive, setHeroLive] = useState(true);

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

      const locked = v >= MORPH_IN - 0.03 && v <= MORPH_OUT + 0.02;
      setMorphLock((old) => (old === locked ? old : locked));
      const armed = v >= 0.26 && v <= RECEDE_END + 0.06;
      setCollageArmed((old) => (old === armed ? old : armed));
      const heroOn = v <= RECEDE_END + 0.08;
      setHeroLive((old) => (old === heroOn ? old : heroOn));
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

  return { p, threadLabel: THREAD_STATES[stateIndex].label, stageVisible, collageArmed, morphLock, heroLive };
}

/* ---------------- hero playback system ---------------- */

const FADE_MS = 620;
/** Visible hold per clip. Trimmed only where the approved window is short, so
 *  hold + crossfade always finishes before the clip could reach its end. */
const heroHoldMs = (f: Film) => {
  const usable = (f.end - f.start) * 1000;
  return Math.max(1800, Math.min(2740, usable - FADE_MS - 320));
};

type Machine = { cur: number; nxt: number; phase: "hold" | "fade"; t0: number };

/**
 * Owns hero video time. Exactly one film advances at a time; the next film is
 * preloaded and held paused at its approved start; every entry begins from that
 * start; the outgoing film is paused and reset only after the crossfade lands.
 */
function useHeroSequencer(active: boolean, reduced: boolean, morphLock: boolean) {
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const mach = useRef<Machine>({ cur: 0, nxt: 1, phase: "hold", t0: 0 });
  const [label, setLabel] = useState(HERO_FILMS[0].label);
  const lockRef = useRef(morphLock);
  lockRef.current = morphLock;

  useEffect(() => {
    const n = HERO_FILMS.length;
    const at = (i: number) => videos.current[i];
    const seekStart = (i: number) => {
      const v = at(i);
      if (!v || !Number.isFinite(v.duration)) return;
      if (Math.abs(v.currentTime - HERO_FILMS[i].start) > 0.06) v.currentTime = HERO_FILMS[i].start;
    };
    const park = (i: number) => {
      const v = at(i);
      if (!v) return;
      if (!v.paused) v.pause();
      seekStart(i);
    };
    const paint = (curOpacity: number, nxtOpacity: number) => {
      const m = mach.current;
      layers.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = String(i === m.cur ? curOpacity : i === m.nxt && m.phase === "fade" ? nxtOpacity : 0);
      });
    };

    if (!active || reduced) {
      for (let i = 0; i < n; i++) if (i !== mach.current.cur) park(i);
      const cv = at(mach.current.cur);
      if (cv && !cv.paused) cv.pause();
      paint(1, 0);
      return;
    }

    mach.current.t0 = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const m = mach.current;
      const curFilm = HERO_FILMS[m.cur];
      const cv = at(m.cur);
      // the caption must never disagree with the film that is actually visible
      setLabel((prev) => (prev === curFilm.label ? prev : curFilm.label));


      // every film except current (and the incoming one mid-fade) stays parked
      for (let i = 0; i < n; i++) {
        if (i === m.cur) continue;
        if (m.phase === "fade" && i === m.nxt) continue;
        park(i);
      }
      // preload the next one, paused, at its approved start
      if (m.phase === "hold") seekStart(m.nxt);

      if (cv) {
        if (cv.paused && cv.currentTime < curFilm.end - 0.05) void cv.play().catch(() => {});
        // never wrap: hold the last approved frame instead
        if (cv.currentTime >= curFilm.end - 0.03 && !cv.paused) cv.pause();
      }

      if (m.phase === "hold") {
        const elapsed = now - m.t0;
        const remaining = cv && Number.isFinite(cv.duration) ? (curFilm.end - cv.currentTime) * 1000 : 9999;
        // during the morph lock the card must not change profession, unless the
        // current film is about to run out of usable window: then transition now.
        const dueByTime = elapsed >= heroHoldMs(curFilm);
        const dueByWindow = remaining <= FADE_MS + 220;
        if ((!lockRef.current && dueByTime) || dueByWindow) {
          m.nxt = (m.cur + 1) % n;
          const nv = at(m.nxt);
          if (nv) {
            nv.currentTime = HERO_FILMS[m.nxt].start;
            void nv.play().catch(() => {});
          }
          m.phase = "fade";
          m.t0 = now;
        }
      }

      if (m.phase === "fade") {
        const t = Math.min(1, (now - m.t0) / FADE_MS);
        const e = t * t * (3 - 2 * t);
        paint(1 - e, e);
        if (t >= 1) {
          const out = m.cur;
          m.cur = m.nxt;
          m.nxt = (m.cur + 1) % n;
          m.phase = "hold";
          m.t0 = now;
          park(out);
          paint(1, 0);
          setLabel(HERO_FILMS[m.cur].label);
        }
      } else {
        paint(1, 0);
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced]);

  return { videos, layers, label };
}

/** Hero film layer: never remounted, never seeked by geometry. */
function HeroVideo({
  f,
  index,
  videos,
  layers,
  mobile,
}: {
  f: Film;
  index: number;
  videos: React.MutableRefObject<(HTMLVideoElement | null)[]>;
  layers: React.MutableRefObject<(HTMLDivElement | null)[]>;
  mobile: boolean;
}) {
  const position = (mobile && f.positionMobile) || f.position || "50% 50%";
  return (
    <div
      ref={(el) => { layers.current[index] = el; }}
      data-hero-layer={f.key}
      className="absolute inset-0"
      style={{ opacity: index === 0 ? 1 : 0, willChange: "opacity" }}
    >
      <video
        ref={(el) => { videos.current[index] = el; }}
        data-hero-video={f.key}
        poster={f.poster}
        muted
        playsInline
        loop={false}
        preload="auto"
        aria-hidden
        className="h-full w-full object-cover"
        style={{ objectPosition: position }}
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          if (Math.abs(v.currentTime - f.start) > 0.06) v.currentTime = f.start;
        }}
      >
        <source src={f.video} type="video/mp4" />
        <source src={f.videoWebm} type="video/webm" />
      </video>
    </div>
  );
}

/* ---------------- support media ---------------- */

/** Always a live <video>. Poster is the pre-readiness frame only. */
function FilmMedia({ f, play, reduced, mobile }: { f: Film; play: boolean; reduced: boolean; mobile: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const position = (mobile && f.positionMobile) || f.position || "50% 50%";

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (reduced || !play) { if (!v.paused) v.pause(); return; }
    void v.play().catch(() => {});
  }, [play, reduced]);

  const kick = (v: HTMLVideoElement) => {
    if (reduced || !play) return;
    if (v.paused) void v.play().catch(() => {});
  };

  return (
    <video
      ref={video}
      data-support-video={f.key}
      poster={f.poster}
      muted
      autoPlay={!reduced}
      playsInline
      loop={false}
      preload="metadata"
      aria-hidden
      className="h-full w-full object-cover"
      style={{ objectPosition: position }}
      onLoadedMetadata={(e) => {
        const v = e.currentTarget;
        const start = Math.min(f.start, Math.max(0, v.duration - 0.05));
        if (Math.abs(v.currentTime - start) > 0.05) v.currentTime = start;
        kick(v);
      }}
      onCanPlay={(e) => kick(e.currentTarget)}
      onLoadedData={(e) => kick(e.currentTarget)}
      onTimeUpdate={(e) => {
        const v = e.currentTarget;
        const end = Math.min(f.end, v.duration - 0.03);
        if (v.currentTime >= end) v.currentTime = f.start;
      }}
      onEnded={(e) => { e.currentTarget.currentTime = f.start; kick(e.currentTarget); }}
    >
      <source src={f.video} type="video/mp4" />
      <source src={f.videoWebm} type="video/webm" />
    </video>
  );
}

/* ---------------- collage geometry ---------------- */

type Box = { l: number; t: number; w: number; h: number };
type Tile = { key: string; box: Box; rotate?: number; z: number; from?: number };

/* One hero anchor (largest object) plus a constellation of eight support
   cards. Statement pocket: desktop x 33-67 / y 37-61, mobile y 42-58. */
const DESKTOP_ANCHOR: Tile = { key: "anchor", box: { l: 2, t: 7, w: 30, h: 43 }, rotate: -0.7, z: 26 };

const DESKTOP_SUPPORT: Tile[] = [
  { key: "solar", box: { l: 34, t: 3, w: 15, h: 22 }, rotate: 1.1, z: 18, from: 0.445 },
  { key: "roofing", box: { l: 51, t: 1, w: 17, h: 24 }, rotate: -0.9, z: 19, from: 0.455 },
  { key: "hvac", box: { l: 70, t: 5, w: 27, h: 27 }, rotate: 0.7, z: 20, from: 0.465 },
  { key: "medspa", box: { l: 71, t: 35, w: 26, h: 26 }, rotate: -0.8, z: 21, from: 0.480 },
  { key: "physio", box: { l: 1, t: 54, w: 23, h: 25 }, rotate: 0.9, z: 19, from: 0.495 },
  { key: "dentist", box: { l: 25.5, t: 64, w: 20, h: 25 }, rotate: -1.1, z: 20, from: 0.508 },
  { key: "personal-trainer", box: { l: 46.5, t: 62, w: 20, h: 26 }, rotate: 0.8, z: 19, from: 0.520 },
  { key: "photographer", box: { l: 67.5, t: 66, w: 24, h: 26 }, rotate: 1.0, z: 18, from: 0.532 },
];

const MOBILE_ANCHOR: Tile = { key: "anchor", box: { l: 3, t: 3, w: 62, h: 21 }, rotate: -0.7, z: 26 };

const MOBILE_SUPPORT: Tile[] = [
  { key: "hvac", box: { l: 62, t: 7, w: 36, h: 15 }, rotate: 0.9, z: 20, from: 0.445 },
  { key: "solar", box: { l: 4, t: 26, w: 30, h: 13 }, rotate: 1.1, z: 18, from: 0.455 },
  { key: "roofing", box: { l: 35.5, t: 25, w: 31, h: 14 }, rotate: -0.9, z: 19, from: 0.465 },
  { key: "medspa", box: { l: 66, t: 24.5, w: 32, h: 15 }, rotate: -0.8, z: 20, from: 0.478 },
  { key: "physio", box: { l: 2, t: 60, w: 41, h: 15 }, rotate: 0.9, z: 19, from: 0.495 },
  { key: "dentist", box: { l: 45, t: 59, w: 30, h: 14 }, rotate: -1.0, z: 20, from: 0.508 },
  { key: "personal-trainer", box: { l: 6, t: 77, w: 42, h: 15 }, rotate: 0.8, z: 19, from: 0.520 },
  { key: "photographer", box: { l: 51, t: 75, w: 46, h: 17 }, rotate: 1.0, z: 18, from: 0.532 },
];

/**
 * THE hero object. Full bleed at rest, then this same element (and the same
 * four <video> nodes inside it) shrinks into the collage anchor position.
 * Geometry only ever touches the wrapper, so playback is continuous.
 */
function HeroAnchorCard({
  tile,
  p,
  mobile,
  label,
  videos,
  layers,
}: {
  tile: Tile;
  p: MotionValue<number>;
  mobile: boolean;
  label: string;
  videos: React.MutableRefObject<(HTMLVideoElement | null)[]>;
  layers: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  const stops = [MORPH_IN, MORPH_OUT];
  const left = useTransform(p, stops, [0, tile.box.l]);
  const top = useTransform(p, stops, [0, tile.box.t]);
  const width = useTransform(p, stops, [100, tile.box.w]);
  const height = useTransform(p, stops, [100, tile.box.h]);
  const radius = useTransform(p, stops, [0, 5]);
  const rotate = useTransform(p, stops, [0, tile.rotate ?? 0]);
  const opacity = useTransform(p, [COLLAGE_END, RECEDE_END], [1, 0]);
  const blur = useTransform(p, [COLLAGE_END, RECEDE_END], [0, mobile ? 6 : 10]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  const l = useTransform(left, (v) => `${v}%`);
  const t = useTransform(top, (v) => `${v}%`);
  const w = useTransform(width, (v) => `${v}%`);
  const h = useTransform(height, (v) => `${v}%`);
  const br = useTransform(radius, (v) => `${v}px`);

  return (
    <motion.div
      data-hero-anchor
      className="absolute overflow-hidden bg-[#0A0E14]"
      style={{ left: l, top: t, width: w, height: h, borderRadius: br, rotate, opacity, filter, zIndex: tile.z }}
    >
      {HERO_FILMS.map((f, i) => (
        <HeroVideo key={f.key} f={f} index={i} videos={videos} layers={layers} mobile={mobile} />
      ))}
      <TileScrim p={p} label={label} />
    </motion.div>
  );
}

/** Scrim + label that only exist once the card is a collage object. */
function TileScrim({ p, label }: { p: MotionValue<number>; label?: string }) {
  const opacity = useTransform(p, [MORPH_IN + 0.02, MORPH_OUT], [0, 1]);
  return (
    <motion.div className="pointer-events-none absolute inset-0" style={{ opacity }}>
      <span className="absolute inset-0 bg-[#070B14]/[0.12]" />
      <span className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/60 to-transparent" />
      {label && (
        <span className="absolute bottom-2.5 left-3 right-3 truncate text-[10px] font-semibold uppercase tracking-[0.15em] text-white/75">{label}</span>
      )}
    </motion.div>
  );
}

function SupportTile({ tile, p, reduced, mobile, armed }: { tile: Tile; p: MotionValue<number>; reduced: boolean; mobile: boolean; armed: boolean }) {
  const f = support(tile.key);
  const from = tile.from ?? 0.45;
  const opacity = useTransform(p, [from, from + 0.03, COLLAGE_END, RECEDE_END], [0, 1, 1, 0]);
  const scale = useTransform(p, [from, from + 0.045, COLLAGE_END, RECEDE_END], [0.9, 1, 1, 0.92]);
  const blur = useTransform(p, [COLLAGE_END, RECEDE_END], [0, mobile ? 6 : 10]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.div
      data-support-tile={tile.key}
      className="absolute overflow-hidden rounded-[4px] bg-[#0A0E14]"
      style={{
        left: `${tile.box.l}%`,
        top: `${tile.box.t}%`,
        width: `${tile.box.w}%`,
        height: `${tile.box.h}%`,
        rotate: tile.rotate ?? 0,
        opacity,
        scale,
        filter,
        zIndex: tile.z,
      }}
    >
      <FilmMedia f={f} play={armed} reduced={reduced} mobile={mobile} />
      <span className="pointer-events-none absolute inset-0 bg-[#070B14]/[0.14]" />
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

function RecognitionCollage({ p, reduced, mobile, armed }: { p: MotionValue<number>; reduced: boolean; mobile: boolean; armed: boolean }) {
  const tiles = mobile ? MOBILE_SUPPORT : DESKTOP_SUPPORT;
  const statementOpacity = useTransform(p, [0.50, 0.545, COLLAGE_END, RECEDE_END - 0.04], [0, 1, 1, 0]);
  const statementY = useTransform(p, [0.50, 0.56], [16, 0]);

  return (
    <>
      {tiles.map((tile) => <SupportTile key={tile.key} tile={tile} p={p} reduced={reduced} mobile={mobile} armed={armed} />)}
      <motion.div
        className={mobile ? "absolute left-[6%] top-[42%] z-[40] w-[88%]" : "absolute left-[34%] top-[39%] z-[40] w-[33%]"}
        style={{ opacity: statementOpacity, y: statementY }}
      >
        <h2
          className={mobile ? "text-[31px] leading-[1.02] tracking-[-0.045em] text-white" : "text-[50px] leading-[0.95] tracking-[-0.05em] text-white"}
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
  const { p, threadLabel, stageVisible, collageArmed, morphLock, heroLive } = useStoryScroll(wrap);
  const { videos, layers, label } = useHeroSequencer(stageVisible && heroLive, reduced, morphLock);
  const anchor = useMemo(() => (mobile ? MOBILE_ANCHOR : DESKTOP_ANCHOR), [mobile]);

  const heroOpacity = useTransform(p, [0.00, 0.05, 0.10], [1, 1, 0]);
  const gradeOpacity = useTransform(p, [MORPH_IN, MORPH_IN + 0.045], [1, 0]);
  const worldLabelOpacity = useTransform(p, [0.0, 0.02, MORPH_IN, MORPH_IN + 0.03], [0, 1, 1, 0]);

  const productOpacity = useTransform(p, [PRODUCT_IN, PRODUCT_FULL, 0.94, 1], [0, 1, 1, 0.92]);
  const productY = useTransform(p, [PRODUCT_IN, PRODUCT_FULL], [mobile ? 18 : 26, 0]);
  const bg = useTransform(p, [RECEDE_END - 0.06, PRODUCT_FULL - 0.02], ["#080B10", "#F7F8FA"]);

  return (
    <div ref={wrap} data-v5-stage className={mobile ? "relative h-[520vh]" : "relative h-[560vh]"}>
      <motion.div className="sticky overflow-hidden" style={{ top: NAV, height: `calc(100vh - ${NAV}px)`, background: bg }}>
        <HeroAnchorCard tile={anchor} p={p} mobile={mobile} label={label} videos={videos} layers={layers} />

        <motion.div className="pointer-events-none absolute inset-0 z-[28]" style={{ opacity: gradeOpacity }}>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,13,.78)_0%,rgba(5,8,13,.54)_34%,rgba(5,8,13,.16)_64%,rgba(5,8,13,.36)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-black/55 to-transparent" />
        </motion.div>

        <motion.div className="absolute right-[4%] top-[5%] z-[30] text-[10px] font-semibold uppercase tracking-[0.19em] text-white/45" style={{ opacity: worldLabelOpacity }}>
          {label}
        </motion.div>

        <motion.div
          className={mobile ? "absolute left-[6%] right-[6%] top-[46%] z-[32]" : "absolute left-[5.5%] top-1/2 z-[32] w-[42%] -translate-y-1/2"}
          style={{ opacity: heroOpacity }}
        >
          <HeroCopy mobile={mobile} />
        </motion.div>

        <RecognitionCollage p={p} reduced={reduced} mobile={mobile} armed={stageVisible && collageArmed} />
        <FollowThread p={p} label={threadLabel} mobile={mobile} />

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
