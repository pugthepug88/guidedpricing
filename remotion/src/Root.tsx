import { Composition } from "remotion";
import { ChaosToCalm } from "./ChaosToCalm";
import { HumanWorkFollowThrough, HW_DURATION } from "./HumanWorkFollowThrough";

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
    </>
  );
};
