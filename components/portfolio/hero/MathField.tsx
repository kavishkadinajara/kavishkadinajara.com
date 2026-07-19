"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type EqAnchor = {
  id: string;
  x: string;
  y: string;
  size: string;
  delayCls: string;
  /** parallax weight, 0..1 — outer/edge equations move more */
  weight: number;
  /** transformations to cycle through (each item shows for ~3s) */
  forms: string[];
};

const FIELD: EqAnchor[] = [
  {
    id: "einstein",
    x: "8%", y: "20%",
    size: "text-2xl md:text-3xl",
    delayCls: "eq-float-1",
    weight: 0.9,
    forms: ["E = mc²", "m = E/c²", "c = √(E/m)"],
  },
  {
    id: "calc",
    x: "75%", y: "78%",
    size: "text-3xl md:text-4xl",
    delayCls: "eq-float-5",
    weight: 0.6,
    forms: ["∫ f(x) dx", "F(x) + C", "d/dx F(x) = f(x)"],
  },
  {
    id: "basel",
    x: "55%", y: "10%",
    size: "text-2xl md:text-3xl",
    delayCls: "eq-float-1",
    weight: 0.7,
    forms: ["∑ 1/n²", "= π²/6", "ζ(2) = π²/6"],
  },
  {
    id: "nabla",
    x: "92%", y: "55%",
    size: "text-2xl md:text-3xl",
    delayCls: "eq-float-3",
    weight: 1.0,
    forms: ["∇·E = ρ/ε₀", "∇×B = μ₀J", "∇²φ = 0"],
  },
  {
    id: "lambda",
    x: "5%", y: "65%",
    size: "text-3xl md:text-4xl",
    delayCls: "eq-float-4",
    weight: 0.8,
    forms: ["λ = h/p", "p = h/λ", "ν = c/λ"],
  },
  {
    id: "sigma",
    x: "88%", y: "15%",
    size: "text-3xl md:text-4xl",
    delayCls: "eq-float-2",
    weight: 0.85,
    forms: ["∑ aₙ xⁿ", "f(x)·x⁻¹", "∂f/∂x"],
  },
  {
    id: "phi",
    x: "18%", y: "85%",
    size: "text-2xl md:text-3xl",
    delayCls: "eq-float-6",
    weight: 0.65,
    forms: ["φ = 1.618…", "φ² = φ + 1", "F(n)/F(n-1) → φ"],
  },
  {
    id: "infinity",
    x: "35%", y: "90%",
    size: "text-3xl md:text-4xl",
    delayCls: "eq-float-3",
    weight: 0.55,
    forms: ["lim x→∞", "1/x → 0", "eⁱᵖⁱ + 1 = 0"],
  },
];

export default function MathField() {
  const [tick, setTick] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const interval = setInterval(() => setTick((t) => t + 1), 3200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    let target = { x: 0, y: 0 };
    const handle = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      target = { x: nx, y: ny };
      if (!raf) {
        raf = requestAnimationFrame(() => {
          setMouse(target);
          raf = 0;
        });
      }
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handle);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {FIELD.map((eq) => {
        const dx = mouse.x * 18 * eq.weight;
        const dy = mouse.y * 18 * eq.weight;
        const formIdx = tick % eq.forms.length;
        return (
          <span
            key={eq.id}
            className={`absolute font-mono text-[#0EA5E9] pointer-events-none select-none ${eq.delayCls} ${eq.size}`}
            style={{
              left: eq.x,
              top: eq.y,
              opacity: 0.18,
              transform: `translate3d(${dx}px, ${dy}px, 0)`,
              transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
              willChange: "transform",
            }}
            aria-hidden="true"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={`${eq.id}-${formIdx}`}
                initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                transition={{ duration: 0.55 }}
                className="inline-block"
              >
                {eq.forms[formIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        );
      })}
    </>
  );
}
