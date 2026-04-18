"use client";

export default function MDXContent({ html }: { html: string }) {
  return (
    <div
      className="mdx-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
