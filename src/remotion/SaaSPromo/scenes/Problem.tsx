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
import { GeometricCorners } from "../components/GeometricCorners";
import { C, CONTENT } from "../config";

loadFont("normal", { subsets: ["latin"], weights: ["400", "600", "700", "900"] });

// Reference frame 1: cards stack up from the bottom, centered
interface PainCardProps {
  icon: string;
  title: string;
  body: string;
  delay: number;
}

const PainCard: React.FC<PainCardProps> = ({ icon, title, body, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: { damping: 85, stiffness: 60 },
    durationInFrames: 40,
  });
  const opacity = interpolate(frame, [delay, delay + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        // Stack up from below — matches reference card stacking
        transform: `translateY(${(1 - entrance) * 50}px)`,
        display: "flex",
        alignItems: "flex-start",
        gap: 20,
        padding: "22px 28px",
        background: "rgba(239,68,68,0.05)",
        // Gold-tinted border with red hint — keeps KJo brand, hints at problem
        border: "1px solid rgba(239,68,68,0.20)",
        borderRadius: 18,
        // Subtle gold bottom glow on each card
        boxShadow: "0 4px 30px rgba(0,0,0,0.35), 0 1px 0 rgba(239,68,68,0.12) inset",
        width: "100%",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: "rgba(239,68,68,0.10)",
          border: "1px solid rgba(239,68,68,0.24)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: C.w,
            fontFamily,
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 15,
            color: C.w65,
            fontFamily,
            lineHeight: 1.55,
          }}
        >
          {body}
        </div>
      </div>
    </div>
  );
};

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Pill badge
  const pillOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Headline
  const headlineY = spring({
    fps,
    frame: Math.max(0, frame - 10),
    config: { damping: 100, stiffness: 60 },
    durationInFrames: 32,
  });
  const headlineOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames - 4],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <Background />

      {/* Corner accents fade in with headline */}
      <GeometricCorners startFrame={10} opacity={0.40} armLength={68} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 200px",
          fontFamily,
        }}
      >
        {/* ── Pill label — centered (ref style) ─────────────────────── */}
        <div style={{ opacity: pillOpacity, marginBottom: 20 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 18px",
              borderRadius: 100,
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.25)",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: C.r,
                boxShadow: `0 0 6px ${C.r}`,
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#FCA5A5",
                letterSpacing: "0.10em",
                textTransform: "uppercase",
              }}
            >
              Sound familiar?
            </span>
          </div>
        </div>

        {/* ── Headline — centered, sparkle accent ───────────────────── */}
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${(1 - headlineY) * 24}px)`,
            textAlign: "center",
            marginBottom: 44,
          }}
        >
          <h2
            style={{
              fontSize: 58,
              fontWeight: 900,
              color: C.w,
              margin: 0,
              letterSpacing: "-2px",
              lineHeight: 1.1,
            }}
          >
            <span style={{ color: C.p, marginRight: 12 }}>✦</span>
            Every startup hits{" "}
            <span style={{ color: C.r }}>these walls.</span>
          </h2>
        </div>

        {/* ── Pain cards — stack up from below (ref frame 1) ────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            width: "100%",
            maxWidth: 820,
          }}
        >
          {CONTENT.problems.map((p, i) => (
            <PainCard
              key={p.title}
              icon={p.icon}
              title={p.title}
              body={p.body}
              delay={30 + i * 52}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
