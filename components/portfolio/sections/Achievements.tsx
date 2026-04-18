"use client";

import { motion } from "framer-motion";
import { IconTrophy } from "@tabler/icons-react";
import SectionTitle from "@/components/portfolio/ui/SectionTitle";
import TechBadge from "@/components/portfolio/ui/TechBadge";

const TECH = ["Ballerina", "Next.js", "React Native", "PostgreSQL", "AWS S3"];

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 bg-[#0A1020]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle prefix="# achievements.log" />

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative max-w-2xl w-full rounded-xl p-px"
            style={{
              background: "linear-gradient(135deg, #0EA5E9, #06B6D4, #10B981, #0EA5E9)",
              backgroundSize: "300% 300%",
              animation: "gradientRotate 4s ease infinite",
            }}
          >
          <div className="relative w-full p-8 md:p-10 rounded-xl overflow-hidden bg-[#0D1829]">
            {/* subtle inner glow */}
            <div
              className="absolute inset-0 pointer-events-none rounded-xl"
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(14,165,233,0.08) 0%, transparent 60%)",
              }}
              aria-hidden="true"
            />

            <div className="relative z-10">
              {/* trophy icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[rgba(245,158,11,0.15)] border border-[rgba(245,158,11,0.3)] flex items-center justify-center">
                  <IconTrophy size={28} className="text-[#F59E0B]" />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#F59E0B] tracking-widest uppercase">
                    Hackathon Achievement
                  </span>
                  <h3 className="font-display font-bold text-xl text-[#F0F4FF] mt-0.5">
                    WSO2 Hackathon 2024
                  </h3>
                </div>
              </div>

              <h2 className="font-display font-bold text-3xl md:text-4xl text-[#F0F4FF] mb-2">
                <span className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] bg-clip-text text-transparent">
                  Top 5
                </span>{" "}
                of 100+ Teams
              </h2>

              <p className="font-mono text-sm text-[#8B9EC0] mb-4">
                WSO2 &quot;Innovate with Ballerina&quot; Hackathon · University Category
              </p>

              <p className="font-body text-[#8B9EC0] leading-relaxed mb-6">
                Built <span className="text-[#F0F4FF] font-medium">EVENTURE</span> — a
                full-stack event ticketing platform with QR-based verification, ticket
                sales, and photo submissions. Competed against 100+ university teams
                across Sri Lanka, placing in the top 5.
              </p>

              <div>
                <span className="font-mono text-xs text-[#8B9EC0] tracking-widest uppercase mb-3 block">
                  Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {TECH.map((t) => (
                    <TechBadge key={t} label={t} variant="cyan" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
