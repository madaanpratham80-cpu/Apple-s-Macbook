"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const TOTAL_FRAMES = 240;
const FRAME_PATH = (n: number) =>
  `/frames/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;

// Crop ratios to remove black side bars from stock footage
// Content area is approximately from x=10.3% to x=89.7% of the image width
const CROP_LEFT = 0.103;
const CROP_RIGHT = 0.897;
const CROP_TOP = 0.0;
const CROP_BOTTOM = 1.0;

interface CanvasSequenceProps {
  scrollProgress: number;
}

export default function CanvasSequence({ scrollProgress }: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null));
  const loadedRef = useRef<boolean[]>(Array(TOTAL_FRAMES).fill(false));
  const currentFrameRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !loadedRef.current[frameIndex]) return;

    const dpr = window.devicePixelRatio || 1;
    const cW = canvas.width;
    const cH = canvas.height;

    // Background fill matching frame background
    ctx.fillStyle = "#090909";
    ctx.fillRect(0, 0, cW, cH);

    // Source crop region (remove side black bars)
    const srcX = img.naturalWidth * CROP_LEFT;
    const srcY = img.naturalHeight * CROP_TOP;
    const srcW = img.naturalWidth * (CROP_RIGHT - CROP_LEFT);
    const srcH = img.naturalHeight * (CROP_BOTTOM - CROP_TOP);
    const srcAspect = srcW / srcH;

    // Destination: cover-fit in canvas
    const canvasAspect = cW / cH;
    let dstX: number, dstY: number, dstW: number, dstH: number;

    if (srcAspect > canvasAspect) {
      // Image is wider — fit height, crop sides
      dstH = cH;
      dstW = cH * srcAspect;
      dstX = (cW - dstW) / 2;
      dstY = 0;
    } else {
      // Image is taller — fit width, crop top/bottom
      dstW = cW;
      dstH = cW / srcAspect;
      dstX = 0;
      dstY = (cH - dstH) / 2;
    }

    ctx.drawImage(img, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH);
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    let loadedCount = 0;

    const loadFrame = (index: number) => {
      if (loadedRef.current[index] || imagesRef.current[index]) return;
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        loadedRef.current[index] = true;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === 1) {
          setIsReady(true);
          currentFrameRef.current = 0;
          drawFrame(0);
        }
        if (index === currentFrameRef.current) {
          drawFrame(index);
        }
      };
      img.onerror = () => { loadedCount++; };
      img.src = FRAME_PATH(index + 1);
      imagesRef.current[index] = img;
    };

    // Priority load: first frame first
    const firstImg = new Image();
    firstImg.decoding = "sync";
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      loadedRef.current[0] = true;
      loadedCount++;
      setIsReady(true);
      setLoadProgress(1);
      drawFrame(0);
    };
    firstImg.src = FRAME_PATH(1);

    // Then load all remaining with a small stagger
    let i = 1;
    const loadBatch = () => {
      const batchSize = 5;
      for (let b = 0; b < batchSize && i < TOTAL_FRAMES; b++, i++) {
        loadFrame(i);
      }
      if (i < TOTAL_FRAMES) {
        setTimeout(loadBatch, 12);
      }
    };
    setTimeout(loadBatch, 100);

    return () => {
      imagesRef.current.forEach((img) => { if (img) { img.onload = null; img.onerror = null; } });
    };
  }, [drawFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    handleResize();
    const observer = new ResizeObserver(handleResize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [handleResize]);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rawFrame = Math.round(scrollProgress * (TOTAL_FRAMES - 1));
      const frameIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, rawFrame));

      if (loadedRef.current[frameIndex]) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      } else {
        let nearest = frameIndex;
        for (let d = 1; d < TOTAL_FRAMES; d++) {
          if (frameIndex - d >= 0 && loadedRef.current[frameIndex - d]) {
            nearest = frameIndex - d; break;
          }
          if (frameIndex + d < TOTAL_FRAMES && loadedRef.current[frameIndex + d]) {
            nearest = frameIndex + d; break;
          }
        }
        currentFrameRef.current = nearest;
        drawFrame(nearest);
      }
    });
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [scrollProgress, drawFrame]);

  return (
    <div className="absolute inset-0 canvas-stage">
      {/* Loading overlay */}
      <div
        className="absolute inset-0 flex items-end justify-center pb-16 z-10 transition-opacity duration-1000 pointer-events-none"
        style={{ opacity: isReady ? 0 : 1 }}
        aria-hidden={isReady}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-32 h-[1px] bg-[rgba(255,255,255,0.08)] relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-[rgba(255,255,255,0.35)] transition-all duration-200"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#6e6e73]">
            Loading
          </p>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-label="MacBook Pro interactive product visualization"
        role="img"
        style={{ display: "block" }}
      />
    </div>
  );
}
