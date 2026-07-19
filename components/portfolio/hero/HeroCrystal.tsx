"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Crystal() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!meshRef.current || !wireRef.current) return;
    const { x: mx, y: my } = state.mouse;
    targetRot.current.x += (my * 0.3 - targetRot.current.x) * 0.05;
    targetRot.current.y += (mx * 0.6 - targetRot.current.y) * 0.05;

    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.22;
    meshRef.current.rotation.z = targetRot.current.y * 0.35;

    wireRef.current.rotation.x = meshRef.current.rotation.x;
    wireRef.current.rotation.y = meshRef.current.rotation.y;
    wireRef.current.rotation.z = meshRef.current.rotation.z;

    const t = state.clock.elapsedTime;
    const scale = 1 + Math.sin(t * 1.4) * 0.04;
    meshRef.current.scale.setScalar(scale);
    wireRef.current.scale.setScalar(scale * 1.001);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshPhongMaterial
          color={new THREE.Color("#0EA5E9")}
          emissive={new THREE.Color("#0A1F3A")}
          shininess={140}
          specular={new THREE.Color("#06B6D4")}
          transparent
          opacity={0.18}
          flatShading
        />
      </mesh>

      <lineSegments ref={wireRef}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(1.6, 0)]} />
        <lineBasicMaterial
          color={new THREE.Color("#06B6D4")}
          transparent
          opacity={0.9}
        />
      </lineSegments>
    </group>
  );
}

export default function HeroCrystal() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ filter: "drop-shadow(0 0 30px rgba(14,165,233,0.4))" }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 4]} intensity={1.2} color="#0EA5E9" />
        <pointLight position={[-3, -2, 2]} intensity={0.6} color="#06B6D4" />
        <Crystal />
      </Canvas>
    </div>
  );
}
