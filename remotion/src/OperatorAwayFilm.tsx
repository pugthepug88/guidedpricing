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
 * Picture only, one person, one setting, one continuous performance. Cuts are
 * framing changes inside a single unbroken take, never a swap to a different
 * person or location.
 *
 * The truthful arc in the footage:
 *   attention on the screen -> attention transfers to the craft, the phone goes
 *   passive in the low hand -> sustained work with the phone forgotten.
 *
 * Source: Pexels 9363813 (ceramic studio, unbroken 21.6s take), normalised to
 * 1920x1080 / 30fps / CRF16 as film/studio.mp4.
 */

export const OAF_FPS = 30;
export const OAF_DURATION = 390; // 13.0s

type Crop = { x: number; y: number; w: number; h: number };

type Shot = {
  from: number;
  duration: number;
  /** source frame to start decoding from */
  startFrom: number;
  /** framing at the head of the shot, in source pixels */
  crop: Crop;
  /** framing at the tail of the shot, in source pixels */
  cropTo: Crop;
  grade: string;
};

const SHOTS: Shot[] = [
  // 1 — attention is on the screen
  {
    from: 0,
    duration: 95,
    startFrom: 0,
    crop: { x: 470, y: 110, w: 1300, h: 731 },
    cropTo: { x: 500, y: 130, w: 1230, h: 692 },
    grade:
      "saturate(1.06) contrast(1.1) brightness(0.98) sepia(0.14) hue-rotate(-8deg)",
  },
  // 2 — the screen goes passive, the hands take over
  {
    from: 90,
    duration: 135,
    startFrom: 165,
    crop: { x: 380, y: 200, w: 1400, h: 788 },
    cropTo: { x: 440, y: 250, w: 1290, h: 726 },
    grade:
      "saturate(1.07) contrast(1.11) brightness(0.975) sepia(0.15) hue-rotate(-8deg)",
  },
  // 3 — the long held beat: only the work
  {
    from: 220,
    duration: 170,
    startFrom: 465,
    crop: { x: 520, y: 300, w: 1330, h: 748 },
    cropTo: { x: 560, y: 332, w: 1240, h: 698 },
    grade:
      "saturate(1.08) contrast(1.12) brightness(0.97) sepia(0.16) hue-rotate(-8deg)",
  },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const ShotLayer: React.FC<Shot> = ({
  duration,
  startFrom,
  crop,
  cropTo,
  grade,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const h = lerp(crop.h, cropTo.h, p);
  const cx = lerp(crop.x + crop.w / 2, cropTo.x + cropTo.w / 2, p);
  const cy = lerp(crop.y + crop.h / 2, cropTo.y + cropTo.h / 2, p);
  const scale = 1080 / h;
  const dx = cx - 960;
  const dy = cy - 540;

  const fade = interpolate(frame, [0, 9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{ backgroundColor: "#0B0B0C", overflow: "hidden", opacity: fade }}
    >
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translate(${-dx}px, ${-dy}px)`,
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
      {/* suppress the blown window streak in the upper right */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(200deg, rgba(24,17,11,0.5) 0%, rgba(24,17,11,0.16) 26%, rgba(0,0,0,0) 46%)",
        }}
      />
      {/* consistent black point + quiet vignette across every shot */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(118% 88% at 48% 46%, rgba(0,0,0,0) 38%, rgba(12,9,7,0.42) 100%)",
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
    [OAF_DURATION - 26, OAF_DURATION - 1],
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
          opacity: Math.max(1 - openUp, closeOut * 0.5),
        }}
      />
    </AbsoluteFill>
  );
};
