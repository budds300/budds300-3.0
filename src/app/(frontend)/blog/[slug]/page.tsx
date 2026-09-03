import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getDocs } from "@/lib/frontend-data";
import type { Media, BlogPost } from "@/payload-types";
import { RichText } from "@/components/RichText";
import { BlogGrid } from "@/components/BlogGrid";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = await getDocs<BlogPost>({
    collection: "blog-posts",
    where: { slug: { not_equals: slug }, draft: { equals: false } },
    sort: "-publishedDate",
    limit: 3,
  });

  const cover =
    post.coverImage && typeof post.coverImage === "object"
      ? (post.coverImage as Media)
      : null;

  return (
    <article className="pb-16 pt-24">
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/blog" className="text-sm font-medium text-accent hover:underline">
          &larr; All Posts
        </Link>
        <div className="mt-4 flex items-center gap-2 text-xs text-muted">
          <span className="rounded-full border border-border px-2.5 py-0.5">
            {post.category}
          </span>
          <span>{formatDate(post.publishedDate)}</span>
          <span>&middot;</span>
          <span>{post.author}</span>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
      </div>

      {cover?.url ? (
        <div className="relative mx-auto mt-10 aspect-video w-full max-w-5xl overflow-hidden rounded-2xl px-6">
          <Image
            src={cover.sizes?.hero?.url || cover.url}
            alt={cover.alt || post.title}
            fill
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      <div className="mx-auto mt-10 max-w-3xl px-6">
        <RichText data={post.body} />
      </div>

      {related.length > 0 ? (
        <div className="mt-16 border-t border-border">
          <BlogGrid posts={related} heading="Related Posts" />
        </div>
      ) : null}
    </article>
  );
}
