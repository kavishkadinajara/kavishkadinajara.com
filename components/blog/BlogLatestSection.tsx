"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconArrowRight, IconClock } from "@tabler/icons-react";
import type { Post } from "@/lib/blog";
import TagBadge from "@/components/blog/TagBadge";

function MiniGradientCard({ tag }: { tag: string }) {
  const colorMap: Record<string, string> = {
    dotnet:       "from-[rgba(14,165,233,0.2)] to-transparent",
    csharp:       "from-[rgba(14,165,233,0.2)] to-transparent",
    backend:      "from-[rgba(14,165,233,0.2)] to-transparent",
    react:        "from-[rgba(6,182,212,0.2)]  to-transparent",
    frontend:     "from-[rgba(6,182,212,0.2)]  to-transparent",
    database:     "from-[rgba(16,185,129,0.2)] to-transparent",
    architecture: "from-[rgba(139,92,246,0.2)] to-transparent",
    ai:           "from-[rgba(236,72,153,0.2)] to-transparent",
  };
  const g = colorMap[tag?.toLowerCase()] ?? "from-[rgba(14,165,233,0.15)] to-transparent";
  return (
    <div className={`w-full h-full bg-gradient-to-br ${g} flex items-center justify-center rounded-lg`}>
      <span className="font-mono text-2xl opacity-20">{"{ }"}</span>
    </div>
  );
}

export default function BlogLatestSection() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/blog/posts")
      .then((r) => r.json())
      .then((data) => setPosts((data.posts ?? []).slice(0, 3)));
  }, []);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="relative py-24 bg-[#050810] grid-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="font-mono text-lg md:text-xl text-[#0EA5E9] tracking-wide">
            {"// latest_posts"}
          </span>
          <div className="mt-3 circuit-divider" />
        </motion.div>

        {/* Posts list */}
        <div className="space-y-5">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="hover-glow group flex gap-5 p-5 bg-[#0D1829] border border-[rgba(14,165,233,0.12)] rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Mini cover */}
                <div className="shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-[rgba(14,165,233,0.1)]">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <MiniGradientCard tag={post.tags[0] ?? ""} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {post.tags.slice(0, 2).map((t) => (
                      <TagBadge key={t} tag={t} small />
                    ))}
                  </div>
                  <h3 className="font-display font-semibold text-base text-[#F0F4FF] group-hover:text-[#0EA5E9] transition-colors line-clamp-1 mb-1">
                    {post.title}
                  </h3>
                  <p className="font-body text-sm text-[#8B9EC0] line-clamp-1 mb-2">
                    {post.summary}
                  </p>
                  <div className="flex items-center gap-3 font-mono text-xs text-[#8B9EC0]">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <IconClock size={11} />
                      {post.readingTime}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden sm:flex items-center shrink-0 text-[#8B9EC0] group-hover:text-[#0EA5E9] transition-colors">
                  <IconArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[rgba(14,165,233,0.3)] text-[#0EA5E9] hover:bg-[rgba(14,165,233,0.08)] font-body font-medium text-sm rounded-lg transition-all duration-200"
          >
            View all posts
            <IconArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
