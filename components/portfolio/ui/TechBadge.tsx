interface TechBadgeProps {
  label: string;
  variant?: "blue" | "cyan" | "green" | "muted";
}

const variantStyles: Record<string, string> = {
  blue:  "border-[rgba(192,133,82,0.3)] text-[#C08552] bg-[rgba(192,133,82,0.08)]",
  cyan:  "border-[rgba(212,163,115,0.3)]  text-[#D4A373] bg-[rgba(212,163,115,0.08)]",
  green: "border-[rgba(16,185,129,0.3)] text-[#10B981] bg-[rgba(16,185,129,0.08)]",
  muted: "border-[rgba(168,146,127,0.2)] text-[#A8927F] bg-[rgba(168,146,127,0.05)]",
};

export default function TechBadge({ label, variant = "muted" }: TechBadgeProps) {
  return (
    <span
      className={`tech-badge inline-block px-3 py-1 text-xs font-mono rounded-full border ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}
