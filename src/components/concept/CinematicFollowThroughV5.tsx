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
const V2 = "/concept/multi-world-v2";

/**
 * V5 media contract
 * -----------------
 * Drop final web cuts into /public/concept/cinematic-v5/ using these stems:
 * mechanic, broker, agent, construction, solar, roofing,
 * personal-trainer, photographer, dentist (.mp4 + .jpg).
 *
 * The component intentionally supports temporary fallbacks so this major
 * composition can be reviewed before every final binary is committed.
 */
type Film = {
  key: string;
  label: string;
  localStem: string;
  remoteVideo?: string;
  fallbackVideo?: string;
  fallbackPoster?: string;
  start?: number;
  end?: number;
  objectPosition?: string;
};

const HERO: Film[] = [
  {
    key: "mechanic",
    label: "Automotive workshop",
    localStem: "mechanic",
    fallbackVideo: `${V2}/mechanic.mp4`,
    fallbackPoster: `${V2}/mechanic.jpg`,
    start: 1.2,
    end: 8.6,
    objectPosition: "50% 46%",
  },
  {
    key: "broker",
    label: "Mortgage broker",
    localStem: "broker",
    remoteVideo: "https://videos.pexels.com/video-files/8293313/8293313-hd_1920_1080_30fps.mp4",
    fallbackVideo: `${V2}/broker.mp4`,
    fallbackPoster: `${V2}/broker.jpg`,
    start: 1.3,
    end: 5.0,
    objectPosition: "49% 50%",
  },
  {
    key: "agent",
    label: "Property / real estate",
    localStem: "agent",
    remoteVideo: "https://videos.pexels.com/video-files/7646399/7646399-uhd_3840_2160_25fps.mp4",
    fallbackVideo: `${V2}/agent.mp4`,
    fallbackPoster: `${V2}/agent.jpg`,
    start: 1.3,
    end: 6.6,
    objectPosition: "50% 48%",
  },
  {
    key: "construction",
    label: "Construction / project contractor",
    localStem: "construction",
    remoteVideo: "https://videos.pexels.com/video-files/8964794/8964794-uhd_3840_2160_25fps.mp4",
    fallbackVideo: "/concept/multi-world/builder.mp4",
    fallbackPoster: "/concept/multi-world/builder.jpg",
    start: 5.4,
    end: 9.0,
    objectPosition: "50% 47%",
  },
];

const SUPPORT: Film[] = [
  {
    key: "solar",
    label: "Solar installer",
    localStem: "solar",
    remoteVideo: "https://videos.pexels.com/video-files/8853484/8853484-hd_1080_1920_24fps.mp4",
    start: 0,
    end: 5,
    objectPosition: "50% 50%",
  },
  {
    key: "roofing",
    label: "Roofing contractor",
    localStem: "roofing",
    fallbackVideo: "/concept/human-work/painter.mp4",
    fallbackPoster: "/concept/human-work/painter.jpg",
    start: 0,
    end: 4,
    objectPosition: "50% 45%",
  },
  {
    key: "personal-trainer",
    label: "Personal trainer",
    localStem: "personal-trainer",
    objectPosition: "50% 50%",
  },
  {
    key: "photographer",
    label: "Photographer",
    localStem: "photographer",
    objectPosition: "50% 50%",
  },
  {
    key: "dentist",
    label: "Dentist",
    localStem: "dentist",
    fallbackVideo: "/concept/human-work/dentist.mp4",
    fallbackPoster: "/concept/human-work/dentist.jpg",
    start: 0,
    end: 5,
    objectPosition: "50% 48%",
  },
];

const ALL = [...HERO, ...SUPPORT];

const THREAD_STATES = [
  { at: 0.04, label: "New enquiry" },
  { at: 0.17, label: "Reply sent" },
  { at: 0.30, label: "Booking offered" },
  { at: 0.43, label: "Booked" },
  { at: 0.56, label: "Paid" },
  { at: 0.67, label: "Review requested" },
] as const;

function useStoryScroll(ref: React.RefObject<HTMLDivElement | null>) {
  const p = useMotionValue(0);
  const [worldIndex, setWorldIndex] = useState(0);
  const [stateIndex, setStateIndex] = useState(0);

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

      const nextWorld = v < 0.14 ? 0 : v < 0.26 ? 1 : v < 0.38 ? 2 : 3;
      setWorldIndex((old) => old === nextWorld ? old : nextWorld);
      if (visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    }, { rootMargin: "10% 0px" });

    io.observe(el);
    raf = requestAnimationFrame(tick);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [p, ref]);

  return { p, worldIndex, threadLabel: THREAD_STATES[stateIndex].label };
}

function FilmMedia({
  film,
  active,
  reduced,
  posterOnly = false,
  className = "",
}: {
  film: Film;
  active: boolean;
  reduced: boolean;
  posterOnly?: boolean;
  className?: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const localVideo = `${V5}/${film.localStem}.mp4`;
  const localPoster = `${V5}/${film.localStem}.jpg`;
  // Prefer committed local files (final V5 stem, then in-repo fallback) before remote sources.
  const candidates = [localVideo, film.fallbackVideo, film.remoteVideo].filter(Boolean) as string[];
  const [sourceIndex, setSourceIndex] = useState(0);
  const [posterFailed, setPosterFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const src = candidates[sourceIndex];

  // Local /concept/cinematic-v5 stems are not committed yet. The <video> error can
  // fire before hydration, so probe candidates once and start on the first that exists.
  useEffect(() => {
    let cancelled = false;
    const exists = async (url: string, kind: string) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        return res.ok && (res.headers.get("content-type") ?? "").startsWith(kind);
      } catch {
        return false;
      }
    };
    (async () => {
      for (let i = 0; i < candidates.length; i += 1) {
        if (await exists(candidates[i], "video/")) { if (!cancelled) setSourceIndex(i); return; }
      }
      if (!cancelled) setVideoFailed(true);
    })();
    void (async () => {
      if (!(await exists(localPoster, "image/")) && !cancelled) setPosterFailed(true);
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [film.key]);



  useEffect(() => {
    const v = video.current;
    if (!v || reduced || posterOnly || !active) return;
    const start = film.start ?? 0;
    if (v.readyState >= 1 && (v.currentTime < start || (film.end && v.currentTime > film.end))) v.currentTime = start;
    void v.play().catch(() => {});
    return () => v.pause();
  }, [active, reduced, posterOnly, sourceIndex, film.start, film.end]);


  if (reduced || posterOnly) {
    const poster = !posterFailed ? localPoster : film.fallbackPoster;
    if (poster) {
      return <img src={poster} onError={() => setPosterFailed(true)} alt="" aria-hidden className={`h-full w-full object-cover ${className}`} style={{ objectPosition: film.objectPosition }} />;
    }
  }

  if (!src || videoFailed) {
    return (
      <div className={`flex h-full w-full items-end bg-[#11151c] p-3 ${className}`}>
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">{film.label}</span>
      </div>
    );
  }

  return (
    <video
      ref={video}
      key={`${film.key}-${sourceIndex}`}
      src={src}
      poster={!posterFailed ? localPoster : film.fallbackPoster}
      muted
      playsInline
      preload={active ? "metadata" : "none"}
      aria-hidden
      className={`h-full w-full object-cover ${className}`}
      style={{ objectPosition: film.objectPosition }}
      onLoadedMetadata={(e) => {
        const v = e.currentTarget;
        const start = film.start ?? 0;
        v.currentTime = Math.min(start, Math.max(0, v.duration - 0.05));
        if (active) void v.play().catch(() => {});
      }}
      onTimeUpdate={(e) => {
        const v = e.currentTarget;
        const start = film.start ?? 0;
        const end = film.end ?? Math.max(start + 0.5, v.duration - 0.05);
        if (v.currentTime >= Math.min(end, v.duration - 0.02)) v.currentTime = Math.min(start, Math.max(0, v.duration - 0.05));
      }}
      onError={(e) => {
        // Only react to an error for the source currently mounted; a late 404 from a
        // previously attempted stem must not mark a working fallback as failed.
        if (e.currentTarget.currentSrc && !e.currentTarget.currentSrc.endsWith(src)) return;
        if (sourceIndex < candidates.length - 1) setSourceIndex((i) => i + 1);
      }}

    />
  );
}

function HeroVideoLayer({ film, active, reduced }: { film: Film; active: boolean; reduced: boolean }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={false}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 1.018 }}
      transition={{ opacity: { duration: 0.72 }, scale: { duration: 1.1, ease: [0.2, 0.8, 0.2, 1] } }}
      style={{ pointerEvents: active ? "auto" : "none" }}
    >
      <FilmMedia film={film} active={active} reduced={reduced} />
    </motion.div>
  );
}

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
        Your team does the work. Zapla keeps customers moving — enquiries, replies, bookings, payments, reviews and everything between.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a href="https://zapla.io/booking" className="inline-flex h-[48px] items-center gap-2 rounded-[10px] bg-white px-5 text-[14px] font-semibold text-[#111318]">Book a demo <ArrowRight className="h-4 w-4" /></a>
        <a href="#zapla-product-v5" className="inline-flex h-[48px] items-center rounded-[10px] border border-white/35 px-5 text-[14px] font-semibold text-white">See how it works</a>
      </div>
    </div>
  );
}

function FollowThread({ p, label, mobile }: { p: MotionValue<number>; label: string; mobile: boolean }) {
  const opacity = useTransform(p, [0.03, 0.07, 0.69, 0.75], [0, 1, 1, 0]);
  const y = useTransform(p, [0.05, 0.65], [0, mobile ? -18 : -10]);
  return (
    <motion.div className={mobile ? "absolute bottom-[6%] left-[6%] right-[6%] z-40" : "absolute bottom-[6%] left-[5.5%] z-40 w-[32%]"} style={{ opacity, y }}>
      <div className="flex items-center gap-3">
        <span className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: CYAN }} />
        <span className="h-px w-8 shrink-0 bg-white/35" />
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">Follow-through</div>
          <motion.div key={label} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-[14px] font-medium text-white" style={{ textShadow: "0 1px 14px rgba(0,0,0,.45)" }}>{label}</motion.div>
        </div>
      </div>
    </motion.div>
  );
}

type TileSpec = {
  key: string;
  className: string;
  from: number;
  delay?: number;
  enterX?: number;
  enterY?: number;
  rotate?: number;
  posterOnlyMobile?: boolean;
};

const DESKTOP_TILES: TileSpec[] = [
  { key: "mechanic", className: "left-[-3%] top-[4%] h-[33%] w-[34%]", from: 0.485, enterX: -110, enterY: -20, rotate: -1.1 },
  { key: "broker", className: "right-[3%] top-[-1%] h-[31%] w-[28%]", from: 0.505, enterX: 90, enterY: -55, rotate: 1.2 },
  { key: "agent", className: "right-[-4%] top-[45%] h-[35%] w-[32%]", from: 0.525, enterX: 120, enterY: 15, rotate: 0.8 },
  { key: "construction", className: "bottom-[-5%] left-[7%] h-[34%] w-[31%]", from: 0.545, enterX: -70, enterY: 90, rotate: -0.8 },
  { key: "solar", className: "left-[28%] top-[-7%] h-[37%] w-[13%]", from: 0.555, enterY: -110, rotate: 1.4 },
  { key: "roofing", className: "right-[29%] top-[17%] h-[22%] w-[21%]", from: 0.565, enterY: -50, rotate: -0.7 },
  { key: "personal-trainer", className: "bottom-[1%] left-[40%] h-[24%] w-[19%]", from: 0.575, enterY: 90, rotate: 0.7 },
  { key: "photographer", className: "left-[-3%] top-[43%] h-[25%] w-[20%]", from: 0.585, enterX: -95, rotate: 1.1 },
  { key: "dentist", className: "bottom-[-8%] right-[18%] h-[28%] w-[18%]", from: 0.595, enterY: 100, rotate: -1.2 },
];

const MOBILE_TILES: TileSpec[] = [
  { key: "mechanic", className: "left-[-9%] top-[5%] h-[25%] w-[61%]", from: 0.49, enterX: -60, rotate: -1.2 },
  { key: "agent", className: "right-[-14%] top-[7%] h-[27%] w-[55%]", from: 0.515, enterX: 60, rotate: 1.0, posterOnlyMobile: true },
  { key: "solar", className: "left-[4%] top-[37%] h-[30%] w-[28%]", from: 0.54, enterX: -45, rotate: 1.4, posterOnlyMobile: true },
  { key: "construction", className: "right-[-6%] top-[41%] h-[23%] w-[56%]", from: 0.56, enterX: 65, rotate: -0.8, posterOnlyMobile: true },
  { key: "dentist", className: "bottom-[3%] left-[9%] h-[22%] w-[43%]", from: 0.58, enterY: 55, rotate: -1.0, posterOnlyMobile: true },
  { key: "roofing", className: "bottom-[-2%] right-[-8%] h-[23%] w-[49%]", from: 0.60, enterY: 60, rotate: 1.0, posterOnlyMobile: true },
];

function CollageTile({ spec, p, reduced, mobile }: { spec: TileSpec; p: MotionValue<number>; reduced: boolean; mobile: boolean }) {
  const film = ALL.find((f) => f.key === spec.key)!;
  const opacity = useTransform(p, [spec.from, spec.from + 0.035, 0.70, 0.775], [0, 1, 1, 0]);
  const x = useTransform(p, [spec.from, spec.from + 0.045], [spec.enterX ?? 0, 0]);
  const y = useTransform(p, [spec.from, spec.from + 0.045], [spec.enterY ?? 0, 0]);
  const scale = useTransform(p, [spec.from, spec.from + 0.045, 0.70, 0.775], [0.92, 1, 1, 0.84]);
  const play = !mobile && !reduced;

  return (
    <motion.div
      className={`absolute overflow-hidden bg-[#0D1118] shadow-[0_32px_90px_-42px_rgba(0,0,0,.9)] ${spec.className}`}
      style={{ opacity, x, y, scale, rotate: spec.rotate ?? 0, zIndex: HERO.some((h) => h.key === film.key) ? 20 : 24 }}
    >
      <FilmMedia film={film} active={play} reduced={reduced} posterOnly={mobile && !!spec.posterOnlyMobile} />
      <span className="pointer-events-none absolute inset-0 bg-[#070B14]/[0.12]" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/60 to-transparent" />
      <span className="absolute bottom-2.5 left-3 right-3 truncate text-[9px] font-semibold uppercase tracking-[0.16em] text-white/70 md:text-[10px]">{film.label}</span>
    </motion.div>
  );
}

function RecognitionCollage({ p, reduced, mobile }: { p: MotionValue<number>; reduced: boolean; mobile: boolean }) {
  const groupOpacity = useTransform(p, [0.47, 0.50, 0.715, 0.79], [0, 1, 1, 0]);
  const groupScale = useTransform(p, [0.47, 0.55, 0.70, 0.79], [1.04, 1, 1, 0.88]);
  const statementOpacity = useTransform(p, [0.54, 0.59, 0.69, 0.735], [0, 1, 1, 0]);
  const statementY = useTransform(p, [0.54, 0.60], [18, 0]);
  const tiles = mobile ? MOBILE_TILES : DESKTOP_TILES;

  return (
    <motion.div className="absolute inset-0 z-30" style={{ opacity: groupOpacity, scale: groupScale }}>
      {tiles.map((spec) => <CollageTile key={spec.key} spec={spec} p={p} reduced={reduced} mobile={mobile} />)}
      <motion.div
        className={mobile ? "absolute left-[17%] top-[31%] z-40 w-[70%]" : "absolute left-1/2 top-[43%] z-40 w-[40%] -translate-x-1/2"}
        style={{ opacity: statementOpacity, y: statementY }}
      >
        <div className="text-[10px] font-semibold uppercase tracking-[0.19em] text-white/48">Customer follow-through for service businesses</div>
        <h2 className={mobile ? "mt-2 text-[31px] leading-[1.02] tracking-[-0.045em] text-white" : "mt-3 text-center text-[56px] leading-[0.96] tracking-[-0.05em] text-white"} style={{ fontFamily: DISPLAY, fontWeight: 500, textShadow: "0 2px 28px rgba(0,0,0,.72)" }}>
          Different work.<br />Same follow-through.
        </h2>
      </motion.div>
    </motion.div>
  );
}

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

function StoryStage({ mobile }: { mobile: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = !!useReducedMotion();
  const { p, worldIndex, threadLabel } = useStoryScroll(wrap);

  const filmOpacity = useTransform(p, [0.44, 0.51, 0.56], [1, 0.72, 0]);
  const heroOpacity = useTransform(p, [0.00, 0.08, 0.135], [1, 1, 0]);
  const productOpacity = useTransform(p, [0.735, 0.81], [0, 1]);
  const productY = useTransform(p, [0.735, 0.81], [mobile ? 16 : 22, 0]);
  const bg = useTransform(p, [0.70, 0.80], ["#080B10", "#F7F8FA"]);
  const headingOpacity = useTransform(p, [0.77, 0.83], [0, 1]);
  const headingY = useTransform(p, [0.77, 0.84], [mobile ? 14 : 18, 0]);

  return (
    <div ref={wrap} className={mobile ? "relative h-[640vh]" : "relative h-[720vh]"}>
      <motion.div className="sticky overflow-hidden" style={{ top: NAV, height: `calc(100vh - ${NAV}px)`, background: bg }}>
        <motion.div className="absolute inset-0 overflow-hidden" style={{ opacity: filmOpacity }}>
          {HERO.map((film, i) => <HeroVideoLayer key={film.key} film={film} active={i === worldIndex} reduced={reduced} />)}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,13,.76)_0%,rgba(5,8,13,.52)_33%,rgba(5,8,13,.14)_62%,rgba(5,8,13,.34)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute right-[4%] top-[5%] text-[10px] font-semibold uppercase tracking-[0.19em] text-white/45">{HERO[worldIndex].label}</div>
        </motion.div>

        <motion.div className={mobile ? "absolute left-[6%] right-[6%] top-[51%] z-30" : "absolute left-[5.5%] top-1/2 z-30 w-[42%] -translate-y-1/2"} style={{ opacity: heroOpacity }}><HeroCopy mobile={mobile} /></motion.div>

        <RecognitionCollage p={p} reduced={reduced} mobile={mobile} />
        <FollowThread p={p} label={threadLabel} mobile={mobile} />

        <motion.div className={mobile ? "absolute left-[4%] right-[4%] top-[26%] bottom-[4%] z-50" : "absolute left-[5%] right-[5%] top-[17%] bottom-[5%] z-50"} style={{ opacity: productOpacity, y: productY }}>
          <div className="h-full w-full overflow-hidden rounded-[14px] border border-slate-200/80 bg-white shadow-[0_40px_110px_-48px_rgba(15,23,42,.38)]"><GenericCustomerRecord /></div>
        </motion.div>

        <motion.div className={mobile ? "absolute left-[6%] top-[8.5%] z-[60] w-[88%]" : "absolute left-[5%] top-[4%] z-[60] w-[70%]"} style={{ opacity: headingOpacity, y: headingY }}>
          <h2 className={mobile ? "text-[34px] leading-[1.02] tracking-[-0.04em]" : "text-[52px] leading-[0.98] tracking-[-0.045em]"} style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}>One customer. Everything connected.</h2>
          <p className={mobile ? "mt-2 max-w-[335px] text-[13.5px] leading-[1.5] text-slate-500" : "mt-3 max-w-[650px] text-[15px] leading-[1.55] text-slate-500"}>Every enquiry, message, booking, payment and review stays connected in one customer record.</p>
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
          <a href="https://zapla.io/booking" className="inline-flex h-[50px] shrink-0 items-center gap-2 rounded-[10px] px-6 text-[14px] font-semibold text-white" style={{ background: CYAN }}>Book a demo <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>
    </div>
  );
}
