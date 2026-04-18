"use client";

import { Preload, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { updateScroll } from "./scrollStore";

// World components
import CameraRig from "./CameraRig";
import SceneEnvironment from "./SceneEnvironment";

// Zones
import Arena from "./Zones/Arena";
import Kitchen from "./Zones/Kitchen";
import Sanctuary from "./Zones/Sanctuary";
import Studio from "./Zones/Studio";
import TechCore from "./Zones/TechCore";

// Effects
import ParticleField from "./Effects/ParticleField";
import ZoneTransition from "./Effects/ZoneTransition";

// Overlay
import HUD from "@/components/Overlay/HUD";
import LoadingScreen from "@/components/Overlay/LoadingScreen";

/**
 * EXPERIENCE COMPONENT — THE MAIN ENTRY POINT
 * =============================================
 *
 * Architecture Overview:
 * ┌─────────────────────────────────────────────────┐
 * │  <div onWheel>  ← captures wheel events         │
 * │  ├── <Canvas>                                    │
 * │  │   ├── <Stars />                               │
 * │  │   └── <Suspense>                              │
 * │  │       ├── <CameraRig />  (reads scrollStore)  │
 * │  │       ├── <SceneEnvironment />                │
 * │  │       ├── <ZoneTransition />                  │
 * │  │       ├── <ParticleField />                   │
 * │  │       ├── <TechCore />     (Zone 1)           │
 * │  │       ├── <Sanctuary />    (Zone 2)           │
 * │  │       ├── <Arena />        (Zone 3)           │
 * │  │       ├── <Studio />       (Zone 4)           │
 * │  │       └── <Kitchen />      (Zone 5)           │
 * │  └── <HUD />   (Tailwind overlay)                │
 * └─────────────────────────────────────────────────┘
 *
 * SCROLL MECHANISM:
 * 1. Container div captures wheel events
 * 2. updateScroll() updates scrollStore.target (0→1)
 * 3. CameraRig's useFrame calls dampScroll() each frame
 * 4. Camera position = curve.getPointAt(smoothedOffset)
 * 5. SceneEnvironment blends fog/light per zone
 */

function SceneContent({
  onZoneChange,
  onScrollProgress,
}: {
  onZoneChange: (index: number, name: string) => void;
  onScrollProgress: (progress: number) => void;
}) {
  return (
    <>
      {/* Camera movement driven by scroll */}
      <CameraRig onZoneChange={onZoneChange} onScrollProgress={onScrollProgress} />

      {/* Dynamic lighting & fog transitions */}
      <SceneEnvironment />

      {/* Zone transition portal effects */}
      <ZoneTransition />

      {/* Ambient cosmic particles */}
      <ParticleField count={400} spread={60} depth={200} />

      {/* ======= THE FIVE ZONES ======= */}
      <TechCore />
      <Sanctuary />
      <Arena />
      <Studio />
      <Kitchen />
    </>
  );
}

export default function Experience() {
  const [currentZone, setCurrentZone] = useState({ index: 0, name: "The Tech Core" });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoneChange = useCallback((index: number, name: string) => {
    setCurrentZone({ index, name });
  }, []);

  const handleScrollProgress = useCallback((progress: number) => {
    setScrollProgress(progress);
  }, []);

  // Capture wheel events on the container for manual scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      updateScroll(e.deltaY);
    };

    // passive: false is required to call preventDefault
    el.addEventListener("wheel", onWheel, { passive: false });

    // Also handle touch events for mobile
    let touchStart = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStart = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const delta = touchStart - e.touches[0].clientY;
      touchStart = e.touches[0].clientY;
      updateScroll(delta * 2); // Multiply for natural feel
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen" style={{ touchAction: "none" }}>
      {/* Loading screen */}
      {!isLoaded && <LoadingScreen />}

      {/* R3F Canvas — fills entire viewport */}
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
        }}
        camera={{ fov: 60, near: 0.1, far: 300 }}
        onCreated={() => {
          setTimeout(() => setIsLoaded(true), 500);
        }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        {/* Background stars (always visible, adds depth) */}
        <Stars
          radius={100}
          depth={80}
          count={3000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />

        <Suspense fallback={null}>
          <SceneContent
            onZoneChange={handleZoneChange}
            onScrollProgress={handleScrollProgress}
          />
          <Preload all />
        </Suspense>
      </Canvas>

      {/* HUD Overlay (pure Tailwind, outside Canvas for best performance) */}
      <HUD
        currentZone={currentZone}
        scrollProgress={scrollProgress}
        isLoaded={isLoaded}
      />
    </div>
  );
}
