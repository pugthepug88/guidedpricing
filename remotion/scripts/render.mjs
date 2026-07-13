import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition, openBrowser, renderStill } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../../public/videos");
const OUT_MP4 = path.join(OUT_DIR, "chaos-to-calm.mp4");
const OUT_POSTER = path.join(OUT_DIR, "chaos-to-calm-poster.jpg");

const fs = await import("fs");
fs.mkdirSync(OUT_DIR, { recursive: true });

console.log("Bundling…");
const bundled = await bundle({
  entryPoint: path.resolve(__dirname, "../src/index.ts"),
  webpackOverride: (c) => c,
});

console.log("Opening browser…");
const browser = await openBrowser("chrome", {
  browserExecutable: process.env.PUPPETEER_EXECUTABLE_PATH ?? "/bin/chromium",
  chromiumOptions: { args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"] },
  chromeMode: "chrome-for-testing",
});

const composition = await selectComposition({ serveUrl: bundled, id: "main", puppeteerInstance: browser });

console.log("Rendering MP4…");
await renderMedia({
  composition,
  serveUrl: bundled,
  codec: "h264",
  outputLocation: OUT_MP4,
  puppeteerInstance: browser,
  muted: true,
  concurrency: 1,
  crf: 22,
});

console.log("Rendering poster still…");
await renderStill({
  composition,
  serveUrl: bundled,
  output: OUT_POSTER,
  frame: 225,
  puppeteerInstance: browser,
  imageFormat: "jpeg",
  jpegQuality: 88,
});

await browser.close({ silent: false });
console.log("Done →", OUT_MP4);
