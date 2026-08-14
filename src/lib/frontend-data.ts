import { cache } from "react";
import type { CollectionSlug, SelectType, Where } from "payload";
import { unstable_cache } from "next/cache";
import { getPayloadClient } from "@/lib/payload";

const REVALIDATE_SECONDS = 300;

type FindDocsArgs = {
  collection: CollectionSlug;
  depth?: number;
  limit?: number;
  select?: SelectType;
  sort?: string;
  where?: Where;
};

async function findDocs<T>({
  collection,
  depth = 1,
  limit = 10,
  select,
  sort,
  where,
}: FindDocsArgs): Promise<T[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection,
    depth,
    limit,
    pagination: false,
    select,
    sort,
    where,
  });

  return docs as T[];
}

export const getGlobalSettings = unstable_cache(
  async () => {
    const payload = await getPayloadClient();
    return payload
      .findGlobal({ slug: "global-settings", depth: 1 })
      .catch(() => null);
  },
  ["global-settings"],
  { revalidate: REVALIDATE_SECONDS, tags: ["global-settings"] },
);

export const getDocs = <T>(args: FindDocsArgs) =>
  unstable_cache(
    () => findDocs<T>(args),
    ["docs", JSON.stringify(args)],
    { revalidate: REVALIDATE_SECONDS, tags: [String(args.collection)] },
  )();

export const getProjectBySlug = cache(async (slug: string) => {
  const docs = await getDocs({
    collection: "projects",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  return docs[0] ?? null;
});

export const getServiceOfferingBySlug = cache(async (slug: string) => {
  const docs = await getDocs({
    collection: "service-offerings",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  return docs[0] ?? null;
});

export const getBlogPostBySlug = cache(async (slug: string) => {
  const docs = await getDocs({
    collection: "blog-posts",
    where: { slug: { equals: slug }, draft: { equals: false } },
    limit: 1,
    depth: 1,
  });
  return docs[0] ?? null;
});
