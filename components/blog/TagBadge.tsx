interface TagBadgeProps {
  tag: string;
  small?: boolean;
  onClick?: () => void;
  active?: boolean;
}

const TAG_COLORS: Record<string, string> = {
  dotnet:       "text-[#0EA5E9] border-[rgba(14,165,233,0.35)] bg-[rgba(14,165,233,0.08)]",
  csharp:       "text-[#0EA5E9] border-[rgba(14,165,233,0.35)] bg-[rgba(14,165,233,0.08)]",
  backend:      "text-[#0EA5E9] border-[rgba(14,165,233,0.35)] bg-[rgba(14,165,233,0.08)]",
  react:        "text-[#06B6D4] border-[rgba(6,182,212,0.35)]  bg-[rgba(6,182,212,0.08)]",
  frontend:     "text-[#06B6D4] border-[rgba(6,182,212,0.35)]  bg-[rgba(6,182,212,0.08)]",
  javascript:   "text-[#06B6D4] border-[rgba(6,182,212,0.35)]  bg-[rgba(6,182,212,0.08)]",
  database:     "text-[#10B981] border-[rgba(16,185,129,0.35)] bg-[rgba(16,185,129,0.08)]",
  sql:          "text-[#10B981] border-[rgba(16,185,129,0.35)] bg-[rgba(16,185,129,0.08)]",
  dapper:       "text-[#10B981] border-[rgba(16,185,129,0.35)] bg-[rgba(16,185,129,0.08)]",
  architecture: "text-[#8B5CF6] border-[rgba(139,92,246,0.35)] bg-[rgba(139,92,246,0.08)]",
  patterns:     "text-[#8B5CF6] border-[rgba(139,92,246,0.35)] bg-[rgba(139,92,246,0.08)]",
  mobile:       "text-[#F59E0B] border-[rgba(245,158,11,0.35)] bg-[rgba(245,158,11,0.08)]",
  android:      "text-[#F59E0B] border-[rgba(245,158,11,0.35)] bg-[rgba(245,158,11,0.08)]",
  ai:           "text-[#EC4899] border-[rgba(236,72,153,0.35)] bg-[rgba(236,72,153,0.08)]",
  research:     "text-[#EC4899] border-[rgba(236,72,153,0.35)] bg-[rgba(236,72,153,0.08)]",
  materialui:   "text-[#06B6D4] border-[rgba(6,182,212,0.35)]  bg-[rgba(6,182,212,0.08)]",
};

const DEFAULT_COLOR = "text-[#8B9EC0] border-[rgba(139,158,192,0.25)] bg-[rgba(139,158,192,0.06)]";

export function getTagColor(tag: string): string {
  return TAG_COLORS[tag.toLowerCase()] ?? DEFAULT_COLOR;
}

export default function TagBadge({ tag, small = false, onClick, active = false }: TagBadgeProps) {
  const color = active
    ? "text-white border-[#0EA5E9] bg-[#0EA5E9] shadow-[0_0_10px_rgba(14,165,233,0.4)]"
    : getTagColor(tag);

  const base = `inline-block border rounded-full font-mono transition-all duration-200 ${
    small ? "text-[10px] px-2 py-0.5" : "text-xs px-3 py-1"
  } ${color}`;

  if (onClick) {
    return (
      <button onClick={onClick} className={`${base} cursor-pointer hover:opacity-90`}>
        #{tag}
      </button>
    );
  }
  return <span className={base}>#{tag}</span>;
}
