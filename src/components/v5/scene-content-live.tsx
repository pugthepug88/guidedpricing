import { SceneContent as ContentPlannerScene } from "./scene-content";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

export function SceneContentLive(props: SceneProps) {
  const { phase, reduced } = props;

  const points: Record<number, CursorPoint> = {
    1: { left: "92%", top: "5%" },
    2: { left: "75%", top: "21%" },
    3: { left: "79%", top: "49%" },
    4: { left: "82%", top: "73%" },
    5: { left: "91%", top: "92%" },
  };

  const point = points[phase] ?? null;
  const press = phase === 1 || phase === 3 || phase === 4 || phase === 5;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <ContentPlannerScene {...props} />
      <ZaplaDemoCursor point={point} press={press} reduced={reduced} />
    </div>
  );
}
