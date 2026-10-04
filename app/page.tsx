import Navigation from "@/components/Navigation";
import ScrollStage from "@/components/ScrollStage";
import TechSpecs from "@/components/TechSpecs";

export default function Home() {
  return (
    <main className="relative bg-[#050505] min-h-screen">
      {/* Skip to main content */}
      <a
        href="#overview"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#f5f5f7] focus:text-[#050505] focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <Navigation />

      {/* Main scroll-linked experience */}
      <ScrollStage />

      {/* Technical specifications */}
      <TechSpecs />

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-[rgba(255,255,255,0.06)] px-6 md:px-12 py-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-[13px] font-semibold text-[#f5f5f7] mb-1">MacBook Pro</p>
              <p className="text-[11px] text-[#6e6e73]">
                Extraordinary engineering. Beautifully integrated.
              </p>
            </div>
            <div className="flex gap-8">
              <a href="#overview" className="text-[11px] text-[#6e6e73] hover:text-[#a1a1a6] transition-colors">Overview</a>
              <a href="#design" className="text-[11px] text-[#6e6e73] hover:text-[#a1a1a6] transition-colors">Design</a>
              <a href="#performance" className="text-[11px] text-[#6e6e73] hover:text-[#a1a1a6] transition-colors">Performance</a>
              <a href="#specs" className="text-[11px] text-[#6e6e73] hover:text-[#a1a1a6] transition-colors">Tech Specs</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[rgba(255,255,255,0.04)]">
            <p className="text-[10px] text-[#6e6e73]">
              This is a concept design experience. Apple, MacBook Pro, and related marks are trademarks of Apple Inc.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
