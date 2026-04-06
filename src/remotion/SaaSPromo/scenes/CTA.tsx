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
import { RippleRings } from "../components/RippleRings";
import { GeometricCorners } from "../components/GeometricCorners";
import { C, CONTENT } from "../config";

loadFont("normal", { subsets: ["latin"], weights: ["400", "600", "700", "900"] });

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Logo: tiny → full (ref Phase 1 — starts as tiny icon in darkness) ────────
  const logoScale = spring({
    fps,
    frame,
    config: { damping: 55, stiffness: 75, mass: 1.1 },
    durationInFrames: 38,
  });
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const glowScale = spring({
    fps,
    frame: Math.max(0, frame - 8),
    config: { damping: 80, stiffness: 40 },
    durationInFrames: 50,
  });

  // ── Company name (ref: "Doks.ai" large text) ──────────────────────────────────
  const nameOpacity = interpolate(frame, [36, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nameX = interpolate(frame, [36, 60], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── "✦ Get started" line (ref: "✦ Get started" in green → gold) ──────────────
  const ctaLineOpacity = interpolate(frame, [60, 82], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaLineY = spring({
    fps,
    frame: Math.max(0, frame - 60),
    config: { damping: 100, stiffness: 70 },
    durationInFrames: 28,
  });

  // ── Sub-line ──────────────────────────────────────────────────────────────────
  const subOpacity = interpolate(frame, [82, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── URL in mono ───────────────────────────────────────────────────────────────
  const urlOpacity = interpolate(frame, [105, 128], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background variant="strong" />

      {/* Ripple rings for dramatic CTA entrance (ref: final scene rings) */}
      <RippleRings startFrame={0} count={5} cycleDuration={90} opacity={0.32} widthPct={0.62} heightPct={0.48} />

      {/* Corner accents appear as CTA line fades in */}
      <GeometricCorners startFrame={60} opacity={0.60} armLength={90} />

      {/* Central gold radial wash — ref's dramatic final glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 50%,
            rgba(232,184,73,${0.12 * glowScale}) 0%,
            transparent 68%
          )`,
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
        {/* ── Logo — tiny → large (ref: tiny star → grows) ──────────── */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${0.06 + logoScale * 0.94})`,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 22,
              background: `linear-gradient(135deg, ${C.p} 0%, ${C.b} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              boxShadow: `
                0 0 0 1px rgba(232,184,73,0.45),
                0 0 60px rgba(232,184,73,0.55),
                0 0 130px rgba(232,184,73,0.22)
              `,
            }}
          >
            {CONTENT.logoEmoji}
          </div>
        </div>

        {/* ── Company name — large, slides in (ref: "Doks.ai") ─────── */}
        <div
          style={{
            opacity: nameOpacity,
            transform: `translateX(${nameX}px)`,
            marginBottom: 22,
          }}
        >
          <h1
            style={{
              fontSize: 88,
              fontWeight: 900,
              margin: 0,
              letterSpacing: "-4px",
              textAlign: "center",
              background: `linear-gradient(135deg, #FFFFFF 0%, ${C.pLight} 50%, ${C.b} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {CONTENT.company}
          </h1>
        </div>

        {/* ── "✦ Get started" line (ref: "✦ Get started" in gold) ──── */}
        <div
          style={{
            opacity: ctaLineOpacity,
            transform: `translateY(${(1 - ctaLineY) * 16}px)`,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontSize: 22,
              color: C.p,
              textShadow: `0 0 16px rgba(232,184,73,0.7)`,
            }}
          >
            ✦
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: C.p,
              letterSpacing: "-0.3px",
            }}
          >
            {CONTENT.cta.headline}
          </span>
        </div>

        {/* ── Sub-line ─────────────────────────────────────────────── */}
        <div style={{ opacity: subOpacity, marginBottom: 28 }}>
          <p
            style={{
              fontSize: 16,
              color: C.w65,
              margin: 0,
              textAlign: "center",
              letterSpacing: "0.01em",
            }}
          >
            {CONTENT.cta.sub}
          </p>
        </div>

        {/* ── URL — mono, subtle (ref: minimal domain text) ─────────── */}
        <div style={{ opacity: urlOpacity }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 20px",
              borderRadius: 100,
              background: "rgba(232,184,73,0.06)",
              border: `1px solid rgba(232,184,73,0.22)`,
            }}
          >
            <span
              style={{
                fontSize: 15,
                color: C.p,
                fontFamily: "monospace",
                letterSpacing: "0.06em",
                fontWeight: 500,
              }}
            >
              {CONTENT.cta.url}
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
