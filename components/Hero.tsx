/* eslint-disable @typescript-eslint/no-unused-vars */
// pages/index.tsx (Next.js)
import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-white px-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
        {/* Left Section: Text */}
        <div className="w-full md:w-1/2 text-center md:text-left px-4 md:px-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
            Hello I&apos;m
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-teal-400 mb-4">
            Luke Coleman
          </h2>
          <p className="text-md sm:text-lg md:text-xl mb-8">
            I excel at crafting elegant digital experiences and I am proficient
            in various programming languages and technologies.
          </p>
          <Link
            className="bg-teal-400 text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-teal-500 transition duration-300"
            href="#"
          >
            Download CV
          </Link>
          <div className="mt-8 flex justify-center md:justify-start space-x-4">
            <Link aria-label="LinkedIn" href="#">
              <i className="fab fa-linkedin text-xl" />
            </Link>
            <Link aria-label="GitHub" href="#">
              <i className="fab fa-github text-xl" />
            </Link>
            <Link aria-label="YouTube" href="#">
              <i className="fab fa-youtube text-xl" />
            </Link>
            <Link aria-label="Twitter" href="#">
              <i className="fab fa-twitter text-xl" />
            </Link>
          </div>
        </div>
        {/* Right Section: Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end px-4 md:px-0">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full border-4 border-teal-400 overflow-hidden">
            <Image
              alt="Luke Coleman"
              layout="fill"
              objectFit="cover"
              src="/profile.jpg" // Make sure to place your image in the public folder
            />
          </div>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="mt-16 md:mt-12 w-full">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-teal-400 space-y-6 sm:space-y-0">
          <div className="text-center">
            <h3 className="text-2xl font-bold">11</h3>
            <p className="text-sm">Years of experience</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">25</h3>
            <p className="text-sm">Projects completed</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">8</h3>
            <p className="text-sm">Technologies mastered</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">476</h3>
            <p className="text-sm">Code commits</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
