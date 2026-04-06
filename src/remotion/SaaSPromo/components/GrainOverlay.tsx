import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

interface GrainOverlayProps {
  opacity?: number;
  /** animate the grain every N frames (1 = every frame, 2 = every other) */
  frameStep?: number;
}

/**
 * Animated film grain using SVG feTurbulence.
 * The seed changes every `frameStep` frames for a subtle animated texture.
 * Deterministic — same frame always produces the same grain.
 */
export const GrainOverlay: React.FC<GrainOverlayProps> = ({
  opacity = 0.045,
  frameStep = 2,
}) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / frameStep);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, mixBlendMode: "overlay" }}
      >
        <defs>
          <filter id={`grain-${seed}`} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="4"
              seed={seed}
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="grey"
            />
            <feBlend in="SourceGraphic" in2="grey" mode="overlay" />
          </filter>
        </defs>
        <rect
          width="100%"
          height="100%"
          filter={`url(#grain-${seed})`}
          opacity={opacity}
          fill="transparent"
        />
      </svg>
    </AbsoluteFill>
  );
};
