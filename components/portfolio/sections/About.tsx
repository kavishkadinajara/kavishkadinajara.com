"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/portfolio/ui/SectionTitle";

const STATS = [
  { value: "1.5+", label: "Years Experience" },
  { value: "10+",  label: "Projects Built"   },
  { value: "3.81", label: "GPA (HND)"        },
  { value: "Top 5",label: "Hackathon Rank"   },
];

const codeLines = [
  { token: "const", rest: " kavishka = {", color: "text-[#0EA5E9]" },
  { token: "  location:",  rest: ' "Galle, Sri Lanka 🇱🇰",',   color: "text-[#8B9EC0]" },
  { token: "  role:",      rest: ' "Associate Software Engineer",', color: "text-[#8B9EC0]" },
  { token: "  company:",   rest: ' "Agrithmics (Pvt) Ltd",',    color: "text-[#8B9EC0]" },
  { token: "  education:", rest: ' "HND SE @ NIBM (GPA: 3.81)",', color: "text-[#8B9EC0]" },
  { token: "  interests:", rest: " [",                           color: "text-[#8B9EC0]" },
  { token: "   ",          rest: ' "Mathematics", "Physics",',   color: "text-[#10B981]" },
  { token: "   ",          rest: ' "Rugby 🏉", "Photography 📸",', color: "text-[#10B981]" },
  { token: "   ",          rest: ' "Reading"',                   color: "text-[#10B981]" },
  { token: "  ],",         rest: "",                             color: "text-[#8B9EC0]" },
  { token: "  currently:", rest: ' "Building AgriGen ERP + FYP"', color: "text-[#8B9EC0]" },
  { token: "}",            rest: "",                             color: "text-[#0EA5E9]" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-[#0A1020]">
      {/* top circuit divider */}
      <div className="circuit-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle prefix="// about_me.ts" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Code block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="code-block p-6 md:p-8 rounded-xl"
          >
            {/* dots */}
            <div className="flex gap-2 mb-5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>

            <div className="space-y-1 overflow-x-auto">
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="flex font-mono text-sm md:text-base whitespace-nowrap"
                >
                  <span className="text-[#0EA5E9] mr-1 select-none w-6 text-right shrink-0 text-xs opacity-40">
                    {i + 1}
                  </span>
                  <span className="ml-3">
                    <span className={line.color}>{line.token}</span>
                    <span className="text-[#F0F4FF]">{line.rest}</span>
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bio + stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col justify-center gap-6"
          >
            <div className="space-y-4">
              <p className="font-body text-[#8B9EC0] leading-relaxed text-base md:text-lg">
                I&apos;m a software engineer based in{" "}
                <span className="text-[#F0F4FF]">Galle, Sri Lanka</span>, with
                a deep passion for where science meets code. I find the same
                elegance in a well-structured algorithm that I find in a physical
                law — both describe the universe with beautiful precision.
              </p>
              <p className="font-body text-[#8B9EC0] leading-relaxed text-base md:text-lg">
                Currently at{" "}
                <span className="text-[#0EA5E9]">Agrithmics (Pvt) Ltd</span>{" "}
                building the AgriGen ERP platform — a full-scale tea &amp;
                plantation management system. My final year project explores
                edge-based Small Language Models for semantic file transformation.
              </p>
              <p className="font-body text-[#8B9EC0] leading-relaxed">
                Off the keyboard: rugby pitch, camera in hand, or buried in a
                mathematics textbook. Every discipline teaches you to think more
                precisely.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                  className="bg-[#0D1829] border border-[rgba(14,165,233,0.15)] rounded-xl p-4 text-center"
                >
                  <div className="font-display font-bold text-2xl text-[#0EA5E9]">
                    {stat.value}
                  </div>
                  <div className="font-body text-xs text-[#8B9EC0] mt-1 leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
