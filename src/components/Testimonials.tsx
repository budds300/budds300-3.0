import Image from "next/image";
import type { Media, Testimonial } from "@/payload-types";

export function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        What Clients Say
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => {
          const avatar =
            t.avatar && typeof t.avatar === "object"
              ? (t.avatar as Media)
              : null;

          return (
            <figure key={t.id} className="card p-6">
              <blockquote className="text-muted">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                {avatar?.url ? (
                  <Image
                    src={avatar.url}
                    alt={avatar.alt || t.clientName}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : null}
                <div>
                  <p className="font-medium">{t.clientName}</p>
                  <p className="text-sm text-muted">{t.roleCompany}</p>
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
