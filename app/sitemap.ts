import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://kavishkadinajara.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogUrls = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.rawDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogUrls,
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
