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

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ── Phase 1: Tiny logo appears alone (ref: tiny 3D star in darkness) ─────────
  const logoScale = spring({
    fps,
    frame,
    config: { damping: 55, stiffness: 80, mass: 1.1 },
    durationInFrames: 40,
  });
  const logoOpacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Gold glow expands behind logo
  const glowScale = spring({
    fps,
    frame: Math.max(0, frame - 10),
    config: { damping: 80, stiffness: 40 },
    durationInFrames: 50,
  });

  // ── Phase 2: Company name fades in beside logo (ref: "with Doks.ai") ─────────
  const nameOpacity = interpolate(frame, [42, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nameX = interpolate(frame, [42, 70], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Phase 3: Accent line + tagline ───────────────────────────────────────────
  const lineWidth = interpolate(frame, [65, 100], [0, 260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineY = spring({
    fps,
    frame: Math.max(0, frame - 72),
    config: { damping: 100, stiffness: 70 },
    durationInFrames: 30,
  });
  const taglineOpacity = interpolate(frame, [72, 92], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [92, 114], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Scene exit ────────────────────────────────────────────────────────────────
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames - 4],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <Background variant="strong" />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily,
        }}
      >
        {/* ── Gold glow behind logo (expands as logo grows) ─── */}
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle,
              rgba(232,184,73,${0.25 * glowScale}) 0%,
              transparent 65%
            )`,
            filter: "blur(35px)",
            transform: `scale(${0.6 + glowScale * 0.7})`,
            pointerEvents: "none",
          }}
        />

        {/* ── Logo: tiny → full size (ref Phase 1) ────────── */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${0.08 + logoScale * 0.92})`,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              background: `linear-gradient(135deg, ${C.p} 0%, ${C.b} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              boxShadow: `
                0 0 0 1px rgba(232,184,73,0.4),
                0 0 60px rgba(232,184,73,0.55),
                0 0 130px rgba(232,184,73,0.22)
              `,
            }}
          >
            {CONTENT.logoEmoji}
          </div>
        </div>

        {/* ── Company name slides in (ref Phase 2: "with Doks.ai") ── */}
        <div
          style={{
            opacity: nameOpacity,
            transform: `translateX(${nameX}px)`,
            marginBottom: 0,
          }}
        >
          <h1
            style={{
              fontSize: 96,
              fontWeight: 900,
              margin: 0,
              letterSpacing: "-4px",
              background: `linear-gradient(135deg, #FFFFFF 0%, ${C.pLight} 55%, ${C.b} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
            }}
          >
            {CONTENT.company}
          </h1>
        </div>

        {/* ── Gold accent line ─────────────────────────────────── */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${C.p}, ${C.b}, transparent)`,
            borderRadius: 2,
            marginTop: 18,
            marginBottom: 26,
          }}
        />

        {/* ── Tagline ───────────────────────────────────────────── */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${(1 - taglineY) * 20}px)`,
          }}
        >
          <p
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: C.w,
              margin: 0,
              textAlign: "center",
              letterSpacing: "-0.6px",
            }}
          >
            {CONTENT.tagline}
          </p>
        </div>

        {/* ── Sub-tagline ───────────────────────────────────────── */}
        <div style={{ opacity: subOpacity, marginTop: 16 }}>
          <p
            style={{
              fontSize: 21,
              fontWeight: 400,
              color: C.w65,
              margin: 0,
              textAlign: "center",
            }}
          >
            {CONTENT.subTagline}
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
