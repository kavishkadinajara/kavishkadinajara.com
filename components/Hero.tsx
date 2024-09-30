"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { TypeAnimation } from "react-type-animation";

import { fetchGitHubData } from "@/lib/utils/githubData";

const HeroSection: React.FC = () => {
  const [gitHubStats, setGitHubStats] = useState({
    totalRepos: 0,
    totalCommits: 0,
  });

  useEffect(() => {
    const username = "kavishkadinajara"; // Your GitHub username

    fetchGitHubData(username).then((data) => setGitHubStats(data));
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-white px-4 mt-12 md:mt-0 md:px-8 lg:px-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
        {/* Left Section: Text */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="w-full md:w-1/2 text-center md:text-left px-4 md:px-0"
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Gradient Text Style for 'Hello, I'm' */}
          <motion.h1
            animate={{ opacity: 1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-sky-400"
            initial={{ opacity: 0 }}
            style={{ fontFamily: "Poppins, sans-serif" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            Hello, I&apos;m
          </motion.h1>

          <motion.h2
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            style={{ fontFamily: "Poppins, sans-serif" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <TypeAnimation
              repeat={Infinity}
              sequence={[
                "Kavishka Dinajara", // This replicates the look in the image
                2000,
                "A Web Developer",
                1000,
                "A Backend Developer",
                1000,
                "A Rugby Player",
                1000,
              ]}
              speed={50}
              wrapper="span"
            />
          </motion.h2>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-sky-400"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            &quot;Empowering digital experiences through innovation, technology,
            and a passion for web development.&quot;
          </motion.p>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              className="bg-transparent text-gray-200 border-4 border-cyan-500 hover:border-green-600 font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full transition duration-300 hover:shadow-lg hover:shadow-green-500"
              href="#"
            >
              Download CV
            </Link>
          </motion.div>

          <div className="mt-8 flex justify-center md:justify-start space-x-6">
            {[
              { href: "#", iconClass: "fab fa-linkedin" },
              { href: "#", iconClass: "fab fa-github" },
            ].map((social, index) => (
              <motion.a
                key={index}
                aria-label={social.iconClass.split(" ")[1]}
                className="hover:scale-110 transition transform duration-300"
                href={social.href}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                whileHover={{ scale: 1.3 }}
              >
                <i className={`${social.iconClass} text-2xl`} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Section: Image */}
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="w-full md:w-1/2 flex justify-center md:justify-center px-4 md:px-0"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.div
            className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full border-4 border-spacing-3 border-cyan-600 hover:border-green-600 shadow-cyan-500 hover:shadow-green-500 overflow-hidden shadow-xl"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Image
              alt="Kavishka Dinajara"
              layout="fill"
              objectFit="cover"
              src="/me.jpg"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom stats */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mt-16 md:mt-12 w-full"
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
      >
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-cyan-300 space-y-6 sm:space-y-0">
          <motion.div
            className="text-center"
            transition={{ duration: 1.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold">
              <CountUp duration={2} end={11} />
            </h3>
            <p className="text-xs sm:text-sm text-gray-200">
              Years of experience
            </p>
          </motion.div>
          <motion.div
            className="text-center"
            transition={{ duration: 1.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold">
              <CountUp duration={2} end={25} />
            </h3>
            <p className="text-xs sm:text-sm text-gray-200">
              Projects completed
            </p>
          </motion.div>
          <motion.div
            className="text-center"
            transition={{ duration: 1.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold">
              <CountUp duration={2} end={8} />
            </h3>
            <p className="text-xs sm:text-sm text-gray-200">
              Technologies mastered
            </p>
          </motion.div>
          <motion.div
            className="text-center"
            transition={{ duration: 1.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold">
              <CountUp duration={2} end={gitHubStats.totalRepos} />
            </h3>
            <p className="text-xs sm:text-sm text-gray-200">
              GitHub Repositories
            </p>
          </motion.div>
          <motion.div
            className="text-center"
            transition={{ duration: 1.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold">
              <CountUp duration={2} end={gitHubStats.totalCommits} />
            </h3>
            <p className="text-xs sm:text-sm text-gray-200">Total Commits</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
