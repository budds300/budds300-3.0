import Image from "next/image";
import type { Media, TechStackItem } from "@/payload-types";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

export function TechStackGrid({ items }: { items: TechStackItem[] }) {
  if (items.length === 0) return null;

  return (
    <section id="stack" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal className="card p-8 text-center sm:p-12">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Our Tech Stack
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          The modern, reliable tools I use to build products that are fast,
          secure, and ready to scale.
        </p>
        <StaggerGroup
          className="mt-10 flex flex-wrap items-start justify-center gap-x-8 gap-y-6"
          stagger={0.06}
        >
          {items.map((item) => {
            const icon =
              item.icon && typeof item.icon === "object"
                ? (item.icon as Media)
                : null;

            return (
              <StaggerItem
                key={item.id}
                className="flex w-20 flex-col items-center gap-2"
              >
                <span className="icon-badge overflow-hidden text-accent-foreground">
                  {icon?.url ? (
                    <Image
                      src={icon.url}
                      alt={icon.alt || item.name}
                      width={44}
                      height={44}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold">
                      {item.name.charAt(0)}
                    </span>
                  )}
                </span>
                <span className="text-sm text-muted">{item.name}</span>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Reveal>
    </section>
  );
}
