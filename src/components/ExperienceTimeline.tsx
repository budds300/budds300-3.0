import type { WorkExperience } from "@/payload-types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function ExperienceTimeline({
  experience,
}: {
  experience: WorkExperience[];
}) {
  if (experience.length === 0) return null;

  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        Experience
      </h2>
      <ol className="mt-10 space-y-10 border-l border-border pl-8">
        {experience.map((role) => (
          <li key={role.id} className="relative">
            <span
              className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent"
              aria-hidden
            />
            <h3 className="text-lg font-medium">
              {role.roleTitle} · <span className="text-muted">{role.company}</span>
            </h3>
            <p className="text-sm text-muted">
              {formatDate(role.dateRange.start)} –{" "}
              {role.dateRange.current
                ? "Present"
                : role.dateRange.end
                  ? formatDate(role.dateRange.end)
                  : "Present"}
            </p>
            {role.achievements?.length ? (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                {role.achievements.map((a) => (
                  <li key={a.id ?? a.achievement}>{a.achievement}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
