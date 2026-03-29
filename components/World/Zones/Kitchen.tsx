"use client";

import { Float, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * ZONE 5: THE KITCHEN
 * ====================
 * Warm, inviting kitchen environment:
 * - Kitchen counter / island
 * - Floating utensils (whisk, spatula, knife)
 * - Pots and pans
 * - Steam/heat particles rising
 * - Warm pendant lighting
 * - Cutting board with vegetables
 */

const WARM_CREAM = "#f5e6d0";
const WOOD_BROWN = "#8B6914";
const COPPER = "#b87333";
const STEEL = "#c0c0c0";
const STEAM_WHITE = "#ffffff";

function KitchenIsland({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Counter top */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[6, 0.15, 2.5]} />
        <meshStandardMaterial color="#d4c5b0" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Base cabinet */}
      <mesh position={[0, -1.2, 0]} castShadow>
        <boxGeometry args={[5.8, 2.2, 2.3]} />
        <meshStandardMaterial color={WOOD_BROWN} roughness={0.8} />
      </mesh>
      {/* Cabinet doors */}
      {[-2, -0.7, 0.7, 2].map((x, i) => (
        <mesh key={i} position={[x, -1.2, 1.16]} castShadow>
          <boxGeometry args={[1.2, 1.8, 0.05]} />
          <meshStandardMaterial color="#7a5a14" roughness={0.7} />
        </mesh>
      ))}
      {/* Door handles */}
      {[-2, -0.7, 0.7, 2].map((x, i) => (
        <mesh key={`handle-${i}`} position={[x + 0.4, -1.2, 1.2]}>
          <boxGeometry args={[0.08, 0.3, 0.05]} />
          <meshStandardMaterial color={STEEL} metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function Pot({
  position,
  scale = 1,
  color = COPPER,
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  return (
    <Float speed={0.8} floatIntensity={0.2}>
      <group position={position} scale={scale}>
        {/* Pot body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.5, 0.45, 0.7, 16]} />
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Rim */}
        <mesh position={[0, 0.35, 0]}>
          <torusGeometry args={[0.5, 0.03, 8, 16]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Handle left */}
        <mesh position={[-0.6, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[0.15, 0.02, 6, 8, Math.PI]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Handle right */}
        <mesh position={[0.6, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <torusGeometry args={[0.15, 0.02, 6, 8, Math.PI]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function FloatingUtensil({
  position,
  type,
}: {
  position: [number, number, number];
  type: "whisk" | "spatula" | "knife";
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
    }
  });

  const renderUtensil = () => {
    switch (type) {
      case "whisk":
        return (
          <>
            <mesh position={[0, 0.8, 0]}>
              <cylinderGeometry args={[0.025, 0.03, 1.5, 8]} />
              <meshStandardMaterial color={STEEL} metalness={0.8} roughness={0.2} />
            </mesh>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <mesh
                key={i}
                position={[
                  Math.cos((angle * Math.PI) / 180) * 0.08,
                  -0.1,
                  Math.sin((angle * Math.PI) / 180) * 0.08,
                ]}
              >
                <cylinderGeometry args={[0.008, 0.008, 0.5, 4]} />
                <meshStandardMaterial color={STEEL} metalness={0.7} roughness={0.3} />
              </mesh>
            ))}
          </>
        );
      case "spatula":
        return (
          <>
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.025, 0.02, 1.2, 8]} />
              <meshStandardMaterial color={WOOD_BROWN} roughness={0.8} />
            </mesh>
            <mesh position={[0, -0.2, 0]}>
              <boxGeometry args={[0.3, 0.4, 0.02]} />
              <meshStandardMaterial color={STEEL} metalness={0.7} roughness={0.3} />
            </mesh>
          </>
        );
      case "knife":
        return (
          <>
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.03, 0.025, 0.8, 8]} />
              <meshStandardMaterial color={WOOD_BROWN} roughness={0.7} />
            </mesh>
            <mesh position={[0, -0.15, 0]}>
              <boxGeometry args={[0.05, 0.6, 0.15]} />
              <meshStandardMaterial color={STEEL} metalness={0.9} roughness={0.1} />
            </mesh>
          </>
        );
    }
  };

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.6}>
      <group ref={groupRef} position={position}>
        {renderUtensil()}
      </group>
    </Float>
  );
}

function SteamParticles({
  position,
  count = 50,
}: {
  position: [number, number, number];
  count?: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 2,
      z: (Math.random() - 0.5) * 2,
      speed: 0.3 + Math.random() * 0.5,
      scale: 0.03 + Math.random() * 0.06,
      phase: Math.random() * Math.PI * 2,
      life: Math.random(),
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      const life = ((time * p.speed + p.life) % 3) / 3; // 0→1 cycle
      dummy.position.set(
        p.x + Math.sin(time + p.phase) * 0.3,
        life * 5,
        p.z + Math.cos(time + p.phase) * 0.3
      );
      const scale = p.scale * (1 - life * 0.5); // Shrink as they rise
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={position}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color={STEAM_WHITE}
        transparent
        opacity={0.15}
      />
    </instancedMesh>
  );
}

function PendantLight({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Wire */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 2, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Shade */}
      <mesh>
        <cylinderGeometry args={[0.05, 0.4, 0.3, 12, 1, true]} />
        <meshStandardMaterial color={COPPER} metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      {/* Bulb */}
      <mesh position={[0, -0.1, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial
          color="#fff6e0"
          emissive="#ffaa44"
          emissiveIntensity={5}
        />
      </mesh>
      <pointLight
        position={[0, -0.15, 0]}
        color="#ffaa44"
        intensity={5}
        distance={12}
        decay={2}
      />
    </group>
  );
}

function CuttingBoard({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={0.5} floatIntensity={0.15}>
      <group position={position} rotation={[0.1, 0.3, 0]}>
        {/* Board */}
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.06, 0.8]} />
          <meshStandardMaterial color="#c4a55a" roughness={0.8} />
        </mesh>
        {/* Tomato */}
        <mesh position={[0.3, 0.15, 0.1]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#cc2222" roughness={0.6} />
        </mesh>
        {/* Carrot */}
        <mesh position={[-0.3, 0.1, -0.1]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.05, 0.5, 8]} />
          <meshStandardMaterial color="#ff6600" roughness={0.7} />
        </mesh>
        {/* Herb sprig */}
        <mesh position={[0, 0.1, 0.2]} rotation={[0.2, 0.5, 0]}>
          <boxGeometry args={[0.02, 0.3, 0.08]} />
          <meshStandardMaterial color="#2d7a2d" roughness={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Kitchen() {
  // Zone 5 centered around (0, 4, -165) on the camera path
  const ZONE_CENTER: [number, number, number] = [0, 0, -165];

  return (
    <group position={ZONE_CENTER}>
      {/* Warm floor */}
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#5a4030" roughness={0.9} />
      </mesh>

      {/* Kitchen island */}
      <KitchenIsland position={[0, -1, 0]} />

      {/* Pots & pans */}
      <Pot position={[-1, 1, -1]} scale={1.2} color={COPPER} />
      <Pot position={[2, 2, -3]} scale={0.9} color={STEEL} />
      <Pot position={[-3, 3, 2]} scale={1} color={COPPER} />

      {/* Floating utensils */}
      <FloatingUtensil position={[3, 3, -2]} type="whisk" />
      <FloatingUtensil position={[-4, 4, -4]} type="spatula" />
      <FloatingUtensil position={[1, 5, 3]} type="knife" />
      <FloatingUtensil position={[-2, 2, 5]} type="whisk" />
      <FloatingUtensil position={[5, 3, 1]} type="spatula" />

      {/* Cutting board */}
      <CuttingBoard position={[1, 0.5, 1]} />

      {/* Steam rising from pots */}
      <SteamParticles position={[-1, 1.5, -1]} count={40} />
      <SteamParticles position={[2, 2.5, -3]} count={30} />

      {/* Pendant lights */}
      <PendantLight position={[-2, 6, 0]} />
      <PendantLight position={[2, 6, 0]} />
      <PendantLight position={[0, 6, -3]} />

      {/* Ambient warmth */}
      <pointLight position={[0, 4, 0]} color="#ffaa44" intensity={3} distance={15} />
      <pointLight position={[-4, 3, -3]} color="#ff8833" intensity={2} distance={10} />

      {/* Zone title */}
      <Text
        position={[0, 8, -3]}
        fontSize={1.0}
        color={WARM_CREAM}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.04}
        outlineColor={COPPER}
      >
        {"The Kitchen"}
      </Text>
    </group>
  );
}
