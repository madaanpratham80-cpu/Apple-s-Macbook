"use client";

import { useRef, useEffect, useState } from "react";

interface ScrollProgressOptions {
  startOffset?: number;
  endOffset?: number;
}

export function useScrollProgress(options: ScrollProgressOptions = {}) {
  const { startOffset = 0, endOffset = 0 } = options;
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const totalScrollDistance = rect.height - viewHeight;

      if (totalScrollDistance <= 0) {
        setProgress(0);
        return;
      }

      // How far the top of the element has scrolled past the top of the viewport
      const scrolled = -rect.top + startOffset;
      const raw = scrolled / (totalScrollDistance - startOffset - endOffset);
      const clamped = Math.max(0, Math.min(1, raw));

      setProgress(clamped);
    };

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startOffset, endOffset]);

  return { progress, containerRef };
}
