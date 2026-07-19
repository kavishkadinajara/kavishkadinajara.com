"use client";

import { useState } from "react";

type Logo = {
  name: string;
  color: string;
  path: string;
  /** "outer" | "inner" — radius band */
  band: "outer" | "inner";
  /** angular offset in degrees */
  angle: number;
};

const LOGOS: Logo[] = [
  {
    name: "React",
    color: "#61DAFB",
    band: "outer",
    angle: 0,
    path: "M12 9.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 13.38 9.5 12 10.62 9.5 12 9.5zm0-2.5C6.48 7 2 9.24 2 12s4.48 5 10 5 10-2.24 10-5-4.48-5-10-5zm0 1.5c4.97 0 9 1.57 9 3.5s-4.03 3.5-9 3.5S3 13.93 3 12s4.03-3.5 9-3.5z",
  },
  {
    name: "Next.js",
    color: "#FFFFFF",
    band: "outer",
    angle: 120,
    path: "M11.572 0c-.176.013-.527.06-.844.122C7.748.628 4.93 2.476 3.146 5.166 2.151 6.66 1.49 8.358 1.244 10.04c-.087.59-.097.769-.097 1.96 0 1.192.01 1.371.097 1.961.65 4.31 3.6 7.93 7.778 9.547.747.286 1.484.487 2.32.61.585.085 1.83.085 2.415 0 1.443-.213 2.665-.572 3.87-1.187.185-.094.22-.119.195-.14a45.99 45.99 0 0 1-.371-.495l-.342-.452-2.86-4.236-3.87-5.733-.012 4.703-.024 4.704-.084.157a.681.681 0 0 1-.42.341l-.13.041H8.93l-.135-.045a.733.733 0 0 1-.394-.36l-.062-.13.006-6.554.01-6.555.092-.114a.726.726 0 0 1 .54-.244c.305 0 .376.04.602.347.044.06 1.756 2.578 3.804 5.612l5.337 7.9.225-.144c1.7-1.114 3.205-2.7 4.085-4.305.93-1.7 1.408-3.594 1.41-5.617v-.013c0-2.024-.481-3.918-1.41-5.617-.881-1.605-2.385-3.19-4.084-4.305-1.205-.781-2.504-1.262-3.985-1.477A18.526 18.526 0 0 0 11.572 0z",
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    band: "outer",
    angle: 240,
    path: "M3 3h18v18H3V3zm10.71 14.86c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.42-.81-2.05-2.25-2.68l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.72.81-.72.48 0 .8.21 1.09.72l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33-1.51 0-2.48.97-2.48 2.24 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .48-.45.83-1.15.83-.83 0-1.31-.43-1.67-1.03zm-5.29-5.18h2.43v6.79h1.67v-6.79h2.43v-1.45H8.42z",
  },
  {
    name: "Azure",
    color: "#0089D6",
    band: "inner",
    angle: 60,
    path: "M5.483 21.3h12.39L11.078 9.45l-3.69 6.45 3.32 4.075-5.225 1.325zM13.04 4.05l-4.55 1.275 6.625 11.7L18.42 6.45z",
  },
  {
    name: "Docker",
    color: "#2496ED",
    band: "inner",
    angle: 180,
    path: "M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.118a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.18a.185.185 0 00-.186.185v1.888c0 .102.083.185.186.185m23.954-1.42c-.058-.04-.62-.46-1.79-.46-.302.002-.604.024-.904.067-.222-1.521-1.482-2.262-1.539-2.295l-.307-.18-.202.295c-.252.392-.44.823-.555 1.275-.21.876-.082 1.704.366 2.41-.54.302-1.41.376-1.587.382H.984c-.412.001-.747.336-.748.749-.018 1.388.21 2.768.679 4.077.527 1.435 1.319 2.493 2.354 3.146 1.16.732 3.052 1.151 5.196 1.151.969.003 1.937-.084 2.89-.26 1.323-.245 2.594-.726 3.748-1.422 1.058-.7 1.96-1.61 2.66-2.673a14.5 14.5 0 002.02-3.864c.027-.045.097-.085.143-.122l.226-.155c.045-.04.085-.082.122-.13l.207-.193c.04-.063.073-.137.097-.21l.06-.282c.04-.094.062-.196.063-.297.001-.13-.02-.25-.057-.37-.034-.096-.085-.182-.144-.262-.075-.085-.144-.157-.226-.213z",
  },
  {
    name: "Ballerina",
    color: "#F48E20",
    band: "inner",
    angle: 300,
    path: "M12 2L4 8v8l8 6 8-6V8l-8-6zm0 2.4L18 9v6l-6 4.6L6 15V9l6-4.6zm0 3.6a3 3 0 100 6 3 3 0 000-6z",
  },
];

export default function OrbitalLogos() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="absolute inset-0 hidden md:block pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 orbit-outer"
        style={{ transform: "scale(1.45)" }}
      >
        {LOGOS.filter((l) => l.band === "outer").map((logo) => (
          <LogoChip
            key={logo.name}
            logo={logo}
            isHovered={hovered === logo.name}
            onHover={setHovered}
            counterClass="orbit-counter-outer"
          />
        ))}
      </div>

      <div
        className="absolute inset-0 orbit-inner"
        style={{ transform: "scale(1.18)" }}
      >
        {LOGOS.filter((l) => l.band === "inner").map((logo) => (
          <LogoChip
            key={logo.name}
            logo={logo}
            isHovered={hovered === logo.name}
            onHover={setHovered}
            counterClass="orbit-counter-inner"
          />
        ))}
      </div>
    </div>
  );
}

function LogoChip({
  logo,
  isHovered,
  onHover,
  counterClass,
}: {
  logo: Logo;
  isHovered: boolean;
  onHover: (name: string | null) => void;
  counterClass: string;
}) {
  const angleRad = (logo.angle * Math.PI) / 180;
  const x = 50 + Math.cos(angleRad) * 50;
  const y = 50 + Math.sin(angleRad) * 50;

  return (
    <div
      className="absolute pointer-events-auto"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className={counterClass}>
        <button
          type="button"
          onMouseEnter={() => onHover(logo.name)}
          onMouseLeave={() => onHover(null)}
          aria-label={logo.name}
          className="relative grid place-items-center w-10 h-10 md:w-11 md:h-11 rounded-full border bg-[rgba(13,24,41,0.75)] backdrop-blur-sm transition-all duration-200"
          style={{
            borderColor: isHovered ? logo.color : "rgba(14,165,233,0.3)",
            boxShadow: isHovered
              ? `0 0 18px ${logo.color}66, 0 0 32px ${logo.color}33`
              : "0 0 10px rgba(14,165,233,0.15)",
            transform: isHovered ? "scale(1.18)" : "scale(1)",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill={logo.color}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={logo.path} />
          </svg>
          {isHovered && (
            <span
              className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap"
              style={{
                background: "rgba(5,8,16,0.95)",
                color: logo.color,
                border: `1px solid ${logo.color}55`,
              }}
            >
              {logo.name}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
