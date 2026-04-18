"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Post } from "@/lib/blog";
import TagBadge, { getTagColor } from "@/components/blog/TagBadge";
import { IconArrowRight, IconClock } from "@tabler/icons-react";

interface BlogCardProps {
  post: Post;
  index?: number;
}

function GradientPlaceholder({ tag }: { tag: string }) {
  const colorMap: Record<string, string> = {
    dotnet:       "from-[rgba(14,165,233,0.15)] to-[rgba(14,165,233,0.03)]",
    csharp:       "from-[rgba(14,165,233,0.15)] to-[rgba(14,165,233,0.03)]",
    backend:      "from-[rgba(14,165,233,0.15)] to-[rgba(14,165,233,0.03)]",
    react:        "from-[rgba(6,182,212,0.15)]  to-[rgba(6,182,212,0.03)]",
    frontend:     "from-[rgba(6,182,212,0.15)]  to-[rgba(6,182,212,0.03)]",
    database:     "from-[rgba(16,185,129,0.15)] to-[rgba(16,185,129,0.03)]",
    architecture: "from-[rgba(139,92,246,0.15)] to-[rgba(139,92,246,0.03)]",
    ai:           "from-[rgba(236,72,153,0.15)] to-[rgba(236,72,153,0.03)]",
  };
  const gradient = colorMap[tag?.toLowerCase()] ?? "from-[rgba(14,165,233,0.1)] to-[rgba(6,182,212,0.03)]";

  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
      <span className="font-mono text-4xl opacity-20 select-none">{"{ }"}</span>
    </div>
  );
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      className="group hover-glow flex flex-col bg-[#0D1829] border border-[rgba(14,165,233,0.12)] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      {/* Cover / Placeholder */}
      <div className="h-44 overflow-hidden shrink-0">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <GradientPlaceholder tag={post.tags[0] ?? ""} />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.slice(0, 3).map((t) => (
            <TagBadge key={t} tag={t} small />
          ))}
        </div>

        {/* Title */}
        <h2 className="font-display font-semibold text-lg text-[#F0F4FF] leading-snug mb-2 group-hover:text-[#0EA5E9] transition-colors line-clamp-2">
          {post.title}
        </h2>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-3 font-mono text-xs text-[#8B9EC0]">
          <span>{post.date}</span>
          <span className="text-[rgba(139,158,192,0.3)]">·</span>
          <span className="flex items-center gap-1">
            <IconClock size={11} />
            {post.readingTime}
          </span>
        </div>

        {/* Summary */}
        <p className="font-body text-sm text-[#8B9EC0] leading-relaxed line-clamp-2 flex-1">
          {post.summary}
        </p>

        {/* Read more */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 mt-4 font-mono text-xs text-[#0EA5E9] hover:text-[#06B6D4] transition-colors group/link"
        >
          Read more
          <IconArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.article>
  );
}
