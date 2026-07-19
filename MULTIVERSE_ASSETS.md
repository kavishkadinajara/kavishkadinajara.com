# Multiverse Asset Manifest

This is the asset shopping list for the **Phase 2** multiverse upgrade. Each entry tells you exactly what to fetch / generate, where to put it, and (for AI images) the exact prompt to copy-paste.

## How to use this file

For every asset entry below:

1. **`📁 Target`** — the exact path the file must end up at inside this repo.
2. **`🛠 Source`** — one of:
   - **AI-generate** → use the given prompt in your image tool of choice (Midjourney, DALL·E 3, FLUX, Stable Diffusion). Prefer 16:9 for billboards, 1:1 for tileable textures, transparent PNG for decals.
   - **Sketchfab CC0** → search [Sketchfab CC0 only](https://sketchfab.com/search?q=&licenses=322a749bcfa841b29dff1e8a1bb74b0b&type=models) using the given search term, download as **GLB binary**.
   - **Poly Haven** → search [polyhaven.com/textures](https://polyhaven.com/textures), download the **2K JPG PBR set**, rename the four maps to match the convention.
   - **LottieFiles** → search [lottiefiles.com/free-animations](https://lottiefiles.com/free-animations), download as **JSON**.
3. **`📝 Prompt / search term`** — the exact text to use.

PBR convention reminder: 4 files per set →
`<base>_color.jpg`, `<base>_normal.jpg`, `<base>_roughness.jpg`, `<base>_ao.jpg`.

Lottie tips: keep file size under 200KB. Prefer simple loops (≤120 frames).

---

## Zone 1: The Tech Core — *Cyberpunk Hacker Den*

> Vibe: dark, dim, RGB underglow, multiple monitors with code, mechanical keyboard, plant in corner, volumetric blue/purple light beams, Mr. Robot meets Cyberpunk 2077.

### Images (AI-generate)

#### 1.1 — Hacker desk hero billboard
- **📁 Target:** `public/multiverse/images/techcore/hacker-desk.jpg`
- **🛠 Source:** AI-generate (16:9, 4K, photo-realistic)
- **📝 Prompt:**
  > Photorealistic cinematic shot of a cyberpunk hacker workstation in a dark room. Three large curved monitors showing glowing green and cyan terminal code, RGB-backlit mechanical keyboard, single steaming coffee mug, small monstera plant in the corner, RGB strip lighting along the desk edge, soft volumetric blue light beams from a window blind, faint purple haze, neon "NO SLEEP" sign on the wall, ultra-detailed, atmospheric, depth of field, shot on Sony A7 IV, 35mm lens, f/1.8, ISO 800, 4K, cinematic color grade. No people.

#### 1.2 — Holographic UI overlay (transparent)
- **📁 Target:** `public/multiverse/images/techcore/holo-ui.png`
- **🛠 Source:** AI-generate (1024×1024, transparent background)
- **📝 Prompt:**
  > Cyan-blue holographic HUD interface, concentric circular dials, oscilloscope waveform, geometric data rings, line-art radar grid, glowing wireframe planet, futuristic typography labels (FPS, TEMP, NET), thin glowing lines, transparent background, no text errors, blueprint aesthetic, transparent PNG, 1024x1024.

#### 1.3 — Neon "// HACK" sign (transparent)
- **📁 Target:** `public/multiverse/images/techcore/neon-sign.png`
- **🛠 Source:** AI-generate (transparent PNG, 1024×512)
- **📝 Prompt:**
  > Glowing magenta-pink neon tube sign reading exactly "// HACK", cursive handwritten neon style, slight bloom, isolated on transparent background, side-view, no shadow, ultra-clean PNG cutout, 1024x512.

#### 1.4 — RGB underglow strip texture (tileable)
- **📁 Target:** `public/multiverse/textures/techcore/rgb-strip.jpg`
- **🛠 Source:** AI-generate (256×64, tileable horizontally)
- **📝 Prompt:**
  > Smooth RGB rainbow gradient strip, magenta to red to yellow to green to cyan to blue back to magenta, soft glow, seamless horizontal tiling, 256x64.

### 3D Models (GLB)

#### 1.5 — Server rack
- **📁 Target:** `public/multiverse/models/techcore/server-rack.glb`
- **🛠 Source:** Sketchfab CC0
- **📝 Search:** `server rack 1u datacenter` (filter: CC0). Backup: search `data center server` on Poly Haven Models.

#### 1.6 — Mechanical keyboard
- **📁 Target:** `public/multiverse/models/techcore/keyboard.glb`
- **🛠 Source:** Sketchfab CC0
- **📝 Search:** `mechanical keyboard low poly` (filter: CC0).

#### 1.7 — Computer monitor
- **📁 Target:** `public/multiverse/models/techcore/monitor.glb`
- **🛠 Source:** Sketchfab CC0
- **📝 Search:** `computer monitor flat screen` (filter: CC0).

### Textures (PBR sets, Poly Haven)

#### 1.8 — Floor (industrial)
- **📁 Target:** `public/multiverse/textures/techcore/floor_*.jpg` (4 files)
- **🛠 Source:** [Poly Haven](https://polyhaven.com/textures)
- **📝 Search:** `metal_grate_02` or `concrete_floor_painted_diff`. Download 2K JPG. Rename maps to `floor_color.jpg`, `floor_normal.jpg`, `floor_roughness.jpg`, `floor_ao.jpg`.

#### 1.9 — Wall (concrete or metal panels)
- **📁 Target:** `public/multiverse/textures/techcore/wall_*.jpg` (4 files)
- **🛠 Source:** Poly Haven
- **📝 Search:** `concrete_wall` or `metal_plate`. Same naming convention.

### Lottie animations

#### 1.10 — Code rain (Matrix-style)
- **📁 Target:** `public/multiverse/animations/billboards/code-rain.json`
- **🛠 Source:** LottieFiles
- **📝 Search:** `matrix code rain` or `binary stream falling`.

#### 1.11 — Terminal typing
- **📁 Target:** `public/multiverse/animations/billboards/terminal-typing.json`
- **🛠 Source:** LottieFiles
- **📝 Search:** `terminal typing` or `command line typewriter`.

#### 1.12 — Data network flow
- **📁 Target:** `public/multiverse/animations/billboards/data-flow.json`
- **🛠 Source:** LottieFiles
- **📝 Search:** `data network animation` or `server connections animated`.

---

## Zone 2: The Sanctuary — *Magical Library*

> Vibe: warm candlelight, towering bookshelves, floating leather-bound tomes, dust motes in golden sunbeams, parchment scrolls, ancient archways, Hogwarts × Studio Ghibli.

### Images

#### 2.1 — Library hero billboard
- **📁 Target:** `public/multiverse/images/sanctuary/library-hero.jpg`
- **🛠 Source:** AI-generate (16:9, 4K)
- **📝 Prompt:**
  > A vast magical library at golden hour, towering wooden bookshelves stretching into the distance, leather-bound books with gold-foil titles, floating open books with glowing pages, candles on iron chandeliers, warm orange-amber lighting, dust particles drifting in sunbeams streaming through stained glass windows, ornate gothic architecture, polished oak floor, mystical atmosphere, cinematic, ultra-detailed, photographic, 4K. No people.

#### 2.2 — Floating book covers (3 variants, transparent)
- **📁 Target:** `public/multiverse/images/sanctuary/book-cover-{1,2,3}.png`
- **🛠 Source:** AI-generate (transparent PNG, 512×768 each)
- **📝 Prompt** (vary the title for each):
  > Ornate leather-bound book cover, deep burgundy / dark blue / forest green leather, gold-foil embossed title "ALGORITHMS" / "VERSE & PROSE" / "FIELD NOTES", filigree corner decorations, slightly worn antique finish, isolated on transparent background, top-down view, no shadow, 512x768 PNG.

#### 2.3 — Parchment scroll (transparent)
- **📁 Target:** `public/multiverse/images/sanctuary/scroll.png`
- **🛠 Source:** AI-generate (transparent PNG, 1024×768)
- **📝 Prompt:**
  > Aged parchment scroll, partially unrolled, ink calligraphy in faded brown, wax seal in red, slight tears at edges, isolated on transparent background, photo-realistic, 1024x768 PNG.

### 3D Models

#### 2.4 — Ancient bookshelf
- **📁 Target:** `public/multiverse/models/sanctuary/bookshelf.glb`
- **🛠 Source:** Sketchfab CC0
- **📝 Search:** `wooden bookshelf antique` or `library shelf old` (filter: CC0).

#### 2.5 — Single floating book (rigged or static)
- **📁 Target:** `public/multiverse/models/sanctuary/book.glb`
- **🛠 Source:** Sketchfab CC0
- **📝 Search:** `leather book closed` (filter: CC0).

#### 2.6 — Iron candle chandelier
- **📁 Target:** `public/multiverse/models/sanctuary/chandelier.glb`
- **🛠 Source:** Sketchfab CC0
- **📝 Search:** `medieval chandelier iron candle` (filter: CC0).

### Textures (PBR)

#### 2.7 — Wood floor (warm oak)
- **📁 Target:** `public/multiverse/textures/sanctuary/floor_*.jpg`
- **🛠 Source:** Poly Haven
- **📝 Search:** `wood_floor_diff` or `oak_floor`. 2K JPG.

#### 2.8 — Stone wall (gothic interior)
- **📁 Target:** `public/multiverse/textures/sanctuary/wall_*.jpg`
- **🛠 Source:** Poly Haven
- **📝 Search:** `castle_wall` or `medieval_stone_wall`.

### Lottie

#### 2.9 — Candle flame flicker
- **📁 Target:** `public/multiverse/animations/billboards/flame-flicker.json`
- **🛠 Source:** LottieFiles
- **📝 Search:** `candle flame flickering` or `realistic fire flicker`.

#### 2.10 — Page turning
- **📁 Target:** `public/multiverse/animations/billboards/page-turn.json`
- **🛠 Source:** LottieFiles
- **📝 Search:** `book page turn` or `reading animation`.

---

## Zone 3: The Arena — *Rugby Stadium*

> Vibe: floodlit night-time rugby field, scoreboard glowing, crowd silhouettes in stands, rugby ball mid-flight, grass detail, halftime energy.

### Images

#### 3.1 — Stadium hero billboard (night match)
- **📁 Target:** `public/multiverse/images/arena/stadium-hero.jpg`
- **🛠 Source:** AI-generate (16:9, 4K)
- **📝 Prompt:**
  > Photorealistic rugby stadium at night, intense floodlights illuminating green field, white field lines, packed crowd in stands as silhouettes with phone-lights and team flags, scoreboard glowing in distance, rugby goalposts with shadows, slight haze in the air, dramatic atmospheric, low-angle wide shot, cinematic, shot on Canon R5, 24mm lens, ISO 1600, 4K. No close-up players.

#### 3.2 — Crowd silhouette (transparent strip)
- **📁 Target:** `public/multiverse/images/arena/crowd-silhouette.png`
- **🛠 Source:** AI-generate (transparent PNG, 2048×512)
- **📝 Prompt:**
  > Long horizontal strip showing a packed sports crowd as black silhouettes, raised arms, foam fingers, scattered phone-lights as bright dots, slight bokeh, isolated on transparent background, no scenery, 2048x512 PNG.

#### 3.3 — Scoreboard digital display
- **📁 Target:** `public/multiverse/images/arena/scoreboard.jpg`
- **🛠 Source:** AI-generate (16:9, 1024×576)
- **📝 Prompt:**
  > Vintage stadium LED scoreboard, black background, large segmented orange-yellow LED digits showing "HOME 24 — 17 AWAY", below it "TIME 67:42", grid of LED dots, slightly grimy texture, top-down rectangular composition, photo-realistic, 1024x576.

### 3D Models

#### 3.4 — Rugby ball
- **📁 Target:** `public/multiverse/models/arena/rugby-ball.glb`
- **🛠 Source:** Sketchfab CC0
- **📝 Search:** `rugby ball` (filter: CC0). Backup: `american football` (similar shape; recolor in scene).

#### 3.5 — Goalpost (H-frame)
- **📁 Target:** `public/multiverse/models/arena/goalpost.glb`
- **🛠 Source:** Sketchfab CC0
- **📝 Search:** `rugby goalpost` or `field goal post`.

#### 3.6 — Stadium floodlight tower
- **📁 Target:** `public/multiverse/models/arena/floodlight.glb`
- **🛠 Source:** Sketchfab CC0
- **📝 Search:** `stadium light tower` or `floodlight pole`.

### Textures (PBR)

#### 3.7 — Grass field
- **📁 Target:** `public/multiverse/textures/arena/grass_*.jpg`
- **🛠 Source:** Poly Haven
- **📝 Search:** `aerial_grass_rock` or `forest_ground_diff` or `wild_grass`. 2K JPG.

#### 3.8 — Concrete bleachers (optional)
- **📁 Target:** `public/multiverse/textures/arena/concrete_*.jpg`
- **🛠 Source:** Poly Haven
- **📝 Search:** `concrete_floor` or `concrete_wall`.

### Lottie

#### 3.9 — Scoreboard counter rolling up
- **📁 Target:** `public/multiverse/animations/billboards/scoreboard-tick.json`
- **🛠 Source:** LottieFiles
- **📝 Search:** `numbers counter rolling` or `score increment`.

#### 3.10 — Crowd cheer / wave animation
- **📁 Target:** `public/multiverse/animations/billboards/crowd-cheer.json`
- **🛠 Source:** LottieFiles
- **📝 Search:** `crowd cheering` or `applause animation`.

---

## Zone 4: The Studio — *Film & Videography*

> Vibe: dim film studio, warm and cool tungsten + RGB practicals, vintage 16mm camera, film reels spinning, clapperboards, monitor wall showing scene playback, director's chair.

### Images

#### 4.1 — Film studio hero billboard
- **📁 Target:** `public/multiverse/images/studio/studio-hero.jpg`
- **🛠 Source:** AI-generate (16:9, 4K)
- **📝 Prompt:**
  > Photorealistic film studio interior at night, vintage 16mm film camera on tripod with matte box, large softbox light, C-stands with flags, director's monitor showing color bars, dolly track on the floor, RGB practical lights, hazer-filled atmosphere with light beams, dark wood floor, professional filmmaking environment, cinematic shallow depth of field, shot on Sony FX3, 24mm, f/2.8, 4K. No people.

#### 4.2 — Movie poster wall (3 variants)
- **📁 Target:** `public/multiverse/images/studio/poster-{1,2,3}.jpg`
- **🛠 Source:** AI-generate (portrait, 768×1152 each)
- **📝 Prompt:**
  > Vintage cinema movie poster, dramatic painted illustration style, bold typography title at top "INFINITE LOOP" / "THE LAST FRAME" / "TYPECAST", full-bleed dramatic scene, art deco border, faded edges, slight texture grain, 768x1152 portrait poster.

#### 4.3 — Clapperboard front (transparent)
- **📁 Target:** `public/multiverse/images/studio/clapperboard.png`
- **🛠 Source:** AI-generate (transparent PNG)
- **📝 Prompt:**
  > Black and white film clapperboard / slate, top wooden clapping stick raised, fields filled with chalk handwriting "PROD: KAVISHKA / SCENE 01 / TAKE 03 / DIR: K.D.", slightly worn, isolated transparent background, front-on view, 1024x768 PNG.

### 3D Models

#### 4.4 — Vintage film camera
- **📁 Target:** `public/multiverse/models/studio/film-camera.glb`
- **🛠 Source:** Sketchfab CC0
- **📝 Search:** `film camera vintage` or `16mm camera bolex` (filter: CC0).

#### 4.5 — Tripod
- **📁 Target:** `public/multiverse/models/studio/tripod.glb`
- **🛠 Source:** Sketchfab CC0
- **📝 Search:** `camera tripod professional`.

#### 4.6 — Director's chair
- **📁 Target:** `public/multiverse/models/studio/directors-chair.glb`
- **🛠 Source:** Sketchfab CC0
- **📝 Search:** `directors chair folding`.

#### 4.7 — Film reel
- **📁 Target:** `public/multiverse/models/studio/film-reel.glb`
- **🛠 Source:** Sketchfab CC0
- **📝 Search:** `film reel canister 35mm`.

### Textures (PBR)

#### 4.8 — Dark wood studio floor
- **📁 Target:** `public/multiverse/textures/studio/floor_*.jpg`
- **🛠 Source:** Poly Haven
- **📝 Search:** `dark_wood_floor` or `wood_planks_dark`.

### Lottie

#### 4.9 — Clapperboard slap
- **📁 Target:** `public/multiverse/animations/billboards/clapperboard-slap.json`
- **🛠 Source:** LottieFiles
- **📝 Search:** `clapperboard` or `clapboard slate animation`.

#### 4.10 — Film reel spinning (countdown)
- **📁 Target:** `public/multiverse/animations/billboards/film-countdown.json`
- **🛠 Source:** LottieFiles
- **📝 Search:** `film countdown 5 4 3 2 1` or `cinema leader animation`.

---

## Zone 5: The Kitchen — *Warm Home Kitchen*

> Vibe: warm late-afternoon kitchen, marble counter, copper pots, fresh ingredients, steam rising from a stew, pendant lights, herb garden on windowsill, cookbook open, cozy & inviting.

### Images

#### 5.1 — Kitchen hero billboard
- **📁 Target:** `public/multiverse/images/kitchen/kitchen-hero.jpg`
- **🛠 Source:** AI-generate (16:9, 4K)
- **📝 Prompt:**
  > Cozy warm modern home kitchen at golden hour, marble countertop with chopping board, fresh ingredients (tomatoes, herbs, garlic, lemons), copper pots hanging above, steaming bubbling stew on stove, vintage pendant lights, herb pots on windowsill, cookbook open with handwritten recipe, soft warm sunlight streaming in, photo-realistic, food photography style, shot on Fuji X-T5, 35mm, f/2, ISO 200, 4K. No people.

#### 5.2 — Recipe card (transparent)
- **📁 Target:** `public/multiverse/images/kitchen/recipe-card.png`
- **🛠 Source:** AI-generate (transparent PNG, 800×1000)
- **📝 Prompt:**
  > Vintage handwritten recipe card on aged cream paper, blue ink calligraphy heading "GRANDMA'S CURRY", ingredient list and instructions in flowing script, slight food stains, dog-eared corner, isolated transparent background, top-down view, 800x1000 PNG.

#### 5.3 — Fresh ingredients overhead (transparent)
- **📁 Target:** `public/multiverse/images/kitchen/ingredients-flatlay.png`
- **🛠 Source:** AI-generate (transparent PNG, 1024×1024)
- **📝 Prompt:**
  > Top-down flat-lay arrangement of fresh kitchen ingredients: red tomatoes, green basil, yellow lemon halves, garlic cloves, red chili, sprig of rosemary, isolated on transparent background, sharp focus, food photography lighting, 1024x1024 PNG.

### 3D Models

#### 5.4 — Kitchen island / counter
- **📁 Target:** `public/multiverse/models/kitchen/island.glb`
- **🛠 Source:** Sketchfab CC0
- **📝 Search:** `kitchen island modern` or `kitchen counter`.

#### 5.5 — Copper pot with handle
- **📁 Target:** `public/multiverse/models/kitchen/pot.glb`
- **🛠 Source:** Sketchfab CC0
- **📝 Search:** `copper cooking pot` or `saucepan`.

#### 5.6 — Cookware utensils set (whisk, spatula, ladle)
- **📁 Target:** `public/multiverse/models/kitchen/utensils.glb`
- **🛠 Source:** Sketchfab CC0
- **📝 Search:** `kitchen utensils set` or `cooking tools`.

#### 5.7 — Pendant light (vintage style)
- **📁 Target:** `public/multiverse/models/kitchen/pendant-light.glb`
- **🛠 Source:** Sketchfab CC0
- **📝 Search:** `pendant light vintage` or `kitchen hanging lamp`.

### Textures (PBR)

#### 5.8 — Marble countertop
- **📁 Target:** `public/multiverse/textures/kitchen/marble_*.jpg`
- **🛠 Source:** Poly Haven
- **📝 Search:** `marble_01` or `white_marble`.

#### 5.9 — Wood floor (warm oak)
- **📁 Target:** `public/multiverse/textures/kitchen/floor_*.jpg`
- **🛠 Source:** Poly Haven
- **📝 Search:** `wood_floor_2k` or `oak_planks`.

### Lottie

#### 5.10 — Steam rising
- **📁 Target:** `public/multiverse/animations/billboards/steam-rise.json`
- **🛠 Source:** LottieFiles
- **📝 Search:** `steam rising` or `smoke loop animation`.

#### 5.11 — Stove flame flicker
- **📁 Target:** `public/multiverse/animations/billboards/stove-flame.json`
- **🛠 Source:** LottieFiles
- **📝 Search:** `gas stove flame` or `cooking flame`.

---

## Shared / HUD Lottie animations

These power the HTML overlay (zone titles, transitions, scroll affordances) — they're loaded by `@lottiefiles/react-lottie-player` in the `Overlay/HUD.tsx` component during Phase 2.

#### S.1 — Zone-transition swirl
- **📁 Target:** `public/multiverse/animations/hud/zone-swirl.json`
- **🛠 Source:** LottieFiles
- **📝 Search:** `portal swirl transition` or `wormhole spiral`.

#### S.2 — Scroll-down arrow
- **📁 Target:** `public/multiverse/animations/hud/scroll-down.json`
- **🛠 Source:** LottieFiles
- **📝 Search:** `scroll down indicator` or `scroll arrow bounce`.

#### S.3 — Loading shimmer
- **📁 Target:** `public/multiverse/animations/hud/loading-shimmer.json`
- **🛠 Source:** LottieFiles
- **📝 Search:** `loading shimmer` or `skeleton loader`.

#### S.4 — Success checkmark
- **📁 Target:** `public/multiverse/animations/hud/checkmark.json`
- **🛠 Source:** LottieFiles
- **📝 Search:** `checkmark animation` or `success tick`.

#### S.5 — Ambient pulse (mini, for indicators)
- **📁 Target:** `public/multiverse/animations/hud/ambient-pulse.json`
- **🛠 Source:** LottieFiles
- **📝 Search:** `dot pulse` or `signal pulse animation`.

---

## Quick checklist

When you're done sourcing, this folder tree should be populated:

- [ ] `images/techcore/` — 4 files (`hacker-desk.jpg`, `holo-ui.png`, `neon-sign.png`, plus the rgb-strip texture below)
- [ ] `images/sanctuary/` — 5 files
- [ ] `images/arena/` — 3 files
- [ ] `images/studio/` — 5 files (3 posters + clapperboard + hero)
- [ ] `images/kitchen/` — 3 files
- [ ] `models/<each zone>/` — 3-4 GLBs each
- [ ] `textures/<each zone>/` — 1-2 PBR sets (4 files each)
- [ ] `animations/billboards/` — ~12 Lottie JSONs
- [ ] `animations/hud/` — 5 Lottie JSONs

Once everything is in place, ping me and we'll start **Phase 2** — wiring each zone to use these assets.
