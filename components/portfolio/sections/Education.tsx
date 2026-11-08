"use client";

import { motion } from "framer-motion";
import { IconSchool } from "@tabler/icons-react";

import SectionTitle from "@/components/portfolio/ui/SectionTitle";

const EDUCATION = [
  {
    title: "Higher National Diploma in Software Engineering",
    institution: "National Institute of Business Management (NIBM), Galle",
    period: "Nov 2022 – Nov 2024",
    detail: "GPA 3.81",
  },
  {
    title: "GCE Advanced Level — Physical Science Stream",
    institution: "Vidyaloka College, Galle",
    period: "2021",
    detail: "",
  },
];

export default function Education() {
  return (
    <section className="relative py-24 bg-[#140D09]" id="education">
      <div className="circuit-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle prefix="$ cat education.md" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {EDUCATION.map((item, i) => (
            <motion.div
              key={item.title}
              className="hover-glow bg-[#1C110B] border border-[rgba(192,133,82,0.15)] rounded-xl p-6 md:p-8 flex gap-4"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[rgba(192,133,82,0.1)] border border-[rgba(192,133,82,0.25)] flex items-center justify-center">
                <IconSchool className="text-[#C08552]" size={24} />
              </div>
              <div>
                <span className="font-mono text-xs text-[#C08552] tracking-wider uppercase">
                  {item.period}
                </span>
                <h3 className="font-display font-bold text-lg text-[#F5EDE6] mt-1">
                  {item.title}
                </h3>
                <p className="font-mono text-sm text-[#D4A373] mt-0.5">
                  {item.institution}
                </p>
                {item.detail && (
                  <p className="font-mono text-xs text-[#A8927F] mt-2">
                    {item.detail}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
