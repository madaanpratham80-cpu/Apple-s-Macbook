"use client";

import { AnimatePresence, motion } from "framer-motion";

interface ChapterTextProps {
  chapter: number;
  activeChapter: number;
}

const CHAPTERS = [
  {
    id: 0,
    eyebrow: "MacBook Pro",
    headline: "Power meets\nprecision.",
    body: "An extraordinary workspace. Engineered down to the smallest detail.",
    align: "center",
  },
  {
    id: 1,
    eyebrow: "Design",
    headline: "Every detail.\nDeliberate.",
    body: "Precision-machined aluminum. A carefully considered form. An entire professional workspace, designed to work as one.",
    align: "left",
  },
  {
    id: 2,
    eyebrow: "Performance",
    headline: "Built for\ndemanding work.",
    body: "Apple silicon brings processing power and energy efficiency together in a remarkably integrated design.",
    features: [
      "Designed for demanding professional workflows.",
      "Hardware and software engineered to work together.",
      "Performance in a portable form.",
    ],
    align: "left",
  },
  {
    id: 3,
    eyebrow: "Engineering",
    headline: "An entire system.\nOne precise design.",
    body: "Display, power, acoustics, and thermal engineering come together in a compact machine designed for professional work.",
    features: [
      "Display engineering",
      "Thermal architecture",
      "Battery integration",
      "Precision audio hardware",
    ],
    align: "right",
  },
  {
    id: 4,
    eyebrow: "MacBook Pro",
    headline: "Make room for\nwhat\u2019s next.",
    body: "MacBook Pro. Designed to bring your most ambitious ideas to life.",
    align: "center",
    cta: true,
  },
];

const variants = {
  hidden: (align: string) => ({
    opacity: 0,
    y: align === "center" ? 16 : 0,
    x: align === "left" ? -16 : align === "right" ? 16 : 0,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
  exit: (align: string) => ({
    opacity: 0,
    y: align === "center" ? -8 : 0,
    x: align === "left" ? -8 : align === "right" ? 8 : 0,
    transition: { duration: 0.35, ease: "easeIn" as const },
  }),
};

export default function ChapterText({ chapter, activeChapter }: ChapterTextProps) {
  const ch = CHAPTERS[activeChapter];
  if (!ch) return null;

  const isCenter = ch.align === "center";
  const isRight = ch.align === "right";
  const isLeft = ch.align === "left";

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex items-end">
      <div
        className={
          "w-full pb-14 md:pb-20 px-8 md:px-16 lg:px-24 flex " +
          (isCenter
            ? "justify-center"
            : isRight
            ? "justify-end"
            : "justify-start")
        }
      >
        <AnimatePresence mode="wait" custom={ch.align}>
          <motion.div
            key={activeChapter}
            custom={ch.align}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={
              "max-w-[340px] md:max-w-[400px] pointer-events-auto " +
              (isCenter ? "text-center" : isRight ? "text-right" : "text-left")
            }
            aria-live="polite"
            aria-atomic="true"
          >
            {/* Glassmorphic backdrop for readability */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(5, 5, 5, 0.55)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                padding: "24px 28px 28px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Eyebrow */}
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#6e6e73] mb-3 font-medium">
                {ch.eyebrow}
              </p>

              {/* Headline */}
              <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold tracking-[-0.028em] leading-[1.1] text-[#f5f5f7] mb-3 whitespace-pre-line">
                {ch.headline}
              </h2>

              {/* Body */}
              <p className="text-[14px] md:text-[15px] leading-[1.55] text-[#a1a1a6]">
                {ch.body}
              </p>

              {/* Feature list */}
              {ch.features && (
                <ul className="mt-4 space-y-2">
                  {ch.features.map((f, i) => (
                    <li
                      key={i}
                      className={`text-[12px] text-[#6e6e73] flex items-center gap-2 ${
                        isRight
                          ? "justify-end"
                          : isCenter
                          ? "justify-center"
                          : "justify-start"
                      }`}
                    >
                      <span className="w-[3px] h-[3px] rounded-full bg-[#3a7bd5] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {/* CTAs */}
              {ch.cta && (
                <div
                  className={`mt-6 flex gap-3 flex-wrap ${
                    isCenter
                      ? "justify-center"
                      : isRight
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <a
                    href="#specs"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#f5f5f7] text-[#050505] text-[13px] font-semibold hover:bg-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    aria-label="Explore MacBook Pro"
                  >
                    Explore MacBook Pro
                  </a>
                  <a
                    href="#specs"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.2)] text-[#f5f5f7] text-[13px] font-medium hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.3)] transition-all duration-200"
                    aria-label="View technical specifications"
                  >
                    View tech specs
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
