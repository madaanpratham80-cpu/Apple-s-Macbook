"use client";

import { motion } from "framer-motion";

interface AnnotationOverlayProps {
  progress: number;
}

// Chapter 4: Engineering (55-80%) — show annotations
const ANNOTATIONS = [
  { label: "Display Assembly", subLabel: "Liquid Retina XDR", x: "62%", y: "12%", dir: "right", minProgress: 0.57, maxProgress: 0.80 },
  { label: "Logic Board", subLabel: "Apple Silicon", x: "55%", y: "48%", dir: "right", minProgress: 0.60, maxProgress: 0.80 },
  { label: "Thermal System", subLabel: "Dual-fan cooling", x: "62%", y: "38%", dir: "right", minProgress: 0.63, maxProgress: 0.80 },
  { label: "Battery", subLabel: "High-density cells", x: "20%", y: "55%", dir: "left", minProgress: 0.60, maxProgress: 0.80 },
  { label: "Keyboard & Trackpad", subLabel: "Precision engineering", x: "16%", y: "38%", dir: "left", minProgress: 0.57, maxProgress: 0.80 },
  { label: "Speakers", subLabel: "Six-speaker audio", x: "62%", y: "60%", dir: "right", minProgress: 0.65, maxProgress: 0.80 },
];

export default function AnnotationOverlay({ progress }: AnnotationOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
      {ANNOTATIONS.map((ann, i) => {
        const visible = progress >= ann.minProgress && progress <= ann.maxProgress;
        const fadeIn = progress > ann.minProgress
          ? Math.min(1, (progress - ann.minProgress) / 0.04)
          : 0;
        const fadeOut = progress > ann.maxProgress - 0.04
          ? Math.max(0, 1 - (progress - (ann.maxProgress - 0.04)) / 0.04)
          : 1;
        const opacity = visible ? fadeIn * fadeOut : 0;

        return (
          <div
            key={i}
            className="absolute transition-all duration-500"
            style={{
              left: ann.x,
              top: ann.y,
              opacity,
              transform: `translateX(${visible ? "0" : ann.dir === "right" ? "-6px" : "6px"})`,
            }}
            aria-hidden="true"
          >
            <div className={`flex items-center gap-2 ${ann.dir === "left" ? "flex-row-reverse" : ""}`}>
              <div className={`h-[1px] bg-[rgba(255,255,255,0.18)] transition-all duration-500 ${visible ? "w-6 md:w-10" : "w-0"}`} />
              <div className={`${ann.dir === "left" ? "text-right" : "text-left"}`}>
                <p className="text-[10px] tracking-[0.15em] uppercase text-[rgba(245,245,247,0.85)] font-medium leading-tight">
                  {ann.label}
                </p>
                {ann.subLabel && (
                  <p className="text-[9px] tracking-[0.08em] text-[#6e6e73] mt-0.5 uppercase">
                    {ann.subLabel}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
