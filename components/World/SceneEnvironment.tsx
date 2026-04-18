"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { ZONE_RANGES } from "./CameraRig";
import { scrollStore } from "./scrollStore";

/**
 * SCENE ENVIRONMENT
 * =================
 * Dynamically transitions fog color/density, ambient light color/intensity,
 * and directional light parameters based on scroll progress.
 * Each zone has its own "atmosphere" that blends smoothly.
 */

interface ZoneAtmosphere {
  fogColor: THREE.Color;
  fogNear: number;
  fogFar: number;
  ambientColor: THREE.Color;
  ambientIntensity: number;
  directionalColor: THREE.Color;
  directionalIntensity: number;
}

const ZONE_ATMOSPHERES: ZoneAtmosphere[] = [
  {
    // Tech Core — deep blue/purple cyber fog
    fogColor: new THREE.Color("#050520"),
    fogNear: 10,
    fogFar: 100,
    ambientColor: new THREE.Color("#1a1a4e"),
    ambientIntensity: 0.5,
    directionalColor: new THREE.Color("#4444ff"),
    directionalIntensity: 1.0,
  },
  {
    // Sanctuary — warm amber, soft golden
    fogColor: new THREE.Color("#1a0f05"),
    fogNear: 8,
    fogFar: 70,
    ambientColor: new THREE.Color("#4a3520"),
    ambientIntensity: 0.5,
    directionalColor: new THREE.Color("#ffaa44"),
    directionalIntensity: 1.0,
  },
  {
    // Arena — bright green, daylight
    fogColor: new THREE.Color("#88aa88"),
    fogNear: 20,
    fogFar: 120,
    ambientColor: new THREE.Color("#aaddaa"),
    ambientIntensity: 0.7,
    directionalColor: new THREE.Color("#ffffee"),
    directionalIntensity: 1.5,
  },
  {
    // Studio — dark dramatic, spotlights
    fogColor: new THREE.Color("#0a0a0a"),
    fogNear: 3,
    fogFar: 50,
    ambientColor: new THREE.Color("#222222"),
    ambientIntensity: 0.2,
    directionalColor: new THREE.Color("#ffffff"),
    directionalIntensity: 0.6,
  },
  {
    // Kitchen — warm inviting, orange/cream
    fogColor: new THREE.Color("#2a1a0a"),
    fogNear: 10,
    fogFar: 80,
    ambientColor: new THREE.Color("#5a4030"),
    ambientIntensity: 0.6,
    directionalColor: new THREE.Color("#ffcc88"),
    directionalIntensity: 1.2,
  },
];

export default function SceneEnvironment() {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const directionalRef = useRef<THREE.DirectionalLight>(null);

  // Temp colors to avoid GC
  const tempFogColor = useRef(new THREE.Color());
  const tempAmbColor = useRef(new THREE.Color());
  const tempDirColor = useRef(new THREE.Color());

  useFrame((state) => {
    const t = scrollStore.offset;
    const scene = state.scene;

    // Determine blending between two adjacent zones
    const totalZones = ZONE_RANGES.length;
    const zoneFloat = t * totalZones;
    const zoneA = Math.min(Math.floor(zoneFloat), totalZones - 1);
    const zoneB = Math.min(zoneA + 1, totalZones - 1);
    const blend = zoneFloat - zoneA;

    const atmA = ZONE_ATMOSPHERES[zoneA];
    const atmB = ZONE_ATMOSPHERES[zoneB];

    // Interpolate fog
    tempFogColor.current.copy(atmA.fogColor).lerp(atmB.fogColor, blend);
    const fogNear = THREE.MathUtils.lerp(atmA.fogNear, atmB.fogNear, blend);
    const fogFar = THREE.MathUtils.lerp(atmA.fogFar, atmB.fogFar, blend);

    if (!scene.fog) {
      scene.fog = new THREE.Fog(tempFogColor.current, fogNear, fogFar);
    } else {
      (scene.fog as THREE.Fog).color.copy(tempFogColor.current);
      (scene.fog as THREE.Fog).near = fogNear;
      (scene.fog as THREE.Fog).far = fogFar;
    }

    // Update background color to match fog
    scene.background = tempFogColor.current.clone();

    // Interpolate lights
    if (ambientRef.current) {
      tempAmbColor.current.copy(atmA.ambientColor).lerp(atmB.ambientColor, blend);
      ambientRef.current.color.copy(tempAmbColor.current);
      ambientRef.current.intensity = THREE.MathUtils.lerp(
        atmA.ambientIntensity,
        atmB.ambientIntensity,
        blend
      );
    }

    if (directionalRef.current) {
      tempDirColor.current.copy(atmA.directionalColor).lerp(atmB.directionalColor, blend);
      directionalRef.current.color.copy(tempDirColor.current);
      directionalRef.current.intensity = THREE.MathUtils.lerp(
        atmA.directionalIntensity,
        atmB.directionalIntensity,
        blend
      );
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.3} />
      <directionalLight
        ref={directionalRef}
        position={[10, 20, 10]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
}
