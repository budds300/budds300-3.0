import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";
import { Services } from "./collections/Services";
import { ServiceOfferings } from "./collections/ServiceOfferings";
import { WorkExperience } from "./collections/WorkExperience";
import { Testimonials } from "./collections/Testimonials";
import { TechStackItems } from "./collections/TechStackItems";
import { Blog } from "./collections/Blog";
import { Clients } from "./collections/Clients";
import { Messages } from "./collections/Messages";
import { GlobalSettings } from "./globals/GlobalSettings";
import { PrivacyPolicy } from "./globals/PrivacyPolicy";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

function getDatabaseUri() {
  const value =
    process.env.DATABASE_URI ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL;

  if (!value) {
    throw new Error(
      "DATABASE_URI environment variable is required. Set it to your full Postgres connection string.",
    );
  }

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(
      "DATABASE_URI must be a valid Postgres URL, for example postgresql://user:password@host/database?sslmode=require",
    );
  }

  if (!["postgres:", "postgresql:"].includes(parsed.protocol)) {
    throw new Error("DATABASE_URI must start with postgres:// or postgresql://");
  }

  if (!parsed.hostname || parsed.hostname === "base") {
    throw new Error(
      `DATABASE_URI has an invalid Postgres host "${parsed.hostname}". Check the DATABASE_URI value in your Vercel environment variables.`,
    );
  }

  return value;
}

if (!process.env.PAYLOAD_SECRET) {
  throw new Error("PAYLOAD_SECRET environment variable is required");
}

const databaseUri = getDatabaseUri();

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Projects,
    Services,
    ServiceOfferings,
    WorkExperience,
    Testimonials,
    Clients,
    TechStackItems,
    Blog,
    Messages,
  ],
  globals: [GlobalSettings, PrivacyPolicy],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
});
