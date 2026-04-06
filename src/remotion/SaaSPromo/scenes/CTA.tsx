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

loadFont("normal", { subsets: ["latin"], weights: ["400", "600", "700", "900"] });

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    fps, frame,
    config: { damping: 75, stiffness: 100 },
    durationInFrames: 28,
  });
  const logoOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  const headlineY = spring({
    fps, frame: Math.max(0, frame - 16),
    config: { damping: 100, stiffness: 70 },
    durationInFrames: 30,
  });
  const headlineOpacity = interpolate(frame, [16, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [38, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const btnScale = spring({
    fps, frame: Math.max(0, frame - 52),
    config: { damping: 75, stiffness: 110 },
    durationInFrames: 26,
  });
  const btnOpacity = interpolate(frame, [52, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const urlOpacity = interpolate(frame, [68, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle button pulse after it appears
  const btnPulse = frame > 80 ? Math.sin((frame - 80) * 0.08) * 0.03 + 1 : 1;

  return (
    <AbsoluteFill>
      <Background accentX={0.5} accentY={0.42} />

      {/* Central radial wash */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 50% 50%, rgba(124,58,237,0.14) 0%, transparent 70%)",
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
            opacity: logoOpacity,
            transform: `scale(${0.45 + logoScale * 0.55})`,
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: `linear-gradient(135deg, ${C.p} 0%, ${C.b} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              boxShadow: `0 0 70px rgba(124,58,237,0.55), 0 0 140px rgba(124,58,237,0.2)`,
            }}
          >
            {CONTENT.logoEmoji}
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${(1 - headlineY) * 22}px)`,
            marginBottom: 14,
          }}
        >
          <h2
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: C.w,
              margin: 0,
              letterSpacing: "-2.5px",
              textAlign: "center",
              lineHeight: 1.05,
            }}
          >
            {CONTENT.cta.headline}
          </h2>
        </div>

        {/* Sub */}
        <div style={{ opacity: subOpacity, marginBottom: 42 }}>
          <p style={{ fontSize: 20, color: C.w65, margin: 0, textAlign: "center" }}>
            {CONTENT.cta.sub}
          </p>
        </div>

        {/* CTA button */}
        <div
          style={{
            opacity: btnOpacity,
            transform: `scale(${(0.65 + btnScale * 0.35) * btnPulse})`,
            marginBottom: 30,
          }}
        >
          <div
            style={{
              padding: "20px 52px",
              borderRadius: 14,
              background: `linear-gradient(135deg, ${C.p} 0%, ${C.b} 100%)`,
              fontSize: 22,
              fontWeight: 700,
              color: C.w,
              letterSpacing: "-0.3px",
              boxShadow: `0 8px 40px rgba(124,58,237,0.55), 0 0 90px rgba(124,58,237,0.22)`,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Start Free Trial →
          </div>
        </div>

        {/* URL */}
        <div style={{ opacity: urlOpacity }}>
          <p
            style={{
              fontSize: 18,
              color: C.w40,
              fontFamily: "monospace",
              margin: 0,
              letterSpacing: "0.06em",
            }}
          >
            {CONTENT.cta.url}
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
