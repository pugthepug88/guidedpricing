import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Img,
  staticFile,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Manrope";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

/* Same art direction as /concept/human-work-follow-through */
const BG = "#F7F8FC";
const INK = "#0a0a14";
const MUTED = "#5a6478";
const CYAN = "#0e7490";
const LINE = "#e3e6f3";
const BLUE = "#2563ff";

/* 14s @ 30fps = 420 frames */
export const HW_DURATION = 420;

const EASE = (t: number) => 1 - Math.pow(1 - t, 3);
const ramp = (frame: number, a: number, b: number) =>
  EASE(interpolate(frame, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

type Box = { l: number; t: number; w: number; h: number };
const lerpBox = (a: Box, b: Box, k: number): Box => ({
  l: a.l + (b.l - a.l) * k,
  t: a.t + (b.t - a.t) * k,
  w: a.w + (b.w - a.w) * k,
  h: a.h + (b.h - a.h) * k,
});

function Frame({
  file,
  box,
  opacity,
  radius = 0,
  blur = 0,
}: {
  file: string;
  box: Box;
  opacity: number;
  radius?: number;
  blur?: number;
}) {
  if (opacity <= 0.005) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: `${box.l}%`,
        top: `${box.t}%`,
        width: `${box.w}%`,
        height: `${box.h}%`,
        opacity,
        overflow: "hidden",
        borderRadius: radius,
        background: "#0d1220",
        filter: blur ? `blur(${blur}px)` : undefined,
      }}
    >
      <OffthreadVideo
        src={staticFile(`human-work/${file}`)}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

function Signal({
  label,
  time,
  x,
  y,
  tone,
  opacity,
  live,
}: {
  label: string;
  time: string;
  x: number;
  y: number;
  tone: "light" | "dark";
  opacity: number;
  live?: boolean;
}) {
  if (opacity <= 0.005) return null;
  const dark = tone === "dark";
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        paddingLeft: 12,
        borderLeft: `1px solid ${live ? "#06B6D4" : dark ? "rgba(10,10,20,0.25)" : "rgba(255,255,255,0.55)"}`,
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: dark ? INK : "#fff",
          textShadow: dark ? undefined : "0 1px 14px rgba(6,10,20,0.7)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: 7,
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: dark ? MUTED : "rgba(255,255,255,0.75)",
        }}
      >
        {time}
      </div>
    </div>
  );
}

/* Product reveal — same language as the live route's system view */
function SystemView({ opacity, scale }: { opacity: number; scale: number }) {
  if (opacity <= 0.005) return null;
  const rows = [
    { label: "Booking", value: "Thu 3:00 PM · confirmed" },
    { label: "Payment", value: "A$450 paid" },
    { label: "Review", value: "Requested · 2 days after" },
  ];
  return (
    <div
      style={{
        position: "absolute",
        left: "5%",
        top: "20%",
        width: "90%",
        height: "64%",
        opacity,
        transform: `scale(${scale})`,
        borderRadius: 18,
        border: `1px solid ${LINE}`,
        background: "#fff",
        boxShadow: "0 60px 130px -50px rgba(15,23,42,0.35)",
        overflow: "hidden",
        display: "flex",
      }}
    >
      {/* rail */}
      <div style={{ width: 76, borderRight: `1px solid ${LINE}`, background: "#FBFCFF" }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            height: 74,
            borderBottom: `1px solid ${LINE}`,
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
          }}
        >
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, color: INK }}>Sarah Chen</div>
            <div style={{ fontSize: 16, color: MUTED, marginTop: 4 }}>
              Customer · Chatswood, NSW
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", background: "#F8FAFF" }}>
          <div style={{ flex: 1, padding: 28, display: "flex", flexDirection: "column", gap: 14 }}>
            <Bubble text="Hi, do you have any availability this week?" time="10:14 AM" />
            <Bubble text="Thursday 3:00 PM works. I'll hold it for you." time="10:16 AM" mine />
            <Bubble text="Perfect, book me in." time="10:21 AM" />
          </div>
          <div
            style={{
              width: 420,
              borderLeft: `1px solid ${LINE}`,
              background: "#fff",
              padding: 22,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: MUTED,
              }}
            >
              Connected
            </div>
            {rows.map((r) => (
              <div
                key={r.label}
                style={{ border: `1px solid ${LINE}`, borderRadius: 14, padding: "12px 14px" }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: MUTED,
                  }}
                >
                  {r.label}
                </div>
                <div style={{ fontSize: 19, fontWeight: 700, color: INK, marginTop: 4 }}>
                  {r.value}
                </div>
              </div>
            ))}
            <div
              style={{
                border: "1px solid rgba(6,182,212,0.35)",
                background: "rgba(236,254,255,0.7)",
                borderRadius: 14,
                padding: "12px 14px",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: CYAN,
                }}
              >
                Next step
              </div>
              <div style={{ fontSize: 19, fontWeight: 700, color: INK, marginTop: 4 }}>
                Reactivation offer · 6 months
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ text, time, mine }: { text: string; time: string; mine?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start" }}>
      <div
        style={{
          maxWidth: "70%",
          borderRadius: 18,
          padding: "12px 16px",
          fontSize: 19,
          lineHeight: 1.35,
          color: mine ? "#fff" : "#1f2937",
          background: mine ? BLUE : "#fff",
          border: mine ? "none" : `1px solid ${LINE}`,
        }}
      >
        {text}
        <div
          style={{
            marginTop: 5,
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: mine ? "rgba(255,255,255,0.65)" : "#9aa3b2",
          }}
        >
          {time}
        </div>
      </div>
    </div>
  );
}

export const HumanWorkFollowThrough: React.FC = () => {
  const f = useCurrentFrame();

  /* act ramps */
  const open = ramp(f, 60, 130); // mechanic contracts, world opens
  const recede = ramp(f, 250, 320); // human world recedes
  const reveal = ramp(f, 290, 360); // product emerges

  const mech = lerpBox(
    lerpBox({ l: 34, t: -8, w: 72, h: 116 }, { l: -4, t: 6, w: 44, h: 58 }, open),
    { l: -20, t: 2, w: 32, h: 44 },
    recede,
  );
  const painter = lerpBox({ l: 62, t: -6, w: 44, h: 42 }, { l: 80, t: -12, w: 32, h: 34 }, recede);
  const agent = lerpBox({ l: 44, t: 8, w: 15, h: 46 }, { l: 41, t: 3, w: 12, h: 34 }, recede);
  const broker = lerpBox({ l: 70, t: 52, w: 34, h: 38 }, { l: 86, t: 58, w: 25, h: 29 }, recede);
  const dentist = lerpBox({ l: -1, t: 70, w: 27, h: 36 }, { l: -12, t: 80, w: 21, h: 27 }, recede);

  const heroOpacity = 1 - ramp(f, 55, 95);
  const heroY = -60 * ramp(f, 55, 95);
  const worldOpacity = (a: number) => ramp(f, a, a + 22) * (1 - 0.88 * recede);
  const blur = 7 * recede;

  const msg = ramp(f, 190, 225) * (1 - ramp(f, 262, 292));
  const msgLine = ramp(f, 195, 245);

  return (
    <AbsoluteFill style={{ background: BG, fontFamily, color: INK }}>
      <Frame file="mechanic.mp4" box={mech} opacity={1 - 0.86 * recede} blur={blur} />
      <Frame file="painter.mp4" box={painter} opacity={worldOpacity(105)} blur={blur} />
      <Frame file="agent.mp4" box={agent} opacity={worldOpacity(125)} radius={14} blur={blur} />
      <Frame file="broker.mp4" box={broker} opacity={worldOpacity(145)} radius={14} blur={blur} />
      <Frame file="dentist.mp4" box={dentist} opacity={worldOpacity(165)} blur={blur} />

      {/* Act 1 editorial copy */}
      <div
        style={{
          position: "absolute",
          left: "6.5%",
          top: "50%",
          width: "33%",
          transform: `translateY(calc(-50% + ${heroY}px))`,
          opacity: heroOpacity,
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          CRM + automation for service businesses
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 82,
            fontWeight: 800,
            lineHeight: 0.98,
            letterSpacing: "-0.03em",
          }}
        >
          You lead.
          <br />
          Zapla follows
          <br />
          through.
        </div>
        <div style={{ marginTop: 26, fontSize: 24, lineHeight: 1.5, color: MUTED, maxWidth: 520 }}>
          Zapla keeps the work moving from first contact to booked, paid and returning.
        </div>
      </div>

      {/* ambient first signal */}
      <Signal
        label="New enquiry"
        time="10:14 AM"
        x={62}
        y={82}
        tone="light"
        opacity={ramp(f, 20, 45) * (1 - ramp(f, 60, 85))}
        live
      />

      {/* Act 3 follow-through signals */}
      <Signal label="New enquiry" time="10:14 AM" x={3} y={49} tone="light" opacity={worldOpacity(150)} live />
      <Signal label="Follow-up sent" time="10:41 AM" x={64} y={25} tone="dark" opacity={worldOpacity(165)} />
      <Signal label="Booking confirmed" time="11:02 AM" x={74} y={43} tone="dark" opacity={worldOpacity(180)} />
      <Signal label="Invoice paid" time="4:18 PM" x={73} y={83} tone="light" opacity={worldOpacity(195)} />
      <Signal label="Review requested" time="Thu 9:00 AM" x={2} y={93} tone="dark" opacity={worldOpacity(210)} />
      <Signal label="Client reactivated" time="6 months later" x={28} y={87} tone="dark" opacity={worldOpacity(225)} />

      {/* central message */}
      <div
        style={{
          position: "absolute",
          left: "36.5%",
          top: "54%",
          width: "33%",
          opacity: msg,
          transform: `translateY(${26 - 44 * ramp(f, 190, 292)}px)`,
        }}
      >
        <div style={{ height: 1, width: `${msgLine * 100}%`, background: "rgba(10,10,20,0.25)" }} />
        <div
          style={{
            marginTop: 18,
            fontSize: 58,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
          }}
        >
          While you do the work,
          <br />
          <span style={{ color: CYAN }}>Zapla handles the follow-through.</span>
        </div>
      </div>

      {/* Act 5 product reveal */}
      <SystemView opacity={reveal} scale={0.9 + 0.1 * reveal} />
      <div
        style={{
          position: "absolute",
          left: "5%",
          top: "6%",
          maxWidth: "70%",
          opacity: ramp(f, 320, 375),
          transform: `translateY(${24 - 24 * ramp(f, 320, 375)}px)`,
        }}
      >
        <div style={{ fontSize: 62, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
          One customer. Everything connected.
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const HumanWorkPoster: React.FC = () => (
  <AbsoluteFill style={{ background: BG }}>
    <Img src={staticFile("human-work/mechanic.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </AbsoluteFill>
);
