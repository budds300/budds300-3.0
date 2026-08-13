import type { Service } from "@/payload-types";

const INTERVAL_LABEL: Record<Service["billingInterval"], string> = {
  "one-time": "one-time",
  monthly: "/mo",
  hourly: "/hr",
};

export function Pricing({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  const highlightIndex = services.length === 3 ? 1 : -1;

  return (
    <section id="pricing" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        Services & Pricing
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {services.map((service, i) => {
          const highlighted = i === highlightIndex;
          return (
            <div
              key={service.id}
              className={
                highlighted
                  ? "flex flex-col rounded-2xl border border-accent bg-background-elevated-solid p-6 shadow-[0_0_40px_-8px_var(--accent)]"
                  : "card flex flex-col p-6"
              }
            >
              <h3 className="text-lg font-medium">{service.tierName}</h3>
              <p className="mt-4">
                <span className="text-sm text-muted">from </span>
                <span className="text-3xl font-extrabold">
                  ${service.price}
                </span>
                <span className="text-base font-normal text-muted">
                  {" "}
                  {INTERVAL_LABEL[service.billingInterval]}
                </span>
              </p>
              {service.features?.length ? (
                <ul className="mt-6 flex-1 space-y-2 text-sm text-muted">
                  {service.features.map((f) => (
                    <li key={f.id ?? f.feature}>{f.feature}</li>
                  ))}
                </ul>
              ) : null}
              <a
                href={service.ctaLink}
                className="btn-glow mt-6 rounded-full bg-accent px-5 py-2.5 text-center font-medium text-accent-foreground"
              >
                Book Now
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
