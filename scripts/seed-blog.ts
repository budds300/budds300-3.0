import { getPayload } from "payload";
import config from "../src/payload.config";

function draftBody(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      version: 1,
      children: paragraphs.map((text) => ({
        type: "paragraph",
        direction: "ltr" as const,
        format: "" as const,
        indent: 0,
        version: 1,
        children: [{ type: "text", detail: 0, format: 0, mode: "normal", style: "", text, version: 1 }],
      })),
    },
  };
}

const DRAFT_NOTICE =
  "DRAFT PLACEHOLDER — this post was generated as a layout placeholder and has not been reviewed or published. Replace this body before making the post live.";

const POSTS = [
  {
    title: "Draft Post: Building Reliable Web Products",
    slug: "draft-building-reliable-web-products",
    category: "Engineering",
    excerpt:
      "Placeholder excerpt — replace with a real summary before publishing.",
    author: "Draft Author",
  },
  {
    title: "Draft Post: Notes on Full-Stack Architecture",
    slug: "draft-notes-on-full-stack-architecture",
    category: "Architecture",
    excerpt:
      "Placeholder excerpt — replace with a real summary before publishing.",
    author: "Draft Author",
  },
  {
    title: "Draft Post: Shipping Fast Without Cutting Corners",
    slug: "draft-shipping-fast-without-cutting-corners",
    category: "Process",
    excerpt:
      "Placeholder excerpt — replace with a real summary before publishing.",
    author: "Draft Author",
  },
];

async function run() {
  const payload = await getPayload({ config });

  const media = await payload.find({ collection: "media", limit: 1 });
  const coverImageId = media.docs[0]?.id;
  if (!coverImageId) {
    console.error("No media docs found to use as a placeholder cover image. Aborting.");
    process.exit(1);
  }

  for (const post of POSTS) {
    const existing = await payload.find({
      collection: "blog-posts",
      where: { slug: { equals: post.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`Skipping "${post.title}" (already exists)`);
      continue;
    }

    await payload.create({
      collection: "blog-posts",
      data: {
        title: post.title,
        slug: post.slug,
        coverImage: coverImageId,
        category: post.category,
        excerpt: post.excerpt,
        body: draftBody([DRAFT_NOTICE, "Lorem ipsum placeholder body text goes here."]),
        author: post.author,
        publishedDate: new Date().toISOString(),
        // Rendered (not draft:true) so the layout is actually visible for review;
        // the "Draft Post:" title prefix and in-body notice make the placeholder status obvious.
        draft: false,
      },
    });
    console.log(`Created draft "${post.title}"`);
  }
}

await run();
