"use client";

import SectionTitle from "@/components/portfolio/ui/SectionTitle";
import ProjectCard from "@/components/portfolio/ui/ProjectCard";

const PROJECTS = [
  {
    title: "MediChainLK",
    tag: "AI-Powered · Healthcare",
    description:
      "AI pharmacy platform for Sri Lanka — Google Cloud Vision OCR + spaCy NLP for prescription reading, Firebase RBAC, PickMe/PayHere integrations. Turborepo monorepo with Next.js 15, NestJS, FastAPI, React Native Expo. AWS Mumbai.",
    badge: "In Development",
    badgeVariant: "yellow" as const,
    liveUrl: "https://medi-chainlk-demo.vercel.app",
  },
  {
    title: "FileFlowOne (FYP)",
    tag: "Research · AI",
    description:
      "Open-source privacy-first file converter. Research: edge-based SLMs for semantic transformation. Novel Semantic Fidelity Index (SFI): 0.35·S_structural + 0.45·S_semantic + 0.20·S_functional. FastAPI + sentence-transformers.",
    badge: "Research",
    badgeVariant: "purple" as const,
    liveUrl: "https://fileflow-one.vercel.app",
  },
  // {
  //   title: "AgriGen ERP",
  //   tag: "Enterprise · ERP",
  //   description:
  //     "Full-stack tea estate management ERP for Sri Lanka + Bangladesh. React + .NET Core + SQL Server. Multi-pack invoicing, KPI dashboards, Field P&L, estate-division hierarchy reporting.",
  //   badge: "Production",
  //   badgeVariant: "green" as const,
  // },
  {
    title: "VIMMIK Portfolio",
    tag: "Design · Next.js",
    description:
      'Portfolio site for Sri Lankan software company. "Mechanical Falcon" dark navy design with animated peregrine falcon SVG + Framer Motion scroll transitions.',
    badge: "Live",
    badgeVariant: "cyan" as const,
    liveUrl: "https://vimmik.vercel.app/",
  },
  {
    title: "Eventure",
    tag: "Hackathon · Top 5",
    description:
      "Event ticketing platform — placed 5th among 100+ teams at WSO2 \"Innovate with Ballerina\" hackathon. QR-based verification, ticket sales, photo submissions.",
    badge: "Hackathon 🏆",
    badgeVariant: "yellow" as const,
    githubUrl: "https://github.com/KavishkaDinajara",
  },
  {
    title: "Care32",
    tag: "Healthcare · Web",
    description:
      "Dental clinic management — patient records, doctor schedules, appointments, real-time updates via Supabase. Next.js + Tailwind.",
    badge: "Live",
    badgeVariant: "green" as const,
    liveUrl: "https://care32test.vercel.app",
  },
  {
    title: "MinistoreX",
    tag: "Mobile · Android",
    description:
      "Kotlin + Jetpack Compose debt tracker for small shops. Bilingual (Sinhala/English), Room DB + Supabase sync, Hilt DI, built without Android Studio.",
    badge: "Mobile",
    badgeVariant: "blue" as const,
  },
  {
    title: "EatAtNFC",
    tag: "Restaurant · Web",
    description:
      "Scalable restaurant management — NFC-based menu, Google Places integration, order tracking, cart management, custom SQL. Next.js + TypeScript.",
    badge: "Live",
    badgeVariant: "cyan" as const,
    liveUrl: "https://nfc-self.vercel.app",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 bg-[#0A1020]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle prefix="$ ls ./projects --all" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
