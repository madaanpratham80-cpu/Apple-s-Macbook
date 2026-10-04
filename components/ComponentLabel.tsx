"use client";

interface ComponentLabelProps {
  label: string;
  subLabel?: string;
  x: string;
  y: string;
  direction?: "left" | "right";
  visible: boolean;
}

export default function ComponentLabel({
  label,
  subLabel,
  x,
  y,
  direction = "right",
  visible,
}: ComponentLabelProps) {
  return (
    <div
      className="absolute pointer-events-none transition-all duration-700"
      style={{
        left: x,
        top: y,
        opacity: visible ? 1 : 0,
        transform: `translateX(${visible ? "0" : direction === "right" ? "-8px" : "8px"})`,
      }}
      aria-hidden={!visible}
    >
      <div className={`flex items-center gap-2 ${direction === "left" ? "flex-row-reverse" : ""}`}>
        <div
          className={`h-[1px] bg-[rgba(255,255,255,0.2)] transition-all duration-500 ${visible ? "w-8" : "w-0"}`}
        />
        <div className={`${direction === "left" ? "text-right" : "text-left"}`}>
          <p className="text-[10px] tracking-[0.15em] uppercase text-[#f5f5f7] font-medium leading-tight">
            {label}
          </p>
          {subLabel && (
            <p className="text-[9px] tracking-[0.1em] text-[#6e6e73] mt-0.5">{subLabel}</p>
          )}
        </div>
      </div>
    </div>
  );
}
