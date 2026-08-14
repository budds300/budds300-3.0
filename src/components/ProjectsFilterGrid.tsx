"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Media, Project } from "@/payload-types";

export function ProjectsFilterGrid({ projects }: { projects: Project[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const p of projects) {
      for (const t of p.techStack ?? []) set.add(t.tag);
    }
    return Array.from(set).sort();
  }, [projects]);

  const filtered = activeTag
    ? projects.filter((p) => p.techStack?.some((t) => t.tag === activeTag))
    : projects;

  return (
    <div>
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={
              activeTag === null
                ? "rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground"
                : "rounded-full border border-border px-4 py-1.5 text-sm text-muted transition-colors hover:border-accent"
            }
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={
                activeTag === tag
                  ? "rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground"
                  : "rounded-full border border-border px-4 py-1.5 text-sm text-muted transition-colors hover:border-accent"
              }
            >
              {tag}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {filtered.map((project) => {
          const cover =
            project.coverImage && typeof project.coverImage === "object"
              ? (project.coverImage as Media)
              : null;

          return (
            <article key={project.id} className="card overflow-hidden">
              {cover?.url ? (
                <Link href={`/projects/${project.slug}`} className="relative block aspect-video w-full">
                  <Image
                    src={cover.url}
                    alt={cover.alt || project.title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </Link>
              ) : null}
              <div className="p-6">
                <h3 className="text-xl font-semibold">
                  <Link href={`/projects/${project.slug}`} className="hover:text-accent">
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-2 text-muted">{project.description}</p>
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
                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-6 inline-block text-sm font-medium text-accent hover:underline"
                >
                  Case Study &rarr;
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
