"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { IconArrowRight, IconDownload } from "@tabler/icons-react";

import HeroPhoto from "../hero/HeroPhoto";
import HeroTerminal from "../hero/HeroTerminal";
import MathField from "../hero/MathField";
import OrbitalLogos from "../hero/OrbitalLogos";

const HeroCrystal = dynamic(() => import("../hero/HeroCrystal"), {
  ssr: false,
  loading: () => null,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut", delay },
  }),
};

export default function Hero() {
  const [showCrystal, setShowCrystal] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isMobile && !reduce) {
      const t = setTimeout(() => setShowCrystal(true), 350);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center grid-bg overflow-hidden"
    >
      <div className="aurora-bg" aria-hidden="true" />
      <MathField />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(14,165,233,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-16 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <div className="flex-1 max-w-2xl w-full">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.1}
              className="mb-4 flex items-center gap-3"
            >
              <span className="font-mono text-sm md:text-base text-[#0EA5E9] tracking-widest uppercase">
                Associate Software Engineer
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[rgba(16,185,129,0.4)] bg-[rgba(16,185,129,0.06)]">
                <span className="available-dot" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#10B981]">
                  Available
                </span>
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.25}
              className="font-display font-bold leading-none tracking-tight"
            >
              <span className="block text-6xl md:text-8xl lg:text-9xl text-[#F0F4FF]">
                Kavishka
              </span>
              <span className="block text-6xl md:text-8xl lg:text-9xl bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] bg-clip-text text-transparent">
                Dinajara
              </span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.45}
              className="mt-8"
            >
              <HeroTerminal />
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.65}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-body font-medium text-sm rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
              >
                View Projects
                <IconArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>

              <a
                href="/Kavishka-Dinajara-CV.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 border border-[rgba(14,165,233,0.4)] text-[#0EA5E9] hover:bg-[rgba(14,165,233,0.08)] font-body font-medium text-sm rounded-lg transition-all duration-200"
              >
                <IconDownload size={16} />
                Download CV
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.85}
              className="mt-10 flex items-center gap-6 text-[#8B9EC0] font-mono text-xs"
            >
              <Stat value="1+" label="years" />
              <span className="w-px h-6 bg-[rgba(14,165,233,0.25)]" />
              <Stat value="15+" label="projects" />
              <span className="w-px h-6 bg-[rgba(14,165,233,0.25)]" />
              <Stat value="4+" label="ERP modules" />
            </motion.div>
          </div>

          <div className="relative flex-shrink-0 flex items-center justify-center">
            {showCrystal && (
              <div
                className="absolute inset-0 -m-12 pointer-events-none"
                style={{ zIndex: 1 }}
              >
                <HeroCrystal />
              </div>
            )}

            <div className="relative" style={{ zIndex: 2 }}>
              <HeroPhoto>
                <OrbitalLogos />
              </HeroPhoto>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-[#8B9EC0] tracking-widest uppercase">
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-[#0EA5E9] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="text-[#F0F4FF] text-base font-bold">{value}</span>
      <span className="uppercase tracking-widest">{label}</span>
    </span>
  );
}
