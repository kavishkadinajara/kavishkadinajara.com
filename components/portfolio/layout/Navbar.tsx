"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const isBlogActive = pathname.startsWith("/blog");

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
            ? "bg-[#0A1020]/95 backdrop-blur-md border-b border-[rgba(14,165,233,0.15)] shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
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
                      isActive ? "text-[#0EA5E9]" : "text-[#8B9EC0] hover:text-[#F0F4FF]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#0EA5E9] rounded-full shadow-[0_0_6px_#0EA5E9]"
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
              <Link
                href="/blog"
                className={`relative font-body text-sm transition-colors duration-200 ${
                  isBlogActive ? "text-[#0EA5E9]" : "text-[#8B9EC0] hover:text-[#F0F4FF]"
                }`}
              >
                Blog
                {isBlogActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#0EA5E9] rounded-full shadow-[0_0_6px_#0EA5E9]"
                  />
                )}
              </Link>
            </motion.li>

            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (ANCHOR_LINKS.length + 1) * 0.05, duration: 0.4 }}
            >
              <button
                onClick={() => handleAnchor("#contact")}
                className={`relative font-body text-sm transition-colors duration-200 ${
                  isHome && activeSection === "contact" ? "text-[#0EA5E9]" : "text-[#8B9EC0] hover:text-[#F0F4FF]"
                }`}
              >
                Contact
                {isHome && activeSection === "contact" && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#0EA5E9] rounded-full shadow-[0_0_6px_#0EA5E9]"
                  />
                )}
              </button>
            </motion.li>
          </ul>

          {/* Hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden text-[#8B9EC0] hover:text-[#F0F4FF] transition-colors z-[9999]"
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
            className="fixed inset-0 top-16 z-[9998] md:hidden bg-[#050810] overflow-y-auto"
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
                          ? "text-[#0EA5E9] bg-[rgba(14,165,233,0.1)] border-[rgba(14,165,233,0.2)]"
                          : "text-[#C8D4F0] hover:text-[#F0F4FF] hover:bg-[rgba(255,255,255,0.04)] border-transparent"
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
                <Link
                  href="/blog"
                  onClick={() => setMobileOpen(false)}
                  className={`block py-4 px-4 font-body text-base rounded-xl transition-colors border ${
                    isBlogActive
                      ? "text-[#0EA5E9] bg-[rgba(14,165,233,0.1)] border-[rgba(14,165,233,0.2)]"
                      : "text-[#C8D4F0] hover:text-[#F0F4FF] hover:bg-[rgba(255,255,255,0.04)] border-transparent"
                  }`}
                >
                  Blog
                </Link>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (ANCHOR_LINKS.length + 1) * 0.05, duration: 0.2 }}
              >
                <button
                  onClick={() => handleAnchor("#contact")}
                  className={`w-full text-left py-4 px-4 font-body text-base rounded-xl transition-colors border ${
                    isHome && activeSection === "contact"
                      ? "text-[#0EA5E9] bg-[rgba(14,165,233,0.1)] border-[rgba(14,165,233,0.2)]"
                      : "text-[#C8D4F0] hover:text-[#F0F4FF] hover:bg-[rgba(255,255,255,0.04)] border-transparent"
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
