/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faPencilRuler } from "@fortawesome/free-solid-svg-icons";

import { SparklesPreview } from "./SparklesPreview";
import Skills from "./Skills";

import { ParallaxScrollSecondDemo } from "@/components/ParallaxScrollSecondDemo";

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
              Hey there! 👋 I'm Kavishka Dinajara, a passionate developer from
              Sri Lanka 🇱🇰. I love crafting modern web and mobile applications,
              with a huge enthusiasm for Next.js and Expo-React Native. Learning
              new technologies excites me, and I dive deep into areas like
              Machine Learning (ML), Artificial Intelligence (AI), Web 3.0, and
              Blockchain. 🌐
              <br /> Aside from my love for tech, I'm a dedicated rugby player
              🏉, which keeps my team spirit strong and my mind sharp. When I'm
              not coding or on the rugby field, you’ll likely find me with my
              nose in a book 📚 or exploring my creative side through
              videography and video editing 🎥.
              <br /> Currently, I'm a 2nd-year undergraduate studying Software
              Engineering at NIBM. Always hungry to learn, I'm on a journey to
              push boundaries and build impactful solutions for the future. 🚀
              <br /> Let’s connect and explore the world of innovation together!
              ✨.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Feature 1: Clean Code */}
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                {/* Icon */}
                <div className="text-teal-400">
                  <FontAwesomeIcon icon={faCode} size="2x" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">Clean Code</h3>
                  <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
                    I believe in writing efficient, scalable, and clean code...
                  </p>
                </div>
              </motion.div>

              {/* Feature 2: Modern Design */}
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                {/* Icon */}
                <div className="text-teal-400">
                  <FontAwesomeIcon icon={faPencilRuler} size="2x" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">
                    Modern Design
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
                    I create sleek, responsive, and modern designs...
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Image Section with Swiper */}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 1 }}
          >
            {/* <Swiper
              autoplay={{ delay: 4000 }}
              className="rounded-xl overflow-hidden shadow-xl"
              loop={true}
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true, dynamicBullets: true }}
              spaceBetween={30}
            >
              <SwiperSlide>
                <img
                  alt="Me"
                  className="object-cover w-full h-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[650px]"
                  src="/aboutme/bgr4.png"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  alt="Me"
                  className="object-cover w-full h-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[650px]"
                  src="/aboutme/bgr3.png"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  alt="Me"
                  className="object-cover w-full h-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[650px]"
                  src="/aboutme/bgr2.png"
                />
              </SwiperSlide>
            </Swiper> */}
            <ParallaxScrollSecondDemo />
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
