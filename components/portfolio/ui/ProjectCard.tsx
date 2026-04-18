"use client";

import { motion } from "framer-motion";
import { IconExternalLink, IconBrandGithub } from "@tabler/icons-react";

import TiltCard from "@/components/portfolio/ui/TiltCard";

interface ProjectCardProps {
  title: string;
  tag: string;
  description: string;
  badge: string;
  badgeVariant?: "blue" | "cyan" | "green" | "yellow" | "purple";
  liveUrl?: string;
  githubUrl?: string;
  index?: number;
}

const badgeStyles: Record<string, string> = {
  blue:   "bg-[rgba(14,165,233,0.15)]  text-[#0EA5E9]  border border-[rgba(14,165,233,0.3)]",
  cyan:   "bg-[rgba(6,182,212,0.15)]   text-[#06B6D4]  border border-[rgba(6,182,212,0.3)]",
  green:  "bg-[rgba(16,185,129,0.15)]  text-[#10B981]  border border-[rgba(16,185,129,0.3)]",
  yellow: "bg-[rgba(245,158,11,0.15)]  text-[#F59E0B]  border border-[rgba(245,158,11,0.3)]",
  purple: "bg-[rgba(139,92,246,0.15)]  text-[#8B5CF6]  border border-[rgba(139,92,246,0.3)]",
};

const glowColors: Record<string, string> = {
  blue:   "rgba(14,165,233,0.35)",
  cyan:   "rgba(6,182,212,0.35)",
  green:  "rgba(16,185,129,0.35)",
  yellow: "rgba(245,158,11,0.35)",
  purple: "rgba(139,92,246,0.35)",
};

export default function ProjectCard({
  title,
  tag,
  description,
  badge,
  badgeVariant = "blue",
  liveUrl,
  githubUrl,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="h-full"
    >
      <TiltCard
        className="hover-glow group relative flex flex-col h-full bg-[#0D1829] border border-[rgba(14,165,233,0.15)] rounded-xl p-6 transition-all duration-300"
        glowColor={glowColors[badgeVariant]}
      >
        {/* top bar on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl bg-gradient-to-r from-transparent via-[rgba(14,165,233,0.5)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="flex items-start justify-between mb-3">
          <span className="font-mono text-xs text-[#8B9EC0]">{tag}</span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${badgeStyles[badgeVariant]}`}>
            {badge}
          </span>
        </div>

        <h3 className="font-display font-semibold text-lg text-[#F0F4FF] mb-3 group-hover:text-[#0EA5E9] transition-colors duration-200">
          {title}
        </h3>

        <p className="text-sm text-[#8B9EC0] leading-relaxed flex-1">
          {description}
        </p>

        {(liveUrl || githubUrl) && (
          <div className="flex gap-3 mt-5 pt-4 border-t border-[rgba(14,165,233,0.1)]">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-[#0EA5E9] hover:text-[#06B6D4] transition-colors"
              >
                <IconExternalLink size={12} />
                Live
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-[#8B9EC0] hover:text-[#F0F4FF] transition-colors"
              >
                <IconBrandGithub size={12} />
                GitHub
              </a>
            )}
          </div>
        )}
      </TiltCard>
    </motion.div>
  );
}
