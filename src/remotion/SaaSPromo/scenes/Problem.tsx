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
    config: { damping: 100, stiffness: 75 },
    durationInFrames: 35,
  });
  const opacity = interpolate(frame, [delay, delay + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${(1 - entrance) * -55}px)`,
        display: "flex",
        alignItems: "flex-start",
        gap: 22,
        padding: "24px 30px",
        background: "rgba(239,68,68,0.05)",
        border: "1px solid rgba(239,68,68,0.18)",
        borderRadius: 16,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: 12,
          background: "rgba(239,68,68,0.12)",
          border: "1px solid rgba(239,68,68,0.28)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: 21,
            fontWeight: 700,
            color: C.w,
            fontFamily,
            marginBottom: 5,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 17,
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

  const headlineY = spring({
    fps, frame,
    config: { damping: 100, stiffness: 60 },
    durationInFrames: 30,
  });
  const headlineOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames - 3],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <Background accentX={0.12} accentY={0.3} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 160px",
          fontFamily,
        }}
      >
        {/* Eyebrow badge */}
        <div style={{ opacity: headlineOpacity, transform: `translateY(${(1 - headlineY) * 30}px)` }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 100,
              background: "rgba(239,68,68,0.10)",
              border: "1px solid rgba(239,68,68,0.28)",
              marginBottom: 22,
            }}
          >
            <div
              style={{ width: 7, height: 7, borderRadius: "50%", background: C.r }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#FCA5A5",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}
            >
              Sound familiar?
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontSize: 62,
              fontWeight: 900,
              color: C.w,
              margin: "0 0 44px",
              letterSpacing: "-2px",
              lineHeight: 1.1,
              maxWidth: 820,
            }}
          >
            Growing pains are{" "}
            <span style={{ color: C.r }}>killing</span> your velocity.
          </h2>
        </div>

        {/* Pain point cards */}
        <div style={{ maxWidth: 880 }}>
          {CONTENT.problems.map((p, i) => (
            <PainCard
              key={p.title}
              icon={p.icon}
              title={p.title}
              body={p.body}
              delay={28 + i * 48}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
