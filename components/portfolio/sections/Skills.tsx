"use client";

import SectionTitle from "@/components/portfolio/ui/SectionTitle";
import SkillBar from "@/components/portfolio/ui/SkillBar";
import TechBadge from "@/components/portfolio/ui/TechBadge";
import { motion } from "framer-motion";

const SKILL_BARS = [
  { label: "React / Next.js",       percent: 90 },
  { label: ".NET Core / C#",        percent: 85 },
  { label: "SQL Server / Dapper",   percent: 85 },
  { label: "TypeScript",            percent: 88 },
  { label: "Python / FastAPI",      percent: 75 },
  { label: "Kotlin / Jetpack Compose", percent: 70 },
];

const TECH_GROUPS = [
  {
    label: "Frontend",
    variant: "blue" as const,
    items: ["React JS", "Next.js 14/15", "Material UI v4", "Tailwind CSS", "Framer Motion", "shadcn/ui", "Hero UI"],
  },
  {
    label: "Backend",
    variant: "cyan" as const,
    items: [".NET Core", "NestJS", "FastAPI", "Ballerina", "Dapper ORM"],
  },
  {
    label: "Mobile",
    variant: "green" as const,
    items: ["React Native Expo", "Kotlin", "Jetpack Compose", "Room DB"],
  },
  {
    label: "Database",
    variant: "blue" as const,
    items: ["SQL Server", "PostgreSQL", "MySQL", "Supabase", "Prisma", "Redis"],
  },
  {
    label: "DevOps",
    variant: "cyan" as const,
    items: ["Azure DevOps", "CI/CD", "Azure VMs", "AWS", "Firebase", "Vercel"],
  },
  {
    label: "Languages",
    variant: "muted" as const,
    items: ["JavaScript", "TypeScript", "C#", "Python", "Java", "Kotlin"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 bg-[#050810] grid-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle prefix="typeof skills // object" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Skill bars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <h3 className="font-mono text-sm text-[#8B9EC0] mb-8 tracking-wider uppercase">
              — Core proficiency
            </h3>
            {SKILL_BARS.map((s) => (
              <SkillBar key={s.label} label={s.label} percent={s.percent} />
            ))}
          </motion.div>

          {/* Tag cloud */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          >
            <h3 className="font-mono text-sm text-[#8B9EC0] mb-8 tracking-wider uppercase">
              — Full stack
            </h3>
            <div className="space-y-6">
              {TECH_GROUPS.map((group) => (
                <div key={group.label}>
                  <span className="font-mono text-xs text-[#8B9EC0] tracking-widest uppercase mb-3 block">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <TechBadge key={item} label={item} variant={group.variant} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="circuit-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
