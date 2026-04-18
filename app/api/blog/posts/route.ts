import { NextResponse } from "next/server";
import { getAllPosts, getAllTags } from "@/lib/blog";

export const dynamic = "force-dynamic";

export function GET() {
  const posts = getAllPosts();
  const tags = getAllTags();
  return NextResponse.json({ posts, tags });
}
