"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

/**
 * Loose type for a GLTF result — drei's `useGLTF` returns a structurally rich
 * object whose canonical type comes from `three-stdlib`. We don't depend on
 * that package here; the consumer can narrow with `as` if they need.
 */
export type GLTFResult = ReturnType<typeof useGLTF>;

/**
 * Load a GLB/GLTF model. Thin wrapper over drei's useGLTF that
 * also accepts an optional low-quality variant for mobile use.
 *
 * Phase 2 will wire mobile detection in the calling zone.
 */
export function useModel(url: string, lowQualityUrl?: string): GLTFResult {
  const targetUrl =
    lowQualityUrl &&
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches
      ? lowQualityUrl
      : url;
  return useGLTF(targetUrl);
}

useModel.preload = (url: string) => useGLTF.preload(url);

/**
 * PBR texture set convention:
 *   <base>_color.jpg
 *   <base>_normal.jpg
 *   <base>_roughness.jpg
 *   <base>_ao.jpg
 *
 * Pass the base path (without the suffix). Returns the four maps,
 * with `repeat` and `wrapS/T` already configured for tiling surfaces.
 */
export interface PBRTextureSet {
  map: THREE.Texture;
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
  aoMap: THREE.Texture;
}

export function usePBRTextureSet(
  base: string,
  repeat: [number, number] = [1, 1],
): PBRTextureSet {
  const [map, normalMap, roughnessMap, aoMap] = useTexture([
    `${base}_color.jpg`,
    `${base}_normal.jpg`,
    `${base}_roughness.jpg`,
    `${base}_ao.jpg`,
  ]);

  return useMemo(() => {
    const configure = (tex: THREE.Texture) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(repeat[0], repeat[1]);
      return tex;
    };
    map.colorSpace = THREE.SRGBColorSpace;
    return {
      map: configure(map),
      normalMap: configure(normalMap),
      roughnessMap: configure(roughnessMap),
      aoMap: configure(aoMap),
    };
  }, [map, normalMap, roughnessMap, aoMap, repeat]);
}

/**
 * Warm up GLB caches. Call inside a useEffect at app boot
 * for assets you know you'll need shortly.
 */
export function preloadAssets(urls: string[]): void {
  urls.forEach((url) => {
    if (url.endsWith(".glb") || url.endsWith(".gltf")) {
      useGLTF.preload(url);
    }
  });
}
