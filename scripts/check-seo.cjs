const fs = require("fs"),
  ts = require(process.cwd() + "/node_modules/typescript"),
  assert = require("node:assert/strict");
(async () => {
  const source = fs.readFileSync("src/lib/seo.ts", "utf8");
  async function load(text) {
    const js = ts.transpile(text, { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 });
    return import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));
  }
  const off = await load(source),
    on = await load(
      source.replace("PRODUCTION_INDEXING_ENABLED = false", "PRODUCTION_INDEXING_ENABLED = true"),
    );
  const preview = "https://id-preview--b1bef4bc-7c76-4229-924e-e0e5b64a632b.lovable.app";
  for (const origin of [preview, "https://zapla.io", "https://www.zapla.io"]) {
    for (const path of [
      ...off.SEARCH_PAGES,
      "/booking",
      "/pricing-v2",
      "/compare/zapla-vs-pipedrive-simple",
    ])
      assert.equal(off.getPageSeo(origin, path).robots, "noindex, nofollow");
    assert.equal(off.getRobotsTxt(origin), "User-agent: *\nDisallow: /\n");
    assert.equal((off.getSitemapXml(origin).match(/<url>/g) || []).length, 0);
  }
  for (const path of on.SEARCH_PAGES) {
    assert.equal(on.getPageSeo("https://zapla.io", path).robots, "index, follow");
    assert.equal(on.getPageSeo(preview, path).robots, "noindex, nofollow");
    assert.equal(
      on.getPageSeo("https://zapla.io", path + "/").canonical,
      new URL(path, "https://zapla.io").href,
    );
  }
  for (const path of [
    "/booking",
    "/pricing-v2",
    "/pricing-review-v3",
    "/compare/zapla-vs-pipedrive",
    "/compare/zapla-vs-pipedrive-simple",
    "/unknown",
  ])
    assert.equal(on.getPageSeo("https://zapla.io", path).robots, "noindex, nofollow");
  assert.equal(on.getPageSeo("https://zapla.io", "/", true).canonical, undefined);
  assert.equal(on.getPageSeo("https://zapla.io", "/", true).robots, "noindex, nofollow");
  assert.equal(
    (on.getSitemapXml("https://zapla.io").match(/<url>/g) || []).length,
    on.SEARCH_PAGES.length,
  );
  assert.equal((on.getSitemapXml(preview).match(/<url>/g) || []).length, 0);
  assert.ok(on.getRobotsTxt("https://zapla.io").includes("Sitemap: https://zapla.io/sitemap.xml"));
  const allRoutes = fs
    .readdirSync("src/routes", { recursive: true })
    .filter((x) => x.endsWith(".tsx"))
    .map((x) => fs.readFileSync("src/routes/" + x, "utf8"))
    .join("\n");
  const routes = new Set(
    [...allRoutes.matchAll(/createFileRoute\(["']([^"']+)["']/g)].map(
      (m) => m[1].replace(/\/+$/, "") || "/",
    ),
  );
  for (const path of on.SEARCH_PAGES) assert.ok(routes.has(path), path);
  console.log(
    "SEO policy checks passed: " +
      on.SEARCH_PAGES.length +
      " production pages; launch off, preview isolation, draft/booking/404 exclusion, canonicals and sitemap.",
  );
})();
