"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * PARTICLE FIELD
 * ==============
 * Ambient particle system that spans the entire scene.
 * Particles slowly drift, creating a sense of depth and motion.
 * Color transitions based on camera Z position (matching zone colors).
 */

interface ParticleFieldProps {
  count?: number;
  spread?: number;
  depth?: number;
}

export default function ParticleField({
  count = 500,
  spread = 50,
  depth = 200,
}: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * spread,
      y: (Math.random() - 0.5) * spread * 0.6,
      z: -Math.random() * depth,
      speed: 0.05 + Math.random() * 0.15,
      scale: 0.01 + Math.random() * 0.04,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count, spread, depth]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(time * p.speed + p.phase) * 2,
        p.y + Math.cos(time * p.speed * 0.7 + p.phase) * 1.5,
        p.z
      );
      const pulse = 1 + Math.sin(time * 2 + p.phase) * 0.3;
      dummy.scale.setScalar(p.scale * pulse);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshStandardMaterial
        color="#aaaaff"
        emissive="#6666ff"
        emissiveIntensity={1}
        transparent
        opacity={0.4}
      />
    </instancedMesh>
  );
}
