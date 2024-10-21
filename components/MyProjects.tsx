"use client";
import { motion } from "framer-motion";
import React from "react";
import { FaGithub } from "react-icons/fa"; // Import icons

import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
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
      "E-commerce website for mobile shop with user authentication, product browsing, shopping cart, and secure checkout features.",
    youtubeLink:
      "https://www.youtube.com/embed/CkGYp5a5HjE?si=pDOMwm6AW_R2SXqj", // Use embed link
    githubLink: "https://github.com/kavishkadinajara/DDN-Mobile",
    content: (
      <DummyContent
        description="E-commerce website for mobile shop with user authentication, product browsing, shopping cart, and secure checkout features."
        githubLink="https://github.com/kavishkadinajara/DDN-Mobile"
        youtubeLink="https://www.youtube.com/embed/CkGYp5a5HjE?si=pDOMwm6AW_R2SXqj"
      />
    ),
  },
  {
    category: "Ticket Management Platform",
    title: "EVENTURE",
    src: "/projects/eventure.png",
    description:
      "Eventure is an event ticket management platform designed to streamline the process of creating, managing, and selling tickets for events.",
    youtubeLink:
      "https://www.youtube.com/embed/rAJcblX_2_Q?si=WSty9FD1OKlh7Ypj",
    githubLink: "https://github.com/kavishkadinajara/iwb325-phoenix-code",
    content: (
      <DummyContent
        description="Eventure is an event ticket management platform designed to streamline the process of creating, managing, and selling tickets for events."
        githubLink="https://github.com/kavishkadinajara/iwb325-phoenix-code"
        youtubeLink="https://www.youtube.com/embed/rAJcblX_2_Q?si=WSty9FD1OKlh7Ypj"
      />
    ),
  },
  {
    category: "Realtime Platform For Tea Industry",
    title: "TeaBridge",
    src: "/projects/TeaBridge.png",
    description:
      "A web-based tool for applying fertilizers with calculated costs and scheduling features.",
    youtubeLink: "https://www.youtube.com/embed/example3",
    githubLink: "https://github.com/kavishkadinajara/tea-bridge",
    content: (
      <DummyContent
        description="A web-based tool for applying fertilizers with calculated costs and scheduling features."
        githubLink="https://github.com/kavishkadinajara/tea-bridge"
        youtubeLink="https://www.youtube.com/embed/example3"
      />
    ),
  },
];
