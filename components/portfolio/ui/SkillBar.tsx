"use client";

import { motion } from "framer-motion";

interface SkillBarProps {
  label: string;
  percent: number;
}

export default function SkillBar({ label, percent }: SkillBarProps) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-sm text-[#F0F4FF]">{label}</span>
        <span className="font-mono text-xs text-[#0EA5E9]">{percent}%</span>
      </div>
      <div className="skill-bar-track h-2 rounded-full">
        <motion.div
          className="skill-bar-fill h-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        />
      </div>
    </div>
  );
}
