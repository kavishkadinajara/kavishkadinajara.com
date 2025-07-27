/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaCode, FaTrophy, FaUsers } from "react-icons/fa";

const HackathonAchievement = () => (
  <section className="py-16 md:py-24 px-4 lg:px-8 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-orange-900/10 to-transparent pointer-events-none" />
    <div className="max-w-7xl mx-auto relative z-10">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <FaTrophy className="text-lg" />
          <span>Hackathon Achievement</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          <span className="text-yellow-400">🏆 Top 10 Finalist</span> – Innovate with Ballerina Hackathon 2024
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Achieved Top 10 Finalist among 100+ university teams in the Innovate with Ballerina Hackathon, organized by WSO2.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Details */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                <FaTrophy className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">EVENTURE</h3>
                <p className="text-yellow-400 font-semibold">Event Ticketing & Management Platform</p>
              </div>
            </div>
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              Developed EVENTURE, a platform designed to simplify ticket sales, photo submissions, and QR code-based verification.
              Represented team <strong className="text-cyan-300">Phoenix Code</strong> as a Top 10 finalist and delivered a final pitch to industry experts.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaUsers className="text-cyan-400" />
                  <span className="text-2xl font-bold text-white">100+</span>
                </div>
                <p className="text-gray-400 text-sm">University Teams</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaTrophy className="text-yellow-400" />
                  <span className="text-2xl font-bold text-white">Top 10</span>
                </div>
                <p className="text-gray-400 text-sm">Finalists</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/30">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FaCode className="text-cyan-400" />
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Ballerina (backend)",
                "React.js (frontend)",
                "Expo (mobile app)",
                "PostgreSQL (database)",
                "Next.js (web)",
                "AWS S3",
                // "Supabase",
                // "Azure (cloud & DevOps)",
                // "Docker (containerization)",
                // "CI/CD Pipelines"
              ].map((tech, index) => (
                <span
                  key={index}
                  className="bg-cyan-600/20 text-cyan-300 px-3 py-1 rounded-full text-sm border border-cyan-600/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="https://github.com/kavishkadinajara/iwb325-phoenix-code"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <FaCode />
              Source Code
            </Link>
            <Link
              href="https://www.youtube.com/embed/rAJcblX_2_Q?si=WSty9FD1OKlh7Ypj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Demo Video
            </Link>
          </div>
        </motion.div>
        {/* Visual */}
        <motion.div
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative group w-full mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 flex justify-center items-center">
              <div className="w-full flex justify-center items-center">
            <Image
              src="/ballerina/certificate.jpg"
              alt="Top 10 Finalist Certificate"
              width={700}
              height={900}
              className="w-auto h-auto"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          <motion.div
            className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-4 rounded-full shadow-lg"
            animate={{
              rotate: [0, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <FaTrophy className="text-2xl" />
          </motion.div>
          {/* <div className="mt-6 bg-gray-900/70 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 w-full max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <FaCalendarAlt className="text-cyan-400" />
              <div>
                <h4 className="text-white font-semibold">Innovate with Ballerina 2024</h4>
                <p className="text-gray-400 text-sm">Organized by WSO2</p>
              </div>
            </div>
            <div className="text-sm text-gray-300">
              <p><strong>Team:</strong> Phoenix Code</p>
              <p><strong>Finalists:</strong> Top 10</p>
              <p><strong>Pitch:</strong> Delivered to industry experts</p>
            </div>
          </div> */}
        </motion.div>
      </div>
    </div>
  </section>
);

export default HackathonAchievement;