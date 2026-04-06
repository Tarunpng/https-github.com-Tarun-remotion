import { interpolate } from "remotion";

interface CountUpProps {
  to: number;
  frame: number;
  startFrame: number;
  durationFrames: number;
  decimals?: number;
}

// Ease-out cubic
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function CountUp({
  to,
  frame,
  startFrame,
  durationFrames,
  decimals = 0,
}: CountUpProps): string {
  const value = interpolate(frame, [startFrame, startFrame + durationFrames], [0, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  return value.toFixed(decimals);
}
