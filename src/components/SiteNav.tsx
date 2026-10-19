import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { INDUSTRY_LINKS } from "@/lib/industries";

const NAV_GROUPS = [
  {
    id: "platform",
    label: "Platform",
    links: [
      { name: "Overview", href: "/platform" },
      { name: "CRM", href: "/crm" },
      { name: "Customer Marketing", href: "/customer-marketing" },
      { name: "AI Receptionist", href: "/ai-receptionist" },
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    links: [
      { name: "Follow-Up", href: "/follow-up" },
      { name: "Reactivation", href: "/reactivation" },
      { name: "Reviews & Reputation", href: "/reviews" },
    ],
  },
  {
    id: "industries",
    label: "Industries",
    links: [...INDUSTRY_LINKS, { name: "View all industries", href: "/industries" }],
  },
] as const;

export const ZAPLA_LOGO = "/concept/zapla-logo-dark.svg";

function CinematicZaplaLogo() {
  return (
    <span className="flex h-8 items-center">
      {/* Keep the exact homepage mark. A small white patch sits only beneath the
          transparent inner cutout, so the cutout reads white without creating
          a white container around the blue mark. */}
      <span className="relative block h-8 w-8 shrink-0 overflow-hidden">
        <span className="absolute left-[7px] top-[6px] h-[20px] w-[19px] rounded-[5px] bg-white" />
        <img src={ZAPLA_LOGO} alt="Zapla" className="absolute left-0 top-0 h-8 w-auto max-w-none" />
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
  const navRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const cinematicV5 =
    location.pathname === "/";
  // Every non-home route inherits the homepage header geometry. Light pages begin in
  // the same glass state the homepage uses after its cinematic hero.
  const lightSitePage = !cinematicV5;
  const [cinematicProgress, setCinematicProgress] = useState(0);
  const [cinematicPastHero, setCinematicPastHero] = useState(false);
  const lightGlassState = cinematicPastHero || lightSitePage;
  const [openMenu, setOpenMenu] = useState<null | "platform" | "solutions" | "industries">(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
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
    <nav
      ref={navRef}
      className={cinematicNavClass}
      aria-label="Main navigation"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpenMenu(null);
          setMobileOpen(false);
          const group = (event.target as HTMLElement).closest("[data-nav-group]");
          const trigger =
            group?.querySelector<HTMLButtonElement>("button") ??
            (mobileOpen ? mobileToggleRef.current : null);
          trigger?.focus();
        }
      }}
    >
      <div className="flex w-full items-center justify-between gap-4 px-[6vw] py-2.5 lg:px-[5.5vw]">
        <a href="/" className="flex items-center">
          {lightGlassState ? (
            <img src={ZAPLA_LOGO} alt="Zapla" className="h-8 w-auto" />
          ) : (
            <CinematicZaplaLogo />
          )}
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV_GROUPS.map((group) => (
            <div
              key={group.id}
              data-nav-group
              className="relative"
              onMouseEnter={() => setOpenMenu(group.id)}
              onMouseLeave={(event) => {
                if (!event.currentTarget.contains(document.activeElement)) setOpenMenu(null);
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setOpenMenu(null);
              }}
            >
              <button
                className={linkCls}
                type="button"
                aria-expanded={openMenu === group.id}
                aria-controls={`nav-${group.id}`}
                onClick={(event) =>
                  setOpenMenu((current) =>
                    event.detail === 0 && current === group.id ? null : group.id,
                  )
                }
              >
                {group.label}
                <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2 4l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {openMenu === group.id && (
                <div
                  id={`nav-${group.id}`}
                  className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3"
                >
                  <div className="rounded-2xl border border-zapla-line bg-white p-2 shadow-zapla">
                    {group.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpenMenu(null)}
                        className={`block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue focus-visible:outline-2 focus-visible:outline-zapla-blue ${link.href === "/industries" ? "mt-2 border-t border-zapla-line pt-3" : ""}`}
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <a href="/Pricing-v3" className={linkCls}>
            Pricing
          </a>
          <a href="https://my.zapla.io/" className={linkCls}>
            Log In
          </a>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="/booking" className={headerCtaCls}>
            Book a Call
          </a>
        </div>

        <button
          type="button"
          ref={mobileToggleRef}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          className={
            lightGlassState
              ? "grid h-10 w-10 place-items-center rounded-xl border border-zapla-line bg-white/80 text-zapla-ink lg:hidden"
              : cinematicAtTop
                ? "grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-transparent text-white lg:hidden"
                : "grid h-10 w-10 place-items-center rounded-xl border border-white/22 bg-white/[0.06] text-white backdrop-blur-[8px] lg:hidden"
          }
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            {mobileOpen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="max-h-[calc(100dvh-60px)] overflow-y-auto border-t border-zapla-line bg-white lg:hidden"
        >
          <div className="mx-auto grid max-w-[1240px] gap-1 px-5 py-4 text-[15px] font-semibold text-zapla-ink">
            {NAV_GROUPS.map((group) => (
              <details key={group.id} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between py-2">
                  {group.label}
                  <span
                    aria-hidden="true"
                    className="text-zapla-muted group-open:rotate-180 transition"
                  >
                    ▾
                  </span>
                </summary>
                <div className="ml-3 grid gap-1 pb-2 text-[14px] text-zapla-muted">
                  {group.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="py-1.5"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </details>
            ))}
            <a href="/Pricing-v3" className="py-2">
              Pricing
            </a>
            <a href="https://my.zapla.io/" className="py-2">
              Log In
            </a>
            <div className="mt-2 grid gap-2">
              <a
                href="/booking"
                className="inline-flex items-center justify-center rounded-full bg-[#2563FF] px-4 py-2.5 text-[13px] font-extrabold text-white"
              >
                Book a Call
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
