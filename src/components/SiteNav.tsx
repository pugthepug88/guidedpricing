import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";

export const ZAPLA_LOGO =
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/9GCLMi9hEWTo5mWQUAFo/media/69c3771ac1440392b12c5779.png";

function CinematicZaplaLogo() {
  return (
    <span className="flex h-9 items-center">
      {/* Keep the exact homepage mark. A small white patch sits only beneath the
          transparent inner cutout, so the cutout reads white without creating
          a white container around the blue mark. */}
      <span className="relative block h-9 w-9 shrink-0 overflow-hidden">
        <span className="absolute left-[8px] top-[7px] h-[22px] w-[21px] rounded-[6px] bg-white" />
        <img
          src={ZAPLA_LOGO}
          alt="Zapla"
          className="absolute left-0 top-0 h-9 w-auto max-w-none"
        />
      </span>

      {/* Reuse the real wordmark artwork rather than recreating it as text. */}
      <span className="ml-1.5 block h-9 w-[94px] overflow-hidden">
        <img
          src={ZAPLA_LOGO}
          alt=""
          aria-hidden="true"
          className="h-9 w-auto max-w-none -translate-x-9 brightness-0 invert"
        />
      </span>
    </span>
  );
}

export function SiteNav() {
  const location = useLocation();
  const cinematicV5 = location.pathname === "/concept/cinematic-follow-through-v5";
  const [scrolled, setScrolled] = useState(false);
  const [cinematicProgress, setCinematicProgress] = useState(0);
  const [cinematicPastHero, setCinematicPastHero] = useState(false);
  const [openMenu, setOpenMenu] = useState<null | "products" | "resources">(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const linkCls = cinematicV5
    ? cinematicPastHero
      ? "inline-flex items-center gap-1 text-[15px] font-medium text-zapla-ink/78 transition hover:text-zapla-blue"
      : "inline-flex items-center gap-1 text-[15px] font-medium text-white/90 transition hover:text-white"
    : "inline-flex items-center gap-1 text-[15px] font-medium text-zapla-ink/85 transition hover:text-zapla-blue";

  const cinematicNavClass = cinematicPastHero
    ? "fixed inset-x-0 top-0 z-50 border-b border-zapla-line/70 bg-white/[0.78] shadow-[0_10px_30px_rgba(15,23,42,.07)] backdrop-blur-[16px] backdrop-saturate-[1.04] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out"
    : cinematicAtTop
      ? "fixed inset-x-0 top-0 z-50 border-b border-transparent bg-transparent shadow-none backdrop-blur-none transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out"
      : "fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#090E15]/[0.22] shadow-[0_8px_28px_rgba(0,0,0,.09)] backdrop-blur-[12px] backdrop-saturate-[1.02] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out";

  return (
    <nav
      className={
        cinematicV5
          ? cinematicNavClass
          : `sticky top-0 z-50 transition-all duration-300 ${
              scrolled
                ? "border-b border-zapla-line bg-white/90 backdrop-blur-xl"
                : "border-b border-transparent bg-white/60 backdrop-blur"
            }`
      }
    >
      <div
        className={cinematicV5
          ? "mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 py-2.5 sm:px-7"
          : "mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8"}
      >
        <a href="https://zapla.io/" className="flex items-center">
          {cinematicV5 ? (
            cinematicPastHero ? (
              <img src={ZAPLA_LOGO} alt="Zapla" className="h-9 w-auto" />
            ) : (
              <CinematicZaplaLogo />
            )
          ) : (
            <img src={ZAPLA_LOGO} alt="Zapla" className="h-8 w-auto sm:h-9" />
          )}
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          <a href="https://zapla.io/" className={linkCls}>Home</a>

          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("products")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className={linkCls} type="button">
              Products
              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {openMenu === "products" && (
              <div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3">
                <div className="rounded-2xl border border-zapla-line bg-white p-2 shadow-zapla">
                  <a href="https://zapla.io/crm" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Zapla CRM</a>
                  <a href="https://zapla.io/vibe-studio" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Zapla Vibe Studio</a>
                </div>
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("resources")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className={linkCls} type="button">
              Resources
              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {openMenu === "resources" && (
              <div className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3">
                <div className="rounded-2xl border border-zapla-line bg-white p-2 shadow-zapla">
                  <a href="https://zapla.io/blog" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Blog</a>
                  <a href="https://zapla.canny.io/feature-request" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Request feature</a>
                  <a href="https://zapla.io/comparison/zapla-vs-hubspot" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Compare</a>
                </div>
              </div>
            )}
          </div>

          <a href="https://zapla.io/pricing" className={linkCls}>Pricing</a>
          <a href="https://my.zapla.io/" className={linkCls}>Log In</a>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://zapla.io/booking"
            className="inline-flex items-center justify-center rounded-full bg-zapla-blue px-4 py-2 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-zapla-blue2 hover:shadow-zapla-blue"
          >
            Book a Call
          </a>
        </div>

        <button
          type="button"
          aria-label="Menu"
          className={cinematicV5
            ? cinematicPastHero
              ? "grid h-10 w-10 place-items-center rounded-xl border border-zapla-line bg-white/80 text-zapla-ink lg:hidden"
              : cinematicAtTop
                ? "grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-transparent text-white lg:hidden"
                : "grid h-10 w-10 place-items-center rounded-xl border border-white/22 bg-white/[0.06] text-white backdrop-blur-[8px] lg:hidden"
            : "grid h-10 w-10 place-items-center rounded-xl border border-zapla-line bg-white text-zapla-ink lg:hidden"}
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
            <a href="https://zapla.io/" className="py-2">Home</a>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between py-2">Products<span className="text-zapla-muted group-open:rotate-180 transition">▾</span></summary>
              <div className="ml-3 grid gap-1 pb-2 text-[14px] text-zapla-muted">
                <a href="https://zapla.io/crm" className="py-1.5">Zapla CRM</a>
                <a href="https://zapla.io/vibe-studio" className="py-1.5">Zapla Vibe Studio</a>
              </div>
            </details>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between py-2">Resources<span className="text-zapla-muted group-open:rotate-180 transition">▾</span></summary>
              <div className="ml-3 grid gap-1 pb-2 text-[14px] text-zapla-muted">
                <a href="https://zapla.io/blog" className="py-1.5">Blog</a>
                <a href="https://zapla.canny.io/feature-request" className="py-1.5">Request feature</a>
                <a href="https://zapla.io/comparison/zapla-vs-hubspot" className="py-1.5">Compare</a>
              </div>
            </details>
            <a href="https://zapla.io/pricing" className="py-2">Pricing</a>
            <a href="https://my.zapla.io/" className="py-2">Log In</a>
            <div className="mt-2 grid gap-2">
              <a href="https://zapla.io/booking" className="inline-flex items-center justify-center rounded-full bg-zapla-blue px-4 py-2.5 text-[13px] font-extrabold text-white">Book a Call</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
