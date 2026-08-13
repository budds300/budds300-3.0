import Image from "next/image";
import type { Media, Project } from "@/payload-types";

export function Projects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        Featured Projects
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {projects.map((project) => {
          const cover =
            typeof project.coverImage === "object"
              ? (project.coverImage as Media)
              : null;

          return (
            <article key={project.id} className="card overflow-hidden">
              {cover?.url ? (
                <div className="relative aspect-video w-full">
                  <Image
                    src={cover.url}
                    alt={cover.alt || project.title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="p-6">
                <h3 className="text-xl font-semibold">{project.title}</h3>
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
            </article>
          );
        })}
      </div>
    </section>
  );
}
