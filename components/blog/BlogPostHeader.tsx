import Link from "next/link";
import type { Post } from "@/lib/blog";
import TagBadge from "@/components/blog/TagBadge";
import { IconArrowLeft, IconClock, IconCalendar, IconUser } from "@tabler/icons-react";

interface BlogPostHeaderProps {
  post: Post;
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header className="mb-10">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-mono text-sm text-[#8B9EC0] hover:text-[#0EA5E9] transition-colors mb-8"
      >
        <IconArrowLeft size={16} />
        Back to Blog
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {post.tags.map((t) => (
          <TagBadge key={t} tag={t} />
        ))}
      </div>

      {/* Title */}
      <h1 className="font-display font-bold text-3xl md:text-5xl text-[#F0F4FF] leading-tight mb-5">
        {post.title}
      </h1>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-5 font-mono text-sm text-[#8B9EC0] mb-8">
        <span className="flex items-center gap-2">
          <IconCalendar size={14} className="text-[#0EA5E9]" />
          {post.date}
        </span>
        <span className="flex items-center gap-2">
          <IconClock size={14} className="text-[#0EA5E9]" />
          {post.readingTime}
        </span>
        <span className="flex items-center gap-2">
          <IconUser size={14} className="text-[#0EA5E9]" />
          Kavishka Dinajara
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-[#0EA5E9] via-[#06B6D4] to-transparent mb-8" />

      {/* Cover image */}
      {post.coverImage && (
        <div className="rounded-xl overflow-hidden mb-8 border border-[rgba(14,165,233,0.15)]">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full object-cover max-h-72"
          />
        </div>
      )}
    </header>
  );
}
