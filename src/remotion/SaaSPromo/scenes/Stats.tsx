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
import { RippleRings } from "../components/RippleRings";
import { CountUp } from "../components/CountUp";
import { C, CONTENT } from "../config";

loadFont("normal", { subsets: ["latin"], weights: ["400", "600", "700", "900"] });

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Pill + headline
  const pillOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headlineY = spring({
    fps,
    frame: Math.max(0, frame - 10),
    config: { damping: 100, stiffness: 65 },
    durationInFrames: 32,
  });
  const headlineOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Testimonial floats in after stats
  const testimonialOpacity = interpolate(frame, [115, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const testimonialY = spring({
    fps,
    frame: Math.max(0, frame - 115),
    config: { damping: 100, stiffness: 60 },
    durationInFrames: 35,
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
      <Background variant="strong" />

      {/* Subtle rings pulse from center during the stats reveal */}
      <RippleRings startFrame={20} count={3} cycleDuration={100} opacity={0.18} widthPct={0.70} heightPct={0.54} />

      {/* Corner accents appear immediately */}
      <GeometricCorners startFrame={0} opacity={0.42} armLength={70} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 140px",
          fontFamily,
        }}
      >
        {/* ── Pill ─────────────────────────────────────────────────────── */}
        <div style={{ opacity: pillOpacity, marginBottom: 18 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 18px",
              borderRadius: 100,
              background: "rgba(232,184,73,0.08)",
              border: `1px solid rgba(232,184,73,0.28)`,
            }}
          >
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
                fontSize: 12,
                fontWeight: 700,
                color: C.pLight,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
              }}
            >
              By the numbers
            </span>
          </div>
        </div>

        {/* ── Headline ─────────────────────────────────────────────────── */}
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${(1 - headlineY) * 24}px)`,
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          <h2
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: C.w,
              margin: 0,
              letterSpacing: "-2px",
              lineHeight: 1.1,
            }}
          >
            <span style={{ color: C.p, marginRight: 12 }}>✦</span>
            Bollywood, delivered{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${C.p}, ${C.b})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              daily.
            </span>
          </h2>
        </div>

        {/* ── Stat cards — gold-border floating (ref "Connect any source") ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 18,
            width: "100%",
            marginBottom: 44,
          }}
        >
          {CONTENT.stats.map((stat, i) => {
            const cardOpacity = interpolate(
              frame,
              [25 + i * 16, 48 + i * 16],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const cardY = spring({
              fps,
              frame: Math.max(0, frame - (25 + i * 16)),
              config: { damping: 90, stiffness: 70 },
              durationInFrames: 32,
            });

            return (
              <div
                key={stat.label}
                style={{
                  opacity: cardOpacity,
                  transform: `translateY(${(1 - cardY) * 30}px)`,
                  background: "rgba(232,184,73,0.04)",
                  // Reference style: neon gold border glow
                  border: `1px solid rgba(232,184,73,0.28)`,
                  borderRadius: 20,
                  padding: "32px 20px",
                  textAlign: "center",
                  boxShadow: `
                    0 0 30px rgba(232,184,73,0.08),
                    0 20px 50px rgba(0,0,0,0.40)
                  `,
                }}
              >
                <div style={{ marginBottom: 8 }}>
                  <span
                    style={{
                      fontSize: 50,
                      fontWeight: 900,
                      letterSpacing: "-2px",
                      background: `linear-gradient(135deg, #FFFFFF 0%, ${C.pLight} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {CountUp({
                      to: stat.val,
                      frame,
                      startFrame: 32 + i * 16,
                      durationFrames: 52,
                      decimals: stat.decimals,
                    })}
                    {stat.suffix}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: C.w65, fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Testimonial — floating gold-border card ─────────────────── */}
        <div
          style={{
            opacity: testimonialOpacity,
            transform: `translateY(${(1 - testimonialY) * 24}px)`,
            maxWidth: 800,
            textAlign: "center",
            padding: "28px 40px",
            background: "rgba(232,184,73,0.04)",
            border: `1px solid rgba(232,184,73,0.22)`,
            borderRadius: 20,
            boxShadow: `
              0 0 40px rgba(232,184,73,0.07),
              0 20px 60px rgba(0,0,0,0.40)
            `,
          }}
        >
          {/* Gold quote mark */}
          <div
            style={{
              fontSize: 40,
              color: C.p,
              lineHeight: 1,
              marginBottom: 8,
              fontFamily: "Georgia, serif",
              textShadow: `0 0 20px rgba(232,184,73,0.5)`,
            }}
          >
            "
          </div>
          <p
            style={{
              fontSize: 19,
              color: C.w,
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.65,
              margin: "0 0 18px",
            }}
          >
            {CONTENT.testimonial.quote}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${C.p}, ${C.b})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                boxShadow: `0 0 14px rgba(232,184,73,0.35)`,
              }}
            >
              👤
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.w }}>
                {CONTENT.testimonial.name}
              </div>
              <div style={{ fontSize: 11, color: C.w65 }}>
                {CONTENT.testimonial.role} · {CONTENT.testimonial.company}
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
