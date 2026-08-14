import Link from "next/link";
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
  viewAllHref,
  expanded = false,
}: {
  offerings: ServiceOffering[];
  viewAllHref?: string;
  expanded?: boolean;
}) {
  if (offerings.length === 0) return null;

  return (
    <section id="services" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="section-kicker">Services</span>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            What I Do
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
      <StaggerGroup className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {offerings.map((offering) =>
          expanded ? (
            <StaggerItem key={offering.id} className="card flex flex-col p-6">
              <span className="icon-tile">{ICONS[offering.icon]}</span>
              <h3 className="mt-4 text-lg font-medium">{offering.title}</h3>
              <p className="mt-2 flex-1 text-muted">{offering.description}</p>
              {offering.slug ? (
                <Link
                  href={`/services/${offering.slug}`}
                  className="mt-4 text-sm font-medium text-accent hover:underline"
                >
                  Learn more &rarr;
                </Link>
              ) : null}
            </StaggerItem>
          ) : (
            <StaggerItem key={offering.id}>
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background-elevated text-accent">
                {ICONS[offering.icon]}
              </div>
              <h3 className="mt-5 text-xl font-bold">{offering.title}</h3>
              <div className="mt-3 mb-4 h-px w-12 bg-accent/55" aria-hidden />
              <p className="text-muted">{offering.description}</p>
            </StaggerItem>
          ),
        )}
      </StaggerGroup>
    </section>
  );
}
