import Link from "next/link";
import type { Service } from "@/payload-types";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { MotionAnchor } from "@/components/motion/MotionButton";

const INTERVAL_LABEL: Record<Service["billingInterval"], string> = {
  "one-time": "one-time",
  monthly: "/mo",
  hourly: "/hr",
};

const KES_FORMATTER = new Intl.NumberFormat("en-KE", {
  maximumFractionDigits: 0,
});

export function Pricing({
  services,
  viewAllHref,
  compact = false,
}: {
  services: Service[];
  viewAllHref?: string;
  compact?: boolean;
}) {
  if (services.length === 0) return null;

  const highlightIndex = services.length === 3 ? 1 : -1;

  return (
    <section id="pricing" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="section-kicker">Pricing</span>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            Services & Pricing
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
      <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {services.map((service, i) => {
          const highlighted = i === highlightIndex;
          return (
            <StaggerItem
              key={service.id}
              className={
                highlighted
                  ? "flex flex-col rounded-2xl bg-background-elevated-solid p-6 ring-1 ring-accent/40"
                  : "card flex flex-col p-6"
              }
            >
              <h3 className="text-lg font-medium">{service.tierName}</h3>
              <p className="mt-4">
                <span className="text-sm text-muted">from </span>
                <span className="text-3xl font-extrabold">
                  KSh {KES_FORMATTER.format(service.price)}
                </span>
                <span className="text-base font-normal text-muted">
                  {" "}
                  {INTERVAL_LABEL[service.billingInterval]}
                </span>
              </p>
              {!compact && service.features?.length ? (
                <ul className="mt-6 flex-1 space-y-2 text-sm text-muted">
                  {service.features.map((f) => (
                    <li key={f.id ?? f.feature}>{f.feature}</li>
                  ))}
                </ul>
              ) : (
                <div className="flex-1" />
              )}
              <MotionAnchor
                href={service.ctaLink}
                className="btn-glow mt-6 rounded-full bg-accent px-5 py-2.5 text-center font-medium text-accent-foreground"
              >
                Book Now
              </MotionAnchor>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
