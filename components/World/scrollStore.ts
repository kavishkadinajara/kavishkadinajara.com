/**
 * SCROLL STORE
 * ============
 * A simple module-level mutable store for scroll progress.
 *
 * Why NOT drei's ScrollControls?
 * - ScrollControls creates a hidden HTML div inside R3F's root element
 * - R3F's root has overflow:hidden, which can clip/block the scroll container
 * - Next.js layout elements with overflow-hidden add another clipping layer
 * - This manual approach is 100% reliable: wheel events → shared state → useFrame reads
 *
 * Usage:
 * - Container div calls updateScroll(deltaY) on 'wheel' events
 * - Inside useFrame: read scrollStore.offset (0 → 1)
 */

export const scrollStore = {
  /** Current scroll progress, 0 = start, 1 = end */
  offset: 0,
  /** Target offset (before damping) */
  target: 0,
  /** Number of "pages" (controls scroll speed) */
  pages: 5,
};

/**
 * Call this from wheel event handler.
 * Normalizes deltaY and updates the target offset.
 */
export function updateScroll(deltaY: number) {
  // Normalize: ~100px per "tick" on most mice
  const scrollSpeed = 0.0008;
  scrollStore.target += deltaY * scrollSpeed;
  // Clamp between 0 and 1
  scrollStore.target = Math.max(0, Math.min(1, scrollStore.target));
}

/**
 * Call this every frame (inside useFrame) to apply damping.
 * Returns the current smoothed offset.
 */
export function dampScroll(delta: number): number {
  const dampingFactor = 1 - Math.pow(0.001, delta);
  scrollStore.offset +=
    (scrollStore.target - scrollStore.offset) * dampingFactor;
  return scrollStore.offset;
}
