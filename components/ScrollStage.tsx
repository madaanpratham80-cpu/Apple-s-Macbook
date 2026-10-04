"use client";

import { useRef, useState, useEffect } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import CanvasSequence from "./CanvasSequence";
import ChapterText from "./ChapterText";
import ScrollIndicator from "./ScrollIndicator";
import ProgressDots from "./ProgressDots";
import AnnotationOverlay from "./AnnotationOverlay";

// Chapter boundaries
const CHAPTERS = [
  { id: 0, start: 0, end: 0.15 },
  { id: 1, start: 0.15, end: 0.35 },
  { id: 2, start: 0.35, end: 0.55 },
  { id: 3, start: 0.55, end: 0.80 },
  { id: 4, start: 0.80, end: 1.0 },
];

// Section IDs for navigation
const SECTION_IDS: Record<number, string> = {
  0: "overview",
  1: "design",
  2: "performance",
  3: "engineering",
  4: "reveal",
};

function getActiveChapter(progress: number): number {
  for (let i = CHAPTERS.length - 1; i >= 0; i--) {
    if (progress >= CHAPTERS[i].start) return i;
  }
  return 0;
}

// Subtle radial glow behind laptop
function BackgroundGlow({ progress }: { progress: number }) {
  // Glow intensity varies by chapter
  const glowIntensity = (() => {
    if (progress < 0.15) return 0.4;
    if (progress < 0.35) return 0.55;
    if (progress < 0.55) return 0.45;
    if (progress < 0.80) return 0.3;
    return 0.5;
  })();

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse 55% 45% at 50% 52%, rgba(45,45,55,${glowIntensity * 0.6}) 0%, transparent 70%)`,
        transition: "background 1.2s ease",
      }}
      aria-hidden="true"
    />
  );
}

export default function ScrollStage() {
  const { progress, containerRef } = useScrollProgress();
  const activeChapter = getActiveChapter(progress);

  // Update URL hash for navigation anchors
  useEffect(() => {
    const id = SECTION_IDS[activeChapter];
    if (id && typeof window !== "undefined") {
      // Update without pushing to history
      window.history.replaceState(null, "", `#${id}`);
    }
  }, [activeChapter]);

  return (
    <>
      {/* Scroll container — 500vh gives good scroll distance */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: "500vh" }}
        id="overview"
        aria-label="MacBook Pro product experience"
      >
        {/* Sticky stage */}
        <div className="sticky top-0 w-full h-screen overflow-hidden" style={{ background: "#090909" }}>
          {/* Subtle background glow */}
          <BackgroundGlow progress={progress} />

          {/* Canvas image sequence */}
          <CanvasSequence scrollProgress={progress} />

          {/* Engineering annotations (chapter 3) */}
          <AnnotationOverlay progress={progress} />

          {/* Chapter text overlays */}
          <ChapterText chapter={activeChapter} activeChapter={activeChapter} />

          {/* Scroll-to-start indicator */}
          <ScrollIndicator progress={progress} />

          {/* Progress dots */}
          <ProgressDots progress={progress} />

          {/* Vignette overlay for cinematic feel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(5,5,5,0.6) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Top gradient to blend with nav */}
          <div
            className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(5,5,5,0.7) 0%, transparent 100%)",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </>
  );
}
