"use client";
import { motion } from "framer-motion";
import React from "react";

import DemoView from "@/components/DemoView";
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";

// Define types for `data`
interface Project {
  category: string;
  title: string;
  src: string;
  description: string;
  youtubeLink: string;
  githubLink: string;
  content: React.ReactNode;
}

export default function MyProjects() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="w-full h-full py-10 md:py-20 overflow-x-hidden z-30"
      id="my_projects"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        animate={{ y: 0, opacity: 1 }}
        className="max-w-7xl px-4 mx-auto text-center text-2xl sm:text-3xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans"
        initial={{ y: -20, opacity: 0 }}
        transition={{ delay: 0.3 }}
      >
        My Projects
      </motion.h2>
      <div className="px-4 md:px-8 lg:px-16">
        <Carousel items={cards} />
      </div>
    </motion.div>
  );
}

// Define the prop types for DummyContent
interface DummyContentProps {
  description: string;
  youtubeLink: string;
  githubLink: string;
}

const DummyContent: React.FC<DummyContentProps> = ({
  description,
  youtubeLink,
  githubLink,
}) => {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#22879e3a] hover:bg-[#22883641] p-6 sm:p-8 md:p-14 rounded-3xl mb-4 shadow-lg w-full max-w-screen mx-auto "
      initial={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-neutral-400 text-sm md:text-base lg:text-xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-50">Description:</span>{" "}
        {description}
      </p>

      <div className="flex justify-center gap-4 mt-4">
        {/* YouTube Demo and GitHub Code Icons */}
        <DemoView youtubeLink={youtubeLink} />
        <a
          className="text-gray-100 hover:text-gray-300 text-2xl"
          href={githubLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg
            className="w-6 h-6 inline"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="sr-only">View Code</span>
        </a>
      </div>
    </motion.div>
  );
};

// Define your data with types
const data: Project[] = [
  {
    category: "ERP System - Tea Industry",
    title: "TeaBridge",
    src: "/projects/TeaBridge.png",
    description:
      "A comprehensive tea industry management system streamlining supplier-factory-buyer interactions. Built during my professional work at Agrithmics, featuring real-time data management, supplier onboarding, factory operations tracking, and buyer procurement workflows. Developed using .NET, React, and Supabase (PostgreSQL).",
    youtubeLink: "https://www.youtube.com/embed/example3",
    githubLink: "https://github.com/kavishkadinajara/tea-bridge",
    content: (
      <DummyContent
        description="A comprehensive tea industry management system streamlining supplier-factory-buyer interactions. Built during my professional work at Agrithmics, featuring real-time data management, supplier onboarding, factory operations tracking, and buyer procurement workflows. Developed using .NET, React, and Supabase (PostgreSQL)."
        githubLink="https://github.com/kavishkadinajara/tea-bridge"
        youtubeLink="https://www.youtube.com/embed/example3"
      />
    ),
  },
  // {
  //   category: "AI-Powered Travel Platform",
  //   title: "TravelGenius",
  //   src: "/projects/TravelGenius.png",
  //   description:
  //     "An intelligent travel recommendation system for Sri Lanka powered by Machine Learning (RandomForest algorithm) and FastAPI. Features personalized destination recommendations, itinerary planning, and real-time travel insights. Combines AI/ML with modern web technologies to provide tailored travel experiences.",
  //   youtubeLink: "https://www.youtube.com/embed/travel-genius-demo",
  //   githubLink: "https://github.com/kavishkadinajara/TravelGenius",
  //   content: (
  //     <DummyContent
  //       description="An intelligent travel recommendation system for Sri Lanka powered by Machine Learning (RandomForest algorithm) and FastAPI. Features personalized destination recommendations, itinerary planning, and real-time travel insights. Combines AI/ML with modern web technologies to provide tailored travel experiences."
  //       githubLink="https://github.com/kavishkadinajara/TravelGenius"
  //       youtubeLink="https://www.youtube.com/embed/travel-genius-demo"
  //     />
  //   ),
  // },
  {
    category: "🏆 Hackathon Winner - Event Ticketing Platform",
    title: "EVENTURE",
    src: "/projects/eventure.png",
    description:
      "🥉 5th Place Winner in Innovate with Ballerina Hackathon 2024! Award-winning event ticket management platform developed by team Phoenix Code, competing against 100+ teams. Features comprehensive event creation, ticket management, secure payment processing, real-time analytics, and scalable microservices architecture built with Ballerina.",
    youtubeLink:
      "https://www.youtube.com/embed/rAJcblX_2_Q?si=WSty9FD1OKlh7Ypj",
    githubLink: "https://github.com/kavishkadinajara/iwb325-phoenix-code",
    content: (
      <DummyContent
        description="🥉 5th Place Winner in Innovate with Ballerina Hackathon 2024! Award-winning event ticket management platform developed by team Phoenix Code, competing against 100+ teams. Features comprehensive event creation, ticket management, secure payment processing, real-time analytics, and scalable microservices architecture built with Ballerina."
        githubLink="https://github.com/kavishkadinajara/iwb325-phoenix-code"
        youtubeLink="https://www.youtube.com/embed/rAJcblX_2_Q?si=WSty9FD1OKlh7Ypj"
      />
    ),
  },
  {
    category: "E-Commerce Web Application",
    title: "DDN Mobile",
    src: "/projects/ddn.jpg",
    description:
      "Full-featured e-commerce platform for mobile retail with comprehensive user authentication, advanced product browsing with filters, shopping cart functionality, secure checkout process, and admin dashboard. Features responsive design, payment integration, and inventory management system.",
    youtubeLink:
      "https://www.youtube.com/embed/CkGYp5a5HjE?si=pDOMwm6AW_R2SXqj",
    githubLink: "https://github.com/kavishkadinajara/DDN-Mobile",
    content: (
      <DummyContent
        description="Full-featured e-commerce platform for mobile retail with comprehensive user authentication, advanced product browsing with filters, shopping cart functionality, secure checkout process, and admin dashboard. Features responsive design, payment integration, and inventory management system."
        githubLink="https://github.com/kavishkadinajara/DDN-Mobile"
        youtubeLink="https://www.youtube.com/embed/CkGYp5a5HjE?si=pDOMwm6AW_R2SXqj"
      />
    ),
  },
  {
    category: "Dental Clinic Management Platform",
    title: "Care32 Dental Clinic System",
    src: "/projects/care32.png", // Add a relevant screenshot to /projects/care32.png
    description:
      "A modern Dental Clinic Management Platform built with Next.js and Supabase. Streamlines patient, doctor, appointment, treatment, inventory, and master data management for dental clinics. Features role-based access, responsive UI, analytics, and seamless integration with Vercel for deployment.",
    youtubeLink: "", // Add a demo video link if available
    githubLink: "https://care32test.vercel.app/", // External live demo link
    content: (
      <DummyContent
        description="A modern Dental Clinic Management Platform built with Next.js and Supabase. Streamlines patient, doctor, appointment, treatment, inventory, and master data management for dental clinics. Features role-based access, responsive UI, analytics, and seamless integration with Vercel for deployment."
        githubLink="https://care32test.vercel.app/"
        youtubeLink="" // Add a demo video link if available
      />
    ),
  },
  {
    category: "Universal File Converter",
    title: "FileFlowOne",
    src: "/projects/fileflow-one.png",
    description:
      "A powerful, fully local file conversion tool built with Next.js — no cloud uploads, no data leaves your machine. Supports 30+ format conversions across documents, diagrams, data files, images, and SQL dialects. Features drag-and-drop interface, professional report generation with Mermaid diagram support, SQL dialect conversion, and batch processing. 100% local processing with no third-party API calls.",
    youtubeLink: "https://fileflow-one.vercel.app",
    githubLink: "https://github.com/kavishkadinajara/fileflow",
    content: (
      <DummyContent
        description="A powerful, fully local file conversion tool built with Next.js — no cloud uploads, no data leaves your machine. Supports 30+ format conversions across documents, diagrams, data files, images, and SQL dialects. Features drag-and-drop interface, professional report generation with Mermaid diagram support, SQL dialect conversion, and batch processing. 100% local processing with no third-party API calls."
        githubLink="https://github.com/kavishkadinajara/fileflow"
        youtubeLink="https://fileflow-one.vercel.app"
      />
    ),
  },
];
