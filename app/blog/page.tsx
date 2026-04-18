"use client";

import { useEffect, useState, useMemo } from "react";
import type { Post } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";
import TagBadge from "@/components/blog/TagBadge";
import { motion } from "framer-motion";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";

export default function BlogListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [allTags, setAllTags] = useState<{ tag: string; count: number }[]>([]);
  const [activeTag, setActiveTag] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/blog/posts")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data.posts ?? []);
        setAllTags(data.tags ?? []);
      });
  }, []);

  const filtered = useMemo(() => {
    let result = posts;
    if (activeTag !== "all") result = result.filter((p) => p.tags.includes(activeTag));
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }
    return result;
  }, [posts, activeTag, search]);

  return (
    <div
      className="min-h-screen bg-[#050810] text-[#F0F4FF]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-28 pb-24">
        {/* Header */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            className="font-mono text-xs text-[#8B9EC0] hover:text-[#0EA5E9] transition-colors mb-6 block"
            href="/"
          >
            ← Back to portfolio
          </Link>
          <span className="font-mono text-lg text-[#0EA5E9] tracking-wide">
            {"// blog.posts"}
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-[#F0F4FF] mt-2 mb-3">
            The Blog
          </h1>
          <p className="font-body text-[#8B9EC0] text-lg">
            Thoughts on engineering, architecture, and building things.
          </p>
          <div className="mt-6 h-px bg-gradient-to-r from-[#0EA5E9] via-[#06B6D4] to-transparent" />
        </motion.div>

        {/* Search */}
        <motion.div
          animate={{ opacity: 1 }}
          className="relative mb-6"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.15 }}
        >
          <IconSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B9EC0]"
            size={16}
          />
          <input
            className="w-full max-w-sm bg-[#0D1829] border border-[rgba(14,165,233,0.2)] rounded-lg pl-10 pr-4 py-2.5 font-mono text-sm text-[#F0F4FF] placeholder:text-[#8B9EC0] outline-none focus:border-[rgba(14,165,233,0.5)] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] transition-all"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts…"
            value={search}
          />
        </motion.div>

        {/* Tag filter */}
        <motion.div
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TagBadge
            active={activeTag === "all"}
            onClick={() => setActiveTag("all")}
            tag="all"
          />
          {allTags.map(({ tag }) => (
            <TagBadge
              key={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(activeTag === tag ? "all" : tag)}
              tag={tag}
            />
          ))}
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <motion.p
            animate={{ opacity: 1 }}
            className="font-mono text-[#8B9EC0] text-center py-20"
            initial={{ opacity: 0 }}
          >
            {activeTag !== "all"
              ? `No posts tagged #${activeTag} yet.`
              : "No posts found."}
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filtered.map((post, i) => (
              <BlogCard key={post.slug} index={i} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
