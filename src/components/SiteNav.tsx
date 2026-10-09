import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";

export const ZAPLA_LOGO = "/concept/zapla-logo-dark.svg";

function CinematicZaplaLogo() {
  return (
    <span className="flex h-8 items-center">
      {/* Keep the exact homepage mark. A small white patch sits only beneath the
          transparent inner cutout, so the cutout reads white without creating
          a white container around the blue mark. */}
      <span className="relative block h-8 w-8 shrink-0 overflow-hidden">
        <span className="absolute left-[7px] top-[6px] h-[20px] w-[19px] rounded-[5px] bg-white" />
        <img
          src={ZAPLA_LOGO}
          alt="Zapla"
          className="absolute left-0 top-0 h-8 w-auto max-w-none"
        />
      </span>

      {/* Reuse the real wordmark artwork rather than recreating it as text. */}
      <span className="ml-1.5 block h-8 w-[84px] overflow-hidden">
        <img
          src={ZAPLA_LOGO}
          alt=""
          aria-hidden="true"
          className="h-8 w-auto max-w-none -translate-x-8 brightness-0 invert"
        />
      </span>
    </span>
  );
}

export function SiteNav() {
  const location = useLocation();
  const cinematicV5 =
    location.pathname === "/" ||
    location.pathname === "/concept/cinematic-follow-through-v5";
  // Every non-home route inherits the homepage header geometry. Light pages begin in
  // the same glass state the homepage uses after its cinematic hero.
  const lightSitePage = !cinematicV5;
  const [cinematicProgress, setCinematicProgress] = useState(0);
  const [cinematicPastHero, setCinematicPastHero] = useState(false);
  const lightGlassState = cinematicPastHero || lightSitePage;
  const [openMenu, setOpenMenu] = useState<null | "platform" | "solutions">(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!cinematicV5) {
      setCinematicProgress(0);
      setCinematicPastHero(false);
      return;
    }

    const onProgress = (event: Event) => {
      const { progress, stageBottom } = (
        event as CustomEvent<{ progress: number; stageBottom: number }>
      ).detail;
      setCinematicProgress(progress);
      setCinematicPastHero(stageBottom <= 0);
    };

    window.addEventListener("zapla:v5-progress", onProgress);
    return () => window.removeEventListener("zapla:v5-progress", onProgress);
  }, [cinematicV5]);

  const cinematicAtTop = cinematicV5 && !cinematicPastHero && cinematicProgress < 0.025;

  const linkCls = lightGlassState
    ? "inline-flex items-center gap-1 text-[15px] font-medium text-zapla-ink/78 transition hover:text-zapla-blue"
    : "inline-flex items-center gap-1 text-[15px] font-medium text-white/90 transition hover:text-white";

  const cinematicNavClass = lightGlassState
    ? "fixed inset-x-0 top-0 z-50 border-b border-zapla-line/70 bg-white/[0.78] shadow-[0_10px_30px_rgba(15,23,42,.07)] backdrop-blur-[16px] backdrop-saturate-[1.04] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out"
    : cinematicAtTop
      ? "fixed inset-x-0 top-0 z-50 border-b border-transparent bg-transparent shadow-none backdrop-blur-none transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out"
      : "fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#090E15]/[0.22] shadow-[0_8px_28px_rgba(0,0,0,.09)] backdrop-blur-[12px] backdrop-saturate-[1.02] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out";

  const headerCtaCls = !lightGlassState
    ? "inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-[13px] font-bold text-[#111318] shadow-[0_6px_20px_rgba(0,0,0,.12)] transition hover:-translate-y-0.5 hover:bg-white/92 hover:shadow-[0_10px_26px_rgba(0,0,0,.16)]"
    : "inline-flex items-center justify-center rounded-full bg-[#2563FF] px-4 py-2 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1D4ED8] hover:shadow-zapla-blue";

  return (
    <nav className={cinematicNavClass}>
      <div
        className="flex w-full items-center justify-between gap-4 px-[6vw] py-2.5 lg:px-[5.5vw]"
      >
        <a href="https://zapla.io/" className="flex items-center">
          {lightGlassState ? (
            <img src={ZAPLA_LOGO} alt="Zapla" className="h-8 w-auto" />
          ) : (
            <CinematicZaplaLogo />
          )}
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          <div className="relative" onMouseEnter={() => setOpenMenu("platform")} onMouseLeave={() => setOpenMenu(null)}>
            <button className={linkCls} type="button">Platform <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            {openMenu === "platform" && (
              <div className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3"><div className="rounded-2xl border border-zapla-line bg-white p-2 shadow-zapla">
                <a href="/platform" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Overview</a>
                <a href="/crm" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">CRM</a>
                <a href="/customer-marketing" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Customer Marketing</a>
                <a href="/ai-receptionist" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">AI Receptionist</a>
              </div></div>
            )}
          </div>
          <div className="relative" onMouseEnter={() => setOpenMenu("solutions")} onMouseLeave={() => setOpenMenu(null)}>
            <button className={linkCls} type="button">Solutions <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            {openMenu === "solutions" && (
              <div className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3"><div className="rounded-2xl border border-zapla-line bg-white p-2 shadow-zapla">
                <a href="/follow-up" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Follow-Up</a>
                <a href="/reactivation" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Reactivation</a>
                <a href="/reviews" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Reviews &amp; Reputation</a>
                <div className="mx-3 my-2 border-t border-zapla-line" />
                <a href="/industries/mechanics" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Mechanics &amp; Workshops</a>
                <a href="/industries/dental" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Dental Practices</a>
                <a href="/industries/cosmetic-skin-clinics" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Skin &amp; Cosmetic Clinics</a>
                <a href="/industries/trades" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Trades &amp; Home Services</a>
              </div></div>
            )}
          </div>
          <a href="/Pricing-v3" className={linkCls}>Pricing</a>
          <a href="https://my.zapla.io/" className={linkCls}>Log In</a>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="https://zapla.io/booking" className={headerCtaCls}>
            Book a Call
          </a>
        </div>

        <button
          type="button"
          aria-label="Menu"
          className={lightGlassState
            ? "grid h-10 w-10 place-items-center rounded-xl border border-zapla-line bg-white/80 text-zapla-ink lg:hidden"
            : cinematicAtTop
              ? "grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-transparent text-white lg:hidden"
              : "grid h-10 w-10 place-items-center rounded-xl border border-white/22 bg-white/[0.06] text-white backdrop-blur-[8px] lg:hidden"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-zapla-line bg-white lg:hidden">
          <div className="mx-auto grid max-w-[1240px] gap-1 px-5 py-4 text-[15px] font-semibold text-zapla-ink">
            <details className="group"><summary className="flex cursor-pointer list-none items-center justify-between py-2">Platform<span className="text-zapla-muted group-open:rotate-180 transition">▾</span></summary><div className="ml-3 grid gap-1 pb-2 text-[14px] text-zapla-muted">
              <a href="/platform" className="py-1.5">Overview</a><a href="/crm" className="py-1.5">CRM</a><a href="/customer-marketing" className="py-1.5">Customer Marketing</a><a href="/ai-receptionist" className="py-1.5">AI Receptionist</a>
            </div></details>
            <details className="group"><summary className="flex cursor-pointer list-none items-center justify-between py-2">Solutions<span className="text-zapla-muted group-open:rotate-180 transition">▾</span></summary><div className="ml-3 grid gap-1 pb-2 text-[14px] text-zapla-muted">
              <a href="/follow-up" className="py-1.5">Follow-Up</a><a href="/reactivation" className="py-1.5">Reactivation</a><a href="/reviews" className="py-1.5">Reviews &amp; Reputation</a>
              <a href="/industries/mechanics" className="py-1.5">Mechanics &amp; Workshops</a><a href="/industries/dental" className="py-1.5">Dental Practices</a>
                <a href="/industries/cosmetic-skin-clinics" className="py-1.5">Skin &amp; Cosmetic Clinics</a>
              <a href="/industries/trades" className="py-1.5">Trades &amp; Home Services</a>
            </div></details>
            <a href="/Pricing-v3" className="py-2">Pricing</a><a href="https://my.zapla.io/" className="py-2">Log In</a>
            <div className="mt-2 grid gap-2"><a href="https://zapla.io/booking" className="inline-flex items-center justify-center rounded-full bg-[#2563FF] px-4 py-2.5 text-[13px] font-extrabold text-white">Book a Call</a></div>
          </div>
        </div>
      )}
    </nav>
  );
}
