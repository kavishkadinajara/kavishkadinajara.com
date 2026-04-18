import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug, getAdjacentPosts } from "@/lib/blog";
import { mdxToHtml } from "@/lib/mdxToHtml";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import TableOfContents from "@/components/blog/TableOfContents";
import MDXContent from "@/components/blog/MDXContent";
import TagBadge from "@/components/blog/TagBadge";
import Link from "next/link";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const url = `https://kavishkadinajara.vercel.app/blog/${post.slug}`;
  const image = post.coverImage ?? "/social-card.png";

  return {
    title: `${post.title} — Kavishka Dinajara`,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.summary,
      images: [{ url: image, width: 1200, height: 630 }],
      publishedTime: post.rawDate,
      authors: ["Kavishka Dinajara"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [image],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SinglePostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const html = mdxToHtml(post.content ?? "");

  const { prev, next } = getAdjacentPosts(params.slug);
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== params.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 2);

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.rawDate,
    author: { "@type": "Person", name: "Kavishka Dinajara", url: "https://kavishkadinajara.vercel.app" },
    url: `https://kavishkadinajara.vercel.app/blog/${post.slug}`,
    image: post.coverImage ?? "/social-card.png",
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div
        className="min-h-screen bg-[#050810] text-[#F0F4FF]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-28 pb-24">
          <div className="flex gap-12">
            {/* ── Main content ── */}
            <article className="flex-1 min-w-0">
              <BlogPostHeader post={post} />

              {/* HTML blog content */}
              <MDXContent html={html} />

              {/* Bottom tags + navigation */}
              <div className="mt-12 pt-8 border-t border-[rgba(14,165,233,0.1)]">
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((t) => (
                    <TagBadge key={t} tag={t} />
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {prev && (
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="hover-glow group flex flex-col gap-1 p-4 bg-[#0D1829] border border-[rgba(14,165,233,0.12)] rounded-xl transition-all duration-200"
                    >
                      <span className="font-mono text-xs text-[#8B9EC0] flex items-center gap-1">
                        <IconArrowLeft size={12} /> Previous
                      </span>
                      <span className="font-display text-sm text-[#F0F4FF] group-hover:text-[#0EA5E9] transition-colors line-clamp-2">
                        {prev.title}
                      </span>
                    </Link>
                  )}
                  {next && (
                    <Link
                      href={`/blog/${next.slug}`}
                      className="hover-glow group flex flex-col gap-1 p-4 bg-[#0D1829] border border-[rgba(14,165,233,0.12)] rounded-xl transition-all duration-200 sm:text-right"
                    >
                      <span className="font-mono text-xs text-[#8B9EC0] flex items-center gap-1 sm:justify-end">
                        Next <IconArrowRight size={12} />
                      </span>
                      <span className="font-display text-sm text-[#F0F4FF] group-hover:text-[#0EA5E9] transition-colors line-clamp-2">
                        {next.title}
                      </span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-14">
                  <h3 className="font-mono text-sm text-[#8B9EC0] tracking-widest uppercase mb-6">
                    {"// more posts you might like"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedPosts.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/blog/${p.slug}`}
                        className="hover-glow group flex gap-4 p-4 bg-[#0D1829] border border-[rgba(14,165,233,0.12)] rounded-xl transition-all duration-200"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap gap-1 mb-2">
                            {p.tags.slice(0, 2).map((t) => (
                              <TagBadge key={t} tag={t} small />
                            ))}
                          </div>
                          <p className="font-display text-sm text-[#F0F4FF] group-hover:text-[#0EA5E9] transition-colors line-clamp-2">
                            {p.title}
                          </p>
                          <p className="font-mono text-xs text-[#8B9EC0] mt-1">{p.readingTime}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* ── TOC sidebar ── */}
            <aside className="hidden xl:block w-56 shrink-0">
              <TableOfContents content={post.content ?? ""} />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
