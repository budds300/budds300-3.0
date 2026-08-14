import Link from "next/link";
import type { Testimonial } from "@/payload-types";
import { Reveal } from "@/components/motion/Reveal";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";

export function Testimonials({
  testimonials,
  viewAllHref,
}: {
  testimonials: Testimonial[];
  viewAllHref?: string;
}) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24">
      <Reveal className="mx-auto flex max-w-5xl flex-col gap-4 px-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="section-kicker">Clients Testimonial</span>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            What My Clients Say
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

      <TestimonialsCarousel testimonials={testimonials} />
    </section>
  );
}
