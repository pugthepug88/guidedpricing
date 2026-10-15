// Enable only as part of the approved production launch, after visual and booking QA.
export const PRODUCTION_INDEXING_ENABLED = false;
export const PRODUCTION_ORIGIN = "https://zapla.io";

export const SEARCH_PAGES = [
  "/",
  "/platform",
  "/crm",
  "/customer-marketing",
  "/ai-receptionist",
  "/follow-up",
  "/quote-follow-up",
  "/reactivation",
  "/reviews",
  "/Pricing-v3",
  "/industries",
  "/industries/mechanics",
  "/industries/trades",
  "/industries/allied-health",
  "/industries/dental",
  "/industries/cosmetic-skin-clinics",
  "/industries/mortgage-brokers",
] as const;

const canonicalPages = new Set<string>([...SEARCH_PAGES, "/booking"]);

export function isProductionIndexingEnabled(origin: string) {
  return PRODUCTION_INDEXING_ENABLED && origin === PRODUCTION_ORIGIN;
}

export function getPageSeo(origin: string, pathname: string, notFound = false) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const canonical =
    !notFound && canonicalPages.has(path) ? new URL(path, PRODUCTION_ORIGIN).href : undefined;
  const index =
    !notFound &&
    isProductionIndexingEnabled(origin) &&
    (SEARCH_PAGES as readonly string[]).includes(path);
  return { canonical, robots: index ? "index, follow" : "noindex, nofollow" };
}

export function getRobotsTxt(origin: string) {
  return isProductionIndexingEnabled(origin)
    ? `User-agent: *\nAllow: /\n\nSitemap: ${PRODUCTION_ORIGIN}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n";
}

export function getSitemapXml(origin: string) {
  const urls = isProductionIndexingEnabled(origin)
    ? SEARCH_PAGES.map(
        (path) => `  <url><loc>${new URL(path, PRODUCTION_ORIGIN).href}</loc></url>`,
      ).join("\n")
    : "";
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
