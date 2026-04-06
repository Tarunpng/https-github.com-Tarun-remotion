import React from "react";
// Audio and staticFile are imported here for when you add voiceover.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AbsoluteFill, /* Audio, staticFile, */ Series } from "remotion";
import { CONTENT, DURATIONS } from "./config";
import { IntroScene } from "./scenes/Intro";
import { ProblemScene } from "./scenes/Problem";
import { SolutionScene } from "./scenes/Solution";
import { FeatureScene } from "./scenes/FeatureScene";
import { StatsScene } from "./scenes/Stats";
import { CTAScene } from "./scenes/CTA";

export const SaaSPromo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/*
       * ── Voiceover ──────────────────────────────────────────────────────────
       * Drop your voiceover MP3 into /public/voiceover.mp3 then uncomment:
       *
       * <Audio src={staticFile(CONTENT.voiceover)} />
       *
       * Tip: record one continuous take matching the scene timings below,
       * or stitch per-scene clips and line them up with <Audio startFrom={N} />.
       * ────────────────────────────────────────────────────────────────────────
       */}

      <Series>
        {/* Scene 1 — Intro: 0–5s (150 frames) */}
        <Series.Sequence durationInFrames={DURATIONS.INTRO}>
          <IntroScene />
        </Series.Sequence>

        {/* Scene 2 — Problem: 5–17s (360 frames) */}
        <Series.Sequence durationInFrames={DURATIONS.PROBLEM}>
          <ProblemScene />
        </Series.Sequence>

        {/* Scene 3 — Solution: 17–25s (240 frames) */}
        <Series.Sequence durationInFrames={DURATIONS.SOLUTION}>
          <SolutionScene />
        </Series.Sequence>

        {/* Scenes 4–6 — Features: 25–64s (390 frames each) */}
        {CONTENT.features.map((feature, i) => (
          <Series.Sequence key={feature.num} durationInFrames={DURATIONS.FEATURE}>
            <FeatureScene
              num={feature.num}
              title={feature.title}
              sub={feature.sub}
              body={feature.body}
              bullets={feature.bullets}
              mockupType={feature.mockupType}
              index={i}
            />
          </Series.Sequence>
        ))}

        {/* Scene 7 — Stats: 64–73s (270 frames) */}
        <Series.Sequence durationInFrames={DURATIONS.STATS}>
          <StatsScene />
        </Series.Sequence>

        {/* Scene 8 — CTA: 73–79s (180 frames) */}
        <Series.Sequence durationInFrames={DURATIONS.CTA}>
          <CTAScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
