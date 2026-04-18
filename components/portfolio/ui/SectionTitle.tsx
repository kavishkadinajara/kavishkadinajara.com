"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  prefix: string;
  className?: string;
}

export default function SectionTitle({ prefix, className = "" }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`mb-12 ${className}`}
    >
      <span className="font-mono text-lg md:text-xl text-[#0EA5E9] tracking-wide">
        {prefix}
      </span>
      <div className="mt-3 circuit-divider" />
    </motion.div>
  );
}
