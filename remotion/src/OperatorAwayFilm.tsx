import React from "react";
import {
  AbsoluteFill,
  Sequence,
  Video,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

/**
 * Operator Away — hero film.
 *
 * Told with picture only: attention on the device -> attention leaves the
 * device -> both hands back on the craft. One person, one setting, one
 * continuous performance. Cuts are framing changes inside that single take,
 * never a swap to a different person or location.
 *
 * Source: Pexels 9363813 (ceramic studio, unbroken 21.6s take), normalised to
 * 1920x1080 / 30fps / CRF16 as film/studio.mp4.
 */

export const OAF_FPS = 30;
export const OAF_DURATION = 420; // 14.0s

type Shot = {
  from: number;
  duration: number;
  /** source frame to start decoding from */
  startFrom: number;
  grade: string;
  zoom: readonly [number, number];
  /** translate in px, at 1920x1080 */
  pan: readonly [number, number];
  lift: readonly [number, number];
};

const SHOTS: Shot[] = [
  // 1 — attention is on the device
  {
    from: 0,
    duration: 135,
    startFrom: 45,
    grade:
      "saturate(1.04) contrast(1.09) brightness(0.99) sepia(0.1) hue-rotate(-7deg)",
    zoom: [1.06, 1.11],
    pan: [-40, 10],
    lift: [-30, -30],
  },
  // 2 — the device drops out of her attention, hands take over
  {
    from: 135,
    duration: 140,
    startFrom: 280,
    grade:
      "saturate(1.06) contrast(1.1) brightness(0.98) sepia(0.11) hue-rotate(-7deg)",
    zoom: [1.14, 1.2],
    pan: [30, -30],
    lift: [10, 40],
  },
  // 3 — the long held beat: only the work is in frame
  {
    from: 275,
    duration: 145,
    startFrom: 500,
    grade:
      "saturate(1.07) contrast(1.11) brightness(0.98) sepia(0.12) hue-rotate(-7deg)",
    zoom: [1.24, 1.34],
    pan: [-10, -60],
    lift: [70, 120],
  },
];

const ShotLayer: React.FC<Shot> = ({
  duration,
  startFrom,
  grade,
  zoom,
  pan,
  lift,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(p, [0, 1], [zoom[0], zoom[1]]);
  const x = interpolate(p, [0, 1], [pan[0], pan[1]]);
  const y = interpolate(p, [0, 1], [lift[0], lift[1]]);
  // short, restrained cross-dissolve on the framing changes
  const fade = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{ backgroundColor: "#0B0B0C", overflow: "hidden", opacity: fade }}
    >
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translate(${x}px, ${y}px)`,
          filter: grade,
        }}
      >
        <Video
          src={staticFile("film/studio.mp4")}
          startFrom={startFrom}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 90% at 50% 45%, rgba(0,0,0,0) 40%, rgba(10,9,8,0.36) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

export const OperatorAwayFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const openUp = interpolate(frame, [0, 16], [0, 1], {
    extrapolateRight: "clamp",
  });
  const closeOut = interpolate(
    frame,
    [OAF_DURATION - 22, OAF_DURATION - 1],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0B0C" }}>
      {SHOTS.map((shot) => (
        <Sequence
          key={shot.from}
          from={shot.from}
          durationInFrames={shot.duration}
        >
          <ShotLayer {...shot} />
        </Sequence>
      ))}
      <AbsoluteFill
        style={{
          backgroundColor: "#0B0B0C",
          opacity: Math.max(1 - openUp, closeOut * 0.55),
        }}
      />
    </AbsoluteFill>
  );
};
