"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import AnimatedGenerateButton from "@/components/ui/animated-generate-button-shadcn-tailwind";

const NAV_LINKS = [
  { href: "#overview", label: "Overview" },
  { href: "#design", label: "Design" },
  { href: "#performance", label: "Performance" },
  { href: "#display", label: "Display" },
  { href: "#engineering", label: "Engineering" },
  { href: "#specs", label: "Tech Specs" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={"fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out" + (scrolled ? " glass" : " bg-transparent")}
        role="banner"
      >
        <nav
          className="w-full px-6 md:px-8 h-[56px] flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Wordmark */}
          <a
            href="/"
            className="text-[15px] font-semibold tracking-[-0.01em] text-[#f5f5f7] hover:text-white transition-colors duration-200 flex-shrink-0"
            aria-label="MacBook Pro — Home"
          >
            MacBook Pro
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-7" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-[13px] font-normal text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors duration-200 relative group bg-transparent border-none cursor-pointer"
                  aria-label={link.label}
                >
                  {link.label}
                  <span className="absolute -bottom-[2px] left-0 right-0 h-[1px] bg-[#f5f5f7] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <AnimatedGenerateButton
              labelIdle="Explore MacBook Pro"
              labelActive="Exploring..."
              highlightHueDeg={210}
              onClick={() => handleNavClick("#overview")}
              className="hidden md:inline-block"
            />
            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-[#f5f5f7] hover:text-white transition-colors p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[52px] left-0 right-0 z-40 glass border-t border-[rgba(255,255,255,0.06)]"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <nav className="px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-[17px] font-medium text-[#f5f5f7] text-left bg-transparent border-none cursor-pointer hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="#overview"
                onClick={(e) => { e.preventDefault(); handleNavClick("#overview"); }}
                className="mt-2 inline-flex items-center justify-center text-[15px] font-medium text-[#f5f5f7] border border-[rgba(255,255,255,0.2)] px-5 py-2.5 rounded-full hover:bg-[rgba(255,255,255,0.08)] transition-all duration-200"
              >
                Explore MacBook Pro
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
