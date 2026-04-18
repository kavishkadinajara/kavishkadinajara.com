import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { format, parseISO } from "date-fns";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface Post {
  slug: string;
  title: string;
  date: string;
  rawDate: string;
  tags: string[];
  summary: string;
  coverImage: string | null;
  readingTime: string;
  published: boolean;
  content?: string;
}

function parseFrontmatter(slug: string): Post & { content: string } {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const rt = readingTime(content);

  return {
    slug,
    title: data.title ?? "Untitled",
    date: format(parseISO(data.date ?? "2025-01-01"), "MMMM d, yyyy"),
    rawDate: data.date ?? "2025-01-01",
    tags: data.tags ?? [],
    summary: data.summary ?? "",
    coverImage: data.coverImage ?? null,
    readingTime: rt.text,
    published: data.published ?? true,
    content,
  };
}

function getSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPosts(): Post[] {
  const isProd = process.env.NODE_ENV === "production";
  return getSlugs()
    .map((slug) => {
      const post = parseFrontmatter(slug);
      const { content: _, ...rest } = post;
      void _;
      return rest as Post;
    })
    .filter((p) => (isProd ? p.published : true))
    .sort((a, b) => (a.rawDate < b.rawDate ? 1 : -1));
}

export function getPostBySlug(slug: string): (Post & { content: string }) | null {
  try {
    return parseFrontmatter(slug);
  } catch {
    return null;
  }
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  posts.forEach((p) => {
    p.tags.forEach((t) => map.set(t, (map.get(t) ?? 0) + 1));
  });
  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getFeaturedPosts(n: number): Post[] {
  return getAllPosts().slice(0, n);
}

export function getAdjacentPosts(slug: string): {
  prev: Post | null;
  next: Post | null;
} {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  return {
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
    next: idx > 0 ? posts[idx - 1] : null,
  };
}
