import type { ServiceOffering } from "@/payload-types";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

const ICONS: Record<ServiceOffering["icon"], React.ReactNode> = {
  web: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M8 21h8M12 18v3" strokeLinecap="round" />
    </svg>
  ),
  automation: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="m14.7 6.3 3 3L7.3 19.7 4 20l.3-3.3L14.7 6.3Z"
        strokeLinejoin="round"
      />
    </svg>
  ),
  ecommerce: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="20" r="1" fill="currentColor" stroke="none" />
      <circle cx="18" cy="20" r="1" fill="currentColor" stroke="none" />
      <path
        d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  cms: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  ),
  devops: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
      <path d="M11 7h4a2 2 0 0 1 2 2v4M7 17v0" strokeLinecap="round" />
    </svg>
  ),
};

export function ServiceOfferings({
  offerings,
}: {
  offerings: ServiceOffering[];
}) {
  if (offerings.length === 0) return null;

  return (
    <section id="what-i-do" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          What I Do
        </h2>
      </Reveal>
      <StaggerGroup className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {offerings.map((offering) => (
          <StaggerItem key={offering.id}>
            <span className="text-accent">{ICONS[offering.icon]}</span>
            <h3 className="mt-4 text-lg font-medium">{offering.title}</h3>
            <div className="mt-2 mb-3 h-px w-10 bg-border" aria-hidden />
            <p className="text-muted">{offering.description}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
