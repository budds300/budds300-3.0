import type { Testimonial } from "@/payload-types";
import { Reveal } from "@/components/motion/Reveal";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";

export function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24">
      <Reveal className="mx-auto max-w-5xl px-6">
        <span className="text-sm font-medium uppercase tracking-wider text-accent">
          Clients Testimonial
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          What My Clients Say
        </h2>
      </Reveal>

      <TestimonialsCarousel testimonials={testimonials} />
    </section>
  );
}
