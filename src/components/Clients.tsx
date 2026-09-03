import Image from "next/image";
import type { Client, Media } from "@/payload-types";
import { Reveal } from "@/components/motion/Reveal";

export function Clients({ clients }: { clients: Client[] }) {
  if (clients.length === 0) return null;

  const repeatedClients = [...clients, ...clients];

  return (
    <section id="clients" className="overflow-hidden border-y border-border bg-background-elevated/45 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-kicker">Client</span>
            <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">
              Companies I have worked with
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted">
            A few teams and businesses I have helped ship better digital products.
          </p>
        </Reveal>
      </div>

      <Reveal y={18} delay={0.15} className="mt-12">
        <div
          className="relative flex overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="marquee-track flex min-w-full shrink-0 items-center gap-4 pr-4">
            {repeatedClients.map((client, index) => (
              <a
                key={`${client.id}-${index}`}
                href={client.website || undefined}
                target={client.website ? "_blank" : undefined}
                rel={client.website ? "noopener noreferrer" : undefined}
                className="flex h-28 min-w-64 items-center justify-center rounded-lg border border-border bg-white px-6 text-center text-xl font-black uppercase tracking-wide text-neutral-900 shadow-sm transition-transform hover:scale-[1.03]"
              >
                {client.logo && typeof client.logo === "object" && (client.logo as Media).url ? (
                  <Image
                    src={(client.logo as Media).url!}
                    alt={(client.logo as Media).alt || client.name}
                    width={220}
                    height={88}
                    className="max-h-20 w-auto max-w-full object-contain"
                  />
                ) : (
                  client.name
                )}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
