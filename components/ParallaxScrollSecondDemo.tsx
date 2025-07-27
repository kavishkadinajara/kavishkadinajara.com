"use client";
import { ParallaxScrollSecond } from "@/components/ui/parallax-scroll";

export function ParallaxScrollSecondDemo() {
  return (
    <section className="w-full max-w-6xl mx-auto py-10 md:py-16 px-2 md:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-teal-400 mb-2">
          Gallery
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
          Explore moments from my professional journey, team collaborations, and
          personal milestones.
        </p>
      </div>
      <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 rounded-2xl shadow-lg p-4 md:p-8">
        <ParallaxScrollSecond images={images} />
      </div>
    </section>
  );
}

// Organized image collection with better categorization
const images = [
  // Professional work moments
  "/aboutme/about0.jpg",
  "/aboutme/about1.jpg",
  "/aboutme/about2.jpg",
  "/aboutme/about3.jpg",

  // Career milestones
  "/aboutme/about4.jpg",
  "/aboutme/about5.jpg",
  "/aboutme/about6.jpg",
  "/aboutme/about7.jpg",

  // Team collaborations
  "/aboutme/about8.jpg",
  "/aboutme/about9.jpg",
  "/aboutme/about10.jpg",
  "/aboutme/about11.jpg",

  // Personal development
  "/aboutme/about12.jpg",
  "/aboutme/about13.jpg",
  "/aboutme/about14.jpg",
  "/aboutme/about15.jpg",
  "/aboutme/about16.jpg",

  // Professional headshots & portfolio
  "/aboutme/bgr1.png",
  "/aboutme/bgr2.png",
  "/aboutme/bgr3.png",
  "/aboutme/bgr4.png",
];
