import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontFamily, loadFont } from "@remotion/google-fonts/Inter";
import { Background } from "../components/Background";
import { C, CONTENT } from "../config";

loadFont("normal", { subsets: ["latin"], weights: ["400", "700", "900"] });

export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const logoScale = spring({
    fps, frame,
    config: { damping: 60, stiffness: 95, mass: 0.85 },
    durationInFrames: 35,
  });

  const eyebrowOpacity = interpolate(frame, [18, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineY = spring({
    fps, frame: Math.max(0, frame - 22),
    config: { damping: 100, stiffness: 70 },
    durationInFrames: 32,
  });
  const headlineOpacity = interpolate(frame, [22, 44], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [45, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames - 3],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const glowOpacity = logoScale * 0.5;

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <Background variant="strong" />

      {/* Central gold radial glow — expands as logo scales in */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 50%, rgba(232,184,73,${glowOpacity * 0.18}) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily,
        }}
      >
        {/* Logo */}
        <div
          style={{
            transform: `scale(${0.4 + logoScale * 0.6})`,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 104,
              height: 104,
              borderRadius: 26,
              background: `linear-gradient(135deg, ${C.p} 0%, ${C.b} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 50,
              boxShadow: `0 0 0 1px rgba(232,184,73,0.45), 0 0 80px rgba(232,184,73,0.60), 0 0 180px rgba(232,184,73,0.22)`,
            }}
          >
            {CONTENT.logoEmoji}
          </div>
        </div>

        {/* Eyebrow */}
        <div style={{ opacity: eyebrowOpacity, marginBottom: 10 }}>
          <span
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: C.pLight,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {CONTENT.solution.eyebrow}
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${(1 - headlineY) * 28}px)`,
            marginBottom: 22,
          }}
        >
          <h1
            style={{
              fontSize: 96,
              fontWeight: 900,
              margin: 0,
              letterSpacing: "-4px",
              textAlign: "center",
              background: `linear-gradient(135deg, #FFFFFF 0%, ${C.pLight} 50%, ${C.b} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {CONTENT.solution.headline}
          </h1>
        </div>

        {/* Sub */}
        <div style={{ opacity: subOpacity }}>
          <p
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: C.w65,
              margin: 0,
              textAlign: "center",
              letterSpacing: "-0.3px",
            }}
          >
            {CONTENT.solution.sub}
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
