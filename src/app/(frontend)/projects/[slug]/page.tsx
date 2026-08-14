import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayloadClient } from "@/lib/payload";
import type { Media } from "@/payload-types";
import { RichText } from "@/components/RichText";

async function getProject(slug: string) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "projects",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return docs[0] ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const payload = await getPayloadClient();
  const { docs: others } = await payload.find({
    collection: "projects",
    where: { slug: { not_equals: slug } },
    limit: 1,
  });
  const next = others[0] ?? null;

  const cover =
    project.coverImage && typeof project.coverImage === "object"
      ? (project.coverImage as Media)
      : null;

  return (
    <article className="pb-24 pt-24">
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/projects" className="text-sm font-medium text-accent hover:underline">
          &larr; All Projects
        </Link>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{project.description}</p>
        {project.techStack?.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <li
                key={t.id ?? t.tag}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted"
              >
                {t.tag}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-6 flex gap-4 text-sm font-medium">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Live Demo
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          ) : null}
        </div>
      </div>

      {cover?.url ? (
        <div className="relative mx-auto mt-10 aspect-video w-full max-w-5xl overflow-hidden rounded-2xl px-6">
          <Image
            src={cover.url}
            alt={cover.alt || project.title}
            fill
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      {project.caseStudy ? (
        <div className="mx-auto mt-10 max-w-3xl px-6">
          <RichText data={project.caseStudy} />
        </div>
      ) : null}

      {next ? (
        <div className="mx-auto mt-16 max-w-3xl border-t border-border px-6 pt-8">
          <Link
            href={`/projects/${next.slug}`}
            className="text-sm font-medium text-muted hover:text-foreground"
          >
            Next Project
          </Link>
          <p className="mt-1 text-xl font-semibold">{next.title}</p>
        </div>
      ) : null}
    </article>
  );
}
