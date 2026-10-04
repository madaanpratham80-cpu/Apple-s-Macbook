"use client";

import { motion } from "framer-motion";

const SPECS = [
  {
    category: "Chip",
    items: [
      { label: "Processor", value: "Apple silicon" },
      { label: "Architecture", value: "Unified memory architecture" },
      { label: "Neural Engine", value: "Integrated neural processing" },
    ],
  },
  {
    category: "Display",
    items: [
      { label: "Type", value: "Liquid Retina XDR display" },
      { label: "Refresh Rate", value: "ProMotion adaptive technology" },
      { label: "Brightness", value: "High sustained brightness for HDR" },
    ],
  },
  {
    category: "Battery",
    items: [
      { label: "Design", value: "High-capacity lithium polymer" },
      { label: "Charging", value: "MagSafe fast charging" },
      { label: "Efficiency", value: "Optimized by Apple silicon" },
    ],
  },
  {
    category: "Connectivity",
    items: [
      { label: "Ports", value: "Thunderbolt / USB 4" },
      { label: "Wireless", value: "Wi-Fi 6E, Bluetooth 5.3" },
      { label: "Audio", value: "Six-speaker sound system" },
    ],
  },
  {
    category: "Design",
    items: [
      { label: "Enclosure", value: "100% recycled aluminum chassis" },
      { label: "Keyboard", value: "Magic Keyboard with Touch ID" },
      { label: "Trackpad", value: "Force Touch trackpad" },
    ],
  },
  {
    category: "Camera",
    items: [
      { label: "Resolution", value: "1080p FaceTime HD camera" },
      { label: "Processing", value: "Advanced image signal processor" },
      { label: "Features", value: "Center Stage, Portrait mode" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function TechSpecs() {
  return (
    <section
      id="specs"
      className="relative bg-[#050505] pt-32 pb-40 px-6 md:px-12"
      aria-labelledby="specs-heading"
    >
      {/* Top separator */}
      <div className="w-full h-[1px] bg-[rgba(255,255,255,0.06)] mb-24" />

      <div className="max-w-screen-xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#6e6e73] mb-4">
            Technical Specifications
          </p>
          <h2
            id="specs-heading"
            className="text-[40px] md:text-[52px] lg:text-[60px] font-bold tracking-[-0.03em] leading-[1.06] text-[#f5f5f7]"
          >
            Extraordinary.
            <br />
            <span className="text-[#a1a1a6]">In every detail.</span>
          </h2>
        </motion.div>

        {/* Specs grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0"
        >
          {SPECS.map((spec, i) => (
            <motion.div
              key={spec.category}
              variants={itemVariants}
              className="border-t border-[rgba(255,255,255,0.06)] py-10 pr-0 md:pr-12"
            >
              <h3 className="text-[11px] tracking-[0.18em] uppercase text-[#6e6e73] mb-6 font-medium">
                {spec.category}
              </h3>
              <dl className="space-y-4">
                {spec.items.map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5">
                    <dt className="text-[12px] text-[#6e6e73] tracking-[0.05em]">
                      {item.label}
                    </dt>
                    <dd className="text-[15px] text-[#f5f5f7] font-medium leading-snug">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <div className="mt-20 pt-8 border-t border-[rgba(255,255,255,0.06)]">
          <p className="text-[11px] text-[#6e6e73] leading-relaxed max-w-2xl">
            Specifications represent the MacBook Pro product line generally. 
            Configuration, specifications, and availability may vary. 
            Visit apple.com for complete specifications and available configurations.
          </p>
        </div>
      </div>
    </section>
  );
}
