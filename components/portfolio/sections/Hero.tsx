"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconArrowRight, IconDownload } from "@tabler/icons-react";

const TYPEWRITER_PHRASES = [
  "builds ERP systems.",
  "loves mathematics.",
  "solves hard problems.",
  "ships production code.",
];

const FLOATING_EQUATIONS = [
  { text: "E=mc²",  x: "8%",  y: "20%", cls: "eq-float-1", size: "text-2xl" },
  { text: "∑",      x: "88%", y: "15%", cls: "eq-float-2", size: "text-4xl" },
  { text: "∇f",     x: "92%", y: "55%", cls: "eq-float-3", size: "text-3xl" },
  { text: "λ",      x: "5%",  y: "65%", cls: "eq-float-4", size: "text-4xl" },
  { text: "∫",      x: "75%", y: "80%", cls: "eq-float-5", size: "text-5xl" },
  { text: "π",      x: "18%", y: "85%", cls: "eq-float-6", size: "text-3xl" },
  { text: "Δφ",     x: "55%", y: "10%", cls: "eq-float-1", size: "text-2xl" },
  { text: "∞",      x: "35%", y: "90%", cls: "eq-float-3", size: "text-4xl" },
];

function useTypewriter(phrases: string[], speed = 70, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((p) => (p + 1) % phrases.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

  return displayed;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut", delay },
  }),
};

export default function Hero() {
  const typed = useTypewriter(TYPEWRITER_PHRASES);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center grid-bg overflow-hidden"
    >
      {/* Floating equations */}
      {FLOATING_EQUATIONS.map((eq, i) => (
        <span
          key={i}
          className={`absolute font-mono text-[#0EA5E9] pointer-events-none select-none ${eq.cls} ${eq.size}`}
          style={{ left: eq.x, top: eq.y, opacity: 0.12 }}
          aria-hidden="true"
        >
          {eq.text}
        </span>
      ))}

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(14,165,233,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-16 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
          {/* ── Left content ── */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.1}
              className="mb-4"
            >
              <span className="font-mono text-sm md:text-base text-[#0EA5E9] tracking-widest uppercase">
                Associate Software Engineer
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
              custom={0.4}
              className="mt-6 h-8 flex items-center"
            >
              <span className="font-mono text-lg md:text-xl text-[#8B9EC0]">
                {"_ "}
                <span className="text-[#F0F4FF]">{typed}</span>
                <span className="typewriter-cursor" aria-hidden="true" />
              </span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.55}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-body font-medium text-sm rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
              >
                View Projects
                <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/KAVISHKA-DINAJARA-CV.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 border border-[rgba(14,165,233,0.4)] text-[#0EA5E9] hover:bg-[rgba(14,165,233,0.08)] font-body font-medium text-sm rounded-lg transition-all duration-200"
              >
                <IconDownload size={16} />
                Download CV
              </a>
            </motion.div>
          </div>

          {/* ── Right: profile photo with orbital ring ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex-shrink-0 relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center"
          >
            {/* outer orbit ring */}
            <div
              className="absolute inset-0 rounded-full border border-dashed border-[rgba(14,165,233,0.25)] orbit-ring"
              style={{ transform: "scale(1.35)" }}
            />
            {/* inner orbit ring (reversed) */}
            <div
              className="absolute inset-0 rounded-full border border-[rgba(6,182,212,0.2)] orbit-ring-reverse"
              style={{ transform: "scale(1.18)" }}
            />

            {/* orbit dot */}
            <div
              className="absolute orbit-ring"
              style={{
                top: "50%",
                left: "50%",
                width: "calc(135% * 0.5)",
                height: "calc(135% * 0.5)",
                marginLeft: "calc(-135% * 0.25)",
                marginTop: "calc(-135% * 0.25)",
              }}
              aria-hidden="true"
            >
              <span
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0EA5E9] shadow-[0_0_12px_#0EA5E9]"
              />
            </div>

            {/* photo circle */}
            <div className="relative w-48 h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-[rgba(14,165,233,0.4)] shadow-[0_0_40px_rgba(14,165,233,0.2)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/aboutme/about0.jpg"
                alt="Kavishka Dinajara"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-[#8B9EC0] tracking-widest uppercase">scroll</span>
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
