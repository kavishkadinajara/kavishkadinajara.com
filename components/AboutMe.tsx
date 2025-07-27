/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { faBriefcase, faCode, faGraduationCap, faPencilRuler } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

import Skills from "./Skills";

import { ParallaxScrollSecondDemo } from "@/components/ParallaxScrollSecondDemo";
import SimpleGallery from "./SimpleGallery";

const AboutMe = () => {
  return (
    <div>
      <section
        className="pt-12 px-4 lg:py-16 lg:px-8 text-white z-30"
        id="aboutme"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Text Section */}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 lg:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-teal-400 font-bold text-lg sm:text-xl lg:text-2xl">
              ABOUT ME
            </h2>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold">
              WHO <span className="text-teal-400">AM</span> I?
            </h1>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed text-justify">
              Hi! 👋 I'm{" "}
              <strong className="text-teal-300">Kavishka Dinajara</strong>, a
              passionate and detail-oriented{" "}
              <strong className="text-teal-300"> Associate Software Engineer</strong> with a strong foundation in modern
              web and mobile application development. I'm currently pursuing my
              Software Engineering degree at NIBM, Sri Lanka 🇱🇰.
              <br />
              <br /> 🚀{" "}
              <strong className="text-teal-300">Professional Journey:</strong>
              <br />
              I began my career as an Intern Software Engineer at{" "}
              <strong className="text-cyan-300">Agrithmics</strong> (November
              2024 - May 2025), where I gained hands-on experience developing
              scalable enterprise applications. Since May 2025, I've been working
              as an{" "}
              <strong className="text-cyan-300">Associate Software Engineer</strong> at Agrithmics, specializing in ERP systems for the tea industry.
              <br />
              <br /> 🏆{" "}
              <strong className="text-teal-300">Notable Achievement:</strong>
              <br />
              I'm proud to have achieved <strong className="text-yellow-400">Top 10 Finalist</strong> in the{" "}
              <strong className="text-cyan-300">Innovate with Ballerina Hackathon 2024</strong> organized by WSO2, 
              where our team Phoenix Code developed EVENTURE, an innovative event ticketing platform that competed 
              against <strong className="text-cyan-300">100+ teams</strong>.
              <br />
              <br /> 🛠️{" "}
              <strong className="text-teal-300">DevOps & Cloud Experience:</strong>
              <br />
              I have hands-on experience with <strong className="text-blue-400">DevOps practices</strong> and 
              <strong className="text-blue-400"> Microsoft Azure</strong> cloud services, including CI/CD pipelines, cloud deployments, and monitoring solutions for scalable applications.
              <br />
              <br /> 💻{" "}
              <strong className="text-teal-300">Technical Expertise:</strong>
              <br />
              I specialize in{" "}
              <strong className="text-cyan-300">.NET development, React, Next.js, and MUI</strong> for
              building modern, responsive applications. My experience includes ERP systems focusing on tea industry management,
              database design with{" "}
              <strong className="text-cyan-300">Supabase (PostgreSQL)</strong>, and exploring
              <strong className="text-cyan-300"> Machine Learning & AI</strong> concepts.
              <br />
              <br /> 🏉 Beyond coding, I'm a dedicated rugby player, avid reader 📚, and enjoy videography & video editing 🎥.
              I'm passionate about solving real-world problems and continuously exploring AI, Web 3.0, and blockchain technologies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Professional Experience */}
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-teal-400">
                  <FontAwesomeIcon icon={faBriefcase} size="2x" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">
                    Professional Experience
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
                    Associate Software Engineer at Agrithmics, specializing in ERP systems...
                  </p>
                </div>
              </motion.div>

              {/* Clean Code */}
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-teal-400">
                  <FontAwesomeIcon icon={faCode} size="2x" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">
                    Clean Architecture
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
                    I believe in writing efficient, scalable, and maintainable code...
                  </p>
                </div>
              </motion.div>

              {/* Modern Design */}
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-teal-400">
                  <FontAwesomeIcon icon={faPencilRuler} size="2x" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">Modern Design</h3>
                  <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
                    I create sleek, responsive, and user-friendly interfaces...
                  </p>
                </div>
              </motion.div>

              {/* Education */}
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-teal-400">
                  <FontAwesomeIcon icon={faGraduationCap} size="2x" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">
                    Continuous Learning
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
                    Software Engineering student at NIBM, exploring AI & blockchain...
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Image Section with Enhanced Gallery */}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 1 }}
          >
            <div className="w-full">
              <SimpleGallery />
            </div>
          </motion.div>
        </div>
      </section>

      <section>
        <Skills />
      </section>
    </div>
  );
};

export default AboutMe;
