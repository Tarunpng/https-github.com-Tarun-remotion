import React from "react";
import { interpolate } from "remotion";
import { C } from "../config";

// Bollywood dialogues pool for the mockup
const DIALOGUES = [
  { line: "Rahul... naam toh suna hoga.", film: "Dilwale Dulhania Le Jayenge" },
  { line: "Bade bade deshon mein\naisi choti choti baatein...", film: "Dilwale Dulhania Le Jayenge" },
  { line: "Mogambo khush hua!", film: "Mr. India" },
  { line: "Rishte mein toh hum\ntumhare baap lagte hain.", film: "Sholay" },
  { line: "Don ko pakadna\nmushkil hi nahin, namumkin hai.", film: "Don" },
];

// ─── Phone shell ──────────────────────────────────────────────────────────────
const PhoneShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      width: 280,
      height: 560,
      borderRadius: 44,
      // Gold neon border glow — key reference style detail
      border: `1.5px solid rgba(232,184,73,0.45)`,
      background: "#111",
      overflow: "hidden",
      position: "relative",
      boxShadow: `
        0 0 0 1px rgba(232,184,73,0.15),
        0 0 30px rgba(232,184,73,0.20),
        0 0 70px rgba(232,184,73,0.08),
        0 60px 120px rgba(0,0,0,0.75)
      `,
    }}
  >
    {/* Notch */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 90,
        height: 28,
        background: "#111",
        borderRadius: "0 0 18px 18px",
        zIndex: 10,
      }}
    />
    {children}
  </div>
);

// ─── Lock screen wallpaper ───────────────────────────────────────────────────
const LockScreen: React.FC<{
  dialogue: (typeof DIALOGUES)[0];
  frame: number;
  showTime?: boolean;
}> = ({ dialogue, frame, showTime = true }) => {
  const textOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [10, 40], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: `linear-gradient(160deg, #1A0A00 0%, #0C0C0C 40%, #0A0510 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "48px 24px 40px",
      }}
    >
      {/* Glow behind dialogue */}
      <div
        style={{
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(232,184,73,0.18) 0%, transparent 70%)`,
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          filter: "blur(30px)",
        }}
      />

      {/* Time */}
      {showTime && (
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 200,
              color: C.w,
              lineHeight: 1,
              fontFamily: "sans-serif",
              letterSpacing: "-1px",
            }}
          >
            9:41
          </div>
          <div style={{ fontSize: 13, color: C.w65, marginTop: 4, fontFamily: "sans-serif" }}>
            Sunday, 6 April
          </div>
        </div>
      )}

      {/* Main dialogue card */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          textAlign: "center",
          padding: "20px 16px",
          background: "rgba(0,0,0,0.45)",
          borderRadius: 18,
          border: `1px solid rgba(232,184,73,0.25)`,
          backdropFilter: "blur(8px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Gold quote mark */}
        <div
          style={{
            fontSize: 36,
            color: C.p,
            lineHeight: 1,
            marginBottom: 6,
            fontFamily: "Georgia, serif",
          }}
        >
          "
        </div>
        <p
          style={{
            fontSize: 15,
            color: C.w,
            lineHeight: 1.65,
            margin: "0 0 10px",
            fontFamily: "sans-serif",
            fontWeight: 500,
            whiteSpace: "pre-line",
          }}
        >
          {dialogue.line}
        </p>
        <p
          style={{
            fontSize: 11,
            color: C.p,
            margin: 0,
            fontFamily: "sans-serif",
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          — {dialogue.film}
        </p>
      </div>

      {/* KJo-fy watermark */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          opacity: 0.7,
        }}
      >
        <span style={{ fontSize: 16 }}>🎬</span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "sans-serif",
            color: C.p,
            letterSpacing: "0.05em",
          }}
        >
          KJo-fy
        </span>
      </div>
    </div>
  );
};

// ─── Shuffle variant — shows multiple phones fanning ─────────────────────────
const PhoneShuffleMockup: React.FC<{ frame: number }> = ({ frame }) => {
  const cards = [DIALOGUES[0], DIALOGUES[2], DIALOGUES[4]];

  return (
    <div style={{ position: "relative", width: 340, height: 560 }}>
      {cards.map((d, i) => {
        const delay = i * 18;
        const entrance = interpolate(frame, [delay, delay + 35], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const rotations = [-12, 0, 12];
        const xOffsets = [-70, 0, 70];

        return (
          <div
            key={d.film + i}
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              transform: `
                translateX(calc(-50% + ${xOffsets[i] * entrance}px))
                rotate(${rotations[i] * entrance}deg)
                scale(${0.7 + entrance * 0.3})
              `,
              opacity: entrance,
              zIndex: i === 1 ? 3 : i === 0 ? 2 : 1,
            }}
          >
            <PhoneShell>
              <LockScreen dialogue={d} frame={Math.max(0, frame - delay)} showTime={i === 1} />
            </PhoneShell>
          </div>
        );
      })}
    </div>
  );
};

// ─── Cross-platform variant — iOS + Android side by side ─────────────────────
const PhoneCrossPlatformMockup: React.FC<{ frame: number }> = ({ frame }) => {
  const leftOpacity = interpolate(frame, [0, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const leftX = interpolate(frame, [0, 35], [-40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightOpacity = interpolate(frame, [20, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightX = interpolate(frame, [20, 55], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* iPhone */}
      <div style={{ opacity: leftOpacity, transform: `translateX(${leftX}px)` }}>
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <span
            style={{ fontSize: 12, color: C.w65, fontFamily: "sans-serif", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}
          >
            🍎 iPhone
          </span>
        </div>
        <PhoneShell>
          <LockScreen dialogue={DIALOGUES[1]} frame={frame} />
        </PhoneShell>
      </div>

      {/* Android */}
      <div style={{ opacity: rightOpacity, transform: `translateX(${rightX}px)` }}>
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <span
            style={{ fontSize: 12, color: C.w65, fontFamily: "sans-serif", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}
          >
            🤖 Android
          </span>
        </div>
        {/* Android phone — slightly different shape */}
        <div
          style={{
            width: 260,
            height: 540,
            borderRadius: 32,
            border: "2px solid rgba(245,245,245,0.15)",
            background: "#111",
            overflow: "hidden",
            boxShadow:
              "0 60px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        >
          {/* Punch-hole camera */}
          <div
            style={{
              position: "absolute",
              top: 14,
              left: "50%",
              transform: "translateX(-50%)",
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#111",
              zIndex: 10,
            }}
          />
          <LockScreen dialogue={DIALOGUES[3]} frame={Math.max(0, frame - 20)} />
        </div>
      </div>
    </div>
  );
};

// ─── Daily mockup — single phone, dialogue fading in ─────────────────────────
const PhoneDailyMockup: React.FC<{ frame: number }> = ({ frame }) => {
  const entrance = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Simulate the "next wallpaper" swap at frame 120
  const swapProgress = interpolate(frame, [115, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dialogueIndex = frame < 115 ? 0 : 2;

  return (
    <div
      style={{
        opacity: entrance,
        transform: `scale(${0.88 + entrance * 0.12})`,
        position: "relative",
      }}
    >
      <PhoneShell>
        <div style={{ opacity: 1 - swapProgress * 0.8, position: "absolute", inset: 0 }}>
          <LockScreen dialogue={DIALOGUES[dialogueIndex]} frame={frame} />
        </div>
        {swapProgress > 0.1 && (
          <div style={{ opacity: swapProgress, position: "absolute", inset: 0 }}>
            <LockScreen dialogue={DIALOGUES[2]} frame={Math.max(0, frame - 120)} />
          </div>
        )}
      </PhoneShell>

      {/* "Updated" toast that pops in after swap */}
      {swapProgress > 0.5 && (
        <div
          style={{
            position: "absolute",
            bottom: -14,
            left: "50%",
            transform: `translateX(-50%) scale(${0.6 + swapProgress * 0.4})`,
            opacity: swapProgress,
            background: C.p,
            borderRadius: 20,
            padding: "6px 16px",
            whiteSpace: "nowrap",
            fontSize: 12,
            fontWeight: 700,
            color: "#0C0C0C",
            fontFamily: "sans-serif",
            boxShadow: `0 4px 20px rgba(232,184,73,0.5)`,
          }}
        >
          ✨ New wallpaper for today!
        </div>
      )}
    </div>
  );
};

// ─── Public API ───────────────────────────────────────────────────────────────
export type PhoneMockupType = "phone-daily" | "phone-shuffle" | "phone-crossplatform";

interface MockupPhoneProps {
  type: PhoneMockupType;
  frame: number;
}

export const MockupPhone: React.FC<MockupPhoneProps> = ({ type, frame }) => {
  if (type === "phone-shuffle") return <PhoneShuffleMockup frame={frame} />;
  if (type === "phone-crossplatform") return <PhoneCrossPlatformMockup frame={frame} />;
  return <PhoneDailyMockup frame={frame} />;
};
