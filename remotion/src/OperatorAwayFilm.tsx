import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

/**
 * Operator Away — hero film.
 *
 * Thesis, told with picture only:
 *   brief admin interaction -> deliberate disengagement -> back to real work,
 *   and the held beat is the operator NOT touching the system.
 *
 * Shots (all Pexels, free commercial use):
 *   studio.mp4     — ceramic artisan: phone in hand, then sets it down and glazes (same shot/person)
 *   shop-phone.mp4 — barbershop owner checks his phone (same shop as below)
 *   shop-work.mp4  — same barbershop, hands on the client, no device anywhere
 */

export const OAF_FPS = 30;
export const OAF_DURATION = 510; // 17.0s

const SHOTS = [
  // studio, admin beat
  {
    src: "film/studio.mp4",
    from: 0,
    duration: 150,
    startFrom: 48,
    grade:
      "saturate(1.04) contrast(1.09) brightness(0.99) sepia(0.11) hue-rotate(-7deg)",
    zoom: [1.04, 1.0] as const,
    pan: [-10, 6] as const,
  },
  // studio, phone is down, hands are working
  {
    src: "film/studio.mp4",
    from: 150,
    duration: 150,
    startFrom: 452,
    grade:
      "saturate(1.06) contrast(1.1) brightness(0.98) sepia(0.12) hue-rotate(-7deg)",
    zoom: [1.0, 1.06] as const,
    pan: [8, -8] as const,
  },
  // barbershop, admin beat
  {
    src: "film/shop-phone.mp4",
    from: 300,
    duration: 90,
    startFrom: 96,
    grade: "saturate(1.02) contrast(1.07) brightness(1.0) sepia(0.05)",
    zoom: [1.03, 1.0] as const,
    pan: [6, -4] as const,
  },
  // barbershop, back on the client — the long held beat
  {
    src: "film/shop-work.mp4",
    from: 390,
    duration: 120,
    startFrom: 126,
    grade: "saturate(1.02) contrast(1.08) brightness(1.0) sepia(0.06)",
    zoom: [1.0, 1.05] as const,
    pan: [0, 10] as const,
  },
];

const Shot: React.FC<(typeof SHOTS)[number]> = ({
  src,
  duration,
  startFrom,
  grade,
  zoom,
  pan,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(p, [0, 1], [zoom[0], zoom[1]]);
  const x = interpolate(p, [0, 1], [pan[0], pan[1]]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0B0C", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translateX(${x}px)`,
          filter: grade,
        }}
      >
        <OffthreadVideo
          src={staticFile(src)}
          startFrom={startFrom}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      {/* consistent black point + quiet vignette across every shot */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 90% at 50% 45%, rgba(0,0,0,0) 42%, rgba(10,9,8,0.34) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

export const OperatorAwayFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const openUp = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0B0C" }}>
      {SHOTS.map((shot) => (
        <Sequence
          key={`${shot.src}-${shot.from}`}
          from={shot.from}
          durationInFrames={shot.duration}
        >
          <Shot {...shot} />
        </Sequence>
      ))}
      <AbsoluteFill
        style={{ backgroundColor: "#0B0B0C", opacity: 1 - openUp }}
      />
    </AbsoluteFill>
  );
};
