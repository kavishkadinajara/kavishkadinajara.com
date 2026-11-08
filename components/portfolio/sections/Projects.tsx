"use client";

import SectionTitle from "@/components/portfolio/ui/SectionTitle";
import ProjectCard from "@/components/portfolio/ui/ProjectCard";
import { PROJECTS } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 bg-[#140D09]">
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
