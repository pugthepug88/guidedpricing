import { Composition } from "remotion";
import { ChaosToCalm } from "./ChaosToCalm";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="main"
      component={ChaosToCalm}
      durationInFrames={360}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
