"use client";

import { motion } from "framer-motion";

import SectionTitle from "@/components/portfolio/ui/SectionTitle";

const TECH_GROUPS = [
  {
    label: "Backend",
    color: "#D4A373",
    border: "rgba(212,163,115,0.3)",
    bg: "rgba(212,163,115,0.07)",
    hoverBg: "rgba(212,163,115,0.15)",
    hoverShadow: "0 0 16px rgba(212,163,115,0.4)",
    items: [".NET Core / C#", "Clean Architecture", "Dapper ORM", "REST APIs", "Polly", "NLog", "NestJS", "FastAPI", "Ballerina"],
  },
  {
    label: "Frontend",
    color: "#C08552",
    border: "rgba(192,133,82,0.3)",
    bg: "rgba(192,133,82,0.07)",
    hoverBg: "rgba(192,133,82,0.15)",
    hoverShadow: "0 0 16px rgba(192,133,82,0.4)",
    items: ["React", "Next.js 14/15", "Material UI v4", "Tailwind CSS", "shadcn/ui", "Hero UI", "Framer Motion"],
  },
  {
    label: "Database",
    color: "#8B5CF6",
    border: "rgba(139,92,246,0.3)",
    bg: "rgba(139,92,246,0.07)",
    hoverBg: "rgba(139,92,246,0.15)",
    hoverShadow: "0 0 16px rgba(139,92,246,0.4)",
    items: ["SQL Server", "PostgreSQL", "MySQL", "Supabase", "Prisma"],
  },
  {
    label: "DevOps & Cloud",
    color: "#F59E0B",
    border: "rgba(245,158,11,0.3)",
    bg: "rgba(245,158,11,0.07)",
    hoverBg: "rgba(245,158,11,0.15)",
    hoverShadow: "0 0 16px rgba(245,158,11,0.4)",
    items: ["Azure DevOps", "CI/CD", "Azure VMs", "AWS", "Firebase", "Vercel"],
  },
  {
    label: "Messaging & Cache",
    color: "#C08552",
    border: "rgba(192,133,82,0.3)",
    bg: "rgba(192,133,82,0.07)",
    hoverBg: "rgba(192,133,82,0.15)",
    hoverShadow: "0 0 16px rgba(192,133,82,0.4)",
    items: ["RabbitMQ", "Redis"],
  },
  {
    label: "AI / ML",
    color: "#EC4899",
    border: "rgba(236,72,153,0.3)",
    bg: "rgba(236,72,153,0.07)",
    hoverBg: "rgba(236,72,153,0.15)",
    hoverShadow: "0 0 16px rgba(236,72,153,0.4)",
    items: ["Google Cloud Vision OCR", "spaCy NLP", "sentence-transformers"],
  },
  {
    label: "Mobile",
    color: "#10B981",
    border: "rgba(16,185,129,0.3)",
    bg: "rgba(16,185,129,0.07)",
    hoverBg: "rgba(16,185,129,0.15)",
    hoverShadow: "0 0 16px rgba(16,185,129,0.4)",
    items: ["React Native (Expo)", "Kotlin", "Jetpack Compose", "Room"],
  },
  {
    label: "Languages",
    color: "#A8927F",
    border: "rgba(168,146,127,0.3)",
    bg: "rgba(168,146,127,0.07)",
    hoverBg: "rgba(168,146,127,0.15)",
    hoverShadow: "0 0 16px rgba(168,146,127,0.4)",
    items: ["C#", "TypeScript", "JavaScript", "Python", "Java", "Kotlin", "SQL"],
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
    <section id="skills" className="relative py-24 bg-[#0A0705] grid-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle prefix="typeof skills // object" />

        <div>
          {/* ── Interactive skill grid ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          >
            <h3 className="font-mono text-sm text-[#A8927F] mb-8 tracking-wider uppercase">
              — Full stack
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-6">
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
