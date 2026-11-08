"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/portfolio/ui/SectionTitle";

const EXPERIENCE = [
  {
    title:   "Associate Software Engineer",
    company: "Agrithmics (Pvt) Ltd",
    period:  "May 2025 – Present",
    side:    "right" as const,
    bullets: [
      "Led full-stack development of Verdant ERP — enterprise tea/plantation management platform (React + MUI v4, .NET Core C#, Dapper, SQL Server)",
      "Architected Multi-Pack Invoice feature using Bridge Table pattern — backward-compatible schema changes across 7 screens with vw_InvoicePackSummary unified view",
      "Built complex SQL stored procedures + CTEs for KPI dashboards and Field-wise P&L reporting with 17-file React component refactor",
      "Debugged critical production timezone bug (IST→UTC toISOString() shift) causing Green Leaf weight deduction errors",
      "Implemented Polly retry policies + NLog structured logging in C# repositories",
      "Azure DevOps CI/CD pipelines + Azure VM hosting",
    ],
  },
  {
    title:   "Intern Software Engineer",
    company: "Agrithmics (Pvt) Ltd",
    period:  "Dec 2024 – May 2025",
    side:    "left" as const,
    bullets: [
      "Contributed to Verdant ERP, Cargills Supplier Chain, and Balangoda Plantation Procurement System",
      "Built React UI components + .NET backend APIs via Axios",
      "Implemented Redis caching + RabbitMQ data load processing",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 bg-[#0A0705] grid-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle prefix="> work_history --verbose" />

        <div className="relative">
          {/* centre timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[rgba(192,133,82,0.5)] to-transparent" />

          <div className="space-y-16 md:space-y-24">
            {EXPERIENCE.map((job, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row ${
                  job.side === "left" ? "md:flex-row-reverse" : ""
                } items-start gap-6 md:gap-0`}
              >
                {/* dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 z-10">
                  <span className="timeline-dot" />
                </div>

                {/* card */}
                <motion.div
                  initial={{ opacity: 0, x: job.side === "right" ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className={`md:w-[46%] ${
                    job.side === "right" ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"
                  }`}
                >
                  <div className="hover-glow bg-[#1C110B] border border-[rgba(192,133,82,0.15)] rounded-xl p-6 md:p-8">
                    {/* header */}
                    <div className="mb-4">
                      <span className="font-mono text-xs text-[#C08552] tracking-wider uppercase">
                        {job.period}
                      </span>
                      <h3 className="font-display font-bold text-xl text-[#F5EDE6] mt-1">
                        {job.title}
                      </h3>
                      <p className="font-mono text-sm text-[#D4A373] mt-0.5">
                        {job.company}
                      </p>
                    </div>

                    {/* bullets */}
                    <ul className="space-y-2.5">
                      {job.bullets.map((b, bi) => (
                        <li
                          key={bi}
                          className="flex gap-3 text-sm text-[#A8927F] leading-relaxed"
                        >
                          <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#C08552] shadow-[0_0_6px_#C08552]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="circuit-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
