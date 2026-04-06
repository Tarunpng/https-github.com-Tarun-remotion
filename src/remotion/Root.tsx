import { Composition } from "remotion";
import {
  COMP_NAME,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import { Main } from "./MyComp/Main";
import { NextLogo } from "./MyComp/NextLogo";
import { SaaSPromo } from "./SaaSPromo";
import { FPS, TOTAL_FRAMES } from "./SaaSPromo/config";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── SaaS Promo Video (main composition) ────────────────────── */}
      <Composition
        id="SaaSPromo"
        component={SaaSPromo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* ── Original template compositions ─────────────────────────── */}
      <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultMyCompProps}
      />
      <Composition
        id="NextLogo"
        component={NextLogo}
        durationInFrames={300}
        fps={30}
        width={140}
        height={140}
        defaultProps={{
          outProgress: 0,
        }}
      />
    </>
  );
};
