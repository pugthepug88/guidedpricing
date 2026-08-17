import { SceneContentPolished as ContentPlannerScene } from "./scene-content-polished";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

export function SceneContentLive(props: SceneProps) {
  const { phase, reduced } = props;

  // Keep the cursor intentional: click New Post, disappear while AI works,
  // return for concept selection, then move directly to scheduling.
  const points: Record<number, CursorPoint> = {
    1: { left: "90%", top: "6%" },
    3: { left: "50%", top: "47%" },
    4: { left: "50%", top: "43%" },
    5: { left: "50%", top: "83%" },
  };

  const point = points[phase] ?? null;
  const press = phase === 1 || phase === 4 || phase === 5;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <ContentPlannerScene {...props} />
      <ZaplaDemoCursor point={point} press={press} reduced={reduced} />
    </div>
  );
}
