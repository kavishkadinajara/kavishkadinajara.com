"use client";
import Image from "next/image";

const images = [
  "/ballerina/IMG_7752.jpg",
  "/ballerina/IMG_7756.jpg",
  "/ballerina/IMG_7757.jpg",
  "/ballerina/IMG_7758.jpg",
  "/ballerina/IMG_7760.jpg",
  "/ballerina/IMG_7761.jpg",
  "/aboutme/about0.jpg",
  "/aboutme/about1.jpg",
  "/aboutme/about2.jpg",
  "/aboutme/about3.jpg",
  "/aboutme/about4.jpg",
  "/aboutme/about5.jpg",
  "/aboutme/about6.jpg",
  "/aboutme/about7.jpg",
  "/aboutme/about8.jpg",
  "/aboutme/about9.jpg",
  "/aboutme/about10.jpg",
  "/aboutme/about11.jpg",
  "/aboutme/about12.jpg",
  "/aboutme/about13.jpg",
  "/aboutme/about14.jpg",
  "/aboutme/about15.jpg",
  "/aboutme/about16.jpg",
  "/aboutme/bgr4.png",
];

export default function SimpleGallery() {
  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-teal-500 mb-6">
        Gallery
      </h2>
      <p className="text-center text-gray-400 mb-10 max-w-lg mx-auto">
        A calm showcase of my professional journey, teamwork, and personal milestones.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="rounded-lg overflow-hidden bg-gray-900 border border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <Image
              alt={`Gallery image ${idx + 1}`}
              className="w-full h-40 object-cover object-center transition-transform duration-200 hover:scale-105"
              height={300}
              loading="lazy"
              src={src}
              width={400}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
