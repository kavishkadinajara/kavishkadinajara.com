# Multiverse Assets

This folder holds all heavy assets for the 5-zone 3D multiverse experience at `/multiverse`.

## Layout

```
public/multiverse/
├── models/<zone>/      ← .glb / .gltf 3D models (binary preferred)
├── textures/<zone>/    ← PBR texture sets: <name>_color.jpg, _normal.jpg, _roughness.jpg, _ao.jpg
├── images/<zone>/      ← AI-generated images for billboards, posters, decals (.jpg or .png)
└── animations/
    ├── hud/            ← Lottie .json files for the HUD overlay
    └── billboards/     ← Lottie .json files rendered as in-scene billboards
```

Zones: `techcore`, `sanctuary`, `arena`, `studio`, `kitchen`.

## Naming convention

- **Models**: `kebab-case.glb` (e.g. `server-rack.glb`, `mechanical-keyboard.glb`).
- **Textures**: PBR set with shared base name + 4 suffixes (e.g. `concrete_color.jpg`, `concrete_normal.jpg`, …).
- **Images**: descriptive kebab-case (e.g. `hacker-desk.jpg`, `neon-sign.png`).
- **Lottie**: descriptive kebab-case `.json` (e.g. `code-rain.json`, `flame-flicker.json`).

## Where to source assets

| Type | Free, CC0/permissive sources |
|------|------------------------------|
| 3D models (GLB) | [Sketchfab CC0 search](https://sketchfab.com/search?q=&licenses=322a749bcfa841b29dff1e8a1bb74b0b&type=models), [Poly Haven Models](https://polyhaven.com/models) |
| PBR textures   | [Poly Haven Textures](https://polyhaven.com/textures), [AmbientCG](https://ambientcg.com/) |
| Lottie         | [LottieFiles Free](https://lottiefiles.com/free-animations) |
| Images         | AI-generate (Midjourney / DALL·E / FLUX / Stable Diffusion) using prompts in `MULTIVERSE_ASSETS.md` |

## Licenses

Only ship assets you have the right to ship. CC0 is safest. Keep license info in the source filename or in a sibling `LICENSES.txt` for each zone if mixing licenses.

## Phase status

- **Phase 1** (current): folder skeleton + loader utilities + prompt manifest. **No assets dropped yet.**
- **Phase 2** (future): wire downloaded/generated assets into each zone, replacing the existing primitive-shape geometry.

See `MULTIVERSE_ASSETS.md` at the project root for the full prompt + source list per asset.
