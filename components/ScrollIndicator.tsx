"use client";

interface ScrollIndicatorProps {
  progress: number;
}

export default function ScrollIndicator({ progress }: ScrollIndicatorProps) {
  if (progress > 0.05) return null;

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
         aria-hidden="true"
         style={{ opacity: Math.max(0, 1 - progress * 20) }}>
      <p className="text-[10px] tracking-[0.25em] uppercase text-[#6e6e73]">Scroll</p>
      <div className="w-[1px] h-8 bg-gradient-to-b from-[#6e6e73] to-transparent relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 bg-[rgba(255,255,255,0.6)] h-4"
          style={{
            animation: "scrollIndicatorDrop 1.8s ease-in-out infinite",
          }}
        />
      </div>
      <style jsx>{`
        @keyframes scrollIndicatorDrop {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
