import { getPayload } from "payload";
import config from "../src/payload.config";

const OFFERINGS: {
  title: string;
  description: string;
  icon: "web" | "automation" | "design" | "ecommerce" | "cms" | "devops";
  order: number;
}[] = [
  {
    title: "Web Development",
    description:
      "Fast, accessible, production-ready web apps built with modern frameworks like Next.js and React.",
    icon: "web",
    order: 1,
  },
  {
    title: "Automation & Workflows",
    description:
      "Custom scripts, integrations, and internal tools that eliminate repetitive manual work.",
    icon: "automation",
    order: 2,
  },
  {
    title: "Web Design",
    description:
      "Clean, high-contrast UI design and design systems that make your product feel intentional.",
    icon: "design",
    order: 3,
  },
  {
    title: "E-Commerce",
    description:
      "Storefronts and checkout flows built for conversion, with secure payment integrations.",
    icon: "ecommerce",
    order: 4,
  },
  {
    title: "CMS",
    description:
      "Headless CMS setups so you can manage content, products, and pages without touching code.",
    icon: "cms",
    order: 5,
  },
  {
    title: "Deployment & DevOps",
    description:
      "CI/CD pipelines, Docker containers, and infrastructure on AWS or Cloudflare, with reverse proxies configured for reliability.",
    icon: "devops",
    order: 6,
  },
];

async function seed() {
  const payload = await getPayload({ config });

  for (const offering of OFFERINGS) {
    const existing = await payload.find({
      collection: "service-offerings",
      where: { title: { equals: offering.title } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      console.log(`Skipping "${offering.title}" (already exists)`);
      continue;
    }

    await payload.create({ collection: "service-offerings", data: offering });
    console.log(`Created "${offering.title}"`);
  }
}

await seed();
