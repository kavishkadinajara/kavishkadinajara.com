interface TechBadgeProps {
  label: string;
  variant?: "blue" | "cyan" | "green" | "muted";
}

const variantStyles: Record<string, string> = {
  blue:  "border-[rgba(14,165,233,0.3)] text-[#0EA5E9] bg-[rgba(14,165,233,0.08)]",
  cyan:  "border-[rgba(6,182,212,0.3)]  text-[#06B6D4] bg-[rgba(6,182,212,0.08)]",
  green: "border-[rgba(16,185,129,0.3)] text-[#10B981] bg-[rgba(16,185,129,0.08)]",
  muted: "border-[rgba(139,158,192,0.2)] text-[#8B9EC0] bg-[rgba(139,158,192,0.05)]",
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
