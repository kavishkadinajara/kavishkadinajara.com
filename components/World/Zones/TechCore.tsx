"use client";

import { Float, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * ZONE 1: THE TECH CORE
 * =====================
 * Cyberpunk/Sci-fi environment with:
 * - Floating server rack geometries (animated boxes)
 * - Holographic code block planes (emissive, transparent)
 * - Neon light strips (emissive tubes)
 * - Grid floor with glow
 * - Particle dust floating upward
 */

// Neon color palette
const NEON_BLUE = "#00aaff";
const NEON_PURPLE = "#aa44ff";
const NEON_GREEN = "#00ff88";
const NEON_PINK = "#ff44aa";

function ServerRack({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main chassis */}
      <mesh castShadow>
        <boxGeometry args={[1.2, 3, 0.8]} />
        <meshStandardMaterial color="#111122" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* LED strips */}
      {[-1, -0.5, 0, 0.5, 1].map((y, i) => (
        <mesh key={i} position={[0.61, y, 0]}>
          <boxGeometry args={[0.02, 0.08, 0.6]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? NEON_BLUE : NEON_GREEN}
            emissive={i % 2 === 0 ? NEON_BLUE : NEON_GREEN}
            emissiveIntensity={2}
          />
        </mesh>
      ))}
      {/* Drive bays */}
      {[-0.8, -0.3, 0.2, 0.7].map((y, i) => (
        <mesh key={`drive-${i}`} position={[0, y, 0.41]}>
          <boxGeometry args={[0.9, 0.35, 0.02]} />
          <meshStandardMaterial color="#0a0a1a" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function HolographicCodeBlock({
  position,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial
          color={NEON_BLUE}
          emissive={NEON_BLUE}
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          wireframe={false}
        />
      </mesh>
      {/* Code text overlay */}
      <Text
        position={[position[0], position[1], position[2] + 0.01]}
        rotation={rotation}
        fontSize={0.12}
        color={NEON_GREEN}
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
      >
        {`const multiverse = {\n  creator: "Kavishka",\n  stack: ["Next.js", "R3F"],\n  status: "Building...",\n};`}
      </Text>
    </Float>
  );
}

function NeonTube({
  start,
  end,
  color = NEON_BLUE,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
}) {
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  const geometry = useMemo(() => {
    const curve = new THREE.LineCurve3(points[0], points[1]);
    return new THREE.TubeGeometry(curve, 8, 0.03, 8, false);
  }, [points]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={3}
        toneMapped={false}
      />
    </mesh>
  );
}

function GridFloor({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[80, 80, 80, 80]} />
      <meshStandardMaterial
        color="#050520"
        wireframe
        emissive={NEON_PURPLE}
        emissiveIntensity={0.15}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function FloatingParticles({ position, count = 100 }: { position: [number, number, number]; count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 40,
      y: Math.random() * 20 - 5,
      z: (Math.random() - 0.5) * 40,
      speed: 0.2 + Math.random() * 0.5,
      scale: 0.02 + Math.random() * 0.04,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(time * p.speed + i) * 0.5,
        ((p.y + time * p.speed * 0.3) % 20) - 5,
        p.z + Math.cos(time * p.speed + i) * 0.5
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={position}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color={NEON_BLUE}
        emissive={NEON_BLUE}
        emissiveIntensity={2}
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
}

export default function TechCore() {
  // Zone 1 is centered around (0, 2, -30) on the camera path
  const ZONE_CENTER: [number, number, number] = [0, 0, -30];

  return (
    <group position={ZONE_CENTER}>
      {/* Grid floor */}
      <GridFloor position={[0, -3, 0]} />

      {/* Server racks */}
      <Float speed={0.8} floatIntensity={0.3}>
        <ServerRack position={[-8, 0, -5]} scale={1.2} />
      </Float>
      <Float speed={1.0} floatIntensity={0.4}>
        <ServerRack position={[7, 1, -8]} scale={0.9} />
      </Float>
      <Float speed={0.6} floatIntensity={0.2}>
        <ServerRack position={[-5, 2, 5]} scale={1.0} />
      </Float>
      <Float speed={0.9} floatIntensity={0.3}>
        <ServerRack position={[10, -1, 3]} scale={0.8} />
      </Float>

      {/* Holographic code blocks */}
      <HolographicCodeBlock position={[-3, 2, -3]} rotation={[0, 0.3, 0]} />
      <HolographicCodeBlock position={[4, 3, -6]} rotation={[0, -0.5, 0]} />
      <HolographicCodeBlock position={[0, 1, 5]} rotation={[0, 0, 0]} />

      {/* Neon tubes — forming a futuristic frame */}
      <NeonTube start={[-12, -3, -12]} end={[12, -3, -12]} color={NEON_PURPLE} />
      <NeonTube start={[12, -3, -12]} end={[12, -3, 12]} color={NEON_BLUE} />
      <NeonTube start={[12, -3, 12]} end={[-12, -3, 12]} color={NEON_PURPLE} />
      <NeonTube start={[-12, -3, 12]} end={[-12, -3, -12]} color={NEON_BLUE} />
      <NeonTube start={[-12, -3, -12]} end={[-12, 8, -12]} color={NEON_PINK} />
      <NeonTube start={[12, -3, -12]} end={[12, 8, -12]} color={NEON_PINK} />

      {/* Floating particles */}
      <FloatingParticles position={[0, 0, 0]} count={150} />

      {/* Point lights for neon glow */}
      <pointLight position={[-5, 3, -5]} color={NEON_BLUE} intensity={5} distance={15} />
      <pointLight position={[5, 2, 3]} color={NEON_PURPLE} intensity={5} distance={15} />
      <pointLight position={[0, 5, -8]} color={NEON_GREEN} intensity={3} distance={12} />

      {/* Zone title */}
      <Text
        position={[0, 6, -8]}
        fontSize={1.2}
        color={NEON_BLUE}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor={NEON_PURPLE}
      >
        {"// THE TECH CORE"}
      </Text>
    </group>
  );
}
