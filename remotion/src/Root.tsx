import { Composition } from "remotion";
import { ChaosToCalm } from "./ChaosToCalm";
import { HumanWorkFollowThrough, HW_DURATION } from "./HumanWorkFollowThrough";
import { OperatorAwayFilm, OAF_DURATION, OAF_FPS } from "./OperatorAwayFilm";


export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="main"
        component={ChaosToCalm}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="HumanWorkFollowThrough"
        component={HumanWorkFollowThrough}
        durationInFrames={HW_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="OperatorAwayFilm"
        component={OperatorAwayFilm}
        durationInFrames={OAF_DURATION}
        fps={OAF_FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};

