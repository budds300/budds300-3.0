import Image from "next/image";
import Link from "next/link";
import type { BlogPost, Media } from "@/payload-types";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogGrid({
  posts,
  viewAllHref,
  showHeading = true,
  heading = "Latest From The Blog",
}: {
  posts: BlogPost[];
  viewAllHref?: string;
  showHeading?: boolean;
  heading?: string;
}) {
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="mx-auto max-w-5xl px-6 py-24">
      {showHeading ? (
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-kicker">Blog</span>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              {heading}
            </h2>
          </div>
          {viewAllHref ? (
            <Link
              href={viewAllHref}
              className="shrink-0 text-sm font-medium text-accent hover:underline"
            >
              View All &rarr;
            </Link>
          ) : null}
        </Reveal>
      ) : null}
      <StaggerGroup className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {posts.map((post) => {
          const cover =
            post.coverImage && typeof post.coverImage === "object"
              ? (post.coverImage as Media)
              : null;

          return (
            <StaggerItem key={post.id} as="article" className="card overflow-hidden">
              <Link href={`/blog/${post.slug}`}>
                {cover?.url ? (
                  <div className="relative aspect-video w-full">
                    <Image
                      src={cover.sizes?.card?.url || cover.url}
                      alt={cover.alt || post.title}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span className="rounded-full border border-border px-2.5 py-0.5">
                      {post.category}
                    </span>
                    <span>{formatDate(post.publishedDate)}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{post.title}</h3>
                  <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
