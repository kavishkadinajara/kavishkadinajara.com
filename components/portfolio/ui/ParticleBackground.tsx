"use client";

import { useEffect, useRef } from "react";

const SYMBOLS = ["∑", "λ", "π", "∇", "{}", "//", "0", "1", "∫", "Δ", "∞", "φ", "α", "β", "⊕", "≡"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  symbol: string;
  opacity: number;
  size: number;
  rotation: number;
  rotSpeed: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const PARTICLE_COUNT = 55;
    const MOUSE_RADIUS   = 130;
    const CONNECT_DIST   = 130;

    let particles: Particle[] = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const spawn = (): Particle => ({
      x:        Math.random() * canvas.width,
      y:        Math.random() * canvas.height,
      vx:       (Math.random() - 0.5) * 0.35,
      vy:       (Math.random() - 0.5) * 0.35,
      symbol:   SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      opacity:  0.06 + Math.random() * 0.1,
      size:     10 + Math.random() * 12,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
    });

    const init = () => {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, spawn);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(14,165,233,${alpha})`;
            ctx.lineWidth   = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        // mouse repulsion
        const dx   = p.x - mx;
        const dy   = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * 0.4;
          p.vy += (dy / dist) * force * 0.4;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x  += p.vx;
        p.y  += p.vy;
        p.rotation += p.rotSpeed;

        if (p.x < -20)                 p.x = canvas.width  + 20;
        if (p.x > canvas.width  + 20)  p.x = -20;
        if (p.y < -20)                 p.y = canvas.height + 20;
        if (p.y > canvas.height + 20)  p.y = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha     = p.opacity;
        ctx.font            = `${p.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle       = "#0EA5E9";
        ctx.textAlign       = "center";
        ctx.textBaseline    = "middle";
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove  = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    init();
    draw();
    window.addEventListener("resize",     resize,      { passive: true });
    window.addEventListener("mousemove",  onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
