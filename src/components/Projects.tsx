import Image from "next/image";
import Link from "next/link";
import type { Media, Project } from "@/payload-types";
import { Reveal } from "@/components/motion/Reveal";

export function Projects({
  projects,
  viewAllHref,
}: {
  projects: Project[];
  viewAllHref?: string;
}) {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="section-kicker">Portfolio</span>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            Featured Projects
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
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {projects.map((project, i) => {
          const cover =
            typeof project.coverImage === "object"
              ? (project.coverImage as Media)
              : null;

          return (
            <Reveal
              key={project.id}
              as="article"
              y={0}
              x={i % 2 === 0 ? -32 : 32}
              className="card overflow-hidden"
            >
              {cover?.url ? (
                <Link
                  href={`/projects/${project.slug}`}
                  className="relative block aspect-video w-full overflow-hidden"
                >
                  <Image
                    src={cover.sizes?.card?.url || cover.url}
                    alt={cover.alt || project.title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
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
                <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
                  <Link href={`/projects/${project.slug}`} className="text-accent hover:underline">
                    Case Study
                  </Link>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
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
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
