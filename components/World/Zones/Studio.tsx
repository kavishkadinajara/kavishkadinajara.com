"use client";

import { Float, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * ZONE 4: THE STUDIO
 * ==================
 * Film studio / videography environment:
 * - Camera body (geometric approximation)
 * - Spotlights with volumetric cones
 * - Film strip reels
 * - Floating screens/monitors
 * - Director's chair
 * - Clapperboard
 */

const SPOTLIGHT_WHITE = "#ffffee";
const LENS_GLASS = "#1a3a5a";
const FILM_DARK = "#0a0a0a";
const RED_ACCENT = "#cc2222";

function CameraBody({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <Float speed={0.8} floatIntensity={0.3}>
      <group position={position} rotation={rotation}>
        {/* Camera body */}
        <mesh castShadow>
          <boxGeometry args={[2, 1.2, 1.5]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Lens barrel */}
        <mesh position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.5, 1.2, 16]} />
          <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Lens glass */}
        <mesh position={[0, 0, 1.6]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.35, 16]} />
          <meshStandardMaterial
            color={LENS_GLASS}
            metalness={0.3}
            roughness={0.1}
            transparent
            opacity={0.7}
          />
        </mesh>
        {/* Lens ring */}
        <mesh position={[0, 0, 1.05]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.45, 0.03, 8, 16]} />
          <meshStandardMaterial color={RED_ACCENT} metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Viewfinder */}
        <mesh position={[-0.5, 0.8, -0.3]}>
          <boxGeometry args={[0.5, 0.3, 0.4]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Record button */}
        <mesh position={[0.8, 0.65, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial
            color={RED_ACCENT}
            emissive={RED_ACCENT}
            emissiveIntensity={3}
          />
        </mesh>
      </group>
    </Float>
  );
}

function FilmStrip({
  position,
  length = 10,
}: {
  position: [number, number, number];
  length?: number;
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const frames = useMemo(() => {
    return Array.from({ length: Math.floor(length / 0.5) }, (_, i) => i);
  }, [length]);

  return (
    <group ref={meshRef} position={position}>
      {/* Film strip base */}
      <mesh>
        <boxGeometry args={[length, 1.2, 0.02]} />
        <meshStandardMaterial color={FILM_DARK} roughness={0.8} />
      </mesh>
      {/* Frames */}
      {frames.map((i) => (
        <mesh key={i} position={[-length / 2 + i * 0.5 + 0.25, 0, 0.02]}>
          <planeGeometry args={[0.4, 0.8]} />
          <meshStandardMaterial
            color={`hsl(${(i * 20) % 360}, 40%, 30%)`}
            roughness={0.5}
          />
        </mesh>
      ))}
      {/* Sprocket holes */}
      {frames.map((i) => (
        <group key={`hole-${i}`}>
          <mesh position={[-length / 2 + i * 0.5 + 0.25, 0.5, 0.02]}>
            <circleGeometry args={[0.04, 8]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[-length / 2 + i * 0.5 + 0.25, -0.5, 0.02]}>
            <circleGeometry args={[0.04, 8]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function FilmReel({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <Float speed={0.6} floatIntensity={0.2}>
      <group position={position} rotation={rotation}>
        <mesh ref={meshRef}>
          <torusGeometry args={[1.2, 0.15, 8, 32]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Center hub */}
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
          <meshStandardMaterial color="#444" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Spokes */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((angle * Math.PI) / 180) * 0.7,
              Math.sin((angle * Math.PI) / 180) * 0.7,
              0,
            ]}
            rotation={[0, 0, (angle * Math.PI) / 180]}
          >
            <boxGeometry args={[1, 0.06, 0.1]} />
            <meshStandardMaterial color="#333" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function StudioSpotlight({ position, target }: { position: [number, number, number]; target: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Light housing */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.5, 0.8, 8, 1, true]} />
        <meshStandardMaterial
          color="#222"
          metalness={0.8}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      <spotLight
        position={[0, 0, 0]}
        target-position={target}
        angle={0.4}
        penumbra={0.6}
        intensity={10}
        color={SPOTLIGHT_WHITE}
        distance={30}
        castShadow
      />
    </group>
  );
}

function MonitorScreen({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
    }
  });

  return (
    <Float speed={0.5} floatIntensity={0.2}>
      <group position={position} rotation={rotation}>
        {/* Bezel */}
        <mesh>
          <boxGeometry args={[4, 2.5, 0.1]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Screen */}
        <mesh ref={meshRef} position={[0, 0, 0.06]}>
          <planeGeometry args={[3.6, 2.1]} />
          <meshStandardMaterial
            color="#0a0a2a"
            emissive="#1a2a4a"
            emissiveIntensity={0.5}
          />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -1.5, -0.2]}>
          <boxGeometry args={[0.15, 1, 0.8]} />
          <meshStandardMaterial color="#222" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function Clapperboard({ position }: { position: [number, number, number] }) {
  const topRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (topRef.current) {
      // Subtle clapping animation
      topRef.current.rotation.x =
        -0.1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });

  return (
    <Float speed={1} floatIntensity={0.4}>
      <group position={position} rotation={[0.3, 0.5, 0]}>
        {/* Bottom board */}
        <mesh>
          <boxGeometry args={[1.5, 1, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        {/* Top clapper */}
        <mesh ref={topRef} position={[0, 0.5, 0]}>
          <boxGeometry args={[1.5, 0.2, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        {/* Diagonal stripes */}
        {[-0.5, 0, 0.5].map((x, i) => (
          <mesh key={i} position={[x, 0.5, 0.03]} rotation={[0, 0, Math.PI / 4]}>
            <planeGeometry args={[0.3, 0.06]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function Studio() {
  // Zone 4 centered around (5, 8, -130) on the camera path
  const ZONE_CENTER: [number, number, number] = [5, 0, -130];

  return (
    <group position={ZONE_CENTER}>
      {/* Dark studio floor */}
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Camera bodies */}
      <CameraBody position={[-5, 2, -5]} rotation={[0, 0.8, 0]} />
      <CameraBody position={[6, 4, -3]} rotation={[0, -0.5, 0.1]} />

      {/* Film reels */}
      <FilmReel position={[-8, 5, -8]} rotation={[0.3, 0, 0]} />
      <FilmReel position={[8, 3, 5]} rotation={[-0.2, 0.5, 0]} />

      {/* Film strips */}
      <FilmStrip position={[0, 7, -5]} length={12} />
      <FilmStrip position={[-5, 3, 6]} length={8} />

      {/* Monitor screens */}
      <MonitorScreen position={[0, 2, -8]} />
      <MonitorScreen position={[-7, 4, 0]} rotation={[0, 0.8, 0]} />
      <MonitorScreen position={[7, 1, 3]} rotation={[0, -0.6, 0]} />

      {/* Clapperboard */}
      <Clapperboard position={[3, 5, 2]} />

      {/* Studio spotlights */}
      <StudioSpotlight position={[-5, 10, -5]} target={[0, 0, 0]} />
      <StudioSpotlight position={[5, 10, 5]} target={[0, 0, 0]} />
      <StudioSpotlight position={[0, 12, 0]} target={[0, -3, 0]} />

      {/* Zone title */}
      <Text
        position={[0, 10, 0]}
        fontSize={1.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor={RED_ACCENT}
      >
        {"The Studio"}
      </Text>
    </group>
  );
}
