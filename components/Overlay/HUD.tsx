"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * HUD (Heads-Up Display) OVERLAY
 * ==============================
 * Pure Tailwind CSS overlay rendered outside the Canvas.
 * Shows:
 * - Current zone name with animated transitions
 * - Navigation dots (one per zone)  
 * - Scroll progress bar
 * - "Scroll to explore" hint at the start
 */

interface HUDProps {
  currentZone: { index: number; name: string };
  scrollProgress: number;
  isLoaded: boolean;
}

const ZONE_NAMES = [
  "The Tech Core",
  "The Sanctuary",
  "The Arena",
  "The Studio",
  "The Kitchen",
];

const ZONE_ICONS = ["⚡", "📚", "🏉", "🎬", "🍳"];

const ZONE_COLORS = [
  "text-blue-400",
  "text-amber-400",
  "text-green-400",
  "text-purple-400",
  "text-orange-400",
];

const ZONE_DOT_COLORS = [
  "bg-blue-400",
  "bg-amber-400",
  "bg-green-400",
  "bg-purple-400",
  "bg-orange-400",
];

const ZONE_BAR_COLORS = [
  "from-blue-500 to-blue-400",
  "from-amber-500 to-amber-400",
  "from-green-500 to-green-400",
  "from-purple-500 to-purple-400",
  "from-orange-500 to-orange-400",
];

export default function HUD({ currentZone, scrollProgress, isLoaded }: HUDProps) {
  const [showHint, setShowHint] = useState(true);
  const [displayedZone, setDisplayedZone] = useState(currentZone.name);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Hide scroll hint after user starts scrolling
  useEffect(() => {
    if (scrollProgress > 0.02) {
      setShowHint(false);
    }
  }, [scrollProgress]);

  // Animate zone name change
  useEffect(() => {
    if (currentZone.name !== displayedZone) {
      setIsTransitioning(true);
      setTimeout(() => {
        setDisplayedZone(currentZone.name);
        setIsTransitioning(false);
      }, 300);
    }
  }, [currentZone.name, displayedZone]);

  const progressPercent = useMemo(
    () => Math.round(scrollProgress * 100),
    [scrollProgress]
  );

  if (!isLoaded) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* ── TOP BAR ── */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4">
        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white/70 text-sm font-mono tracking-widest uppercase">
            The Multiverse Journey
          </span>
        </div>

        {/* Progress counter */}
        <div className="text-white/40 text-xs font-mono">
          {progressPercent}%
        </div>
      </div>

      {/* ── CURRENT ZONE LABEL ── */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2">
        <div
          className={`
            transition-all duration-500 ease-out text-center
            ${isTransitioning ? "opacity-0 -translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"}
          `}
        >
          <span className="text-3xl mb-1 block">
            {ZONE_ICONS[currentZone.index]}
          </span>
          <h2
            className={`
              text-2xl md:text-3xl font-bold tracking-wider
              ${ZONE_COLORS[currentZone.index]}
              transition-colors duration-700
            `}
          >
            {displayedZone}
          </h2>
          <div
            className={`
              h-0.5 mx-auto mt-2 rounded-full transition-all duration-700
              bg-gradient-to-r ${ZONE_BAR_COLORS[currentZone.index]}
            `}
            style={{ width: "80px" }}
          />
        </div>
      </div>

      {/* ── RIGHT SIDE NAVIGATION DOTS ── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        {ZONE_NAMES.map((name, i) => (
          <div key={name} className="flex items-center gap-3 group">
            {/* Zone label (shows on hover of dot) */}
            <span
              className={`
                text-xs font-mono text-white/0 group-hover:text-white/70
                transition-all duration-300 translate-x-2 group-hover:translate-x-0
                whitespace-nowrap pointer-events-auto
              `}
            >
              {name}
            </span>
            {/* Dot */}
            <div
              className={`
                rounded-full transition-all duration-500 pointer-events-auto cursor-pointer
                ${
                  currentZone.index === i
                    ? `w-3 h-3 ${ZONE_DOT_COLORS[i]} shadow-lg`
                    : `w-2 h-2 bg-white/20 hover:bg-white/40`
                }
              `}
              title={name}
            />
          </div>
        ))}
      </div>

      {/* ── BOTTOM SCROLL PROGRESS BAR ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
        <div
          className={`
            h-full rounded-r-full transition-colors duration-700
            bg-gradient-to-r ${ZONE_BAR_COLORS[currentZone.index]}
          `}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* ── SCROLL HINT (visible only at start) ── */}
      {showHint && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/50 text-sm font-mono">Scroll to explore</span>
          <svg
            className="w-5 h-5 text-white/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      )}

      {/* ── BOTTOM LEFT ZONE COUNTER ── */}
      <div className="absolute bottom-6 left-6">
        <div className="flex items-center gap-2 text-white/30 text-xs font-mono">
          <span className={`text-lg font-bold ${ZONE_COLORS[currentZone.index]} transition-colors duration-700`}>
            {String(currentZone.index + 1).padStart(2, "0")}
          </span>
          <span>/</span>
          <span>{String(ZONE_NAMES.length).padStart(2, "0")}</span>
        </div>
      </div>

      {/* ── LEFT SIDE ANIMATED PANEL ── */}
      <div className="absolute left-0 top-1/3 -translate-y-1/2 pointer-events-none">
        <div
          className={`
            transition-all duration-700 ease-out
            ${isTransitioning ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}
          `}
        >
          <div className="relative pl-6">
            {/* Vertical line accent */}
            <div className={`
              absolute left-0 top-0 bottom-0 w-0.5
              bg-gradient-to-b ${ZONE_BAR_COLORS[currentZone.index]}
            `} />

            {/* Info cards that slide in */}
            <div className="space-y-4">
              <div className="text-white/60 text-xs font-mono space-y-1 backdrop-blur-sm bg-white/5 p-3 rounded border border-white/10">
                <div className="text-white/40">ZONE</div>
                <div className={`text-sm font-bold ${ZONE_COLORS[currentZone.index]} transition-colors duration-700`}>
                  {displayedZone}
                </div>
              </div>

              <div className="text-white/60 text-xs font-mono space-y-1 backdrop-blur-sm bg-white/5 p-3 rounded border border-white/10">
                <div className="text-white/40">PROGRESS</div>
                <div className="text-sm font-bold text-white/80">
                  {progressPercent}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT SIDE ANIMATED DECORATIVE ELEMENTS ── */}
      <div className="absolute right-0 top-1/4 pointer-events-none">
        <div
          className={`
            transition-all duration-700 ease-out
            ${isTransitioning ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"}
          `}
        >
          <div className="relative pr-6 space-y-6">
            {/* Rotating accent lines */}
            <div className={`
              w-24 h-0.5 rounded-full
              bg-gradient-to-l ${ZONE_BAR_COLORS[currentZone.index]}
              transform transition-all duration-700
            `} />

            {/* Zone indicator badge */}
            <div className="backdrop-blur-sm bg-white/5 p-4 rounded border border-white/10 text-right">
              <div className="text-white/40 text-xs font-mono mb-2">ZONE INDEX</div>
              <div className={`
                text-2xl font-bold ${ZONE_COLORS[currentZone.index]}
                transition-colors duration-700
              `}>
                {String(currentZone.index + 1).padStart(2, "0")}
              </div>
            </div>

            {/* Animated zone icon */}
            <div className={`
              text-5xl transform transition-all duration-700
              ${isTransitioning ? "scale-75 opacity-0" : "scale-100 opacity-100"}
            `}>
              {ZONE_ICONS[currentZone.index]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
