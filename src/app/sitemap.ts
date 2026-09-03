import type { MetadataRoute } from "next";
import { getDocs } from "@/lib/frontend-data";
import type { Project, ServiceOffering, BlogPost } from "@/payload-types";

const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.8 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, services, posts] = await Promise.all([
    getDocs<Project>({ collection: "projects", limit: 200, depth: 0 }),
    getDocs<ServiceOffering>({
      collection: "service-offerings",
      limit: 200,
      depth: 0,
    }),
    getDocs<BlogPost>({
      collection: "blog-posts",
      where: { draft: { equals: false } },
      limit: 200,
      depth: 0,
    }),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const serviceEntries: MetadataRoute.Sitemap = services
    .filter((s) => s.slug)
    .map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: s.updatedAt ? new Date(s.updatedAt) : new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const blogEntries: MetadataRoute.Sitemap = posts
    .filter((b) => b.slug)
    .map((b) => ({
      url: `${SITE_URL}/blog/${b.slug}`,
      lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  return [...staticEntries, ...projectEntries, ...serviceEntries, ...blogEntries];
}
