import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition, openBrowser } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = "/tmp/film-out";
fs.mkdirSync(OUT_DIR, { recursive: true });
const OUT_MP4 = path.join(OUT_DIR, "operator-away-film.mp4");
const OUT_POSTER = path.join(OUT_DIR, "operator-away-poster.jpg");

console.log("Bundling…");
const bundled = await bundle({
  entryPoint: path.resolve(__dirname, "../src/index.ts"),
  webpackOverride: (c) => c,
});

const browser = await openBrowser("chrome", {
  browserExecutable: process.env.PUPPETEER_EXECUTABLE_PATH ?? "/bin/chromium",
  chromiumOptions: { args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"] },
  chromeMode: "chrome-for-testing",
});

const composition = await selectComposition({
  serveUrl: bundled,
  id: "OperatorAwayFilm",
  puppeteerInstance: browser,
});

console.log("Rendering MP4…");
await renderMedia({
  composition,
  serveUrl: bundled,
  codec: "h264",
  outputLocation: OUT_MP4,
  puppeteerInstance: browser,
  muted: true,
  concurrency: 2,
  crf: 18,
  x264Preset: "slow",
});

console.log("Rendering poster…");
await renderStill({
  composition,
  serveUrl: bundled,
  output: OUT_POSTER,
  frame: 470,
  puppeteerInstance: browser,
  imageFormat: "jpeg",
  jpegQuality: 92,
});

await browser.close({ silent: false });
console.log("Done →", OUT_MP4);
