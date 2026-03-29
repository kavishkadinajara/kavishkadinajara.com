"use client";

import { useEffect, useState } from "react";

/**
 * LOADING SCREEN
 * ==============
 * Full-screen loading overlay shown while R3F initializes.
 * Includes animated progress bar and thematic messaging.
 */

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Initializing the Multiverse...");

  useEffect(() => {
    const messages = [
      "Initializing the Multiverse...",
      "Constructing the Tech Core...",
      "Summoning the Sanctuary...",
      "Preparing the Arena...",
      "Setting up the Studio...",
      "Warming up the Kitchen...",
      "Almost there...",
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current > 100) current = 100;
      setProgress(current);

      const msgIndex = Math.min(
        Math.floor((current / 100) * messages.length),
        messages.length - 1
      );
      setMessage(messages[msgIndex]);

      if (current >= 100) {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(68, 68, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(68, 68, 255, 0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            animation: "gridMove 4s linear infinite",
          }}
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-wider">
        THE MULTIVERSE
      </h1>
      <p className="text-blue-400 text-lg md:text-xl font-mono mb-12 tracking-widest">
        JOURNEY
      </p>

      {/* Progress bar */}
      <div className="w-64 md:w-80">
        <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-white/40 text-xs font-mono">{message}</span>
          <span className="text-white/40 text-xs font-mono">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            className="absolute rounded-full border border-blue-500/10"
            style={{
              width: `${ring * 200}px`,
              height: `${ring * 200}px`,
              animation: `pulse ${2 + ring * 0.5}s ease-in-out infinite`,
              animationDelay: `${ring * 0.3}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
