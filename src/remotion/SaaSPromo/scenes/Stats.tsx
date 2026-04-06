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
import { CountUp } from "../components/CountUp";
import { C, CONTENT } from "../config";

loadFont("normal", { subsets: ["latin"], weights: ["400", "600", "700", "900"] });

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const headlineY = spring({
    fps, frame,
    config: { damping: 100, stiffness: 65 },
    durationInFrames: 30,
  });
  const headlineOpacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateRight: "clamp",
  });

  const testimonialOpacity = interpolate(frame, [120, 148], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const testimonialY = spring({
    fps, frame: Math.max(0, frame - 120),
    config: { damping: 100, stiffness: 60 },
    durationInFrames: 35,
  });

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames - 3],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <Background accentX={0.5} accentY={0.58} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 130px",
          fontFamily,
        }}
      >
        {/* Headline */}
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${(1 - headlineY) * 28}px)`,
            textAlign: "center",
            marginBottom: 56,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: C.pLight,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Trusted by the best
          </div>
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
            Numbers that speak{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${C.pLight}, ${C.b})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              for themselves.
            </span>
          </h2>
        </div>

        {/* Stat cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 22,
            width: "100%",
            marginBottom: 52,
          }}
        >
          {CONTENT.stats.map((stat, i) => {
            const cardOpacity = interpolate(
              frame,
              [22 + i * 14, 44 + i * 14],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const cardY = spring({
              fps,
              frame: Math.max(0, frame - (22 + i * 14)),
              config: { damping: 100, stiffness: 80 },
              durationInFrames: 30,
            });

            return (
              <div
                key={stat.label}
                style={{
                  opacity: cardOpacity,
                  transform: `translateY(${(1 - cardY) * 28}px)`,
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 20,
                  padding: "34px 24px",
                  textAlign: "center",
                  boxShadow: "0 0 40px rgba(124,58,237,0.07)",
                }}
              >
                <div style={{ marginBottom: 10 }}>
                  <span
                    style={{
                      fontSize: 52,
                      fontWeight: 900,
                      letterSpacing: "-2px",
                      background: `linear-gradient(135deg, #FFFFFF, ${C.pLight})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {CountUp({
                      to: stat.val,
                      frame,
                      startFrame: 28 + i * 14,
                      durationFrames: 55,
                      decimals: stat.decimals,
                    })}
                    {stat.suffix}
                  </span>
                </div>
                <div style={{ fontSize: 14, color: C.w65, fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonial */}
        <div
          style={{
            opacity: testimonialOpacity,
            transform: `translateY(${(1 - testimonialY) * 22}px)`,
            maxWidth: 780,
            textAlign: "center",
            padding: "30px 40px",
            background: "rgba(124,58,237,0.06)",
            border: "1px solid rgba(124,58,237,0.2)",
            borderRadius: 20,
          }}
        >
          <p
            style={{
              fontSize: 21,
              color: C.w,
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.65,
              margin: "0 0 20px",
            }}
          >
            {CONTENT.testimonial.quote}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${C.p}, ${C.b})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              👤
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.w }}>
                {CONTENT.testimonial.name}
              </div>
              <div style={{ fontSize: 12, color: C.w65 }}>
                {CONTENT.testimonial.role}, {CONTENT.testimonial.company}
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
