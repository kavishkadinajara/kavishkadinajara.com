"use client";

import { Float, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * ZONE 2: THE SANCTUARY
 * =====================
 * Magical floating library with:
 * - Floating bookshelves (animated)
 * - Individual floating books with rotation
 * - Warm point lights (candle-like)
 * - Parchment-colored particle dust
 * - Archway structures
 */

const WARM_GOLD = "#ffaa44";
const PARCHMENT = "#d4a574";
const DARK_WOOD = "#3a1a0a";
const CANDLE_ORANGE = "#ff8833";

function Book({
  position,
  rotation = [0, 0, 0],
  color = "#8B0000",
  size = [0.15, 0.8, 0.6],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  size?: [number, number, number];
}) {
  return (
    <Float speed={1 + Math.random()} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position} rotation={rotation}>
        {/* Book cover */}
        <mesh castShadow>
          <boxGeometry args={size} />
          <meshStandardMaterial color={color} roughness={0.8} metalness={0.1} />
        </mesh>
        {/* Pages */}
        <mesh position={[size[0] * 0.05, 0, 0]}>
          <boxGeometry args={[size[0] * 0.8, size[1] * 0.95, size[2] * 0.9]} />
          <meshStandardMaterial color={PARCHMENT} roughness={0.9} />
        </mesh>
        {/* Spine detail */}
        <mesh position={[-size[0] / 2 - 0.005, 0, 0]}>
          <boxGeometry args={[0.01, size[1], size[2]]} />
          <meshStandardMaterial color={color} roughness={0.7} metalness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function Bookshelf({ position }: { position: [number, number, number] }) {
  const bookColors = ["#8B0000", "#1a3a5c", "#2d1a0a", "#4a0a4a", "#0a3a2a", "#5a3a1a"];

  return (
    <Float speed={0.5} floatIntensity={0.3}>
      <group position={position}>
        {/* Shelf frame */}
        {[-1.2, 0, 1.2].map((y, i) => (
          <mesh key={`shelf-${i}`} position={[0, y, 0]} castShadow>
            <boxGeometry args={[3, 0.08, 0.8]} />
            <meshStandardMaterial color={DARK_WOOD} roughness={0.9} />
          </mesh>
        ))}
        {/* Side panels */}
        {[-1.5, 1.5].map((x, i) => (
          <mesh key={`side-${i}`} position={[x, 0, 0]} castShadow>
            <boxGeometry args={[0.08, 2.5, 0.8]} />
            <meshStandardMaterial color={DARK_WOOD} roughness={0.9} />
          </mesh>
        ))}
        {/* Books on shelves */}
        {[0.5, -0.7].map((shelfY, si) =>
          Array.from({ length: 8 }, (_, bi) => (
            <mesh
              key={`book-${si}-${bi}`}
              position={[-1.2 + bi * 0.32, shelfY, 0]}
              castShadow
            >
              <boxGeometry args={[0.12, 0.6 + Math.random() * 0.3, 0.5]} />
              <meshStandardMaterial
                color={bookColors[(si * 8 + bi) % bookColors.length]}
                roughness={0.8}
              />
            </mesh>
          ))
        )}
      </group>
    </Float>
  );
}

function CandleLight({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      // Flickering candle effect
      lightRef.current.intensity =
        3 + Math.sin(state.clock.elapsedTime * 8) * 0.5 +
        Math.sin(state.clock.elapsedTime * 13) * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Candle body */}
      <mesh>
        <cylinderGeometry args={[0.05, 0.06, 0.3, 8]} />
        <meshStandardMaterial color="#f0e8d0" roughness={0.9} />
      </mesh>
      {/* Flame */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial
          color={CANDLE_ORANGE}
          emissive={CANDLE_ORANGE}
          emissiveIntensity={5}
        />
      </mesh>
      <pointLight
        ref={lightRef}
        position={[0, 0.3, 0]}
        color={CANDLE_ORANGE}
        intensity={3}
        distance={10}
        decay={2}
      />
    </group>
  );
}

function MagicDust({ position, count = 60 }: { position: [number, number, number]; count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 30,
      y: Math.random() * 15 - 3,
      z: (Math.random() - 0.5) * 30,
      speed: 0.1 + Math.random() * 0.3,
      scale: 0.02 + Math.random() * 0.03,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(time * p.speed + p.phase) * 2,
        p.y + Math.sin(time * p.speed * 0.5 + p.phase) * 1,
        p.z + Math.cos(time * p.speed + p.phase) * 2
      );
      const s = p.scale * (1 + Math.sin(time * 2 + p.phase) * 0.3);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={position}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color={WARM_GOLD}
        emissive={WARM_GOLD}
        emissiveIntensity={3}
        transparent
        opacity={0.5}
      />
    </instancedMesh>
  );
}

export default function Sanctuary() {
  // Zone 2 centered around (15, 5, -60) on the camera path
  const ZONE_CENTER: [number, number, number] = [15, 0, -60];

  return (
    <group position={ZONE_CENTER}>
      {/* Floating bookshelves */}
      <Bookshelf position={[-6, 2, -5]} />
      <Bookshelf position={[8, 4, -8]} />
      <Bookshelf position={[-4, 6, 3]} />
      <Bookshelf position={[6, 1, 5]} />

      {/* Individual floating books */}
      <Book position={[-2, 3, -2]} rotation={[0.2, 0.5, 0.1]} color="#8B0000" />
      <Book position={[3, 5, -4]} rotation={[-0.1, -0.3, 0.2]} color="#1a3a5c" />
      <Book position={[0, 7, 1]} rotation={[0.3, 0.8, -0.1]} color="#2d1a0a" />
      <Book position={[-5, 4, -6]} rotation={[0, 1.2, 0.15]} color="#4a0a4a" />
      <Book position={[5, 2, 3]} rotation={[-0.2, -0.6, 0]} color="#0a3a2a" size={[0.2, 1, 0.7]} />

      {/* Candle lights */}
      <CandleLight position={[-3, 1, -3]} />
      <CandleLight position={[4, 3, -5]} />
      <CandleLight position={[1, 5, 2]} />
      <CandleLight position={[-6, 3, 1]} />
      <CandleLight position={[7, 2, -2]} />

      {/* Magic dust particles */}
      <MagicDust position={[0, 0, 0]} count={80} />

      {/* Archway pillars */}
      {[-8, 8].map((x) => (
        <group key={x}>
          <mesh position={[x, 0, -10]} castShadow>
            <cylinderGeometry args={[0.3, 0.4, 12, 12]} />
            <meshStandardMaterial color={DARK_WOOD} roughness={0.8} metalness={0.1} />
          </mesh>
          <mesh position={[x, 0, 10]} castShadow>
            <cylinderGeometry args={[0.3, 0.4, 12, 12]} />
            <meshStandardMaterial color={DARK_WOOD} roughness={0.8} metalness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Warm floor */}
      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#2a1a0a" roughness={0.95} />
      </mesh>

      {/* Zone title */}
      <Text
        position={[0, 9, -5]}
        fontSize={1.0}
        color={WARM_GOLD}
        anchorX="center"
        anchorY="middle"
      >
        {"The Sanctuary"}
      </Text>
    </group>
  );
}
