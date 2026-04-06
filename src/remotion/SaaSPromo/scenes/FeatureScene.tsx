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
import { MockupDashboard, MockupType } from "../components/MockupDashboard";
import { MockupPhone, PhoneMockupType } from "../components/MockupPhone";
import { C } from "../config";

loadFont("normal", { subsets: ["latin"], weights: ["400", "600", "700", "900"] });

type AnyMockupType = MockupType | PhoneMockupType;

function isPhoneMockup(t: AnyMockupType): t is PhoneMockupType {
  return t.startsWith("phone-");
}

interface FeatureSceneProps {
  num: string;
  title: string;
  sub: string;
  body: string;
  bullets: string[];
  mockupType: AnyMockupType;
  index: number;
}

// ── Pill label (matches reference "Inline Style" badge) ───────────────────────
const PillLabel: React.FC<{ children: React.ReactNode; opacity: number }> = ({
  children,
  opacity,
}) => (
  <div
    style={{
      opacity,
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 20px",
      borderRadius: 100,
      background: "rgba(232,184,73,0.08)",
      border: `1px solid rgba(232,184,73,0.30)`,
      fontFamily,
    }}
  >
    {/* Gold dot */}
    <div
      style={{
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: C.p,
        boxShadow: `0 0 6px ${C.p}`,
      }}
    />
    <span
      style={{
        fontSize: 13,
        fontWeight: 700,
        color: C.pLight,
        letterSpacing: "0.10em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  </div>
);

// ── Sparkle icon (matches reference ✦ beside feature titles) ──────────────────
const Sparkle: React.FC = () => (
  <span
    style={{
      color: C.p,
      marginRight: 14,
      fontSize: 32,
      lineHeight: 1,
      textShadow: `0 0 20px rgba(232,184,73,0.7)`,
      display: "inline-block",
      transform: "translateY(-4px)",
    }}
  >
    ✦
  </span>
);

export const FeatureScene: React.FC<FeatureSceneProps> = ({
  num,
  title,
  sub,
  body,
  bullets,
  mockupType,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ── Pill + title animations ──────────────────────────────────────────────────
  const pillOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    fps,
    frame: Math.max(0, frame - 12),
    config: { damping: 100, stiffness: 65 },
    durationInFrames: 35,
  });
  const titleOpacity = interpolate(frame, [12, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [28, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Mockup: float-up entrance + slow zoom (reference cinematic zoom) ─────────
  const mockupY = spring({
    fps,
    frame: Math.max(0, frame - 22),
    config: { damping: 90, stiffness: 50 },
    durationInFrames: 45,
  });
  const mockupOpacity = interpolate(frame, [22, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Slow cinematic zoom-in over entire scene duration (ref style)
  const slowZoom = interpolate(frame, [30, durationInFrames - 30], [0.93, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Exit: zoom into element (ref's dramatic close-up transition)
  const exitZoom = interpolate(
    frame,
    [durationInFrames - 28, durationInFrames - 5],
    [1.0, 1.22],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 22, durationInFrames - 5],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ── Bullets staggered ────────────────────────────────────────────────────────
  const bulletDelays = [140, 158, 176];
  const bulletOpacities = bulletDelays.map((d) =>
    interpolate(frame, [d, d + 18], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <Background variant="default" />

      {/* Geometric corner accents (ref frame 3 signature effect) */}
      <GeometricCorners startFrame={30} opacity={0.45} armLength={72} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 72,
          fontFamily,
        }}
      >
        {/* ── 1. Pill label — top center ──────────────────────────────── */}
        <div style={{ marginBottom: 22 }}>
          <PillLabel opacity={pillOpacity}>Feature {num}</PillLabel>
        </div>

        {/* ── 2. Sparkle + Title ─────────────────────────────────────── */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${(1 - titleY) * 22}px)`,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          <h2
            style={{
              fontSize: 54,
              fontWeight: 900,
              color: C.w,
              margin: 0,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
            }}
          >
            <Sparkle />
            {title}
          </h2>
        </div>

        {/* ── 3. Sub-headline in gold ─────────────────────────────────── */}
        <div style={{ opacity: subOpacity, marginBottom: 36 }}>
          <p
            style={{
              fontSize: 19,
              fontWeight: 600,
              color: C.p,
              margin: 0,
              textAlign: "center",
              letterSpacing: "-0.2px",
            }}
          >
            {sub}
          </p>
        </div>

        {/* ── 4. Floating mockup — centered, neon gold border, slow zoom ─ */}
        <div
          style={{
            opacity: mockupOpacity,
            transform: `
              translateY(${(1 - mockupY) * 36}px)
              scale(${slowZoom * exitZoom})
            `,
            // Gold neon glow frame around the mockup
            borderRadius: isPhoneMockup(mockupType) ? 48 : 16,
            boxShadow: `
              0 0 0 1px rgba(232,184,73,0.30),
              0 0 40px rgba(232,184,73,0.18),
              0 0 100px rgba(232,184,73,0.08),
              0 40px 80px rgba(0,0,0,0.55)
            `,
            marginBottom: 36,
          }}
        >
          {isPhoneMockup(mockupType) ? (
            <MockupPhone type={mockupType} frame={frame} />
          ) : (
            <MockupDashboard type={mockupType} frame={frame} />
          )}
        </div>

        {/* ── 5. Bullets — centered row ───────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 32,
            justifyContent: "center",
            flexWrap: "wrap",
            maxWidth: 900,
          }}
        >
          {bullets.map((bullet, i) => (
            <div
              key={bullet}
              style={{
                opacity: bulletOpacities[i] ?? 0,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {/* Gold checkmark circle */}
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.p}, ${C.b})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 11,
                  color: "#0C0C0C",
                  fontWeight: 900,
                  boxShadow: `0 0 10px rgba(232,184,73,0.4)`,
                }}
              >
                ✓
              </div>
              <span
                style={{
                  fontSize: 15,
                  color: C.w65,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {bullet}
              </span>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
