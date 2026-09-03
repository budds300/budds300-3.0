import type { Metadata } from "next";
import { getDocs } from "@/lib/frontend-data";
import { Reveal } from "@/components/motion/Reveal";
import { BlogGrid } from "@/components/BlogGrid";
import { CtaBanner } from "@/components/CtaBanner";
import type { BlogPost } from "@/payload-types";

export const metadata: Metadata = {
  title: "Blog",
  alternates: { canonical: "/blog" },
};

export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getDocs<BlogPost>({
    collection: "blog-posts",
    where: { draft: { equals: false } },
    sort: "-publishedDate",
    limit: 100,
  });

  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-4 pt-24">
        <Reveal>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Blog
          </h1>
          <p className="mt-3 text-muted">
            Notes on engineering, architecture, and shipping software.
          </p>
        </Reveal>
      </section>
      <BlogGrid posts={posts} showHeading={false} />
      <CtaBanner
        heading="Want new posts in your inbox?"
        buttonLabel="Get Updates"
        buttonHref="/contact"
      />
    </>
  );
}
