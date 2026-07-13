import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Manrope";

const { fontFamily } = loadFont("normal", { weights: ["400", "500", "600", "700", "800"], subsets: ["latin"] });

/* ---------- Brand ---------- */
const BG = "#eef0fb";
const INK = "#0a0a14";
const MUTED = "#5a6478";
const BLUE = "#2563ff";
const LINE = "#e3e6f3";

/* ---------- Timing (30fps, 240 frames = 8s) ---------- */
const CHAOS_END = 75;   // 2.5s
const PULL_END = 165;   // 5.5s
const REVEAL_END = 210; // 7.0s
// Hold to 240

/* ---------- Cards ---------- */
type Card = {
  x: number; y: number;         // center in % of frame
  rot: number;                  // initial rotation
  color: string;                // brand color when active
  icon: string;                 // emoji glyph
  brand: string;
  line: string;
  arrivalFrame: number;         // absolute frame it lands into the center (staggered inside PULL)
};

// 12 cards placed around the frame edges (not too close to center) so the pull is visible
const CARDS: Card[] = [
  { x: 12, y: 18, rot: -8,  color: "#1877F2", icon: "f",     brand: "Meta Ads",     line: "3 new leads today",       arrivalFrame: 95  },
  { x: 82, y: 14, rot: 6,   color: "#4285F4", icon: "★",     brand: "Google Review", line: "★★★★★ New review",        arrivalFrame: 102 },
  { x: 26, y: 78, rot: 4,   color: "#13B5EA", icon: "$",     brand: "Xero",          line: "Invoice #2041 sent",     arrivalFrame: 110 },
  { x: 72, y: 82, rot: -6,  color: "#EF4444", icon: "☎",     brand: "Missed Call",   line: "Client — 2 min ago",     arrivalFrame: 118 },
  { x: 4,  y: 46, rot: -10, color: "#25D366", icon: "✓",     brand: "WhatsApp",      line: "New message",            arrivalFrame: 125 },
  { x: 90, y: 40, rot: 8,   color: "#006BFF", icon: "📅",    brand: "Calendly",      line: "Meeting booked",         arrivalFrame: 130 },
  { x: 18, y: 60, rot: 12,  color: "#635BFF", icon: "S",     brand: "Stripe",        line: "Payout $2,340",          arrivalFrame: 135 },
  { x: 84, y: 62, rot: -4,  color: "#FFE01B", icon: "M",     brand: "Mailchimp",     line: "Campaign sent",          arrivalFrame: 140 },
  { x: 40, y: 8,  rot: 5,   color: "#000000", icon: "♪",     brand: "TikTok",        line: "New comment",            arrivalFrame: 145 },
  { x: 60, y: 92, rot: -7,  color: "#0F9D58", icon: "▦",     brand: "Sheets",        line: "Row 247 added",          arrivalFrame: 150 },
  { x: 8,  y: 30, rot: 3,   color: "#4285F4", icon: "G",     brand: "Google Ads",    line: "Campaign live",          arrivalFrame: 155 },
  { x: 88, y: 88, rot: 9,   color: "#0080FF", icon: "◆",     brand: "GHL",           line: "New contact added",      arrivalFrame: 160 },
];

export const ChaosToCalm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 45%, #f5f6fc 0%, ${BG} 60%, #e6e9f5 100%)`, fontFamily }}>
      {/* Subtle grid backdrop */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
        opacity: 0.35,
      }} />

      {/* Scattered cards */}
      {CARDS.map((c, i) => (
        <ScatteredCard key={i} card={c} frame={frame} fps={fps} index={i} />
      ))}

      {/* Central Zapla mark grows during pull, dominates during reveal */}
      <CentralMark frame={frame} fps={fps} />

      {/* Final dashboard card + payoff copy */}
      <RevealBlock frame={frame} fps={fps} />
    </AbsoluteFill>
  );
};

/* ---------- One scattered card ---------- */
const ScatteredCard: React.FC<{ card: Card; frame: number; fps: number; index: number }> = ({ card: c, frame, fps, index }) => {
  // Entrance: fade + slight scale in first 20 frames, staggered
  const entryStart = index * 2;
  const entry = spring({ frame: frame - entryStart, fps, config: { damping: 18, stiffness: 120 } });

  // Idle drift while in chaos: tiny sin motion
  const chaosT = Math.max(0, Math.min(frame, CHAOS_END));
  const driftX = Math.sin((chaosT + index * 13) / 24) * 4;
  const driftY = Math.cos((chaosT + index * 9) / 27) * 3;

  // Pull progress toward center — starts a few frames before arrivalFrame, ends AT arrivalFrame
  const pullStart = c.arrivalFrame - 22;
  const pullT = interpolate(frame, [pullStart, c.arrivalFrame], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Position: from (c.x, c.y) to (50, 45) as pullT goes 0 → 1
  const x = interpolate(pullT, [0, 1], [c.x, 50]);
  const y = interpolate(pullT, [0, 1], [c.y, 45]);

  // Rotation eases out to 0
  const rot = interpolate(pullT, [0, 1], [c.rot, 0]);

  // Scale: shrinks slightly as it approaches center then vanishes at arrivalFrame
  const preScale = interpolate(pullT, [0, 0.85, 1], [1, 0.72, 0.2]);
  const scale = entry * preScale;

  // Opacity: vanishes right at arrival, gone after
  const opacity = frame >= c.arrivalFrame
    ? 0
    : interpolate(pullT, [0, 0.9, 1], [1, 0.9, 0]);

  // Colorize: grayscale in chaos, fades to full color as pullT approaches 1
  const grayscale = interpolate(pullT, [0.55, 0.95], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const saturate = interpolate(pullT, [0.55, 0.95], [0.15, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) translate(${driftX}px, ${driftY}px) rotate(${rot}deg) scale(${scale})`,
        opacity,
        filter: `grayscale(${grayscale}) saturate(${saturate})`,
        transition: "none",
        willChange: "transform, opacity, filter",
      }}
    >
      <CardChip card={c} />
    </div>
  );
};

const CardChip: React.FC<{ card: Card }> = ({ card: c }) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      minWidth: 260,
      background: "white",
      borderRadius: 18,
      padding: "14px 18px",
      boxShadow: "0 12px 30px -12px rgba(10,10,20,0.25), 0 2px 6px -2px rgba(10,10,20,0.08)",
      border: `1px solid ${LINE}`,
    }}>
      <div style={{
        width: 42, height: 42,
        borderRadius: 12,
        background: c.color,
        display: "grid", placeItems: "center",
        color: "white", fontWeight: 800, fontSize: 20,
        fontFamily,
        flexShrink: 0,
      }}>{c.icon}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: INK, letterSpacing: -0.2 }}>{c.brand}</div>
        <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>{c.line}</div>
      </div>
    </div>
  );
};

/* ---------- Central Zapla mark ---------- */
const CentralMark: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // Appears at start of PULL, grows as cards arrive
  const growStart = 70;
  const growEnd = PULL_END;
  const t = interpolate(frame, [growStart, growEnd], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Reveal: pulse then hold at slightly larger size
  const pulse = spring({ frame: frame - PULL_END, fps, config: { damping: 12, stiffness: 140 } });
  const pulseScale = interpolate(pulse, [0, 1], [1, 1.08]);

  // Shrink & tuck under the dashboard card during reveal
  const tuck = interpolate(frame, [REVEAL_END - 30, REVEAL_END - 5], [1, 0.55], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const size = interpolate(t, [0, 1], [40, 200]) * pulseScale * tuck;

  // Opacity: fade in during grow, dim slightly at end of reveal
  const opacity = interpolate(frame, [growStart, growStart + 20, REVEAL_END - 15, REVEAL_END], [0, 1, 1, 0.85], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Position: center then move up a bit during reveal to sit above the dashboard card
  const yOffset = interpolate(frame, [REVEAL_END - 30, REVEAL_END], [0, -140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute",
      left: "50%",
      top: "45%",
      transform: `translate(-50%, calc(-50% + ${yOffset}px))`,
      width: size,
      height: size,
      opacity,
    }}>
      <div style={{
        width: "100%", height: "100%",
        borderRadius: "26%",
        background: `linear-gradient(135deg, ${BLUE} 0%, #1d4ed8 100%)`,
        display: "grid",
        placeItems: "center",
        color: "white",
        fontFamily,
        fontWeight: 800,
        fontSize: size * 0.5,
        letterSpacing: -2,
        boxShadow: `0 30px 80px -20px ${BLUE}88, 0 10px 30px -10px ${BLUE}66`,
      }}>
        Z
      </div>
    </div>
  );
};

/* ---------- Reveal: dashboard card + payoff text ---------- */
const RevealBlock: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cardIn = spring({ frame: frame - (PULL_END + 10), fps, config: { damping: 16, stiffness: 110 } });
  const textIn = spring({ frame: frame - (PULL_END + 30), fps, config: { damping: 20, stiffness: 100 } });

  const cardScale = interpolate(cardIn, [0, 1], [0.85, 1]);
  const cardY = interpolate(cardIn, [0, 1], [40, 0]);

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
    }}>
      {/* Dashboard card */}
      <div style={{
        marginTop: 60,
        opacity: cardIn,
        transform: `translateY(${cardY}px) scale(${cardScale})`,
        background: "white",
        borderRadius: 28,
        padding: "32px 40px",
        minWidth: 640,
        border: `1px solid ${LINE}`,
        boxShadow: "0 40px 80px -30px rgba(10,10,20,0.35), 0 10px 24px -8px rgba(10,10,20,0.15)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
          <div style={{ fontSize: 14, fontWeight: 700, color: MUTED, letterSpacing: 0.5, textTransform: "uppercase" }}>Zapla Dashboard — Live</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          <Stat label="New leads" value="47" accent={BLUE} />
          <Stat label="Reviews" value="4.9★" accent="#f59e0b" />
          <Stat label="ROAS" value="4.2×" accent="#22c55e" />
        </div>
      </div>

      {/* Payoff copy */}
      <div style={{
        marginTop: 56,
        opacity: textIn,
        transform: `translateY(${interpolate(textIn, [0, 1], [20, 0])}px)`,
        textAlign: "center",
      }}>
        <div style={{
          fontFamily,
          fontSize: 96,
          fontWeight: 700,
          color: INK,
          letterSpacing: -3,
          lineHeight: 1.05,
        }}>
          One system.<br />
          <span style={{ color: BLUE }}>Everything runs.</span>
        </div>
      </div>
    </div>
  );
};

const Stat: React.FC<{ label: string; value: string; accent: string }> = ({ label, value, accent }) => (
  <div>
    <div style={{ fontSize: 14, fontWeight: 700, color: MUTED, letterSpacing: 0.4, textTransform: "uppercase" }}>{label}</div>
    <div style={{ fontSize: 56, fontWeight: 800, color: accent, marginTop: 6, letterSpacing: -1.5 }}>{value}</div>
  </div>
);
