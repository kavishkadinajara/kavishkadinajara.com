"use client";

import { useFrame } from "@react-three/fiber";
import { useCallback, useMemo, useRef } from "react";
import * as THREE from "three";
import { dampScroll } from "./scrollStore";

/**
 * CAMERA PATH ARCHITECTURE
 * ========================
 * The camera follows a CatmullRomCurve3 through 3D space.
 * Each control point corresponds to a Zone center.
 * scrollStore.offset (0→1) maps to position on the curve via getPointAt().
 * A "look-ahead" point (offset + small delta) determines camera orientation.
 *
 * dampScroll() smooths the raw scroll value each frame for buttery movement.
 */

// Zone center positions in 3D space  
// The curve passes through these points in order
const CURVE_POINTS = [
  new THREE.Vector3(0, 0, 0),         // Start (before Zone 1)
  new THREE.Vector3(0, 2, -30),       // Zone 1: Tech Core
  new THREE.Vector3(15, 5, -60),      // Zone 2: Sanctuary  
  new THREE.Vector3(-10, 3, -95),     // Zone 3: Arena
  new THREE.Vector3(5, 8, -130),      // Zone 4: Studio
  new THREE.Vector3(0, 4, -165),      // Zone 5: Kitchen
  new THREE.Vector3(0, 2, -185),      // End (outro)
];

// Zone boundaries as scroll percentages [start, end]
export const ZONE_RANGES = [
  { name: "The Tech Core", range: [0.0, 0.2] as [number, number], color: new THREE.Color("#0a0a2e") },
  { name: "The Sanctuary", range: [0.2, 0.4] as [number, number], color: new THREE.Color("#1a0a00") },
  { name: "The Arena", range: [0.4, 0.6] as [number, number], color: new THREE.Color("#0a1a0a") },
  { name: "The Studio", range: [0.6, 0.8] as [number, number], color: new THREE.Color("#1a0a1a") },
  { name: "The Kitchen", range: [0.8, 1.0] as [number, number], color: new THREE.Color("#1a0f00") },
];

interface CameraRigProps {
  onZoneChange?: (zoneIndex: number, zoneName: string) => void;
  onScrollProgress?: (progress: number) => void;
}

export default function CameraRig({ onZoneChange, onScrollProgress }: CameraRigProps) {
  const currentZone = useRef(-1);

  // Build the spline curve (memoized — never recalculated)
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(CURVE_POINTS, false, "catmullrom", 0.5);
  }, []);

  // Determine which zone the user is in based on scroll progress
  const getZoneIndex = useCallback((progress: number): number => {
    for (let i = 0; i < ZONE_RANGES.length; i++) {
      const [start, end] = ZONE_RANGES[i].range;
      if (progress >= start && progress < end) return i;
    }
    return ZONE_RANGES.length - 1;
  }, []);

  useFrame((state, delta) => {
    // Apply damping and get current smoothed offset
    const t = dampScroll(delta);

    // Get camera position on the curve
    const position = curve.getPointAt(Math.min(t, 0.999));

    // Look-ahead point for camera direction (slightly ahead on the curve)
    const lookAheadT = Math.min(t + 0.01, 0.999);
    const lookAt = curve.getPointAt(lookAheadT);

    // Apply to the default camera
    state.camera.position.copy(position);
    state.camera.lookAt(lookAt);

    // Notify zone changes
    const zoneIdx = getZoneIndex(t);
    if (zoneIdx !== currentZone.current) {
      currentZone.current = zoneIdx;
      onZoneChange?.(zoneIdx, ZONE_RANGES[zoneIdx].name);
    }

    // Notify scroll progress
    onScrollProgress?.(t);
  });

  return null; // CameraRig is headless — it only drives the camera
}

// Export curve for debug visualization
export { CURVE_POINTS };
