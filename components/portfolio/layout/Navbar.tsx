"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

// NOTE: the Blog nav link is intentionally hidden until posts are published (the /blog route still exists).

const ANCHOR_LINKS = [
  { label: "Home",       href: "#home"       },
  { label: "About",      href: "#about"      },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects"   },
  { label: "Skills",     href: "#skills"     },
];

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname  = usePathname();
  const isHome    = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const ids = ANCHOR_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [isHome]);

  // close drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleAnchor = (href: string) => {
    setMobileOpen(false);
    if (!isHome) { window.location.href = `/${href}`; return; }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Header bar ── */}
      <motion.header
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
          scrolled || !isHome
            ? "bg-[#140D09]/95 backdrop-blur-md border-b border-[rgba(192,133,82,0.15)] shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href={isHome ? "#home" : "/"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center"
            onClick={(e) => { if (isHome) { e.preventDefault(); handleAnchor("#home"); } }}
          >
            <img
              src="/logo.png"
              alt="Kavishka Dinajara"
              className="h-9 w-auto object-contain"
              style={{ filter: "brightness(1.1)" }}
            />
          </motion.a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7">
            {ANCHOR_LINKS.map((link, i) => {
              const isActive = isHome && activeSection === link.href.replace("#", "");
              return (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <button
                    onClick={() => handleAnchor(link.href)}
                    className={`relative font-body text-sm transition-colors duration-200 ${
                      isActive ? "text-[#C08552]" : "text-[#A8927F] hover:text-[#F5EDE6]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C08552] rounded-full shadow-[0_0_6px_#C08552]"
                      />
                    )}
                  </button>
                </motion.li>
              );
            })}

            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + ANCHOR_LINKS.length * 0.05, duration: 0.4 }}
            >
              <button
                onClick={() => handleAnchor("#contact")}
                className={`relative font-body text-sm transition-colors duration-200 ${
                  isHome && activeSection === "contact" ? "text-[#C08552]" : "text-[#A8927F] hover:text-[#F5EDE6]"
                }`}
              >
                Contact
                {isHome && activeSection === "contact" && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C08552] rounded-full shadow-[0_0_6px_#C08552]"
                  />
                )}
              </button>
            </motion.li>
          </ul>

          {/* Hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden text-[#A8927F] hover:text-[#F5EDE6] transition-colors z-[9999]"
          >
            {mobileOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* ── Mobile drawer — outside header, full z-index ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 top-16 z-[9998] md:hidden bg-[#0A0705] overflow-y-auto"
          >
            <ul className="flex flex-col px-6 pt-6 gap-2">
              {ANCHOR_LINKS.map((link, i) => {
                const isActive = isHome && activeSection === link.href.replace("#", "");
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <button
                      onClick={() => handleAnchor(link.href)}
                      className={`w-full text-left py-4 px-4 font-body text-base rounded-xl transition-colors border ${
                        isActive
                          ? "text-[#C08552] bg-[rgba(192,133,82,0.1)] border-[rgba(192,133,82,0.2)]"
                          : "text-[#D9C9BA] hover:text-[#F5EDE6] hover:bg-[rgba(255,255,255,0.04)] border-transparent"
                      }`}
                    >
                      {link.label}
                    </button>
                  </motion.li>
                );
              })}

              <motion.li
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: ANCHOR_LINKS.length * 0.05, duration: 0.2 }}
              >
                <button
                  onClick={() => handleAnchor("#contact")}
                  className={`w-full text-left py-4 px-4 font-body text-base rounded-xl transition-colors border ${
                    isHome && activeSection === "contact"
                      ? "text-[#C08552] bg-[rgba(192,133,82,0.1)] border-[rgba(192,133,82,0.2)]"
                      : "text-[#D9C9BA] hover:text-[#F5EDE6] hover:bg-[rgba(255,255,255,0.04)] border-transparent"
                  }`}
                >
                  Contact
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
