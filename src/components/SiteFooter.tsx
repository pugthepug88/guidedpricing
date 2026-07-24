import { ZAPLA_LOGO } from "./SiteNav";

export function SiteFooter() {
  const socials = [
    { href: "https://facebook.com/", icon: "https://stcdn.leadconnectorhq.com/funnel/icons/dark/facebook-dark.svg", alt: "Facebook" },
    { href: "https://instagram.com/", icon: "https://stcdn.leadconnectorhq.com/funnel/icons/dark/instagram-dark.svg", alt: "Instagram" },
    { href: "https://linkedin.com/", icon: "https://stcdn.leadconnectorhq.com/funnel/icons/dark/linkedin-dark.svg", alt: "LinkedIn" },
    { href: "https://youtube.com/", icon: "https://stcdn.leadconnectorhq.com/funnel/icons/dark/youtube-dark.svg", alt: "YouTube" },
  ];
  const link = "text-[14px] font-medium text-zapla-muted transition hover:text-zapla-blue";
  return (
    <footer className="border-t border-zapla-line bg-white">
      <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <a href="https://zapla.io/" className="inline-flex items-center">
              <img src={ZAPLA_LOGO} alt="Zapla" className="h-9 w-auto" />
            </a>
            <div className="mt-6 grid gap-3">
              <a
                href="https://www.trustpilot.com/review/zapla.io"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-zapla-line bg-zapla-faint px-3.5 py-1.5 text-[13px] font-bold text-zapla-ink hover:border-zapla-blue"
              >
                <span className="text-[#00b67a]">★</span> Review us on Trustpilot
              </a>
              <a
                href="https://www.g2.com/products/zapla-zapla/reviews/new"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-zapla-line bg-zapla-faint px-3.5 py-1.5 text-[13px] font-bold text-zapla-ink hover:border-zapla-blue"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#ff492c] text-[10px] font-black text-white">G2</span>
                Review us on G2
              </a>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a key={s.alt} href={s.href} aria-label={s.alt} className="grid h-9 w-9 place-items-center rounded-full border border-zapla-line bg-white transition hover:border-zapla-blue">
                  <img src={s.icon} alt="" className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-[12px] font-black uppercase tracking-[0.14em] text-zapla-ink">Company</h4>
            <ul className="grid gap-2.5">
              <li><a className={link} href="https://zapla.io/booking">Book a Call</a></li>
              <li><a className={link} href="https://zapla.io/pricing">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[12px] font-black uppercase tracking-[0.14em] text-zapla-ink">Resources</h4>
            <ul className="grid gap-2.5">
              <li><a className={link} href="https://zapla.io/blog">Blog</a></li>
              <li><a className={link} href="https://zapla.canny.io/feature-request">Request feature</a></li>
              <li><a className={link} href="https://zapla.io/terms-and-conditions">Terms &amp; conditions</a></li>
              <li><a className={link} href="https://zapla.io/privacy-policy">Privacy policy</a></li>
              <li><a className={link} href="https://zapla.io/refund-policy">Refund policy</a></li>
              <li><a className={link} href="mailto:hello@zapla.io">Contact us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[12px] font-black uppercase tracking-[0.14em] text-zapla-ink">Compare</h4>
            <ul className="grid gap-2.5">
              <li><a className={link} href="https://zapla.io/comparison/zapla-vs-hubspot">Zapla Vs Hubspot</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-zapla-line pt-6 text-[12.5px] text-zapla-muted2">
          © {new Date().getFullYear()} Zapla. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
