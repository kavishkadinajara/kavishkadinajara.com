"use client";

import { ReactNode, useRef } from "react";
import { motion } from "framer-motion";

import { useMouseParallax } from "./useMouseParallax";

interface HeroPhotoProps {
  children?: ReactNode;
}

export default function HeroPhoto({ children }: HeroPhotoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const parallax = useMouseParallax(wrapperRef, 0.08);

  const tiltX = parallax.y * -6;
  const tiltY = parallax.x * 6;

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
      className="relative flex-shrink-0 w-72 h-72 md:w-[22rem] md:h-[22rem] lg:w-[26rem] lg:h-[26rem] flex items-center justify-center"
      style={{ perspective: 1000 }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(14,165,233,0.18), rgba(6,182,212,0.08) 45%, transparent 70%)",
          filter: "blur(20px)",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 rounded-full border border-dashed border-[rgba(14,165,233,0.18)] orbit-outer"
        style={{ transform: "scale(1.45)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 rounded-full border border-[rgba(6,182,212,0.16)] orbit-counter-outer"
        style={{ transform: "scale(1.22)" }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 rounded-full pulse-ring"
        style={{ transform: "scale(1.05)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 rounded-full pulse-ring pulse-ring--delay-1"
        style={{ transform: "scale(1.05)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 rounded-full pulse-ring pulse-ring--delay-2"
        style={{ transform: "scale(1.05)" }}
        aria-hidden="true"
      />

      {children}

      <motion.div
        className="relative w-56 h-56 md:w-72 md:h-72 lg:w-[20rem] lg:h-[20rem]"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
        }}
      >
        <div className="holo-frame" aria-hidden="true" />

        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(14,165,233,0.4), transparent 60%)",
            filter: "blur(14px)",
          }}
          aria-hidden="true"
        />

        <div className="relative w-full h-full rounded-full overflow-hidden border border-[rgba(14,165,233,0.35)] shadow-[0_0_50px_rgba(14,165,233,0.25)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/kavishkadinajara.jpeg"
            alt="Kavishka Dinajara"
            className="photo-cutout w-full h-full object-cover object-top"
            draggable={false}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, transparent 35%, transparent 65%, rgba(14,165,233,0.18) 100%)",
            }}
            aria-hidden="true"
          />

          <div
            className="absolute inset-0 pointer-events-none scanlines"
            style={{ opacity: 0.12 }}
            aria-hidden="true"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
