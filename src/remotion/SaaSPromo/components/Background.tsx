import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C } from "../config";

interface BackgroundProps {
  accentX?: number;
  accentY?: number;
  variant?: "default" | "strong";
}

export const Background: React.FC<BackgroundProps> = ({
  variant = "default",
}) => {
  const frame = useCurrentFrame();

  // Slow breathing pulse — matches reference's living glow
  const breathe = Math.sin(frame * 0.025) * 0.5 + 0.5;
  const drift = Math.sin(frame * 0.015) * 18;

  const baseGlow = variant === "strong" ? 0.28 : 0.20;
  const pulseGlow = variant === "strong" ? 0.10 : 0.07;

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: C.bg }}>

      {/* ── Dot-grid overlay (matches reference) ───────────────── */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(rgba(245,245,245,0.055) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Dominant bottom-left corner sweep (ref: green → gold) ─ */}
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          background: `radial-gradient(ellipse at 30% 70%,
            rgba(232,184,73,${baseGlow + breathe * pulseGlow}) 0%,
            rgba(201,162,67,${(baseGlow + breathe * pulseGlow) * 0.4}) 40%,
            transparent 70%
          )`,
          bottom: -320,
          left: -280 + drift,
          filter: "blur(55px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Subtle top-right secondary glow ─────────────────────── */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(ellipse,
            rgba(232,184,73,${(baseGlow + breathe * pulseGlow) * 0.22}) 0%,
            transparent 65%
          )`,
          top: -160,
          right: -120 - drift * 0.5,
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Deep vignette (same as reference — edges go very dark) ─ */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse 110% 90% at 50% 50%,
              transparent 28%,
              rgba(0,0,0,0.72) 100%
            )`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
