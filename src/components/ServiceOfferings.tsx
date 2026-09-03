import Link from "next/link";
import type { ServiceOffering } from "@/payload-types";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { SERVICE_ICONS } from "@/lib/service-icons";

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
            <StaggerItem
              key={offering.id}
              className="stat-tile flex flex-col items-center py-8 text-center"
            >
              <span className="text-accent">{SERVICE_ICONS[offering.icon]}</span>
              <h3 className="mt-4 font-semibold">{offering.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{offering.description}</p>
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
            <StaggerItem
              key={offering.id}
              className="stat-tile flex flex-col items-center py-8 text-center"
            >
              <span className="text-accent">{SERVICE_ICONS[offering.icon]}</span>
              <h3 className="mt-4 font-semibold">{offering.title}</h3>
              <p className="mt-1 text-sm text-muted">{offering.description}</p>
            </StaggerItem>
          ),
        )}
      </StaggerGroup>
    </section>
  );
}
