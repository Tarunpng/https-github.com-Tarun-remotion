import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C } from "../config";

interface GeometricCornersProps {
  startFrame?: number;
  color?: string;
  opacity?: number;
  /** arm length in px */
  armLength?: number;
  /** distance from corner edge in px */
  inset?: number;
}

/**
 * Ref-style geometric corner accents: angular V-shaped line pairs
 * in the bottom-left and bottom-right corners, like the green.mp4 reference.
 */
export const GeometricCorners: React.FC<GeometricCornersProps> = ({
  startFrame = 0,
  color = C.p,
  opacity = 1,
  armLength = 80,
  inset = 60,
}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);

  const reveal = interpolate(elapsed, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle breathing pulse
  const pulse = Math.sin(frame * 0.04) * 0.15 + 0.85;
  const finalOpacity = reveal * opacity * pulse;

  const strokeColor = color;
  const strokeWidth = 1.5;

  /** Renders one corner as two line arms meeting at a point */
  const Corner = ({
    x,
    y,
    // Direction multipliers: 1 or -1
    dx,
    dy,
  }: {
    x: number;
    y: number;
    dx: number;
    dy: number;
  }) => {
    // Horizontal arm
    const x1h = x;
    const y1h = y;
    const x2h = x + dx * armLength * reveal;
    const y2h = y;

    // Vertical arm
    const x1v = x;
    const y1v = y;
    const x2v = x;
    const y2v = y + dy * armLength * reveal;

    // Diagonal accent arm (V-tip)
    const x1d = x + dx * armLength * 0.3;
    const y1d = y + dy * armLength * 0.3;
    const x2d = x + dx * armLength * 0.65 * reveal;
    const y2d = y + dy * armLength * 0.65 * reveal;

    return (
      <g opacity={finalOpacity}>
        <line
          x1={x1h}
          y1={y1h}
          x2={x2h}
          y2={y2h}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <line
          x1={x1v}
          y1={y1v}
          x2={x2v}
          y2={y2v}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <line
          x1={x1d}
          y1={y1d}
          x2={x2d}
          y2={y2d}
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.7}
          strokeLinecap="round"
          opacity={0.55}
        />
        {/* Corner dot */}
        <circle cx={x} cy={y} r={2.5} fill={strokeColor} opacity={0.9} />
      </g>
    );
  };

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Bottom-left corner */}
        <Corner
          x={inset}
          y={1080 - inset}
          dx={1}
          dy={-1}
        />

        {/* Bottom-right corner */}
        <Corner
          x={1920 - inset}
          y={1080 - inset}
          dx={-1}
          dy={-1}
        />

        {/* Top-left corner (subtle, 40% opacity) */}
        <g opacity={0.4}>
          <Corner
            x={inset}
            y={inset}
            dx={1}
            dy={1}
          />
        </g>

        {/* Top-right corner (subtle, 40% opacity) */}
        <g opacity={0.4}>
          <Corner
            x={1920 - inset}
            y={inset}
            dx={-1}
            dy={1}
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
