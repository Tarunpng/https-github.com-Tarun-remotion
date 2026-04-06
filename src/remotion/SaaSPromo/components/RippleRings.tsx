import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C } from "../config";

interface RippleRingsProps {
  count?: number;
  color?: string;
  startFrame?: number;
  /** cycle duration in frames — rings loop every N frames */
  cycleDuration?: number;
  opacity?: number;
  /** ellipse axes: widthPct and heightPct relative to canvas */
  widthPct?: number;
  heightPct?: number;
}

export const RippleRings: React.FC<RippleRingsProps> = ({
  count = 4,
  color = C.p,
  startFrame = 0,
  cycleDuration = 80,
  opacity = 1,
  widthPct = 0.68,
  heightPct = 0.52,
}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);

  const rings = Array.from({ length: count }, (_, i) => {
    // Each ring is offset by an equal fraction of the cycle
    const offset = (i / count) * cycleDuration;
    const t = ((elapsed + offset) % cycleDuration) / cycleDuration; // 0→1 repeating

    // Scale: starts at 0.2 (tight), expands to 1.6 (wide)
    const scale = interpolate(t, [0, 1], [0.18, 1.6]);

    // Opacity: fast in, slow fade out
    const ringOpacity =
      t < 0.12
        ? interpolate(t, [0, 0.12], [0, 1])
        : interpolate(t, [0.12, 1.0], [1, 0]);

    return { scale, ringOpacity };
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {rings.map((r, i) => (
        <AbsoluteFill
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: `${widthPct * 100}%`,
              height: `${heightPct * 100}%`,
              borderRadius: "50%",
              border: `1.5px solid ${color}`,
              opacity: r.ringOpacity * opacity,
              transform: `scale(${r.scale})`,
              boxShadow: `0 0 12px rgba(232,184,73,0.3), inset 0 0 8px rgba(232,184,73,0.08)`,
            }}
          />
        </AbsoluteFill>
      ))}
    </AbsoluteFill>
  );
};
