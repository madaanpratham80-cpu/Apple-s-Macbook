"use client";

interface ProgressDotsProps {
  progress: number;
}

const CHAPTERS = [
  { label: "Introduction", start: 0, end: 0.15 },
  { label: "Design", start: 0.15, end: 0.35 },
  { label: "Performance", start: 0.35, end: 0.55 },
  { label: "Engineering", start: 0.55, end: 0.80 },
  { label: "Reveal", start: 0.80, end: 1.0 },
];

export default function ProgressDots({ progress }: ProgressDotsProps) {
  const activeChapter = CHAPTERS.findIndex(
    (ch, i) =>
      progress >= ch.start &&
      (i === CHAPTERS.length - 1 || progress < CHAPTERS[i + 1].start)
  );

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3 items-center"
      role="navigation"
      aria-label="Chapter progress"
    >
      {CHAPTERS.map((ch, i) => (
        <button
          key={ch.label}
          aria-label={`Chapter: ${ch.label}`}
          aria-current={i === activeChapter ? "step" : undefined}
          className={
            "w-[5px] rounded-full transition-all duration-500 ease-out cursor-default " +
            (i === activeChapter
              ? "h-6 bg-[rgba(255,255,255,0.8)]"
              : "h-[5px] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.35)]")
          }
          title={ch.label}
        />
      ))}
    </div>
  );
}
