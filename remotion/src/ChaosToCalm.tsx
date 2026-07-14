import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Manrope";
import { Cards, CARD_DEFS, type CardDef } from "./Cards";

const { fontFamily } = loadFont("normal", { weights: ["400", "500", "600", "700", "800"], subsets: ["latin"] });

/* Brand */
const BG = "#eef0fb";
const INK = "#0a0a14";
const MUTED = "#5a6478";
const BLUE = "#2563ff";
const LINE = "#e3e6f3";

/* Timing @ 30fps, 360 frames = 12s */
const CHAOS_END = 90;    // 3.0s — cards floating, mascot faint
const PULL_END = 255;    // 8.5s — cards absorbed
const REVEAL_END = 330;  // 11.0s — payoff visible
// Hold to 360

/* 7 cards, each with its own arrival frame during the pull */
type CardPlacement = {
  def: CardDef;
  x: number; y: number; // center in % of viewport
  rot: number;
  arrivalFrame: number;
};

const PLACEMENTS: CardPlacement[] = [
  { def: CARD_DEFS.conversations, x: 12, y: 22, rot: -6, arrivalFrame: 130 },
  { def: CARD_DEFS.reviews,       x: 84, y: 18, rot: 5,  arrivalFrame: 150 },
  { def: CARD_DEFS.bookings,      x: 10, y: 72, rot: 4,  arrivalFrame: 170 },
  { def: CARD_DEFS.invoicing,     x: 86, y: 74, rot: -5, arrivalFrame: 190 },
  { def: CARD_DEFS.documents,     x: 20, y: 46, rot: -8, arrivalFrame: 210 },
  { def: CARD_DEFS.nfc,           x: 82, y: 48, rot: 7,  arrivalFrame: 225 },
  { def: CARD_DEFS.automations,   x: 50, y: 8,  rot: -3, arrivalFrame: 245 },
];

export const ChaosToCalm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Absorption count → mascot glow ramp
  const absorbed = PLACEMENTS.filter((p) => frame >= p.arrivalFrame).length;
  const glow = absorbed / PLACEMENTS.length;

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at 50% 45%, #f5f6fc 0%, ${BG} 55%, #dfe3f2 100%)`,
      fontFamily,
    }}>
      {/* Grid backdrop */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
        opacity: 0.3,
      }} />

      {/* Mascot at center — faint at start, brightens as cards absorb */}
      <Mascot frame={frame} fps={fps} glow={glow} />

      {/* Cards */}
      {PLACEMENTS.map((p, i) => (
        <ScatteredCard key={i} placement={p} index={i} frame={frame} fps={fps} />
      ))}

      {/* Reveal: dashboard chip + payoff copy */}
      <RevealBlock frame={frame} fps={fps} />
    </AbsoluteFill>
  );
};

/* -------- Mascot -------- */
const Mascot: React.FC<{ frame: number; fps: number; glow: number }> = ({ frame, fps, glow }) => {
  // Fade in during first 20 frames
  const initialOpacity = interpolate(frame, [0, 20], [0.25, 0.45], { extrapolateRight: "clamp" });
  // Brighten as glow grows
  const opacity = Math.min(1, initialOpacity + glow * 0.65);

  // Subtle idle breathing
  const breath = Math.sin(frame / 24) * 4;

  // Scale up slightly during reveal
  const revealScale = spring({ frame: frame - PULL_END, fps, config: { damping: 18, stiffness: 100 } });
  const scale = 1 + revealScale * 0.06;

  // Position shift up slightly during reveal to make room for dashboard chip
  const yShift = interpolate(frame, [PULL_END, PULL_END + 30], [0, -60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: `translate(-50%, calc(-50% + ${yShift + breath}px)) scale(${scale})`,
      opacity,
      filter: `drop-shadow(0 30px 60px ${BLUE}${Math.round(glow * 40).toString(16).padStart(2, "0")})`,
      transition: "none",
      willChange: "transform, opacity, filter",
    }}>
      {/* Soft aura */}
      <div style={{
        position: "absolute",
        left: "50%", top: "55%",
        transform: "translate(-50%, -50%)",
        width: 620, height: 620,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${BLUE}${Math.round(glow * 55).toString(16).padStart(2, "0")} 0%, transparent 60%)`,
        filter: "blur(20px)",
        pointerEvents: "none",
      }} />
      <Img
        src={staticFile("mascot.png")}
        style={{
          position: "relative",
          height: 720,
          width: "auto",
          display: "block",
        }}
      />
    </div>
  );
};

/* -------- One card in chaos → pulled to center -------- */
const ScatteredCard: React.FC<{ placement: CardPlacement; index: number; frame: number; fps: number }> = ({ placement: p, index, frame, fps }) => {
  const entry = spring({ frame: frame - index * 3, fps, config: { damping: 18, stiffness: 130 } });

  // Idle drift while in chaos
  const drift = Math.max(0, Math.min(frame, CHAOS_END + 40));
  const driftX = Math.sin((drift + index * 13) / 26) * 6;
  const driftY = Math.cos((drift + index * 9) / 29) * 5;

  // Pull toward center — starts 32 frames before arrival, lands at arrival
  const pullStart = p.arrivalFrame - 32;
  const pullT = interpolate(frame, [pullStart, p.arrivalFrame], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Ease with a soft acceleration
  const eased = pullT * pullT * (3 - 2 * pullT);

  const x = interpolate(eased, [0, 1], [p.x, 50]);
  const y = interpolate(eased, [0, 1], [p.y, 50]);
  const rot = interpolate(eased, [0, 1], [p.rot, 0]);
  const preScale = interpolate(eased, [0, 0.85, 1], [1, 0.68, 0.15]);
  const scale = entry * preScale;

  const opacity = frame >= p.arrivalFrame
    ? 0
    : interpolate(eased, [0, 0.88, 1], [1, 0.85, 0]);

  // Grayscale during chaos, colorize near arrival
  const grayscale = interpolate(eased, [0.55, 0.95], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const saturate = interpolate(eased, [0.55, 0.95], [0.15, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) translate(${driftX}px, ${driftY}px) rotate(${rot}deg) scale(${scale})`,
        opacity,
        filter: `grayscale(${grayscale}) saturate(${saturate})`,
        willChange: "transform, opacity, filter",
        zIndex: 5 + index,
      }}
    >
      <Cards def={p.def} />
    </div>
  );
};

/* -------- Reveal block: dashboard chip + payoff -------- */
const RevealBlock: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const chipIn = spring({ frame: frame - (PULL_END + 15), fps, config: { damping: 18, stiffness: 110 } });
  const textIn = spring({ frame: frame - (PULL_END + 40), fps, config: { damping: 20, stiffness: 100 } });

  return (
    <>
      {/* Floating dashboard chip beside mascot */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${interpolate(chipIn, [0, 1], [0, 340])}px), calc(-50% - 120px)) scale(${interpolate(chipIn, [0, 1], [0.7, 1])})`,
        opacity: chipIn,
        pointerEvents: "none",
      }}>
        <div style={{
          background: "white",
          borderRadius: 22,
          padding: "22px 28px",
          border: `1px solid ${LINE}`,
          boxShadow: "0 30px 70px -20px rgba(10,10,20,0.35), 0 8px 20px -8px rgba(10,10,20,0.15)",
          minWidth: 340,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
            <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: 0.6, textTransform: "uppercase" }}>Zapla — Live</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
            <Stat label="Leads" value="47" accent={BLUE} />
            <Stat label="Reviews" value="4.9★" accent="#f59e0b" />
            <Stat label="ROAS" value="4.2×" accent="#22c55e" />
          </div>
        </div>
      </div>

      {/* Payoff copy */}
      <div style={{
        position: "absolute",
        left: 0, right: 0,
        bottom: 100,
        textAlign: "center",
        opacity: textIn,
        transform: `translateY(${interpolate(textIn, [0, 1], [30, 0])}px)`,
      }}>
        <div style={{
          fontFamily,
          fontSize: 88,
          fontWeight: 700,
          color: INK,
          letterSpacing: -3,
          lineHeight: 1.05,
        }}>
          One system. <span style={{ color: BLUE }}>Everything runs.</span>
        </div>
      </div>
    </>
  );
};

const Stat: React.FC<{ label: string; value: string; accent: string }> = ({ label, value, accent }) => (
  <div>
    <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</div>
    <div style={{ fontSize: 30, fontWeight: 800, color: accent, marginTop: 4, letterSpacing: -1 }}>{value}</div>
  </div>
);
