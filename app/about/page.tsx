"use client";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="relative py-12 px-4 lg:py-16 lg:px-8 text-white ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            WHO <span className="text-teal-400">AM</span> I?
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed">
            Hey there! 👋 I&apos;m Kavishka Dinajara...
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Feature 1 */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-teal-400">{/* Icon */}</div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">Clean Code</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  I believe in writing efficient...
                </p>
              </div>
            </motion.div>
            {/* Feature 2 */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-teal-400">{/* Icon */}</div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">Modern Design</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  I create sleek, responsive, modern designs...
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
          <Swiper
            autoplay={{ delay: 4000 }}
            className="rounded-xl overflow-hidden shadow-xl"
            loop={true}
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true, dynamicBullets: true }}
            spaceBetween={30}
          >
            <SwiperSlide>
              <Image alt="alt" height={100} src="/me.jpg" width={100} />
            </SwiperSlide>
            <SwiperSlide>
              <Image alt="alt" height={100} src="/configme.jpg" width={100} />
            </SwiperSlide>
            <SwiperSlide>
              <Image alt="alt" height={100} src="/me.jpg" width={100} />
            </SwiperSlide>
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
