import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

const STACK = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 21h8M12 18v3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    category: "Backend",
    items: ["Node.js", "PostgreSQL", "Payload CMS", "REST / GraphQL"],
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="6" rx="1.5" />
        <rect x="3" y="14" width="18" height="6" rx="1.5" />
        <circle cx="7" cy="7" r="0.75" fill="currentColor" />
        <circle cx="7" cy="17" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
  {
    category: "DevOps",
    items: ["Vercel", "Docker", "GitHub Actions", "Neon"],
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          d="M7 18a4 4 0 0 1-1-7.87A5 5 0 0 1 15.9 8.05 4.5 4.5 0 0 1 17 17H7Z"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    category: "Tools",
    items: ["Git", "Figma", "Vitest", "Playwright"],
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          d="m14.7 6.3 3 3L7.3 19.7 4 20l.3-3.3L14.7 6.3Z"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function TechStackGrid() {
  return (
    <section id="stack" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <span className="text-sm font-medium uppercase tracking-wider text-accent">
          My Skills
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Tech <span className="font-medium text-muted">Stack</span>
        </h2>
      </Reveal>
      <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STACK.map((group) => (
          <StaggerItem key={group.category} className="card p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{group.category}</h3>
              <span className="icon-badge text-accent-foreground">{group.icon}</span>
            </div>
            <div className="mt-4 border-t border-border/60 pt-4">
              <ul className="space-y-2 text-muted">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
