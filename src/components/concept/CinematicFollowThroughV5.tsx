import { useEffect, useMemo, useRef, useState, type MutableRefObject, type RefObject } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ZaplaPlatformShowcase } from "@/components/concept/ZaplaPlatformShowcase";

const NAV = 66;
const CYAN = "#06B6D4";
const DISPLAY = '\"Inter Tight\", \"Outfit\", \"Manrope\", system-ui, sans-serif';
const V5 = "/concept/cinematic-v5";

type Film = {
  key: string;
  video: string;
  poster: string;
  start: number;
  end: number;
  position?: string;
  positionMobile?: string;
  brightness?: number;
  contrast?: number;
};

const src = (stem: string) => ({
  video: `${V5}/${stem}.mp4`,
  poster: `${V5}/${stem}.jpg`,
});

const HERO_FILMS: Film[] = [
  { key: "mechanic", ...src("mechanic"), start: 1.2, end: 8.6, position: "50% 46%", positionMobile: "52% 48%" },
  { key: "broker", ...src("broker"), start: 0.3, end: 3.62, position: "49% 50%", positionMobile: "52% 52%" },
  { key: "real-estate", ...src("real-estate"), start: 0, end: 4.45, position: "50% 50%", positionMobile: "48% 50%" },
  { key: "construction", ...src("construction"), start: 0.2, end: 3.52, position: "50% 52%", positionMobile: "54% 54%" },
];

const SUPPORT_FILMS: Film[] = [
  { key: "solar", ...src("solar"), start: 0.3, end: 4.9, position: "50% 46%", positionMobile: "50% 44%" },
  { key: "roofing", ...src("roofing"), start: 0.2, end: 3.9, position: "50% 44%" },
  { key: "skin-clinic", ...src("skin-clinic"), start: 0, end: 4.75, position: "52% 48%", positionMobile: "54% 48%" },
  { key: "vet", ...src("vet"), start: 0, end: 4.45, position: "50% 48%", positionMobile: "50% 48%" },
  { key: "dentist", ...src("dentist"), start: 0.3, end: 4.9, position: "50% 48%" },
  { key: "personal-trainer", ...src("personal-trainer"), start: 0.3, end: 5.4, position: "50% 46%" },
  { key: "photographer", ...src("photographer"), start: 0.2, end: 3.4, position: "33% 44%", positionMobile: "33% 40%", brightness: 1.2, contrast: 1.04 },
];

const support = (key: string) => SUPPORT_FILMS.find((f) => f.key === key)!;

/* Scroll is intentionally short. Autoplay owns time; scroll only changes geometry. */
const MORPH_IN = 0.08;
const MORPH_OUT = 0.26;
const SUPPORT_IN = 0.18;
const STATEMENT_IN = 0.29;

function useStoryScroll(ref: RefObject<HTMLDivElement | null>) {
  const p = useMotionValue(0);
  const stageVisible = useRef(true);
  const morphLock = useRef(false);
  const collageArmed = useRef(false);
  const [signals, setSignals] = useState({ stageVisible: true, morphLock: false, collageArmed: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let visible = true;

    const tick = () => {
      const total = el.offsetHeight - (window.innerHeight - NAV);
      const raw = total > 0 ? (NAV - el.getBoundingClientRect().top) / total : 0;
      const v = Math.max(0, Math.min(1, raw));
      p.set(v);

      const nextLock = v >= MORPH_IN && v <= MORPH_OUT;
      const nextArmed = v >= 0.1;
      if (nextLock !== morphLock.current || nextArmed !== collageArmed.current) {
        morphLock.current = nextLock;
        collageArmed.current = nextArmed;
        setSignals((s) => ({ ...s, morphLock: nextLock, collageArmed: nextArmed }));
      }
      if (visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      stageVisible.current = entry.isIntersecting;
      setSignals((s) => ({ ...s, stageVisible: entry.isIntersecting }));
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    }, { rootMargin: "12% 0px" });

    io.observe(el);
    raf = requestAnimationFrame(tick);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [p, ref]);

  return { p, ...signals };
}

const FADE_MS = 620;
const heroHoldMs = (f: Film) => {
  const usable = (f.end - f.start) * 1000;
  return Math.max(1750, Math.min(2850, usable - FADE_MS - 260));
};

type Machine = { cur: number; nxt: number; phase: "hold" | "fade"; t0: number };

function useHeroSequencer(active: boolean, reduced: boolean, scrollP: MotionValue<number>) {
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const mach = useRef<Machine>({ cur: 0, nxt: 1, phase: "hold", t0: 0 });

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
    let wasMorphLocked = false;

    const frame = (now: number) => {
      const m = mach.current;
      const progress = scrollP.get();
      const morphLocked = progress >= MORPH_IN && progress <= MORPH_OUT;
      const enteringMorphLock = morphLocked && !wasMorphLocked;

      /*
       * The geometry lock reads the MotionValue directly instead of waiting for
       * React state. If scroll catches a crossfade already in flight, settle on
       * whichever profession is visually dominant at the lock edge, then keep
       * that single profession fixed for the whole physical shrink.
       */
      if (enteringMorphLock && m.phase === "fade") {
        const fadeT = Math.min(1, Math.max(0, (now - m.t0) / FADE_MS));
        const mix = fadeT * fadeT * (3 - 2 * fadeT);
        if (mix >= 0.5) {
          const out = m.cur;
          m.cur = m.nxt;
          m.nxt = (m.cur + 1) % n;
          park(out);
        } else {
          park(m.nxt);
          m.nxt = (m.cur + 1) % n;
        }
        m.phase = "hold";
        m.t0 = now;
        paint(1, 0);
      }
      wasMorphLocked = morphLocked;

      const curFilm = HERO_FILMS[m.cur];
      const cv = at(m.cur);

      for (let i = 0; i < n; i++) {
        if (i === m.cur) continue;
        if (m.phase === "fade" && i === m.nxt) continue;
        park(i);
      }
      if (m.phase === "hold") seekStart(m.nxt);

      if (cv) {
        if (cv.paused && cv.currentTime < curFilm.end - 0.05) void cv.play().catch(() => {});
        if (cv.currentTime >= curFilm.end - 0.03 && !cv.paused) cv.pause();
      }

      if (m.phase === "hold") {
        const elapsed = now - m.t0;
        const remaining = cv && Number.isFinite(cv.duration) ? (curFilm.end - cv.currentTime) * 1000 : 9999;
        const dueByTime = elapsed >= heroHoldMs(curFilm);
        const dueByWindow = remaining <= FADE_MS + 180;

        /* A new profession may never start while the card is physically morphing. */
        if (!morphLocked && (dueByTime || dueByWindow)) {
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
        }
      } else {
        paint(1, 0);
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced, scrollP]);

  return { videos, layers };
}

function HeroVideo({ f, index, videos, layers, mobile }: {
  f: Film;
  index: number;
  videos: MutableRefObject<(HTMLVideoElement | null)[]>;
  layers: MutableRefObject<(HTMLDivElement | null)[]>;
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
          if (Math.abs(e.currentTarget.currentTime - f.start) > 0.06) e.currentTarget.currentTime = f.start;
        }}
      >
        <source src={f.video} type="video/mp4" />
      </video>
    </div>
  );
}

function FilmMedia({ f, play, reduced, mobile }: { f: Film; play: boolean; reduced: boolean; mobile: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const position = (mobile && f.positionMobile) || f.position || "50% 50%";

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
    if (!reduced && play && v.paused) void v.play().catch(() => {});
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
      style={{
        objectPosition: position,
        filter: `brightness(${f.brightness ?? 1}) contrast(${f.contrast ?? 1})`,
      }}
      onLoadedMetadata={(e) => {
        const v = e.currentTarget;
        const start = Math.min(f.start, Math.max(0, v.duration - 0.05));
        if (Math.abs(v.currentTime - start) > 0.05) v.currentTime = start;
        kick(v);
      }}
      onCanPlay={(e) => kick(e.currentTarget)}
      onTimeUpdate={(e) => {
        const v = e.currentTarget;
        const end = Math.min(f.end, v.duration - 0.03);
        if (v.currentTime >= end) {
          v.currentTime = f.start;
          kick(v);
        }
      }}
      onEnded={(e) => {
        e.currentTarget.currentTime = f.start;
        kick(e.currentTarget);
      }}
    >
      <source src={f.video} type="video/mp4" />
    </video>
  );
}

type Box = { l: number; t: number; w: number; h: number };
type Entrance = { x: number; y: number; scale: number; rotate: number; span: number };
type Tile = { key: string; box: Box; rotate?: number; z: number; from?: number; enter?: Entrance };

/* Editorial composition: irregular scale, off-canvas cropping, no shared baselines. */
const DESKTOP_ANCHOR: Tile = { key: "anchor", box: { l: -4, t: 4, w: 37, h: 47 }, rotate: -2.6, z: 24 };
const DESKTOP_SUPPORT: Tile[] = [
  { key: "solar", box: { l: 29, t: -9, w: 19, h: 31 }, rotate: 3, z: 18, from: 0.14, enter: { x: 5, y: -30, scale: 0.82, rotate: 8, span: 0.11 } },
  { key: "roofing", box: { l: 46, t: 7, w: 23, h: 29 }, rotate: -2.2, z: 20, from: 0.18, enter: { x: 14, y: -24, scale: 0.86, rotate: -7, span: 0.1 } },
  { key: "skin-clinic", box: { l: 68, t: -2, w: 35, h: 32 }, rotate: 1.7, z: 19, from: 0.16, enter: { x: 36, y: -5, scale: 0.9, rotate: 6, span: 0.13 } },
  { key: "vet", box: { l: 68, t: 31, w: 33, h: 31 }, rotate: -2.4, z: 22, from: 0.245, enter: { x: 32, y: 14, scale: 0.86, rotate: -7, span: 0.12 } },
  { key: "dentist", box: { l: -4, t: 56, w: 30, h: 33 }, rotate: 2.3, z: 21, from: 0.21, enter: { x: -30, y: 18, scale: 0.86, rotate: 8, span: 0.14 } },
  { key: "personal-trainer", box: { l: 22, t: 68, w: 21, h: 28 }, rotate: -3.3, z: 17, from: 0.29, enter: { x: -5, y: 30, scale: 0.76, rotate: -9, span: 0.09 } },

  { key: "photographer", box: { l: 70, t: 73, w: 35, h: 31 }, rotate: 3.8, z: 30, from: 0.255, enter: { x: 28, y: 32, scale: 0.84, rotate: 10, span: 0.12 } },
];

const MOBILE_ANCHOR: Tile = { key: "anchor", box: { l: -5, t: 2, w: 62, h: 22 }, rotate: -2.4, z: 24 };
const MOBILE_SUPPORT: Tile[] = [
  { key: "skin-clinic", box: { l: 58, t: 7, w: 47, h: 19 }, rotate: 2.2, z: 19, from: 0.15, enter: { x: 38, y: -6, scale: 0.88, rotate: 7, span: 0.12 } },
  { key: "solar", box: { l: -6, t: 27, w: 40, h: 15 }, rotate: 3, z: 18, from: 0.185, enter: { x: -28, y: -18, scale: 0.82, rotate: 9, span: 0.1 } },
  { key: "roofing", box: { l: 37, t: 25, w: 34, h: 13 }, rotate: -2.6, z: 20, from: 0.165, enter: { x: 12, y: -26, scale: 0.86, rotate: -8, span: 0.11 } },
  { key: "vet", box: { l: 66, t: 31, w: 40, h: 17 }, rotate: -2.2, z: 21, from: 0.25, enter: { x: 34, y: 12, scale: 0.86, rotate: -7, span: 0.12 } },
  { key: "dentist", box: { l: -7, t: 60, w: 41, h: 16 }, rotate: 2.4, z: 20, from: 0.215, enter: { x: -30, y: 20, scale: 0.84, rotate: 8, span: 0.13 } },
  { key: "personal-trainer", box: { l: 33, t: 70, w: 28, h: 13 }, rotate: -3.4, z: 17, from: 0.295, enter: { x: -6, y: 30, scale: 0.76, rotate: -9, span: 0.09 } },
  { key: "photographer", box: { l: 62, t: 75, w: 44, h: 17 }, rotate: 3.6, z: 30, from: 0.26, enter: { x: 26, y: 30, scale: 0.84, rotate: 10, span: 0.12 } },
];


function HeroAnchorCard({ tile, p, mobile, videos, layers }: {
  tile: Tile;
  p: MotionValue<number>;
  mobile: boolean;
  videos: MutableRefObject<(HTMLVideoElement | null)[]>;
  layers: MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  const stops = [MORPH_IN, MORPH_OUT];
  const left = useTransform(p, stops, [0, tile.box.l]);
  const top = useTransform(p, stops, [0, tile.box.t]);
  const width = useTransform(p, stops, [100, tile.box.w]);
  const height = useTransform(p, stops, [100, tile.box.h]);
  const radius = useTransform(p, stops, [0, 4]);
  const rotate = useTransform(p, stops, [0, tile.rotate ?? 0]);
  const l = useTransform(left, (v) => `${v}%`);
  const t = useTransform(top, (v) => `${v}%`);
  const w = useTransform(width, (v) => `${v}%`);
  const h = useTransform(height, (v) => `${v}%`);
  const br = useTransform(radius, (v) => `${v}px`);

  return (
    <motion.div
      data-hero-anchor
      className="absolute overflow-hidden bg-[#0A0E14]"
      style={{ left: l, top: t, width: w, height: h, borderRadius: br, rotate, zIndex: tile.z }}
    >
      {HERO_FILMS.map((f, i) => (
        <HeroVideo key={f.key} f={f} index={i} videos={videos} layers={layers} mobile={mobile} />
      ))}
      <TileScrim p={p} />
    </motion.div>
  );
}

function TileScrim({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [MORPH_IN + 0.03, MORPH_OUT], [0, 1]);
  return (
    <motion.div className="pointer-events-none absolute inset-0" style={{ opacity }}>
      <span className="absolute inset-0 bg-[#070B14]/[0.08]" />
      <span className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/24 to-transparent" />
    </motion.div>
  );
}

const EASE_SETTLE = (t: number) => 1 - Math.pow(1 - t, 3);

function SupportTile({ tile, p, reduced, mobile, armed }: {
  tile: Tile;
  p: MotionValue<number>;
  reduced: boolean;
  mobile: boolean;
  armed: boolean;
}) {
  const f = support(tile.key);
  const from = tile.from ?? SUPPORT_IN;
  const e: Entrance = tile.enter ?? { x: 0, y: 12, scale: 0.9, rotate: 0, span: 0.06 };
  const end = from + e.span;
  const finalRotate = tile.rotate ?? 0;

  /* Directional travel: cards fly in from offscreen and settle into the composition. */
  const opacity = useTransform(p, [from, from + e.span * 0.32], [0, 1]);
  const x = useTransform(p, [from, end], [`${e.x}vw`, "0vw"], { ease: EASE_SETTLE });
  const y = useTransform(p, [from, end], [`${e.y}vh`, "0vh"], { ease: EASE_SETTLE });
  const scale = useTransform(p, [from, end], [e.scale, 1], { ease: EASE_SETTLE });
  const rotate = useTransform(p, [from, end], [e.rotate, finalRotate], { ease: EASE_SETTLE });

  return (
    <motion.div
      data-support-tile={tile.key}
      className="absolute overflow-hidden rounded-[4px] bg-[#0A0E14]"
      style={{
        left: `${tile.box.l}%`,
        top: `${tile.box.t}%`,
        width: `${tile.box.w}%`,
        height: `${tile.box.h}%`,
        x: reduced ? "0vw" : x,
        y: reduced ? "0vh" : y,
        rotate: reduced ? finalRotate : rotate,
        opacity,
        scale: reduced ? 1 : scale,
        zIndex: tile.z,
        boxShadow: "0 18px 46px -18px rgba(0,0,0,.62)",
      }}
    >
      <FilmMedia f={f} play={armed} reduced={reduced} mobile={mobile} />
      <span className="pointer-events-none absolute inset-0 bg-[#070B14]/[0.07]" />
    </motion.div>
  );
}


function HeroCopy({ mobile }: { mobile: boolean }) {
  return (
    <div className={mobile ? "max-w-[350px]" : "max-w-[650px]"}>
      <div className="flex items-start gap-3">
        <span className="mt-[7px] h-[2px] w-7 shrink-0" style={{ background: CYAN }} />
        <span className="text-[10px] font-semibold uppercase leading-[1.45] tracking-[0.19em] text-white/74 md:text-[11px]">
          CRM + AUTOMATION FOR SERVICE BUSINESSES
        </span>
      </div>
      <h1
        className={mobile
          ? "mt-4 text-[48px] leading-[0.98] tracking-[-0.045em] text-white"
          : "mt-5 text-[80px] leading-[0.94] tracking-[-0.05em] text-white"}
        style={{ fontFamily: DISPLAY, fontWeight: 500 }}
      >
        You lead.<br />Zapla follows through.
      </h1>
      <p className={mobile
        ? "mt-4 max-w-[340px] text-[15px] leading-[1.55] text-white/76"
        : "mt-6 max-w-[610px] text-[17px] leading-[1.62] text-white/76"}
      >
        Zapla connects every enquiry, conversation and next step in one platform, keeping customers moving from first contact to booked, paid and returning.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a href="https://zapla.io/booking" className="inline-flex h-[48px] items-center gap-2 rounded-[10px] bg-white px-5 text-[14px] font-semibold text-[#111318]">
          Book a Call <ArrowRight className="h-4 w-4" />
        </a>
        <a href="#zapla-product-v5" className="inline-flex h-[48px] items-center rounded-[10px] border border-white/35 px-5 text-[14px] font-semibold text-white">
          See the platform
        </a>
      </div>
    </div>
  );
}

function RecognitionCollage({ p, reduced, mobile, armed }: {
  p: MotionValue<number>;
  reduced: boolean;
  mobile: boolean;
  armed: boolean;
}) {
  const tiles = mobile ? MOBILE_SUPPORT : DESKTOP_SUPPORT;
  const statementOpacity = useTransform(p, [STATEMENT_IN, STATEMENT_IN + 0.055], [0, 1]);
  const statementY = useTransform(p, [STATEMENT_IN, STATEMENT_IN + 0.07], [14, 0]);

  return (
    <>
      {tiles.map((tile) => (
        <SupportTile key={tile.key} tile={tile} p={p} reduced={reduced} mobile={mobile} armed={armed} />
      ))}
      <motion.div
        className={mobile ? "absolute left-[6%] top-[45%] z-[40] w-[84%]" : "absolute left-[35%] top-[42%] z-[40] w-[38%]"}
        style={{ opacity: statementOpacity, y: statementY }}
      >
        <h2
          className={mobile
            ? "text-[31px] leading-[1.02] tracking-[-0.045em] text-white"
            : "text-[50px] leading-[0.95] tracking-[-0.05em] text-white"}
          style={{ fontFamily: DISPLAY, fontWeight: 500, textShadow: "0 2px 30px rgba(0,0,0,.78)" }}
        >
          Different work.<br />Same follow-through.
        </h2>
        <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.19em] text-white/50">
          Service businesses. One connected customer journey.
        </div>
      </motion.div>
    </>
  );
}

function StoryStage({ mobile }: { mobile: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = !!useReducedMotion();
  const { p, stageVisible, collageArmed } = useStoryScroll(wrap);
  const { videos, layers } = useHeroSequencer(stageVisible, reduced, p);
  const anchor = useMemo(() => (mobile ? MOBILE_ANCHOR : DESKTOP_ANCHOR), [mobile]);

  const heroOpacity = useTransform(p, [0, 0.035, 0.12], [1, 1, 0]);
  const gradeOpacity = useTransform(p, [MORPH_IN, MORPH_OUT], [1, 0]);

  return (
    <div ref={wrap} data-v5-stage className={mobile ? "relative h-[280vh]" : "relative h-[260vh]"}>
      <div className="sticky overflow-hidden bg-[#080B10]" style={{ top: NAV, height: `calc(100vh - ${NAV}px)` }}>
        <HeroAnchorCard tile={anchor} p={p} mobile={mobile} videos={videos} layers={layers} />

        <motion.div className="pointer-events-none absolute inset-0 z-[28]" style={{ opacity: gradeOpacity }}>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,13,.78)_0%,rgba(5,8,13,.54)_34%,rgba(5,8,13,.16)_64%,rgba(5,8,13,.36)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-black/55 to-transparent" />
        </motion.div>

        <motion.div
          className={mobile
            ? "absolute left-[6%] right-[6%] top-[46%] z-[32]"
            : "absolute left-[5.5%] top-1/2 z-[32] w-[48%] -translate-y-1/2"}
          style={{ opacity: heroOpacity }}
        >
          <HeroCopy mobile={mobile} />
        </motion.div>

        <RecognitionCollage p={p} reduced={reduced} mobile={mobile} armed={stageVisible && collageArmed} />
      </div>
    </div>
  );
}

export function CinematicFollowThroughV5() {
  const mobile = useIsMobile();
  return (
    <div className="bg-[#F7F8FA]">
      <StoryStage mobile={mobile} />
      <ZaplaPlatformShowcase />
    </div>
  );
}
