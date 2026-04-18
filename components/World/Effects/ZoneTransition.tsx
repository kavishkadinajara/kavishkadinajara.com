"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { scrollStore } from "../scrollStore";

/**
 * ZONE TRANSITION EFFECT
 * ======================
 * Creates smooth visual transitions between zones using:
 * 1. Fog density shifts (handled by SceneEnvironment)
 * 2. "Portal ring" geometry that appears at zone boundaries
 * 3. Particle burst at transition points
 *
 * This component renders visual markers at each zone boundary
 * that glow and pulse as the camera approaches.
 */

const TRANSITION_POINTS = [
  { position: new THREE.Vector3(7.5, 3.5, -45), color: "#4444ff" },   // Tech→Sanctuary
  { position: new THREE.Vector3(2.5, 4, -77.5), color: "#ffaa44" },   // Sanctuary→Arena
  { position: new THREE.Vector3(-2.5, 5.5, -112.5), color: "#44ff44" }, // Arena→Studio
  { position: new THREE.Vector3(2.5, 6, -147.5), color: "#ff44ff" },   // Studio→Kitchen
];

function TransitionPortal({
  position,
  color,
  index,
}: {
  position: THREE.Vector3;
  color: string;
  index: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current || !glowRef.current) return;

    const t = scrollStore.offset;
    const transitionT = (index + 1) * 0.2; // Zone boundaries at 0.2, 0.4, 0.6, 0.8
    const dist = Math.abs(t - transitionT);

    // Scale up and glow as camera approaches
    const proximity = Math.max(0, 1 - dist * 10);
    const scale = 1 + proximity * 2;
    const opacity = 0.1 + proximity * 0.6;

    ringRef.current.scale.setScalar(scale);
    (ringRef.current.material as THREE.MeshStandardMaterial).opacity = opacity;
    (ringRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      1 + proximity * 5;

    // Rotate portal ring
    ringRef.current.rotation.z += 0.01;
    ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;

    // Glow sphere
    const glowScale = 2 + proximity * 5;
    glowRef.current.scale.setScalar(glowScale);
    (glowRef.current.material as THREE.MeshStandardMaterial).opacity =
      proximity * 0.15;
  });

  return (
    <group position={position}>
      {/* Portal ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[3, 0.08, 8, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Inner glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}

export default function ZoneTransition() {
  return (
    <>
      {TRANSITION_POINTS.map((tp, i) => (
        <TransitionPortal
          key={i}
          position={tp.position}
          color={tp.color}
          index={i}
        />
      ))}
    </>
  );
}
