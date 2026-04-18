"use client";

import dynamic from "next/dynamic";

/**
 * THE MULTIVERSE JOURNEY — PAGE ENTRY POINT
 * ==========================================
 * Uses dynamic import with SSR disabled because:
 * 1. Three.js / R3F requires browser APIs (WebGL, Canvas, window)
 * 2. drei's ScrollControls accesses window.innerHeight
 * 3. GSAP animations need the DOM
 *
 * The dynamic import also enables code splitting — the 3D bundle
 * only loads when this page is visited.
 */

const Experience = dynamic(
  () => import("@/components/World/Experience"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white/50 font-mono text-sm animate-pulse">
          Loading the Multiverse...
        </div>
      </div>
    ),
  }
);

export default function MultiversePage() {
  return (
    <main className="w-full h-screen bg-black">
      <Experience />
    </main>
  );
}
