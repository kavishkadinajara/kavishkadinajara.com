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
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const ids = ANCHOR_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const handleAnchor = (href: string) => {
    setMobileOpen(false);
    if (!isHome) { window.location.href = `/${href}`; return; }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const isBlogActive = pathname.startsWith("/blog");

  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-[#0A1020]/95 backdrop-blur-md border-b border-[rgba(14,165,233,0.15)] shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          className="flex items-center"
          href={isHome ? "#home" : "/"}
          onClick={(e) => { if (isHome) { e.preventDefault(); handleAnchor("#home"); } }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <img
            alt="Kavishka Dinajara"
            className="h-9 w-auto object-contain"
            src="/logo.png"
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
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              >
                <button
                  className={`relative font-body text-sm transition-colors duration-200 ${
                    isActive ? "text-[#0EA5E9]" : "text-[#8B9EC0] hover:text-[#F0F4FF]"
                  }`}
                  onClick={() => handleAnchor(link.href)}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#0EA5E9] rounded-full shadow-[0_0_6px_#0EA5E9]"
                      layoutId="nav-indicator"
                    />
                  )}
                </button>
              </motion.li>
            );
          })}

          {/* Blog — route link */}
          <motion.li
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.1 + ANCHOR_LINKS.length * 0.05, duration: 0.4 }}
          >
            <Link
              className={`relative font-body text-sm transition-colors duration-200 ${
                isBlogActive ? "text-[#0EA5E9]" : "text-[#8B9EC0] hover:text-[#F0F4FF]"
              }`}
              href="/blog"
              onClick={() => setMobileOpen(false)}
            >
              Blog
              {isBlogActive && (
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#0EA5E9] rounded-full shadow-[0_0_6px_#0EA5E9]"
                  layoutId="nav-indicator"
                />
              )}
            </Link>
          </motion.li>

          {/* Contact */}
          <motion.li
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.1 + (ANCHOR_LINKS.length + 1) * 0.05, duration: 0.4 }}
          >
            <button
              className={`relative font-body text-sm transition-colors duration-200 ${
                isHome && activeSection === "contact"
                  ? "text-[#0EA5E9]"
                  : "text-[#8B9EC0] hover:text-[#F0F4FF]"
              }`}
              onClick={() => handleAnchor("#contact")}
            >
              Contact
              {isHome && activeSection === "contact" && (
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#0EA5E9] rounded-full shadow-[0_0_6px_#0EA5E9]"
                  layoutId="nav-indicator"
                />
              )}
            </button>
          </motion.li>
        </ul>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          className="md:hidden text-[#8B9EC0] hover:text-[#F0F4FF] transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
        </button>
      </nav>

      {/* Mobile drawer — full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="fixed inset-0 top-16 z-50 md:hidden bg-[#050810]/98 backdrop-blur-lg"
            exit={{ opacity: 0, x: "100%" }}
            initial={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <ul className="flex flex-col px-6 pt-6 gap-1">
              {ANCHOR_LINKS.map((link, i) => {
                const isActive = isHome && activeSection === link.href.replace("#", "");
                return (
                  <motion.li
                    key={link.href}
                    animate={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 30 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <button
                      className={`w-full text-left py-4 px-4 font-body text-base rounded-xl transition-colors border ${
                        isActive
                          ? "text-[#0EA5E9] bg-[rgba(14,165,233,0.1)] border-[rgba(14,165,233,0.2)]"
                          : "text-[#C8D4F0] hover:text-[#F0F4FF] hover:bg-[rgba(255,255,255,0.04)] border-transparent"
                      }`}
                      onClick={() => handleAnchor(link.href)}
                    >
                      {link.label}
                    </button>
                  </motion.li>
                );
              })}
              <motion.li
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 30 }}
                transition={{ delay: ANCHOR_LINKS.length * 0.05, duration: 0.2 }}
              >
                <Link
                  className={`block py-4 px-4 font-body text-base rounded-xl transition-colors border ${
                    isBlogActive
                      ? "text-[#0EA5E9] bg-[rgba(14,165,233,0.1)] border-[rgba(14,165,233,0.2)]"
                      : "text-[#C8D4F0] hover:text-[#F0F4FF] hover:bg-[rgba(255,255,255,0.04)] border-transparent"
                  }`}
                  href="/blog"
                  onClick={() => setMobileOpen(false)}
                >
                  Blog
                </Link>
              </motion.li>
              <motion.li
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 30 }}
                transition={{ delay: (ANCHOR_LINKS.length + 1) * 0.05, duration: 0.2 }}
              >
                <button
                  className={`w-full text-left py-4 px-4 font-body text-base rounded-xl transition-colors border ${
                    isHome && activeSection === "contact"
                      ? "text-[#0EA5E9] bg-[rgba(14,165,233,0.1)] border-[rgba(14,165,233,0.2)]"
                      : "text-[#C8D4F0] hover:text-[#F0F4FF] hover:bg-[rgba(255,255,255,0.04)] border-transparent"
                  }`}
                  onClick={() => handleAnchor("#contact")}
                >
                  Contact
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
