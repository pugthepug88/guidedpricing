import { useRef, useState } from "react";
import { Download } from "lucide-react";
import { ProductBrand } from "./WebsitesProductScenes";
import { QR_ARTWORK } from "./websitesQrArtwork";

const COLOURS = [
  { name: "Forest", value: "#1E2B29" },
  { name: "Zapla blue", value: "#2563FF" },
  { name: "Ink", value: "#111318" },
] as const;
const DESTINATIONS = {
  form: { name: "Courtyard enquiry", label: "Plan my garden", type: "Form" },
  website: { name: "Courtyard website", label: "Explore our gardens", type: "Website URL" },
} as const;

// These two prepared codes point back to this review page's existing demonstrations.
// No tenant URL, customer data, tracking redirect or QR service is used.
export function WebsitesQrSharing() {
  const [destination, setDestination] = useState<keyof typeof DESTINATIONS>("form");
  const [colour, setColour] = useState<string>(COLOURS[0].value);
  const [label, setLabel] = useState(true);
  const [border, setBorder] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const artworkRef = useRef<SVGSVGElement>(null);
  const selected = DESTINATIONS[destination];
  const artwork = QR_ARTWORK[destination];

  const downloadPng = async () => {
    if (!artworkRef.current || downloading) return;
    setDownloading(true);
    setDownloadError(false);
    const svg = artworkRef.current.cloneNode(true) as SVGSVGElement;
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "960");
    svg.setAttribute("height", "1128");
    const svgUrl = URL.createObjectURL(
      new Blob([new XMLSerializer().serializeToString(svg)], { type: "image/svg+xml" }),
    );
    try {
      const image = new Image();
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("QR artwork could not be loaded"));
        image.src = svgUrl;
      });
      const canvas = document.createElement("canvas");
      canvas.width = 960;
      canvas.height = 1128;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("PNG export is unavailable");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const png = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("PNG export failed"))),
          "image/png",
        );
      });
      const pngUrl = URL.createObjectURL(png);
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `courtyard-${destination}-qr.png`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(pngUrl), 1000);
    } catch {
      setDownloadError(true);
    } finally {
      URL.revokeObjectURL(svgUrl);
      setDownloading(false);
    }
  };

  return (
    <section className="wff-qr-section wff-shell" id="qr-codes" aria-labelledby="wff-qr-title">
      <div className="wff-qr-copy">
        <p className="wff-eyebrow">QR codes</p>
        <h2 id="wff-qr-title">From print to your next enquiry.</h2>
        <p>Link to a form or website from your counters, posters and brochures.</p>
        <p className="wff-qr-capabilities">Your colours. Your labels. Ready to print.</p>
      </div>
      <div className="wff-qr-studio">
        <div className="wff-qr-toolbar">
          <ProductBrand name="QR Codes" />
          <span>Garden marketing</span>
        </div>
        <div className="wff-qr-workspace">
          <div className="wff-qr-controls">
            <div className="wff-qr-destination">
              <p className="wff-qr-field-label">Link to</p>
              <div role="group" aria-label="QR destination type" className="wff-qr-types">
                {(Object.keys(DESTINATIONS) as Array<keyof typeof DESTINATIONS>).map((key) => (
                  <button
                    type="button"
                    key={key}
                    aria-pressed={destination === key}
                    aria-controls="wff-qr-preview"
                    onClick={() => setDestination(key)}
                  >
                    {DESTINATIONS[key].type}
                  </button>
                ))}
              </div>
              <p className="wff-qr-destination-name" aria-live="polite">
                {selected.name}
              </p>
            </div>
            <div className="wff-qr-styling">
              <p className="wff-qr-field-label">Code colour</p>
              <div role="group" aria-label="QR code colour" className="wff-qr-colours">
                {COLOURS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-label={option.name}
                    aria-pressed={colour === option.value}
                    aria-controls="wff-qr-preview"
                    onClick={() => setColour(option.value)}
                  >
                    <span style={{ backgroundColor: option.value }} />
                  </button>
                ))}
              </div>
              <label>
                <input
                  type="checkbox"
                  checked={label}
                  onChange={(event) => setLabel(event.target.checked)}
                />
                Text label
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={border}
                  onChange={(event) => setBorder(event.target.checked)}
                />
                Outer border
              </label>
            </div>
          </div>
          <div className="wff-qr-output">
            <div className="wff-qr-print">
              <span className="wff-qr-business">
                courtyard<span>GARDEN DESIGN</span>
              </span>
              <svg
                ref={artworkRef}
                id="wff-qr-preview"
                viewBox="0 0 240 282"
                role="img"
                aria-label={`${selected.name} QR code${label ? `, ${selected.label}` : ""}`}
                data-destination={artwork.destination}
              >
                <rect width="240" height="282" fill="#FFFFFF" />
                {border && (
                  <rect
                    x="1"
                    y="1"
                    width="238"
                    height="280"
                    rx="5"
                    fill="none"
                    stroke={colour}
                    strokeWidth="2"
                  />
                )}
                <g transform={`translate(30 30) scale(${180 / artwork.size})`} fill={colour}>
                  <path d={artwork.path} shapeRendering="crispEdges" />
                </g>
                {label && (
                  <text
                    x="120"
                    y="254"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="14"
                    fontWeight="600"
                    fill={colour}
                  >
                    {selected.label}
                  </text>
                )}
              </svg>
            </div>
            <button
              className="wff-qr-download"
              type="button"
              onClick={downloadPng}
              disabled={downloading}
            >
              <Download size={15} aria-hidden="true" />
              {downloading ? "Preparing PNG…" : "Download PNG"}
            </button>
            {downloadError && (
              <p className="wff-qr-error" role="status">
                Download unavailable. Please try again.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
