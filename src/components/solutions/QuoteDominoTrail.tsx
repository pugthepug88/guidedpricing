import { useEffect, useId, useState } from "react";
import "@/styles/quote-domino-trail.css";

type Point = { x: number; y: number };

export type QuoteDominoTrailProps = {
  variant: "hero" | "journey";
  /** The parent owns native scroll measurement. Values outside 0–1 are clamped. */
  progress?: number;
  /** Measured first-to-last checkpoint distance, in pixels; journey only. */
  height?: number;
  className?: string;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const add = (a: Point, b: Point): Point => ({ x: a.x + b.x, y: a.y + b.y });
const scale = (point: Point, amount: number): Point => ({
  x: point.x * amount,
  y: point.y * amount,
});
const polygon = (points: Point[]) =>
  points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");

/**
 * An orthographic, 2.5D domino: the broad face pivots about its bottom edge;
 * its thickness rotates with it. Two printed faces keep the native Zapla mark
 * visible as the tile tips through edge-on. No image generation or new logo.
 */
function Domino({
  base,
  width,
  upright,
  fallen,
  angle,
  markId,
  variant,
  quiet,
}: {
  base: Point;
  width: Point;
  upright: Point;
  fallen: Point;
  angle: number;
  markId: string;
  variant: QuoteDominoTrailProps["variant"];
  quiet: number;
}) {
  const radians = (angle * Math.PI) / 180;
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);
  const rise = add(scale(upright, cosine), scale(fallen, sine));
  const thickness = add(scale(fallen, cosine * 0.135), scale(upright, -sine * 0.135));
  const left = add(base, scale(width, -0.5));
  const right = add(base, scale(width, 0.5));
  const front = [left, right, add(right, rise), add(left, rise)];
  const back = front.map((point) => add(point, scale(thickness, -1)));
  const showBack = width.x * rise.y - width.y * rise.x > 0;
  const visible = showBack ? back : front;
  // UV coordinates start at the top left, with the native mark's upright axis.
  const topLeft = visible[3];
  const matrix = `matrix(${width.x} ${width.y} ${-rise.x} ${-rise.y} ${topLeft.x} ${topLeft.y})`;
  const shadowWidth = scale(width, 0.57);
  const shadowLength = scale(fallen, 0.78 + sine * 0.18);
  const shadowStart = add(base, { x: 2, y: 3 });

  return (
    <g
      className="qdt-tile"
      opacity={1 - quiet * 0.62}
      style={{ filter: `saturate(${1 - quiet * 0.65})` }}
    >
      <polygon
        className="qdt-shadow"
        points={polygon([
          add(shadowStart, scale(shadowWidth, -1)),
          add(shadowStart, shadowWidth),
          add(add(shadowStart, shadowWidth), shadowLength),
          add(add(shadowStart, scale(shadowWidth, -1)), shadowLength),
        ])}
        opacity={variant === "hero" ? 0.14 : 0.1}
      />
      <polygon className="qdt-back" points={polygon(back)} />
      <polygon className="qdt-edge" points={polygon([front[0], front[3], back[3], back[0]])} />
      <polygon className="qdt-edge" points={polygon([front[1], front[2], back[2], back[1]])} />
      <polygon className="qdt-crown" points={polygon([front[3], front[2], back[2], back[3]])} />
      <g transform={matrix}>
        <rect className="qdt-face" width="1" height="1" rx="0.17" />
        <use href={`#${markId}`} x="0.015" y="0.015" width="0.97" height="0.97" />
        <rect className="qdt-rim" x="0.015" y="0.015" width="0.97" height="0.97" rx="0.26" />
      </g>
    </g>
  );
}

/**
 * Decorative continuation of the footer's physical Zapla domino motif.
 * Scroll changes only the cascade front: settled tiles stay down, 2–3 tiles
 * transfer the contact, and the remaining tiles stay upright. There is no loop,
 * wheel capture, timer, workflow status or dependency on a motion library.
 *
 * Hero: 600×110. Journey: 48×height, with about 22px between hinges. Position
 * the journey at its measured first checkpoint. Visible SVG overflow preserves
 * the small end-tile overhang without shifting either measured hinge.
 */
export function QuoteDominoTrail({
  variant,
  progress = 0,
  height = 1100,
  className = "",
}: QuoteDominoTrailProps) {
  const markId = `qdt-mark-${useId().replace(/:/g, "")}`;
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const isHero = variant === "hero";
  const courseHeight = Math.max(44, Number.isFinite(height) ? height : 1100);
  const count = isHero ? 14 : Math.max(3, Math.min(90, Math.round(courseHeight / 22) + 1));
  const value = reducedMotion || !Number.isFinite(progress) ? 0 : clamp(progress);
  // A 2.5-tile contact front. At 0 the course is upright; at 1 it is settled.
  const front = value * (count + 1.5);

  return (
    <svg
      className={`qdt qdt--${variant} ${className}`.trim()}
      viewBox={isHero ? "0 0 600 110" : `0 0 48 ${courseHeight}`}
      width={isHero ? 600 : 48}
      height={isHero ? 110 : courseHeight}
      aria-hidden="true"
      focusable="false"
      data-reduced-motion={reducedMotion ? "true" : "false"}
      data-progress={value.toFixed(4)}
    >
      <defs>
        <symbol id={markId} viewBox="0 0 512 512" overflow="hidden">
          <image href="/concept/zapla-logo-dark.svg" width="1743" height="512" />
        </symbol>
      </defs>
      {Array.from({ length: count }, (_, index) => {
        const t = index / (count - 1);
        const phase = clamp((front - index) / 2.5);
        // Smooth contact, rather than rotating every logo by the same amount.
        const eased = phase * phase * (3 - 2 * phase);
        const angle = eased * 78;
        const base = isHero
          ? { x: 42 + t * 500, y: 69 + 12 * Math.sin(t * Math.PI * 1.55 - 0.3) }
          : { x: 22 + 2 * Math.sin(t * Math.PI * 2), y: t * courseHeight };

        return (
          <Domino
            key={index}
            base={base}
            width={isHero ? { x: 25, y: -8 } : { x: 20, y: -3 }}
            upright={isHero ? { x: 1, y: -29 } : { x: 1, y: -13 }}
            fallen={isHero ? { x: 38, y: 23 } : { x: 2, y: 27 }}
            angle={angle}
            markId={markId}
            variant={variant}
            quiet={isHero ? 0 : clamp((front - index - 4) / 2.5)}
          />
        );
      })}
    </svg>
  );
}

export const DominoTrail = QuoteDominoTrail;
