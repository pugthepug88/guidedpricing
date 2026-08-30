import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";

export const ZAPLA_LOGO =
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/9GCLMi9hEWTo5mWQUAFo/media/69c3771ac1440392b12c5779.png";

export function SiteNav() {
  const location = useLocation();
  const cinematicV5 = location.pathname === "/concept/cinematic-follow-through-v5";
  const [scrolled, setScrolled] = useState(false);
  const [cinematicVisible, setCinematicVisible] = useState(true);
  const [openMenu, setOpenMenu] = useState<null | "products" | "resources">(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!cinematicV5) {
      setCinematicVisible(true);
      return;
    }

    const onProgress = (event: Event) => {
      const { progress, stageBottom } = (
        event as CustomEvent<{ progress: number; stageBottom: number }>
      ).detail;
      setCinematicVisible(progress < 0.105 || stageBottom <= 0);
    };

    window.addEventListener("zapla:v5-progress", onProgress);
    return () => window.removeEventListener("zapla:v5-progress", onProgress);
  }, [cinematicV5]);

  const linkCls = cinematicV5
    ? "inline-flex items-center gap-1 text-[15px] font-medium text-white/90 transition hover:text-white"
    : "inline-flex items-center gap-1 text-[15px] font-medium text-zapla-ink/85 transition hover:text-zapla-blue";

  return (
    <nav
      className={
        cinematicV5
          ? "fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[linear-gradient(90deg,rgba(17,25,34,.76),rgba(61,60,57,.55),rgba(30,35,40,.68))] shadow-[0_12px_36px_rgba(0,0,0,.2)] backdrop-blur-[14px] transition-all duration-500 ease-out"
          : `sticky top-0 z-50 transition-all duration-300 ${
              scrolled
                ? "border-b border-zapla-line bg-white/90 backdrop-blur-xl"
                : "border-b border-transparent bg-white/60 backdrop-blur"
            }`
      }
      style={cinematicV5
        ? {
            opacity: cinematicVisible ? 1 : 0,
            transform: cinematicVisible ? "translateY(0)" : "translateY(-18px)",
            pointerEvents: cinematicVisible ? "auto" : "none",
          }
        : undefined}
    >
      <div
        className={cinematicV5
          ? "mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 py-2.5 sm:px-7"
          : "mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8"}
      >
        <a href="https://zapla.io/" className="flex items-center">
          {cinematicV5 ? (
            <span className="flex items-center">
              <span className="block h-8 w-8 shrink-0 overflow-hidden sm:h-9 sm:w-9">
                <img
                  src={ZAPLA_LOGO}
                  alt=""
                  aria-hidden
                  className="h-8 w-auto max-w-none sm:h-9"
                />
              </span>
              <span className="ml-1.5 block h-8 w-[82px] overflow-hidden sm:h-9 sm:w-[94px]">
                <img
                  src={ZAPLA_LOGO}
                  alt=""
                  aria-hidden
                  className="-translate-x-8 h-8 w-auto max-w-none brightness-0 invert mix-blend-screen sm:-translate-x-9 sm:h-9"
                />
              </span>
            </span>
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
            ? "grid h-10 w-10 place-items-center rounded-xl border border-white/25 bg-white/10 text-white lg:hidden"
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
