"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa"; // Import icons
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import DemoView from "@/components/DemoView";

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
          className="text-gray-100 hover:text-black text-2xl"
          href={githubLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaGithub /> {/* GitHub Icon */}
          <span className="sr-only">View Code</span>
        </a>
      </div>
    </motion.div>
  );
};

// Define your data with types
const data: Project[] = [
  {
    category: "E-Commerce Web Application",
    title: "DDN Mobile",
    src: "/projects/ddn.jpg",
    description:
      "An AI-based system for optimizing traffic light operations using real-time data and image processing.",
    youtubeLink: "https://www.youtube.com/embed/CkGYp5a5HjE?si=pDOMwm6AW_R2SXqj", // Use embed link
    githubLink: "https://github.com/kavishkadinajara/DDN-Mobile",
    content: (
      <DummyContent
        description="An AI-based system for optimizing traffic light operations using real-time data and image processing."
        githubLink="https://github.com/kavishkadinajara/DDN-Mobile"
        youtubeLink="https://www.youtube.com/embed/CkGYp5a5HjE?si=pDOMwm6AW_R2SXqj"
      />
    ),
  },
  {
    category: "Productivity",
    title: "Task Manager App",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A mobile app to manage daily tasks with offline syncing and productivity tracking features.",
    youtubeLink: "https://www.youtube.com/embed/example2",
    githubLink: "https://github.com/username/project2",
    content: (
      <DummyContent
        description="A mobile app to manage daily tasks with offline syncing and productivity tracking features."
        githubLink="https://github.com/username/project2"
        youtubeLink="https://www.youtube.com/embed/example2"
      />
    ),
  },
  {
    category: "Product",
    title: "Fertilizer Application Tool",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A web-based tool for applying fertilizers with calculated costs and scheduling features.",
    youtubeLink: "https://www.youtube.com/embed/example3",
    githubLink: "https://github.com/username/project3",
    content: (
      <DummyContent
        description="A web-based tool for applying fertilizers with calculated costs and scheduling features."
        githubLink="https://github.com/username/project3"
        youtubeLink="https://www.youtube.com/embed/example3"
      />
    ),
  },
];
