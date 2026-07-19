"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface LottieBillboardProps {
  src: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number];
  /** Pixel resolution of the offscreen canvas (square). Default 512. */
  resolution?: number;
  /** Frames-per-second cap for texture upload. Default 24. */
  fps?: number;
  /** Make the material emissive (good for "screens"). Default true. */
  emissive?: boolean;
  emissiveIntensity?: number;
  opacity?: number;
}

export default function LottieBillboard({
  src,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size = [3, 2],
  resolution = 512,
  fps = 24,
  emissive = true,
  emissiveIntensity = 1.0,
  opacity = 1,
}: LottieBillboardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const animRef = useRef<unknown>(null);
  const lastUpload = useRef(0);
  const [ready, setReady] = useState(false);

  const { canvas, texture } = useMemo(() => {
    if (typeof document === "undefined") {
      return { canvas: null, texture: null };
    }
    const c = document.createElement("canvas");
    c.width = resolution;
    c.height = resolution;
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return { canvas: c, texture: t };
  }, [resolution]);

  useEffect(() => {
    if (!canvas) return;
    let cancelled = false;
    let anim: { destroy: () => void } | null = null;

    (async () => {
      const lottie = (await import("lottie-web")).default;
      if (cancelled) return;
      try {
        const ctx = canvas.getContext("2d") ?? undefined;
        anim = lottie.loadAnimation({
          container: canvas,
          renderer: "canvas",
          loop: true,
          autoplay: true,
          path: src,
          rendererSettings: {
            context: ctx,
            clearCanvas: true,
            preserveAspectRatio: "xMidYMid slice",
          },
        }) as unknown as { destroy: () => void };
        animRef.current = anim;
        setReady(true);
      } catch (err) {
        // Asset not present yet (Phase 1) — billboard renders blank.
        console.warn(`[LottieBillboard] failed to load ${src}`, err);
      }
    })();

    return () => {
      cancelled = true;
      if (anim && typeof anim.destroy === "function") anim.destroy();
      animRef.current = null;
    };
  }, [src, canvas]);

  useFrame((state) => {
    if (!texture || !ready) return;
    const now = state.clock.elapsedTime;
    if (now - lastUpload.current >= 1 / fps) {
      texture.needsUpdate = true;
      lastUpload.current = now;
    }
  });

  if (!texture) return null;

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshStandardMaterial
        map={texture}
        emissive={emissive ? "#ffffff" : "#000000"}
        emissiveMap={emissive ? texture : null}
        emissiveIntensity={emissive ? emissiveIntensity : 0}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}
