"use client";

import { useEffect, useRef, useState } from "react";

type Step =
  | { kind: "type"; text: string; speed?: number }
  | { kind: "out";  text: string; color?: string }
  | { kind: "progress"; label: string; duration: number }
  | { kind: "pause"; ms: number }
  | { kind: "clear" };

const SCRIPT: Step[] = [
  { kind: "type", text: "$ whoami" },
  { kind: "pause", ms: 250 },
  { kind: "out",  text: "→ Associate Software Engineer", color: "#0EA5E9" },
  { kind: "pause", ms: 600 },
  { kind: "type", text: "$ stack --short" },
  { kind: "pause", ms: 250 },
  { kind: "out",  text: "→ React · Next · Azure · Ballerina", color: "#06B6D4" },
  { kind: "pause", ms: 600 },
  { kind: "type", text: "$ deploy --prod" },
  { kind: "pause", ms: 250 },
  { kind: "progress", label: "→ building", duration: 1100 },
  { kind: "out",  text: "✓ shipped to production", color: "#10B981" },
  { kind: "pause", ms: 1100 },
  { kind: "clear" },
];

interface Line {
  id: number;
  text: string;
  color?: string;
}

export default function HeroTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typingLine, setTypingLine] = useState("");
  const [cursorOn, setCursorOn] = useState(true);
  const [glitch, setGlitch] = useState(false);
  const idRef = useRef(0);
  const cancelledRef = useRef(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    cancelledRef.current = false;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = setTimeout(resolve, ms);
        const unmount = () => clearTimeout(t);
        if (cancelledRef.current) unmount();
      });

    const pushLine = (text: string, color?: string) => {
      idRef.current += 1;
      setLines((prev) => [...prev.slice(-7), { id: idRef.current, text, color }]);
    };

    const typeText = async (text: string, speed = 38) => {
      if (reduce) {
        setTypingLine(text);
        return;
      }
      for (let i = 0; i <= text.length; i++) {
        if (cancelledRef.current) return;
        setTypingLine(text.slice(0, i));
        await sleep(speed + Math.random() * 30);
      }
    };

    const runProgress = async (label: string, duration: number) => {
      const total = 16;
      const stepMs = duration / total;
      for (let i = 0; i <= total; i++) {
        if (cancelledRef.current) return;
        const filled = "█".repeat(i);
        const empty  = "░".repeat(total - i);
        const pct = Math.round((i / total) * 100);
        setTypingLine(`${label} [${filled}${empty}] ${pct}%`);
        await sleep(reduce ? 0 : stepMs);
      }
      pushLine(`${label} [████████████████] 100%`, "#06B6D4");
      setTypingLine("");
    };

    const run = async () => {
      while (!cancelledRef.current) {
        for (const step of SCRIPT) {
          if (cancelledRef.current) return;
          if (step.kind === "type") {
            await typeText(step.text, step.speed);
            if (cancelledRef.current) return;
            pushLine(step.text);
            setTypingLine("");
          } else if (step.kind === "out") {
            pushLine(step.text, step.color);
          } else if (step.kind === "progress") {
            await runProgress(step.label, step.duration);
          } else if (step.kind === "pause") {
            await sleep(reduce ? 0 : step.ms);
          } else if (step.kind === "clear") {
            setGlitch(true);
            await sleep(180);
            setLines([]);
            setTypingLine("");
            setGlitch(false);
            await sleep(reduce ? 0 : 250);
          }
        }
      }
    };

    run();

    const cursorInterval = setInterval(() => setCursorOn((v) => !v), 520);

    return () => {
      cancelledRef.current = true;
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className={`glass-panel w-full max-w-md ${glitch ? "glitch" : ""}`}>
      <div className="flex items-center justify-between px-3 py-2 border-b border-[rgba(14,165,233,0.18)]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="font-mono text-[10px] text-[#8B9EC0] tracking-wide">
          ~/kavishka
        </span>
        <span className="font-mono text-[10px] text-[#8B9EC0]">zsh</span>
      </div>

      <div className="relative px-4 py-3 h-44 overflow-hidden font-mono text-[12.5px] leading-[1.55]">
        {lines.map((line) => (
          <div
            key={line.id}
            className="whitespace-pre"
            style={{ color: line.color ?? "#F0F4FF" }}
          >
            {line.text}
          </div>
        ))}

        {typingLine && (
          <div className="whitespace-pre text-[#F0F4FF]">
            {typingLine}
            <span
              className="inline-block w-[7px] h-[14px] align-middle ml-[2px]"
              style={{
                background: "#0EA5E9",
                opacity: cursorOn ? 1 : 0,
                boxShadow: "0 0 6px #0EA5E9",
              }}
            />
          </div>
        )}

        {!typingLine && (
          <div className="text-[#F0F4FF]">
            $
            <span
              className="inline-block w-[7px] h-[14px] align-middle ml-[6px]"
              style={{
                background: "#0EA5E9",
                opacity: cursorOn ? 1 : 0,
                boxShadow: "0 0 6px #0EA5E9",
              }}
            />
          </div>
        )}

        <div className="scanlines" aria-hidden="true" />
      </div>
    </div>
  );
}
