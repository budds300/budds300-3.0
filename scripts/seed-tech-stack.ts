import { getPayload } from "payload";
import config from "../src/payload.config";

const ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Payload CMS",
  "Docker",
  "Vercel",
  "GitHub Actions",
  "Neon",
  "Git",
  "Figma",
  "Vitest",
  "Playwright",
];

async function run() {
  const payload = await getPayload({ config });

  for (let i = 0; i < ITEMS.length; i++) {
    const name = ITEMS[i];
    const existing = await payload.find({
      collection: "tech-stack-items",
      where: { name: { equals: name } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`Skipping "${name}" (already exists)`);
      continue;
    }
    await payload.create({
      collection: "tech-stack-items",
      data: { name, order: i },
    });
    console.log(`Created "${name}"`);
  }
}

await run();
