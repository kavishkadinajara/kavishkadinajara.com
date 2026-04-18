"use client";

import { Float, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * ZONE 3: THE ARENA
 * =================
 * Rugby field environment with:
 * - Grass-textured ground plane
 * - Rugby goal posts (H-frame)
 * - Spinning rugby ball (slow motion)
 * - Field line markings
 * - Stadium lights in the distance
 * - Grass particle blades
 */

const GRASS_GREEN = "#2d7a2d";
const FIELD_LINE = "#ffffff";
const POST_WHITE = "#f0f0f0";
const BALL_BROWN = "#8B4513";
const SKY_BLUE = "#87CEEB";

function RugbyGoalPost({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {/* Left upright */}
      <mesh position={[-2.8, 5, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 10, 8]} />
        <meshStandardMaterial color={POST_WHITE} roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Right upright */}
      <mesh position={[2.8, 5, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 10, 8]} />
        <meshStandardMaterial color={POST_WHITE} roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Crossbar */}
      <mesh position={[0, 3, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 5.6, 8]} />
        <meshStandardMaterial color={POST_WHITE} roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Support post */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 3, 8]} />
        <meshStandardMaterial color={POST_WHITE} roughness={0.6} metalness={0.2} />
      </mesh>
      {/* Padding */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.6, 8]} />
        <meshStandardMaterial color="#1a4a9a" roughness={0.9} />
      </mesh>
    </group>
  );
}

function RugbyBall({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Slow-motion spin
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.z += 0.005;
      // Gentle float
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={0.5} floatIntensity={0.2}>
      <mesh ref={meshRef} position={position} castShadow>
        {/* Approximate rugby ball as a squashed sphere */}
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color={BALL_BROWN} roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Seam line */}
      <mesh position={position} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.5, 0.015, 4, 32]} />
        <meshStandardMaterial color="#f0f0e0" roughness={0.5} />
      </mesh>
    </Float>
  );
}

function FieldLines({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Center line */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 0.1]} />
        <meshStandardMaterial color={FIELD_LINE} />
      </mesh>
      {/* 22m lines */}
      {[-15, 15].map((z, i) => (
        <mesh key={i} position={[0, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[60, 0.08]} />
          <meshStandardMaterial color={FIELD_LINE} />
        </mesh>
      ))}
      {/* Try lines */}
      {[-25, 25].map((z, i) => (
        <mesh key={`try-${i}`} position={[0, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[60, 0.12]} />
          <meshStandardMaterial color={FIELD_LINE} />
        </mesh>
      ))}
      {/* Touchlines */}
      {[-30, 30].map((x, i) => (
        <mesh key={`touch-${i}`} position={[x, 0.01, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[50, 0.08]} />
          <meshStandardMaterial color={FIELD_LINE} />
        </mesh>
      ))}
    </group>
  );
}

function StadiumLight({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Pole */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.2, 20, 8]} />
        <meshStandardMaterial color="#555555" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Light panel */}
      <mesh position={[0, 10, 0]}>
        <boxGeometry args={[2, 0.5, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffee"
          emissiveIntensity={2}
        />
      </mesh>
      <spotLight
        position={[position[0], position[1] + 10, position[2]]}
        angle={0.6}
        penumbra={0.5}
        intensity={8}
        color="#ffffee"
        distance={60}
        castShadow
      />
    </group>
  );
}

function GrassParticles({ count = 200 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const blades = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 60,
      z: (Math.random() - 0.5) * 50,
      height: 0.1 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    blades.forEach((b, i) => {
      dummy.position.set(b.x, b.height / 2, b.z);
      dummy.scale.set(0.02, b.height, 0.02);
      dummy.rotation.set(0, 0, Math.sin(time + b.phase) * 0.1);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3a8a3a" roughness={0.9} />
    </instancedMesh>
  );
}

export default function Arena() {
  // Zone 3 centered around (-10, 3, -95) on the camera path
  const ZONE_CENTER: [number, number, number] = [-10, 0, -95];

  return (
    <group position={ZONE_CENTER}>
      {/* Grass field */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 60]} />
        <meshStandardMaterial color={GRASS_GREEN} roughness={0.95} />
      </mesh>

      {/* Field markings */}
      <FieldLines position={[0, 0, 0]} />

      {/* Goal posts at each end */}
      <RugbyGoalPost position={[0, 0, -25]} />
      <RugbyGoalPost position={[0, 0, 25]} scale={0.85} />

      {/* Spinning rugby ball — hero element */}
      <RugbyBall position={[2, 3, 0]} />

      {/* Stadium lights */}
      <StadiumLight position={[-35, 0, -20]} />
      <StadiumLight position={[35, 0, -20]} />
      <StadiumLight position={[-35, 0, 20]} />
      <StadiumLight position={[35, 0, 20]} />

      {/* Grass blades */}
      <GrassParticles count={300} />

      {/* Sunlight */}
      <directionalLight
        position={[20, 30, 10]}
        intensity={2}
        color="#ffffee"
        castShadow
      />

      {/* Zone title */}
      <Text
        position={[0, 12, 0]}
        fontSize={1.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.08}
        outlineColor="#1a5a1a"
      >
        {"The Arena"}
      </Text>
    </group>
  );
}
