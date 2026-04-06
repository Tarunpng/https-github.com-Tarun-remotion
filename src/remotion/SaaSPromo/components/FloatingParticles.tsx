import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C } from "../config";

interface Particle {
  x: number;   // 0–1 of canvas width
  y0: number;  // start y (0–1)
  speed: number; // frames to travel full height (60–160)
  size: number;  // px radius (1–3)
  opacity: number; // base opacity (0.15–0.55)
  phase: number;  // frame offset so particles are staggered
  drift: number;  // horizontal sine amplitude px
}

/** Seeded pseudo-random — deterministic for Remotion */
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 43758.5453123;
  return x - Math.floor(x);
}

function buildParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    x: seededRandom(i * 7 + 1),
    y0: seededRandom(i * 7 + 2),
    speed: 80 + seededRandom(i * 7 + 3) * 100,
    size: 1 + seededRandom(i * 7 + 4) * 2.2,
    opacity: 0.15 + seededRandom(i * 7 + 5) * 0.40,
    phase: seededRandom(i * 7 + 6) * 160,
    drift: (seededRandom(i * 7 + 7) - 0.5) * 60,
  }));
}

const PARTICLES = buildParticles(28);

interface FloatingParticlesProps {
  color?: string;
  globalOpacity?: number;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  color = C.p,
  globalOpacity = 1,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        {PARTICLES.map((p, i) => {
          // t: 0→1 within each particle's loop cycle
          const t = ((frame + p.phase) % p.speed) / p.speed;

          // y: starts at y0 near bottom, floats upward, wraps
          const baseY = (p.y0 + 0.5 + t) % 1; // lower half bias
          const cx = p.x * 1920 + Math.sin(frame * 0.025 + i) * p.drift;
          const cy = 1080 - baseY * 1080;

          // Fade in near bottom, fade out near top
          const fadeMask =
            baseY < 0.12
              ? baseY / 0.12
              : baseY > 0.82
              ? (1 - baseY) / 0.18
              : 1;

          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={p.size}
              fill={color}
              opacity={p.opacity * fadeMask * globalOpacity}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
