"use client";

import { motion } from "framer-motion";

import SectionTitle from "@/components/portfolio/ui/SectionTitle";

const SKILL_BARS = [
  { label: "React / Next.js",          percent: 90, color: "#0EA5E9" },
  { label: ".NET Core / C#",           percent: 85, color: "#06B6D4" },
  { label: "SQL Server / Dapper",      percent: 85, color: "#06B6D4" },
  { label: "TypeScript",               percent: 88, color: "#0EA5E9" },
  { label: "Python / FastAPI",         percent: 75, color: "#10B981" },
  { label: "Kotlin / Jetpack Compose", percent: 70, color: "#10B981" },
];

const TECH_GROUPS = [
  {
    label: "Frontend",
    color: "#0EA5E9",
    border: "rgba(14,165,233,0.3)",
    bg: "rgba(14,165,233,0.07)",
    hoverBg: "rgba(14,165,233,0.15)",
    hoverShadow: "0 0 16px rgba(14,165,233,0.4)",
    items: ["React JS", "Next.js 14/15", "Material UI v4", "Tailwind CSS", "Framer Motion", "shadcn/ui", "Hero UI"],
  },
  {
    label: "Backend",
    color: "#06B6D4",
    border: "rgba(6,182,212,0.3)",
    bg: "rgba(6,182,212,0.07)",
    hoverBg: "rgba(6,182,212,0.15)",
    hoverShadow: "0 0 16px rgba(6,182,212,0.4)",
    items: [".NET Core", "NestJS", "FastAPI", "Ballerina", "Dapper ORM"],
  },
  {
    label: "Mobile",
    color: "#10B981",
    border: "rgba(16,185,129,0.3)",
    bg: "rgba(16,185,129,0.07)",
    hoverBg: "rgba(16,185,129,0.15)",
    hoverShadow: "0 0 16px rgba(16,185,129,0.4)",
    items: ["React Native Expo", "Kotlin", "Jetpack Compose", "Room DB"],
  },
  {
    label: "Database",
    color: "#8B5CF6",
    border: "rgba(139,92,246,0.3)",
    bg: "rgba(139,92,246,0.07)",
    hoverBg: "rgba(139,92,246,0.15)",
    hoverShadow: "0 0 16px rgba(139,92,246,0.4)",
    items: ["SQL Server", "PostgreSQL", "MySQL", "Supabase", "Prisma", "Redis"],
  },
  {
    label: "DevOps",
    color: "#F59E0B",
    border: "rgba(245,158,11,0.3)",
    bg: "rgba(245,158,11,0.07)",
    hoverBg: "rgba(245,158,11,0.15)",
    hoverShadow: "0 0 16px rgba(245,158,11,0.4)",
    items: ["Azure DevOps", "CI/CD", "Azure VMs", "AWS", "Firebase", "Vercel"],
  },
  {
    label: "Languages",
    color: "#8B9EC0",
    border: "rgba(139,158,192,0.2)",
    bg: "rgba(139,158,192,0.05)",
    hoverBg: "rgba(139,158,192,0.12)",
    hoverShadow: "0 0 16px rgba(139,158,192,0.3)",
    items: ["JavaScript", "TypeScript", "C#", "Python", "Java", "Kotlin"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  show:   { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.3, ease: "easeOut" } },
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 bg-[#050810] grid-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle prefix="typeof skills // object" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Core proficiency bars ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <h3 className="font-mono text-sm text-[#8B9EC0] mb-8 tracking-wider uppercase">
              — Core proficiency
            </h3>
            <div className="space-y-5">
              {SKILL_BARS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-sm text-[#C8D4F0]">{s.label}</span>
                    <span className="font-mono text-xs text-[#8B9EC0]">{s.percent}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[rgba(14,165,233,0.1)] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}aa)` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 + i * 0.07, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Interactive skill grid ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          >
            <h3 className="font-mono text-sm text-[#8B9EC0] mb-8 tracking-wider uppercase">
              — Full stack
            </h3>
            <div className="space-y-5">
              {TECH_GROUPS.map((group, gi) => (
                <motion.div
                  key={group.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.06, duration: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: group.color, boxShadow: `0 0 6px ${group.color}` }}
                    />
                    <span className="font-mono text-xs tracking-widest uppercase" style={{ color: group.color }}>
                      {group.label}
                    </span>
                  </div>
                  <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-2"
                  >
                    {group.items.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={item}
                        className="skill-tag inline-block px-3 py-1.5 text-xs font-mono rounded-lg border cursor-default transition-all duration-200"
                        style={{
                          color: group.color,
                          borderColor: group.border,
                          background: group.bg,
                        }}
                        whileHover={{
                          background: group.hoverBg,
                          boxShadow: group.hoverShadow,
                          y: -2,
                          transition: { duration: 0.15 },
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="circuit-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
